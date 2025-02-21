import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class productViewModel  {
  @IsString()
  public name: string;
  @IsObject()
  public price: Price;
  @IsString()
  @IsOptional()
  public description: string;
  @IsString()
  public clientId: string;
  @IsString()
  public images: string;
  @IsNumber()
  public SKU: number;
  @IsString()
  @IsOptional()
  public createdBy: string;
  @IsString()
  @IsOptional()
  public updatedBy: string;
}

interface Price {
  minNumber: number;
  maxNumber: number;
  currencyCode: string;
}