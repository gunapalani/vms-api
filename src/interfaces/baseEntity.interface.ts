import mongoose from 'mongoose';

export interface BaseEntity {
  _id?: string | mongoose.Types.ObjectId;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
