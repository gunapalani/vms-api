import { HttpException } from '@/exceptions/httpException';
import productEntity from '@/models/product.model';
import { isEmpty } from '@/utils/util';
import { Types } from 'mongoose';

class ProductService {
  public product = productEntity;

  public async getAllAsync(): Promise<any[]> {
    const productCategories: any[] = await this.product.find().exec();
    return productCategories;
  }

  public async getByIdAsync(productId: string): Promise<any> {
    if (isEmpty(productId)) throw new HttpException(400, 'Product Id is required');

    const product: any = await this.product.findOne({ _id: Types.ObjectId(productId) }).exec();
    if (!product) throw new HttpException(409, 'Product not found');

    return product;
  }

  public async createAsync(productData: any): Promise<any> {
    if (isEmpty(productData)) throw new HttpException(400, 'Product Data is required');

    const product: any = await this.product.create(productData);

    return product;
  }

  public async updateAsync(productId: string, productData: any): Promise<any> {
    if (isEmpty(productId)) throw new HttpException(400, 'Product Id is required');

    let product: any = await this.product.findByIdAndUpdate(Types.ObjectId(productId), { ...productData }, { new: true }).exec();
    if (!product) throw new HttpException(409, 'Product  not found');
    return product;
  }

  public async deleteAsync(productId: string): Promise<any> {
    const product: any = await this.product.findByIdAndDelete(Types.ObjectId(productId)).exec();
    if (!product) throw new HttpException(409, 'Product not found');

    return product;
  }
}

export default ProductService;
