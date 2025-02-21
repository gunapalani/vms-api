import { HttpException } from '@/exceptions/httpException';
import { Client } from '@/interfaces/client.interface';
import clientCollection from '@/models/client.model';
import { isEmpty } from '@/utils/util';
import mongoose from 'mongoose';
class ClientService {
  public clients = clientCollection;

  public async getAllClientsAsync(): Promise<Client[]> {
    const clients: any[] = await this.clients.find({}).exec();
    if (!clients || clients.length === 0) {
      throw new HttpException(409, 'No clients found');
    }
    return clients;
  }

  public async getClientByIdAsync(clientId: string): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, 'ClientId is required');

    const client: Client = await this.clients.findOne({ _id: clientId }).exec();
    if (!client) throw new HttpException(409, 'Client not found');

    return client;
  }
  public async createClientAsync(clientData: Client): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, 'Client data is required');

    const createClientData: Client = await this.clients.create(clientData);
    return createClientData;
  }

  public async updateClientAsync(clientId: string, clientData: Client): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, 'ClientId is required');
    const clientCount = await this.clients
      .countDocuments({
        name: { $regex: new RegExp(clientData.name, 'i') },
        _id: { $ne: clientData?._id ?? mongoose.Types.ObjectId(clientData._id?.toString()) },
      })
      .exec();
    if (clientCount > 0) throw new HttpException(400, `${clientData.name} already exists`);
    const client: Client = await this.clients.findByIdAndUpdate(clientId, clientData, { new: true }).exec();
    if (!client) throw new HttpException(409, 'Client not found');

    return client;
  }

  public async deleteClientAsync(clientId: string): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, 'ClientId is required');
    const client: Client = await this.clients.findByIdAndDelete(clientId).exec();
    return client;
  }
}

export default ClientService;
