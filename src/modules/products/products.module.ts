import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
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
