import { uuid } from "uuidv4";
import { User } from "../../src/user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";
import { faker } from '@faker-js/faker';
import { genSaltSync, hashSync } from "bcrypt";

export const UserFactory = setSeederFactory(User, async () => {
  const user = new User();

  user.id = uuid();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  const salt = genSaltSync(10);
  user.password = hashSync(faker.internet.password(), salt);
  user.availableBalance = faker.number.float({ min: 0, max: 1000 });
  user.refreshToken = '';

  return user;
});