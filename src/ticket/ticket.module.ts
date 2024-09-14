import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TypeOrmModule.forFeature([Ticket])],
})
export class TicketModule {}
