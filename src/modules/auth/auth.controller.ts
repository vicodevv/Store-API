import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    const { firstName, lastName, email, password } = userData;

    try {
      const createdUser = await this.authService.register(
        firstName,
        lastName,
        email,
        password,
      );
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: any) {
    const { email, password } = loginData;
    try {
      const result = await this.authService.login(email, password);
      if (!result) {
        throw new BadRequestException('Invalid email or password');
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
