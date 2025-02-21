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
    this.router.get(`/v1${this.path}`, this.productController.getAll);
    this.router.get(`/v1${this.path}/:id`, this.productController.getById);
    this.router.post(
      `/v1${this.path}`,
      validationMiddleware(productViewModel, 'body'),

      this.productController.create,
    );
    this.router.put(`/v1${this.path}/:id`, this.productController.update);
    this.router.delete(`/v1${this.path}/:id`, this.productController.delete);
  }
}

export default ProductRoute;
