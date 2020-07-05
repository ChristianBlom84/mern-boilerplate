import { model, Model, Schema, Document } from 'mongoose';

export enum UserRoles {
  Standard,
  Admin
}

type TUserRoles = UserRoles.Standard | UserRoles.Admin;

interface UserModel extends Document {
  name: string;
  email: string;
  pwdHash: string;
  role: TUserRoles;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pwdHash: { type: String, required: true },
  role: {
    type: Number,
    max: 1,
    default: UserRoles.Standard
  }
});

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
