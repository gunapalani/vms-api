import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.user.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body'), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
    this.router.post(`${this.path}/adb2c`, this.user.createADB2CUserAsync);
    this.router.put(`${this.path}/adb2c/:userId`, validationMiddleware(CreateUserDto, 'body'), this.user.updateADB2CUserAsync);
    this.router.delete(`${this.path}/adb2c/:userId`, this.user.deleteADB2CUserAsync);
  }
}
