import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
export default registerAs('env', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
