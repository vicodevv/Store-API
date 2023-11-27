import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './model/products.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduct(@Param('id') productId: string): Promise<Product> {
    const product = await this.productsService.getProduct(productId);

    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.updateProduct(
      productId,
      productData,
    );

    if (!updatedProduct) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    return updatedProduct;
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') productId: string) {
    const deletedProduct = await this.productsService.deleteProduct(productId);

    if (!deletedProduct) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    return deletedProduct;
  }
}
