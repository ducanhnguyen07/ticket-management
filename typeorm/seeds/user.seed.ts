import { genSaltSync, hashSync } from "bcrypt";
import { User } from "../../src/user/entities/user.entity";
import { DataSource } from "typeorm";
import { SeederFactoryManager } from "typeorm-extension";
import { RoleConstant } from "../../src/common/constants/role.constant";
import { Role } from "../../src/role/entities/role.entity";

export default class UserSeeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const userFactory = factoryManager.get(User);

    const roleRepository = dataSource.getRepository(Role);

    const salt = genSaltSync(10);
    const adminAccount = {
      username: 'admin-seed',
      password : hashSync('123', salt),
      email: "admin.seed@gmail.com",
      availableBalance: 500,
      refreshToken: '',
    };

    const roleAdmin = await roleRepository.findOne({
      where: {
        roleEnum: RoleConstant.ADMIN,
      },
    });

    adminAccount['roles'] = [roleAdmin];

    await userFactory.save(adminAccount);
  }
}