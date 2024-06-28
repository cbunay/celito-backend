
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
    const user = new User();
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(createUserDto.password, salt);

    user.username = createUserDto.username;
    user.password = passHash;
    user.role = createUserDto.role;

    const { id } = await this.usersRepository.save(user);
    return { id };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
