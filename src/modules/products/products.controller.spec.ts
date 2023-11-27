import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repository/products.repository';
import { BadRequestException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: 'ProductsRepo', useClass: ProductsRepo },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should return a created product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest
        .spyOn(productService, 'createProduct')
        .mockResolvedValue(productData);

      const result = await controller.createProduct(productData);

      expect(result).toEqual(productData);
    });
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const products = [
        { name: 'Product 1', description: 'Description 1', price: 29.99 },
        { name: 'Product 2', description: 'Description 2', price: 39.99 },
      ];

      jest.spyOn(productService, 'getAllProducts').mockResolvedValue(products);

      const result = await controller.getAllProducts();

      expect(result).toEqual(products);
    });
  });

  describe('getProduct', () => {
    it('should return a product by ID', async () => {
      const productId = 'abc123';
      const product = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest.spyOn(productService, 'getProduct').mockResolvedValue(product);

      const result = await controller.getProduct(productId);

      expect(result).toEqual(product);
    });

    it('should throw BadRequestException if product is not found', async () => {
      const productId = 'nonexistent-id';

      jest
        .spyOn(productService, 'getProduct')
        .mockRejectedValue(new BadRequestException('Product not found'));

      await expect(controller.getProduct(productId)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should return an updated product', async () => {
      const productId = 'abc123';
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest
        .spyOn(productService, 'updateProduct')
        .mockResolvedValue(productData);

      const result = await controller.updateProduct(productId, productData);

      expect(result).toEqual(productData);
    });

    it('should throw BadRequestException if product is not found', async () => {
      const productId = 'nonexistent-id';
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest
        .spyOn(productService, 'updateProduct')
        .mockRejectedValue(new BadRequestException('Product not found'));

      await expect(
        controller.updateProduct(productId, productData),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteProduct', () => {
    it('should throw BadRequestException if product is not found', async () => {
      const productId = 'nonexistent-id';

      jest
        .spyOn(productService, 'deleteProduct')
        .mockRejectedValue(new BadRequestException('Product not found'));

      await expect(controller.deleteProduct(productId)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
