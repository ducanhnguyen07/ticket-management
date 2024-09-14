import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response/response-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id }
      });

      return plainToInstance(ResponseUserDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getHashPassword = (plain: string): string => {
    const salt = genSaltSync(10);
    const hash = hashSync(plain, salt);
    return hash;
  };

  isValidPassword = (plain: string, hash: string): boolean => {
    return compareSync(plain, hash);
  };
}
