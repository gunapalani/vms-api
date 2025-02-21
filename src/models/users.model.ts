import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client',
    },
    roles: {
      type: Schema.Types.ObjectId,
      ref: 'role',
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
  },
  { collection: 'users', timestamps: true },
);
export const userCollection = model<User & Document>('User', userSchema);
