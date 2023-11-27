import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

// Guard class for validating input data using class-transformer and class-validator
export class Guard {
  // Extract and throw the first validation error encountered
  protected static extractAndThrowError(errors: ValidationError[]) {
    if (errors.length > 0) {
      // If there are nested errors, recursively extract the first one
      if (errors[0].children && errors[0].children.length > 0) {
        return Guard.extractAndThrowError(errors[0].children[0].children);
      }

      // Extract the first error
      const e = errors[0];
      const key = Object.keys(e.constraints || {})[0];

      // Prepare payload with property and error details
      const payload = {
        property: e.property,
        error: key ? e.constraints[key] : '',
      };

      return {
        fields: payload,
        errMsg: payload.error,
      };
    } else {
      return null;
    }
  }

  // Validate input data against the provided validation class and return error details if any
  protected static validateAndError(data: any) {
    // Perform validation using class-validator
    const errors = validateSync(data, {
      whitelist: true,
    });

    const response = Guard.extractAndThrowError(errors);

    if (response == null) {
      return;
    }

    return { errMsg: response.errMsg };
  }

  // Validate and transform input data using class-transformer and class-validator
  static validate<C, P>(validationClass: ClassConstructor<C>, props: P) {
    // Transform and validate input data
    const validatedProps = plainToInstance(validationClass, props, {
      enableImplicitConversion: true,
    });

    return Guard.validateAndError(validatedProps);
  }
}
