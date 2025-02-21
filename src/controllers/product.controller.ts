import ProductService from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  public productService = new ProductService();

  public getAll = (req: Request, res: Response, next: NextFunction) => {
    this.productService
      .getAllAsync()
      .then(product => {
        res.status(200).json({ data: product, message: 'findAll' });
      })
      .catch(error => {
        next(error);
      });
  };

  public getById = (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    this.productService
      .getByIdAsync(id)
      .then(product => {
        res.status(200).json({ data: product, message: 'findOne' });
      })
      .catch(error => {
        next(error);
      });
  };

  public create = (req: Request, res: Response, next: NextFunction) => {
    const productData: any = req.body;
    this.productService
      .createAsync(productData)
      .then(product => {
        res.status(201).json({ data: product, message: 'created' });
      })
      .catch(error => {
        next(error);
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    const productData: any = req.body;
    this.productService
      .updateAsync(productId, productData)
      .then(product => {
        res.status(200).json({ data: product, message: 'updated' });
      })
      .catch(error => {
        next(error);
      });
  };

  public delete = (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    this.productService
      .deleteAsync(productId)
      .then(product => {
        res.status(200).json({ data: product, message: 'deleted' });
      })
      .catch(error => {
        next(error);
      });
  };
}

export default ProductController;
