import {
  Controller,
  Get,
  BadRequestException,
  Delete,
  Put,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './model/user.model';
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getUser(@Req() request) {
    try {
      // Retrieve the userId from the token
      const userId = request.user.id;
      if (!userId) {
        throw new BadRequestException('User ID not found in the token');
      }

      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Req() request, @Body() userData: Partial<User>) {
    // Retrieve the userId from the token
    const userId = request.user.id;
    const updatedUser = await this.usersService.updateUser(userId, userData);

    if (!updatedUser) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUser(@Req() request) {
    // Retrieve the userId from the token
    const userId = request.user.id;
    const deletedUser = await this.usersService.deleteUser(userId);

    if (!deletedUser) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    return deletedUser;
  }
}
