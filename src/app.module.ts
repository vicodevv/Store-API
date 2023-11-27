import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './libs/db/DatabaseModule';

@Module({
  imports: [DatabaseModule, AuthModule, ProductsModule, UsersModule],
})
export class AppModule {}
