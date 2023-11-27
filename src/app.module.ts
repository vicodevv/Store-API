import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './libs/db/DatabaseModule';

@Module({
  imports: [DatabaseModule, AuthModule, ProductsModule, UserModule],
})
export class AppModule {}
