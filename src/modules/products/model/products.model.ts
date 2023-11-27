import { Schema, model } from 'mongoose';

export interface Product {
  name: string;
  description: string;
  price: number;
}

class ProductModel {
  private static schema: Schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        index: true, // For faster queries
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  static getModel() {
    return model<Product>('Product', this.schema);
  }
}

export default ProductModel;
