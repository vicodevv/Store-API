import { Injectable, Inject } from '@nestjs/common';
import { UsersRepo } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersRepo') private readonly usersRepo: UsersRepo) {}

  /**
   * Get all users.
   * @returns {Promise<any>} - An array of users.
   */
  async getAllUsers(): Promise<any> {
    const users = await this.usersRepo.findPaginated();
    return users;
  }

  /**
   * Delete a user.
   * @param id - The user's id.
   * @returns {Promise<{ success: boolean }>} - An object containing a success boolean.
   * @throws BadRequestException if user id is not provided.
   * @throws BadRequestException if user id is not found.
   */
  async deleteUser(id: string): Promise<{ success: boolean }> {
    const deletedUser = await this.usersRepo.findOneAndDelete({
      _id: id,
    });
    if (deletedUser) {
      return { success: true };
    }
    return { success: false };
  }
}
