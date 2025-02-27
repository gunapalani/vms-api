import { OrderStatus } from '@/enum/orderStatus.enum';
import { HttpException } from '@/exceptions/httpException';
import productEntity from '@/models/product.model';
import redeemEntity from '@/models/redeem.model';
import { isEmpty } from '@/utils/util';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
class RedeemService {
  public redeem = redeemEntity;
  public product = productEntity;

  public async getAllAsync(): Promise<any[]> {
    const redeems: any[] = await this.redeem.find().exec();
    return redeems;
  }

  public async getByIdAsync(redeemId: string): Promise<any> {
    if (isEmpty(redeemId)) throw new HttpException(400, 'Redeem Id is required');
    const redeem: any = await this.redeem.findOne({ _id: Types.ObjectId(redeemId) }).exec();
    if (!redeem) throw new HttpException(409, 'Redeem not found');
    return redeem;
  }
  public async getBySKUAsync(SKU: string): Promise<any> {
    if (isEmpty(SKU)) throw new HttpException(400, 'SKU is required');
    const redeem: any = await this.redeem.findOne({ SKU }).exec();
    if (!redeem) throw new HttpException(409, 'Redeem not found for the given SKU');
    return redeem;
  }
  public async getByCouponCodeAsync(couponCode: string): Promise<any> {
    if (isEmpty(couponCode)) throw new HttpException(400, 'Coupon Code is required');
    const redeem = await this.redeem.findOne({ couponCode }).exec();
    if (!redeem) throw new HttpException(404, 'Redeem not found');
    return redeem;
  }

  public async createAsync(redeemData: any): Promise<any> {
    if (isEmpty(redeemData)) throw new HttpException(400, 'Redeem data is required');

    const product: any = await this.product.findOne({ SKU: redeemData.SKU }).exec();
    if (!product) throw new HttpException(404, 'Product not found');

    if (redeemData.price < product.price.minNumber || redeemData.price > product.price.maxNumber) {
      throw new HttpException(400, `Price must be between ${product.price.minNumber} and ${product.price.maxNumber}`);
    }

    redeemData.couponCode = await this.generateUniqueCouponCode();

    return await this.redeem.create(redeemData);
  }

  public async updateAsync(redeemId: string, redeemData: any): Promise<any> {
    if (isEmpty(redeemId)) throw new HttpException(400, 'Redeem Id is required');
    let redeem: any = await this.redeem.findByIdAndUpdate(Types.ObjectId(redeemId), { ...redeemData }, { new: true }).exec();
    if (!redeem) throw new HttpException(409, 'Redeem not found');
    return redeem;
  }

  public async deleteAsync(redeemId: string): Promise<any> {
    const redeem: any = await this.redeem.findByIdAndDelete(Types.ObjectId(redeemId)).exec();
    if (!redeem) throw new HttpException(409, 'Redeem not found');
    return redeem;
  }
  public async updateStatusAsync(id: string, status: OrderStatus): Promise<any> {
    if (isEmpty(id)) throw new HttpException(400, 'Redeem ID is required');
    if (!Object.values(OrderStatus).includes(status)) throw new HttpException(400, 'Invalid order status');
    const updatedRedeem = await this.redeem.findByIdAndUpdate(Types.ObjectId(id), { orderStatus: status }, { new: true }).exec();
    if (!updatedRedeem) throw new HttpException(404, 'Redeem not found');
    return updatedRedeem;
  }

  private async generateUniqueCouponCode(): Promise<string> {
    let couponCode: string;
    let isUnique = false;
    do {
      couponCode = uuidv4().slice(0, 13).toUpperCase();
      const existingRedeem = await this.redeem.findOne({ couponCode }).exec();
      if (!existingRedeem) {
        isUnique = true;
      }
    } while (!isUnique);
    return couponCode;
  }
}

export default RedeemService;
