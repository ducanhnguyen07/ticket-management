import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class ConfirmPaymentDto {
  @Expose()
  @IsString()
  bookingId: string;

  @Expose()
  @IsString()
  otpCode: string;
}