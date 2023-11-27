import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from './repository/user.repository';

describe('UserService', () => {
  let userService: UserService;
  let userRepo: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: 'UserRepo', useClass: UserRepo }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepo = module.get<UserRepo>('UserRepo');
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = 'testUserId';
      const mockUser = {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Test123!',
      };
      jest.spyOn(userRepo, 'findById').mockResolvedValue(mockUser as any);

      const result = await userService.getUserById(userId);

      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found by ID', async () => {
      const userId = 'nonexistent-id';
      jest.spyOn(userRepo, 'findById').mockResolvedValue(null);

      const result = await userService.getUserById(userId);

      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const userId = 'testUserId';
      const updateData = { firstName: 'UpdatedFirstName' };
      const mockUpdatedUser = {
        id: userId,
        firstName: 'UpdatedFirstName',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Test123!',
      };
      jest
        .spyOn(userRepo, 'findOneAndUpdate')
        .mockResolvedValue(mockUpdatedUser as any);

      const result = await userService.updateUser(userId, updateData);

      expect(result).toEqual(mockUpdatedUser);
    });

    it('should return null if user is not found for update', async () => {
      const userId = 'nonexistent-id';
      const updateData = { firstName: 'UpdatedFirstName' };
      jest.spyOn(userRepo, 'findOneAndUpdate').mockResolvedValue(null);

      const result = await userService.updateUser(userId, updateData);

      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = 'testUserId';
      const mockDeletedUser = {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'Test123!',
      };
      jest
        .spyOn(userRepo, 'findOneAndDelete')
        .mockResolvedValue(mockDeletedUser as any);

      const result = await userService.deleteUser(userId);

      expect(result).toEqual({ success: true });
    });

    it('should return { success: false } if user is not found for deletion', async () => {
      const userId = 'nonexistent-id';
      jest.spyOn(userRepo, 'findOneAndDelete').mockResolvedValue(null);

      const result = await userService.deleteUser(userId);

      expect(result).toEqual({ success: false });
    });
  });
});
