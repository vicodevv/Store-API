import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common';
import { UserRepo } from './repository/user.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: 'UserRepo', useClass: UserRepo }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should throw BadRequestException if user ID is not found in the token', async () => {
      const request = { user: {} };
      jest.spyOn(userService, 'getUserById').mockResolvedValue(null);

      await expect(userController.getUser(request)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should return user if user ID is found in the token', async () => {
      const userId = 'testUserId';
      const request = { user: { id: userId } };
      const mockUser = {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Test123!',
      };
      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

      const result = await userController.getUser(request);

      expect(result).toEqual(mockUser);
    });
  });
});
