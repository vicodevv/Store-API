import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import UserModel, { User } from '../model/user.model';

export class UserRepo extends AbstractRepo<User> {
  constructor() {
    super(UserModel.getModel());
  }
}
