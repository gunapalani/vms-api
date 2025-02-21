import { BaseEntity } from './baseEntity.interface';

export interface User extends BaseEntity {
  _id?: string;
  userId: string;
  email: string;
  userName: string;
  phoneNumber: string;
  client?: string | any;
  profileImageUrl?: string;
  roles: string | any;
}
