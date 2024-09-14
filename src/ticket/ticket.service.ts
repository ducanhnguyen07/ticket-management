import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/request/create-ticket.dto';
import { UpdateTicketDto } from './dto/request/update-ticket.dto';
import { ResponseTicketDto } from './dto/response/response-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TicketService {
  @InjectRepository(Ticket)
  private readonly ticketRepository: Repository<Ticket>;

  async create(createTicketDto: CreateTicketDto): Promise<ResponseTicketDto> {
    try {
      const newTicket = await this.ticketRepository.save(createTicketDto);
      const responseTicket = plainToInstance(ResponseTicketDto, newTicket, {
        excludeExtraneousValues: true,
      });

      return responseTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<ResponseTicketDto[]> {
    try {
      const ticketList = await this.ticketRepository.find({
        where: {
          isDeleted: false,
        }
      });

      const responseTicketList = ticketList.map(ticket => plainToInstance(
        ResponseTicketDto,
        ticket,
        {
          excludeExtraneousValues: true,
        }
      ))

      return responseTicketList;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string): Promise<ResponseTicketDto> {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { id: id }
      });
      const responseTicket = plainToInstance(ResponseTicketDto, ticket, {
        excludeExtraneousValues: true,
      });
      return responseTicket; 
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
