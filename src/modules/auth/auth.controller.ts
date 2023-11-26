import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ token: string }> {
    const token = await this.authService.login(body.username, body.password);
    return { token };
  }
}
