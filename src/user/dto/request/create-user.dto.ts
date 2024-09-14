import { Expose } from "class-transformer"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsNumber()
  availableBalance: number;
}
