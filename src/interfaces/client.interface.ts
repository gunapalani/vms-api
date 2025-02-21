import { BaseEntity } from './baseEntity.interface';

export interface Client extends BaseEntity {
  name: string;
  organizationMail: string;
  clientImageUrl: string;
  client_id?: string;
  client_secret?: string;
}
