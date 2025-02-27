import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RedeemController from '@/controllers/redeem.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateRedeemDto } from '@/dtos/redeem.dto';
class RedeemRoute implements Routes {
  public path = '/redeem';
  public router = Router();
  public redeemController = new RedeemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.redeemController.getAll);
    this.router.get(`${this.path}/:id`, this.redeemController.getById);
    this.router.get(`${this.path}/sku/:SKU`, this.redeemController.getBySKU);
    this.router.get(`/v1${this.path}/coupon/:couponCode`, this.redeemController.getByCouponCode);
    this.router.post(`${this.path}`, validationMiddleware(CreateRedeemDto, 'body'), this.redeemController.create);
    this.router.put(`${this.path}/:id`, this.redeemController.update);
    this.router.delete(`${this.path}/:id`, this.redeemController.delete);
    this.router.patch(`${this.path}/:id/status`, this.redeemController.updateStatus);
  }
}

export default RedeemRoute;
