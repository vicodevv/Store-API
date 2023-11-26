import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async findOne(@Body() id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post('delete')
  async delete(@Body() id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}
