import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repository/products.repository';
import { BadRequestException } from '@nestjs/common';
import { Product } from './model/products.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepo: ProductsRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: 'ProductsRepo', useClass: ProductsRepo },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepo = module.get<ProductsRepo>('ProductsRepo');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should return a created product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest.spyOn(productsRepo, 'exists').mockResolvedValue(false);
      jest.spyOn(productsRepo, 'save').mockResolvedValue(productData);

      const result = await service.createProduct(
        productData.name,
        productData.description,
        productData.price,
      );

      expect(result).toEqual(productData);
    });

    it('should throw BadRequestException if product already exists', async () => {
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };

      jest.spyOn(productsRepo, 'exists').mockResolvedValue(true);

      await expect(
        service.createProduct(
          productData.name,
          productData.description,
          productData.price,
        ),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const products: { data: Product[]; pagination: PaginatedData } = {
        data: [
          { name: 'Product 1', description: 'Description 1', price: 29.99 },
          { name: 'Product 2', description: 'Description 2', price: 39.99 },
        ],
        pagination: {
          total: 2,
          pageSize: 10,
          currentPage: 1,
        },
      };
      jest.spyOn(productsRepo, 'findPaginated').mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(result).toEqual(products);
    });

    it('should throw BadRequestException if product is not found', async () => {
      const productId = 'nonexistent-id';

      jest.spyOn(productsRepo, 'findOne').mockResolvedValue(null);

      await expect(service.getProduct(productId)).rejects.toThrowError(
        BadRequestException,
      );
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

      jest.spyOn(productsRepo, 'findOne').mockResolvedValue(product as any);

      const result = await service.getProduct(productId);

      expect(result).toEqual(product);
    });

    it('should throw BadRequestException if product is not found', async () => {
      const productId = 'nonexistent-id';

      jest.spyOn(productsRepo, 'findOne').mockResolvedValue(null);

      await expect(service.getProduct(productId)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product by ID', async () => {
      const productId = 'abc123';
      const updateData = { name: 'Updated Product' };
      const mockUpdatedProduct = {
        id: productId,
        name: 'Updated Product',
        description: 'This is a test product',
        price: 19.99,
      };
      jest
        .spyOn(productsRepo, 'findOneAndUpdate')
        .mockResolvedValue(mockUpdatedProduct as any);

      const result = await service.updateProduct(productId, updateData);

      expect(result).toEqual(mockUpdatedProduct);
    });

    it('should return null if product is not found for update', async () => {
      const productId = 'nonexistent-id';
      const updateData = { name: 'Updated Product' };
      jest.spyOn(productsRepo, 'findOneAndUpdate').mockResolvedValue(null);

      const result = await service.updateProduct(productId, updateData);

      expect(result).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', async () => {
      const productId = 'abc123';
      const mockDeletedProduct = {
        id: productId,
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      };
      jest
        .spyOn(productsRepo, 'findOneAndDelete')
        .mockResolvedValue(mockDeletedProduct as any);

      const result = await service.deleteProduct(productId);

      expect(result).toEqual({ success: true });
    });

    it('should return null if product is not found for deletion', async () => {
      const productId = 'nonexistent-id';
      jest.spyOn(productsRepo, 'findOneAndDelete').mockResolvedValue(null);

      const result = await service.deleteProduct(productId);

      expect(result).toEqual({ success: false });
    });
  });
});
