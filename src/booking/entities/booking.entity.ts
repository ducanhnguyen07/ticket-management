import { User } from "../../../src/user/entities/user.entity";
import { BaseEntity } from "../../../src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Ticket } from "../../../src/ticket/entities/ticket.entity";

@Entity('booking')
export class Booking extends BaseEntity {
  @Column({ name: 'bookingTime' })
  bookingTime: Date;

  @Column({ name: 'confirmTime', nullable: true })
  confirmTime: Date;

  @Column({ name: 'isConfirm', default: false })
  isConfirm: boolean;

  @Column({ name: 'payTime', nullable: true })
  payTime: Date;

  @Column({ name: 'isPaid', default: false })
  isPaid: boolean;

  @Column({ name: 'otp', default: '' })
  otp: string;

  @ManyToOne(() => User, user => user.bookings, { cascade: true })
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Ticket, ticket => ticket.bookings, { cascade: true })
  @JoinColumn({ name: 'ticket' })
  ticket: Ticket;
}
