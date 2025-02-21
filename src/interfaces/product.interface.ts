import { BaseEntity } from "./baseEntity.interface";

export interface Product extends BaseEntity {
  name: string;
  price: Price;
  description?: string;
  clientId: string;
  images: string;
  SKU: number;
}

export interface Price {
  minNumber: number;
  maxNumber: number;
  currencyCode: string;
}
