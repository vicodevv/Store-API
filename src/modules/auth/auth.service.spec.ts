import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepo } from '../user/repository/user.repository';
import { BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: 'UserRepo', useClass: UserRepo }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<UserRepo>('UserRepo');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return a user when registration is successful', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepo, 'exists').mockResolvedValue(false);
      jest.spyOn(userRepo, 'save').mockResolvedValue(userData);

      const result = await service.register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
      );

      expect(result).toEqual(userData);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepo, 'exists').mockResolvedValue(true);
      await expect(
        service.register(
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
        ),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('login', () => {
    it('should throw BadRequestException if user does not exist', async () => {
      const email = 'john.doe@example.com';
      const password = 'password123';

      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

      await expect(service.login(email, password)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      const email = 'john.doe@example.com';
      const password = 'password123';

      const user = {
        _id: new mongoose.Types.ObjectId(), // Mock ObjectId
        email: 'john.doe@example.com',
        password: 'password123!',
      };

      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as any);

      await expect(service.login(email, password)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
