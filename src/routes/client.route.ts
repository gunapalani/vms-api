import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ClientController from '@/controllers/client.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateViewModel } from '@/dtos/client.dto';

class ClientRoute implements Routes {
  public path = '/client';
  public router = Router();
  public clientController = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.clientController.getAll);
    this.router.get(`${this.path}/:id`, this.clientController.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateViewModel, 'body'), this.clientController.create);
    this.router.put(`${this.path}/:id`, this.clientController.update);
    this.router.delete(`${this.path}/:id`, this.clientController.delete);
  }
}

export default ClientRoute;
