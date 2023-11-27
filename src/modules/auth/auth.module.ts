import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersRepo } from '../users/repository/users.repository';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [
    AuthService,
    {
      provide: 'UsersRepo',
      useClass: UsersRepo,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
