import { OrderStatus } from '@/enum/orderStatus.enum';
import RedeemService from '@/services/redeem.service';
import { NextFunction, Request, Response } from 'express';

class RedeemController {
  public redeemService = new RedeemService();

  public getAll = (req: Request, res: Response, next: NextFunction) => {
    this.redeemService
      .getAllAsync()
      .then(redeems => {
        res.status(200).json({ data: redeems, message: 'findAll' });
      })
      .catch(error => {
        next(error);
      });
  };

  public getById = (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    this.redeemService
      .getByIdAsync(id)
      .then(redeem => {
        res.status(200).json({ data: redeem, message: 'findOne' });
      })
      .catch(error => {
        next(error);
      });
  };

  public getBySKU = (req: Request, res: Response, next: NextFunction) => {
    const { SKU } = req.params;
    this.redeemService
      .getBySKUAsync(SKU)
      .then(redeem => {
        res.status(200).json({ data: redeem, message: 'findBySKU' });
      })
      .catch(error => {
        next(error);
      });
  };
  
  public getByCouponCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { couponCode } = req.params;
      const redeem = await this.redeemService.getByCouponCodeAsync(couponCode);
      res.status(200).json({ data: redeem, message: 'findByCouponCode' });
    } catch (error) {
      next(error);
    }
  };

  public create = (req: Request, res: Response, next: NextFunction) => {
    const redeemData: any = req.body;
    this.redeemService
      .createAsync(redeemData)
      .then(redeem => {
        res.status(201).json({ data: redeem, message: 'created' });
      })
      .catch(error => {
        next(error);
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    const redeemId: string = req.params.id;
    const redeemData: any = req.body;
    this.redeemService
      .updateAsync(redeemId, redeemData)
      .then(redeem => {
        res.status(200).json({ data: redeem, message: 'updated' });
      })
      .catch(error => {
        next(error);
      });
  };

  public delete = (req: Request, res: Response, next: NextFunction) => {
    const redeemId: string = req.params.id;
    this.redeemService
      .deleteAsync(redeemId)
      .then(redeem => {
        res.status(200).json({ data: redeem, message: 'deleted' });
      })
      .catch(error => {
        next(error);
      });
  };
  public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const { status } = req.body;
      if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({ message: 'Invalid order status' });
      }
      const updatedRedeem = await this.redeemService.updateStatusAsync(id, status);
      res.status(200).json({ data: updatedRedeem, message: 'statusUpdated' });
    } catch (error) {
      next(error);
    }
  };
}

export default RedeemController;
