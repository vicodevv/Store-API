import { AggregateRoot } from '@nestjs/cqrs';
import { UniqueEntityID } from './UniqueEntityID';

// Helper function to check if a value is an instance of BaseAggregateRoot
const isBaseAggregate = (v: any): v is BaseAggregateRoot<any> => {
  return v instanceof BaseAggregateRoot;
};

// Abstract class representing the base for all aggregate roots
export abstract class BaseAggregateRoot<T> extends AggregateRoot {
  // Unique identifier for the aggregate root
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    super();

    // Set the unique identifier. If id is not provided, create a new one.
    this._id = id ? id : new UniqueEntityID();

    this.props = props;
  }

  // Check if two aggregate roots are equal based on their unique identifiers
  public equals(object?: BaseAggregateRoot<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isBaseAggregate(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
