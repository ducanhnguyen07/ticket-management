import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionModule } from '../../src/permission/permission.module';
import { UserModule } from '../../src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => PermissionModule),
    forwardRef(() => UserModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService, TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
