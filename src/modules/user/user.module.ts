import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from './repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepo',
      useClass: UserRepo,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
