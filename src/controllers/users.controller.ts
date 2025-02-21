import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { CreateUserDto } from '@/dtos/users.dto';

export class UserController {
  public userService = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.userService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public createADB2CUserAsync = (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    this.userService
      .createADB2CUserAsync(userData)
      .then(userData => {
        res.status(201).json({ data: userData, message: 'created' });
      })
      .catch(error => {
        next(error);
      });
  };

  public updateADB2CUserAsync = (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    const userId: string = req.params.userId;
    this.userService
      .updateADB2CUserAsync(userData, userId)
      .then(userData => {
        res.status(201).json({ data: userData, message: 'Admin updated successfully' });
      })
      .catch(error => {
        next(error);
      });
  };

  public deleteADB2CUserAsync = (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    this.userService
      .deleteADB2CUserAsync(userId)
      .then(userData => {
        res.status(201).json({ data: userData, message: 'deleted' });
      })
      .catch(error => {
        next(error);
      });
  };
}
