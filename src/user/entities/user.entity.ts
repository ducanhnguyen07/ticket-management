import { Role } from "../../../src/role/entities/role.entity";
import { Booking } from "../../../src/booking/entities/booking.entity";
import { BaseEntity } from "../../../src/common/entities/base.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'availableBalance', type: 'float' })
  availableBalance: number;

  @Column({ name: 'refreshToken', default: '' })
  refreshToken: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
