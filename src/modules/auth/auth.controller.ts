import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('loginWithCredentials')
  async loginWithCredentials(@Body() loginDto: LoginDto) {
    return this.authService.loginWithCredentials(loginDto);
  }
}
