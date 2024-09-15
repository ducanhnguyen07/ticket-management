import { Body, Controller, Get, Post, Req, Res, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesPermissionsGuard } from "./guard/role-permission.guard";
import { AuthService } from "./auth.service";
import { Public, RequestUser, ResponseMessage } from "../../src/common/decorators/customize";
import { UserLoginDto } from "./dto/auth-login.dto";
import { Request, Response } from "express";
import { SkipThrottle } from "@nestjs/throttler";

@Controller('v1/auth')
@UseGuards(RolesPermissionsGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @ResponseMessage('User Login')
  @SkipThrottle({ default: false })
  async handleLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(userLoginDto, response);
  }

  @Public()
  @ResponseMessage('Get User by Refresh Token')
  @Get('refresh')
  async handleRefreshToken(@Req() request: Request) {
    return this.authService.processNewToken(request);
  }

  @SetMetadata('permissions', ['user_read'])
  @Get('test')
  getRequestUser(@RequestUser() user: any) {
    return user;
  }
}