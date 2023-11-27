import { ProductDomain } from '../domain/products';
import { Product } from '../model/products.model';

export class ProductMap {
  public static toPersistence(product: ProductDomain): Product {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
}
