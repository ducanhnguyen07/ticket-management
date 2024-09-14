import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { BookingService } from './booking.service';
import { UpdateBookingDto } from './dto/request/update-booking.dto';
import { ResponseBookingDto } from './dto/response/response-booking.dto';
import { RequestUser } from '../../src/common/decorators/customize';
import { ConfirmPaymentDto } from './dto/request/confirm-payment.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('v1/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create/:ticketId')
  @SetMetadata('permissions', ['user_read'])
  @SkipThrottle({ default: false })
  create(@RequestUser() user: any, @Param('ticketId') ticketId: string): Promise<ResponseBookingDto> {
    return this.bookingService.create(user, ticketId);
  }

  @Get('find-all')
  @SetMetadata('permissions', ['user_read'])
  findAll(): Promise<ResponseBookingDto[]> {
    return this.bookingService.findAll();
  }

  @Get('find-one/:id')
  @SetMetadata('permissions', ['user_read'])
  findOne(@Param('id') id: string): Promise<ResponseBookingDto> {
    return this.bookingService.findOne(id);
  }

  @Post('confirm-payment')
  @SetMetadata('permissions', ['user_read'])
  confirmPayment(@RequestUser() user: any, @Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.bookingService.confirmPayment(user, confirmPaymentDto);
  }

  @Post('confirm-booking/:bookingId')
  @SetMetadata('permissions', ['user_read'])
  confirmBooking(@RequestUser() user: any, @Param('bookingId') bookingId: string) {
    return this.bookingService.confirmBooking(user, bookingId);
  }

  @Post('cancel-ticket/:ticketId')
  @SetMetadata('permissions', ['ticket_read'])
  cancelTicket(@RequestUser() user: any, @Param('ticketId') ticketId: string) {
    return this.bookingService.cancelTicket(user, ticketId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
