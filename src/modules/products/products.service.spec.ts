import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repository/products.repository';

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
});
