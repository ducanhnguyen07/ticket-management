import { TicketStatusConstant } from "../../../src/common/constants/ticket-status.contant";
import { Booking } from "../../../src/booking/entities/booking.entity";
import { BaseEntity } from "../../../src/common/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('ticket')
export class Ticket extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'expireTime' })
  expireTime: Date;

  @Column({ name: 'cost', type: 'float' })
  cost: number;

  @Column({
    name: 'status', 
    type: 'enum',
    enum: TicketStatusConstant,
    default: TicketStatusConstant.AVAILABLE,
  })
  status: number;

  @OneToMany(() => Booking, (booking) => booking.ticket)
  bookings: Booking[];
}
