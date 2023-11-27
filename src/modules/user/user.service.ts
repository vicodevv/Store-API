import { Injectable, Inject } from '@nestjs/common';
import { UserRepo } from './repository/user.repository';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@Inject('UserRepo') private readonly userRepo: UserRepo) {}

  /**
   * Get a user by id.
   * @param userId - The user's id.
   * @returns {Promise<User | null>} - The user, or null if not found.
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepo.findById(userId);
    return user;
  }

  /**
   * Update a user by id.
   * @param userId - The user's id.
   * @param userData - The data to update the user.
   * @returns {Promise<User | null>} - The updated user, or null if not found.
   */
  async updateUser(
    userId: string,
    userData: Partial<User>,
  ): Promise<User | null> {
    const updatedUser = await this.userRepo.findOneAndUpdate(
      { _id: userId },
      userData,
    );
    return updatedUser;
  }

  /**
   * Delete a user.
   * @param id - The user's id.
   * @returns {Promise<{ success: boolean }>} - An object containing a success boolean.
   * @throws BadRequestException if user id is not provided.
   * @throws BadRequestException if user id is not found.
   */
  async deleteUser(id: string): Promise<{ success: boolean }> {
    const deletedUser = await this.userRepo.findOneAndDelete({
      _id: id,
    });
    if (deletedUser) {
      return { success: true };
    }
    return { success: false };
  }
}
