import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProductController from '@/controllers/product.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { productViewModel } from '@/dtos/product.dto';

class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getAll);
    this.router.get(`${this.path}/:id`, this.productController.getById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(productViewModel, 'body'),

      this.productController.create,
    );
    this.router.put(`${this.path}/:id`, this.productController.update);
    this.router.delete(`${this.path}/:id`, this.productController.delete);
  }
}

export default ProductRoute;
