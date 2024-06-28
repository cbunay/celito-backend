import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from './constants';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUsername(username);
    const passHash = await bcrypt.compare(pass, user.password);

    if (user && passHash) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException('Invalid credentials');
    }
    return null;
  }

  async login(user: { username: string, userId: number, role: Role }) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: { username: string, password: string }) {
    const payload: CreateUserDto = {
      ...user,
      role: Role.USER
    };

    const { id, username, role } = await this.usersService.create(payload);
    return { id, username, role };
  }
}
