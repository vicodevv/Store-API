import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../user/model/user.model';
import * as bcrypt from 'bcrypt';
import { UserRepo } from '../user/repository/user.repository';
import { UserDomain } from '../user/domain/user';
import { UserMap } from '../user/mappers/userMap';
import { createToken } from '../../libs/utils/createToken';
@Injectable()
export class AuthService {
  constructor(@Inject('UserRepo') private readonly userRepo: UserRepo) {}

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
    const userExists = await this.userRepo.exists({ email });

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

    return this.userRepo.save(data);
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
    const user = await this.userRepo.findOne({ email });

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
