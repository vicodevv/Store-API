import { UserDomain } from '../domain/users';
import { User } from '../model/users.model';

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
