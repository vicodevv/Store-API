import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductsRepo } from './repository/products.repository';
import { ProductDomain } from './domain/products';
import { ProductMap } from './mappers/productsMap';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductsRepo') private readonly productsRepo: ProductsRepo,
  ) {}

  /**
   * Add a new product.
   * @param name - The product's name.
   * @param description - The product's description.
   * @param price - The product's price.
   * @returns {Promise<Product>} - The new product.
   * @throws BadRequestException if product name is not provided.
   */

  async createProduct(name, description, price): Promise<any> {
    const peoductExists = await this.productsRepo.exists({ name });
    if (peoductExists) {
      throw new BadRequestException('Product already exists');
    }

    const newProductError = ProductDomain.create({
      name,
      description,
      price,
    });

    if (newProductError.isFailure) {
      throw new BadRequestException(newProductError.errorValue());
    }

    const newProduct = newProductError.getValue();

    const data = ProductMap.toPersistence(newProduct);

    return this.productsRepo.save(data);
  }

  /**
   * Get all products.
   * @returns {Promise<any>} - An array of products.
   */
  async getAllProducts(): Promise<any> {
    const products = await this.productsRepo.findPaginated();
    return products;
  }

  /**
   * Get a product.
   * @param id - The product's id.
   * @returns {Promise<Product>} - The product.
   * @throws BadRequestException if product id is not provided.
   * @throws BadRequestException if product id is not found.
   */

  async getProduct(id: string): Promise<any> {
    const product = await this.productsRepo.findOne({ _id: id });
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Update a product.
   * @param id - The product's id.
   * @param productData - The data to update the product.
   * @returns {Promise<Product>} - The updated product, or null if not found.
   */

  async updateProduct(id: string, productData: Partial<any>): Promise<any> {
    const updatedProduct = await this.productsRepo.findOneAndUpdate(
      { _id: id },
      productData,
    );
    return updatedProduct;
  }

  /**
   * Delete a product.
   * @param id - The product's id.
   * @returns {Promise<{ success: boolean }>} - An object containing a success boolean.
   * @throws BadRequestException if product id is not provided.
   * @throws BadRequestException if product id is not found.
   */

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    const deletedProduct = await this.productsRepo.findOneAndDelete({
      _id: id,
    });
    if (deletedProduct) {
      return { success: true };
    }
    return { success: false };
  }
}
