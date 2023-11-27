import { AbstractRepo } from 'src/libs/db/AbstractRepo';
import UserModel, { User } from '../model/users.model';

export class UsersRepo extends AbstractRepo<User> {
  constructor() {
    super(UserModel.getModel());
  }
}
