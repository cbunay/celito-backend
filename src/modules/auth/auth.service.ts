import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from './constants';

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
      console.log(result)
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const payload = { username: user.username, password: user.userId, role: Role.USER };
    const result = await this.usersService.create(payload);

    return { id: result.id };
  }
}
