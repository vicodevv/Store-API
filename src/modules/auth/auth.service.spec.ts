import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepo } from '../user/repository/user.repository';

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
});
