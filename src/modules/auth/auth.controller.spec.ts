import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepo } from '../user/repository/user.repository';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, { provide: 'UserRepo', useClass: UserRepo }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return a user when registration is successful', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(userData);

      const result = await controller.register(userData);

      expect(result).toEqual(userData);
    });

    it('should throw BadRequestException if registration fails', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new BadRequestException('User already exists'));

      await expect(controller.register(userData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should return a user with a valid token when login is successful', async () => {
      const loginData = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const user = {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123!',
      };

      jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ token: 'valid-token', user });

      const result = await controller.login(loginData);

      expect(result).toEqual({ token: 'valid-token', user });
    });

    it('should throw BadRequestException if login fails', async () => {
      const loginData = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(
          new BadRequestException('Invalid email or password'),
        );
      await expect(controller.login(loginData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
