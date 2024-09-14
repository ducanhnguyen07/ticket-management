import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from '../../src/ticket/ticket.module';
import { UserModule } from '../../src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    TicketModule,
    UserModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [TypeOrmModule.forFeature([Booking])],
})
export class BookingModule {}
