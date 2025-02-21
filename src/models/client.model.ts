import { Client } from '@/interfaces/client.interface';
import { model, Schema, Document } from 'mongoose';

const clientSchema: Schema = new Schema(
  {
    name: String,
    organizationMail: String,
    createdBy: String,
    clientImageUrl: String,
    updatedBy: String,
    client_id: String,
    client_secret: String,
  },
  { collection: 'clients', timestamps: true },
);

const clientCollection = model<Client & Document>('client', clientSchema);

export default clientCollection;
