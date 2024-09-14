import { Expose, Type } from "class-transformer";

export class ResponseTicketDto {
  @Expose()
  title: string;

  @Expose()
  @Type(() => Date)
  expireTime: Date;

  @Expose()
  cost: number;

  @Expose()
  status: number;
}