import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<string> {
    const isValid = await compare(password, 'hashed_password');
    if (isValid) {
      const payload = { username };
      return this.jwtService.sign(payload);
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
