import {
  Controller,
  Get,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUser() {
    const user = await this.usersService.getAllUsers();
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.usersService.deleteUser(userId);

    if (!deletedUser) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    return deletedUser;
  }
}
