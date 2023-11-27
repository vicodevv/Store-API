import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/libs/db/DatabaseModule';
import { ProductsRepo } from './repository/products.repository';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductsRepo',
      useClass: ProductsRepo,
    },
  ],
})
export class ProductsModule {}
