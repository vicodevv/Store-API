import { Controller, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findByUsername(@Body() username: string) {
    return this.usersService.findByUsername(username);
  }
}
