import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { Roles } from './decorators/roles.decorator';
import { Role } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto): Promise<{ id: number }> {
    return this.authService.register(registerUserDto);
  }
}
