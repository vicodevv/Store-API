import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './model/products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() productData: any): Promise<Product> {
    const { name, description, price } = productData;
    const createdProduct = await this.productsService.createProduct(
      name,
      description,
      price,
    );
    return createdProduct;
  }

  @Get('all')
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string): Promise<Product> {
    const product = await this.productsService.getProduct(productId);

    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    const deletedProduct = await this.productsService.deleteProduct(productId);

    if (!deletedProduct) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    return deletedProduct;
  }
}
