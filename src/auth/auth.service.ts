import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserLoginDto } from "./dto/auth-login.dto";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "../../src/user/user.service";
import { RoleService } from "../../src/role/role.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import ms from 'ms';
import { LoggerService } from "../../src/logging/log.service";
import 'winston-daily-rotate-file';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly loggerService: LoggerService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(userLoginDto: UserLoginDto, response: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: userLoginDto.username },
      });

      if(!user) {
        this.loggerService.logWarn('User not found');
        throw new UnauthorizedException('User not found');
      }

      if (
        !this.userService.isValidPassword(userLoginDto.password, user.password)
      ) {
        this.loggerService.logWarn('Invalid password');
        throw new UnauthorizedException('Invalid password');
      }

      const roles = await this.roleService.findRoleByUser(user.id);

      const payload = {
        sub: 'from server',
        iss: 'token login',
        id: user.id,
        email: user.email,
        roles: roles['roleEnum'],
      };
      const refreshToken = this.createRefreshToken(payload);

      const userId: string = user.id;
      this.updateUserRefreshToken(refreshToken, userId);

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
      });

      this.loggerService.logInfo(`Success login by: ${payload.email}`);

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  createRefreshToken(payload: any): string {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refreshToken;
  }

  async updateUserRefreshToken(refreshToken: string, id: string) {
    await this.userRepository.update(id, { refreshToken: refreshToken });
  }
}