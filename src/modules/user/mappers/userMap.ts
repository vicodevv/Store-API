import { UserDomain } from '../domain/user';
import { User } from '../model/user.model';

export class UserMap {
  public static toPersistence(user: UserDomain): User {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
}
