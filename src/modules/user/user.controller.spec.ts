import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUserDetails', () => {
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

  describe('updateUser', () => {
    it('should return updated user if user ID is found in the token', async () => {
      const userId = 'testUserId';
      const updateData = { firstName: 'UpdatedFirstName' };
      const request = { user: { id: userId }, body: updateData };
      const mockUpdatedUser = {
        id: userId,
        firstName: 'UpdatedFirstName',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Testing123!',
      };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUpdatedUser);

      const result = await userController.updateUser(request, updateData);

      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw BadRequestException if user ID is not found in the token', async () => {
      const updateData = { firstName: 'UpdatedFirstName' };
      const request = { user: {}, body: updateData };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(null);

      await expect(
        userController.updateUser(request, updateData),
      ).rejects.toThrowError(BadRequestException);
    });

    it('should throw BadRequestException if user is not found for update', async () => {
      const userId = 'testUserId';
      const updateData = { firstName: 'UpdatedFirstName' };
      const request = { user: { id: userId }, body: updateData };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(null);

      await expect(
        userController.updateUser(request, updateData),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should return deleted user if user ID is found in the token', async () => {
      const userId = 'testUserId';
      const request = { user: { id: userId } };
      const mockDeletedUser = {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Testing123!',
      };
      jest
        .spyOn(userService, 'deleteUser')
        .mockResolvedValue(mockDeletedUser as any);

      const result = await userController.deleteUser(request);

      expect(result).toEqual(mockDeletedUser);
    });

    it('should throw BadRequestException if user ID is not found in the token', async () => {
      const request = { user: {} };
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(null);

      await expect(userController.deleteUser(request)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if user is not found for delete', async () => {
      const userId = 'testUserId';
      const request = { user: { id: userId } };
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(null);

      await expect(userController.deleteUser(request)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
