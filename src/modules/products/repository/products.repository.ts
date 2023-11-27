import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import ProductModel, { Product } from '../model/products.model';

export class ProductsRepo extends AbstractRepo<Product> {
  constructor() {
    super(ProductModel.getModel());
  }
}
