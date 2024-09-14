import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export class CreateBookingDto {
  @Expose()
  @IsUUID()
  userId: string;

  @Expose()
  @IsUUID()
  ticketId: string;
}
