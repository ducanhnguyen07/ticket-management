import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
