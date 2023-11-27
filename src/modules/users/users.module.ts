import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepo } from './repository/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepo',
      useClass: UsersRepo,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
