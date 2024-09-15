import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateBookingDto } from './dto/request/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { In, Repository } from 'typeorm';
import { generateOtpCode } from '../../src/utils/generate-otp.util';
import { plainToInstance } from 'class-transformer';
import { ResponseBookingDto } from './dto/response/response-booking.dto';
import { ConfirmPaymentDto } from './dto/request/confirm-payment.dto';
import { Ticket } from '../../src/ticket/entities/ticket.entity';
import { TicketStatusConstant } from '../../src/common/constants/ticket-status.contant';
import { User } from '../../src/user/entities/user.entity';
import { REFUND_PERCENT } from '../../src/common/constants/business.constant';
import { ResponseTicketDto } from '../../src/ticket/dto/response/response-ticket.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;
  @InjectRepository(Ticket)
  private ticketRepository: Repository<Ticket>;
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(user: any, ticketId: string) {
    try {
      const otpCode = generateOtpCode();

      const newBooking = this.bookingRepository.create({
        user: { id: user.id },
        ticket: { id: ticketId },
        bookingTime: new Date(),
        isConfirm: false,
        isPaid: false,
        otp: otpCode,
      });
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
      });
      if(ticket.status != TicketStatusConstant.AVAILABLE) {
        throw new BadRequestException('ticket not available');
      }
      ticket.status = TicketStatusConstant.PENDING;
      await this.ticketRepository.save(ticket);

      const savedBooking = await this.bookingRepository.save(newBooking);
      return plainToInstance(ResponseBookingDto, savedBooking, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<ResponseBookingDto[]> {
    try {
      const bookingList = await this.bookingRepository.find({
        where: { isDeleted: false },
      });
      const responseBookingList = bookingList.map((booking) =>
        plainToInstance(ResponseBookingDto, booking, {
          excludeExtraneousValues: true,
        }),
      );

      return responseBookingList;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string): Promise<ResponseBookingDto> {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id: id, isDeleted: false },
      });

      return plainToInstance(ResponseBookingDto, booking, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async confirmPayment(user: any, confirmPaymentDto: ConfirmPaymentDto) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id: confirmPaymentDto.bookingId, isDeleted: false },
        relations: ['user', 'ticket'],
      });

      if (booking.otp == confirmPaymentDto.otpCode) {
        const userPay = await this.userRepository.findOne({
          where: { id: user.id },
        });

        const paidTicket = await this.ticketRepository.findOne({
          where: { id: booking.ticket.id },
        });

        if (paidTicket.status != TicketStatusConstant.PENDING) {
          return false;
        }

        if (user.id != booking.user.id) {
          return false;
        }

        if (userPay.availableBalance < paidTicket.cost) {
          return false;
        }

        booking.payTime = new Date();
        booking.isPaid = true;
        await this.bookingRepository.save(booking);

        userPay.availableBalance -= paidTicket.cost;
        await this.userRepository.save(userPay);

        paidTicket.status = TicketStatusConstant.PAID;
        await this.ticketRepository.save(paidTicket);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async confirmBooking(user: any, bookingId: string) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id: bookingId, isDeleted: false },
        relations: ['ticket'],
      });

      if (!booking.isPaid) {
        return false;
      }

      booking.isConfirm = true;
      booking.confirmTime = new Date();
      await this.bookingRepository.save(booking);

      const ticket = await this.ticketRepository.findOne({
        where: { id: booking.ticket.id },
      });
      ticket.status = TicketStatusConstant.BOOKED;
      await this.ticketRepository.save(ticket);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelTicket(user: any, ticketId: string) {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: {
          id: ticketId,
          status: In([
            TicketStatusConstant.PENDING,
            TicketStatusConstant.PAID,
            TicketStatusConstant.BOOKED,
          ]),
        },
        relations: ['bookings'],
      });
      ticket.status = TicketStatusConstant.AVAILABLE;
      await this.ticketRepository.save(ticket);

      const booking = await this.bookingRepository.findOne({
        where: { id: ticket.bookings[0].id, isDeleted: false },
      });
      booking.isDeleted = true;
      booking.deletedAt = new Date();
      await this.bookingRepository.save(booking);

      const userCancel = await this.userRepository.findOne({
        where: { id: user.id },
      });
      userCancel.availableBalance += REFUND_PERCENT * ticket.cost;
      await this.userRepository.save(userCancel);

      return plainToInstance(ResponseTicketDto, ticket, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'handle auto cancel ticket' })
  async handleAutoCancelTicket() {
    try {
      const ticketList = await this.ticketRepository.find({
        where: {
          status: In([TicketStatusConstant.PENDING, TicketStatusConstant.PAID]),
        },
        relations: ['bookings'],
      });

      for (const ticket of ticketList) {
        if (ticket.bookings.length > 0) {
          // delete booking
          const expiredBooking = await this.bookingRepository.findOne({
            where: { id: ticket.bookings[0].id },
            relations: ['user'],
          });

          expiredBooking.isDeleted = true;
          expiredBooking.deletedAt = new Date();
          await this.bookingRepository.save(expiredBooking);

          // refund to user
          if (ticket.status == TicketStatusConstant.PAID) {
            const user = await this.userRepository.findOne({
              where: { id: expiredBooking.user.id },
            });
            user.availableBalance += REFUND_PERCENT * ticket.cost;
            await this.userRepository.save(user);
          }

          // handle ticket
          ticket.status = TicketStatusConstant.AVAILABLE;
          await this.ticketRepository.save(ticket);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
