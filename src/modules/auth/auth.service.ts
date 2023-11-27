import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../users/model/users.model';
import * as bcrypt from 'bcrypt';
import { UsersRepo } from '../users/repository/users.repository';
import { UserDomain } from '../users/domain/users';
import { UserMap } from '../users/mappers/usersMap';
import { createToken } from 'src/libs/utils/createToken';
@Injectable()
export class AuthService {
  constructor(@Inject('UsersRepo') private readonly usersRepo: UsersRepo) {}

  /**
   * Register a new user
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @returns {Promise<User>} - The newly created user
   * @throws BadRequestException - If user already exists
   */
  async register(firstName, lastName, email, password) {
    const userExists = await this.usersRepo.exists({ email });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUserError = UserDomain.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newUserError.isFailure) {
      throw new BadRequestException(newUserError.errorValue());
    }

    const newUser = newUserError.getValue();

    const data = UserMap.toPersistence(newUser);

    return this.usersRepo.save(data);
  }

  /**
   * Login a user
   * @param email
   * @param password
   * @returns {Promise<User>} - The logged in user
   * @throws UnauthorizedException - If user does not exist or password is incorrect
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User } | null> {
    const user = await this.usersRepo.findOne({ email });

    //Check if user exists
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // Check if password is valid
    const passwordMatch = await this.comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = createToken(user.id);
    return { token, user };
  }

  // Helper function to compare password
  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }
}
