import { Expose } from "class-transformer";

export class ResponseBookingDto {
  @Expose()
  id: string;

  @Expose()
  bookingTime: Date;

  @Expose()
  confirmTime: Date;

  @Expose()
  isConfirm: boolean;

  @Expose()
  payTime: Date;

  @Expose()
  isPaid: boolean;

  @Expose()
  otp: string;
}