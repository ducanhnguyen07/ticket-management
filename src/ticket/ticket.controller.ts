import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/request/create-ticket.dto';
import { UpdateTicketDto } from './dto/request/update-ticket.dto';
import { ResponseTicketDto } from './dto/response/response-ticket.dto';
import { ResponseMessage } from '../../src/common/decorators/customize';

@Controller('v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  @SetMetadata('permissions', ['ticket_create'])
  @ResponseMessage('create ticket')
  create(@Body() createTicketDto: CreateTicketDto): Promise<ResponseTicketDto> {
    return this.ticketService.create(createTicketDto);
  }

  @Get('find-all')
  @SetMetadata('permissions', ['ticket_read'])
  @ResponseMessage('find all available ticket')
  findAll(): Promise<ResponseTicketDto[]> {
    return this.ticketService.findAll();
  }

  @Get('find-one/:id')
  @SetMetadata('permissions', ['ticket_read'])
  findOne(@Param('id') id: string): Promise<ResponseTicketDto> {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
