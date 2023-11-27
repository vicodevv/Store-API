import { Schema, model } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UserModel {
  private static schema: Schema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  static getModel() {
    return model<User>('User', this.schema);
  }
}

export default UserModel;
