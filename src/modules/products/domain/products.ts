import { IsString, IsNotEmpty } from 'class-validator';
import { BaseAggregateRoot } from 'src/libs/domain/utils/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';

export interface ProductProps {
  name: string;
  description: string;
  price: string;
}

export class ProductValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  price: string;
}

export class ProductDomain extends BaseAggregateRoot<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }
  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get description(): string {
    return this.props.description.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get price(): string {
    return this.props.price;
  }

  public static create(props: ProductProps): Result<ProductDomain> {
    const guardResult = Guard.validate<ProductValidation, ProductProps>(
      ProductValidation,
      props,
    );

    if (guardResult) {
      return Result.fail<ProductDomain>(guardResult.errMsg);
    }

    const product = new ProductDomain({
      ...props,
    });

    return Result.ok<ProductDomain>(product);
  }
}
