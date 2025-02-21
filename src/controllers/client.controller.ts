import { Client } from '@/interfaces/client.interface';
import ClientService from '@/services/client.service';
import { NextFunction, Request, Response } from 'express';

class ClientController {
  public clientService = new ClientService();

  public getAll = (req: Request, res: Response, next: NextFunction) => {
    this.clientService
      .getAllClientsAsync()
      .then(clients => {
        res.status(200).json({ data: clients, message: 'findAll' });
      })
      .catch(error => {
        next(error);
      });
  };

  public getById = (req: Request, res: Response, next: NextFunction) => {
    const clientId: string = req.params.id;
    this.clientService
      .getClientByIdAsync(clientId)
      .then(client => {
        res.status(200).json({ data: client, message: 'findOne' });
      })
      .catch(error => {
        next(error);
      });
  };

  public create = (req: Request, res: Response, next: NextFunction) => {
    const clientData: Client = req.body;
    this.clientService
      .createClientAsync(clientData)
      .then(client => {
        res.status(201).json({ data: client, message: 'created' });
      })
      .catch(error => {
        next(error);
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    const clientId: string = req.params.id;
    const clientData: any = req.body;
    this.clientService
      .updateClientAsync(clientId, clientData)
      .then(client => {
        res.status(200).json({ data: client, message: 'updated' });
      })
      .catch(error => {
        next(error);
      });
  };

  public delete = (req: Request, res: Response, next: NextFunction) => {
    const clientId: string = req.params.id;
    this.clientService
      .deleteClientAsync(clientId)
      .then(client => {
        res.status(200).json({ data: client, message: 'deleted' });
      })
      .catch(error => {
        next(error);
      });
  };
}

export default ClientController;
