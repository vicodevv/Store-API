import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepo } from '../users/repository/users.repository';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepo: UsersRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UsersRepo',
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepo = module.get<UsersRepo>('UsersRepo');
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      jest.spyOn(usersRepo, 'save').mockResolvedValue({} as any);

      await expect(
        authService.register(
          createUserDto.email,
          createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.password,
        ),
      ).resolves.not.toThrow();
      expect(usersRepo.save).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: hashedPassword,
      });
    });

    it('should throw BadRequestException if user creation fails', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      jest
        .spyOn(usersRepo, 'save')
        .mockRejectedValue(new Error('User creation failed'));

      await expect(
        authService.register(
          createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.email,
          createUserDto.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const user = {
        email: 'john@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(usersRepo, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      await expect(
        authService.login(loginDto.email, loginDto.password),
      ).resolves.toEqual(user);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      jest.spyOn(usersRepo, 'findOne').mockResolvedValue(null);

      await expect(
        authService.login(loginDto.email, loginDto.password),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const user = {
        email: 'john@example.com',
        password: 'incorrectPassword',
      };

      jest.spyOn(usersRepo, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        authService.login(loginDto.email, loginDto.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
