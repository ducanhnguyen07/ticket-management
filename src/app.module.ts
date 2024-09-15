import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { BookingModule } from './booking/booking.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from './logging/log.service';
import { LoggingInterceptor } from './common/intercepters/logging.intercepter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfig } from './config/throttler.config';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TicketModule,
    BookingModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync(ThrottlerConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtService,
    RedisService,
  ],
})
export class AppModule {}
