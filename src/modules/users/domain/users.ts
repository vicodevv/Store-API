import { IsString, IsNotEmpty } from 'class-validator';
import { BaseAggregateRoot } from 'src/libs/domain/utils/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserValidation {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserDomain extends BaseAggregateRoot<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }
  get id(): string {
    return this._id.toString();
  }

  get firstName(): string {
    return this.props.firstName.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get lastName(): string {
    return this.props.lastName.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(props: UserProps): Result<UserDomain> {
    const guardResult = Guard.validate<UserValidation, UserProps>(
      UserValidation,
      props,
    );

    if (guardResult) {
      return Result.fail<UserDomain>(guardResult.errMsg);
    }
    const user = new UserDomain({
      ...props,
    });

    return Result.ok<UserDomain>(user);
  }
}
