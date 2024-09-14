import { DataSource } from "typeorm";
import { runSeeders, Seeder, SeederFactoryManager } from "typeorm-extension";
import UserSeeder from "./user.seed";
import { UserFactory } from "../../typeorm/factories/user.factory";
import RoleSeeder from "./role.seed";
import PermissionSeeder from "./permission.seed";
import RolePermissionSeeder from "./role-permission.seed";
import { RoleFactory } from "../../typeorm/factories/role.factory";
import { PermissionFactory } from "../../typeorm/factories/permission.factory";

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      // seeds: [RoleSeeder, PermissionSeeder, RolePermissionSeeder],
      // factories: [RoleFactory, PermissionFactory],

      seeds: [UserSeeder],
      factories: [UserFactory],
      
    });
  }
}