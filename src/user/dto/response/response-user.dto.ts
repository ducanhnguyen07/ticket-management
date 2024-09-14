import { Expose } from "class-transformer";

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  availableBalance: number;
}