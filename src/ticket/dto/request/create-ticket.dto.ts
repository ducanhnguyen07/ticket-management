import { Expose, Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  expireTime: Date;

  @Expose()
  @IsNumber()
  cost: number;
}
