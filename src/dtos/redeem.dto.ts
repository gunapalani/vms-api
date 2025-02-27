import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRedeemDto {
  @IsString()
  @IsOptional()
  public _id: string;
  @IsString()
  public userName: string;
  @IsString()
  @IsOptional()
  public phoneNumber: string;
  @IsString()
  @IsOptional()
  public email: string | null;
  @IsString()
  @IsOptional()
  public client: string;
  @IsString()
  public SKU: string;
  @IsString()
  @IsOptional()
  public createdBy: string;
  @IsString()
  @IsOptional()
  public couponCode: string;
  @IsString()
  @IsOptional()
  public updatedBy: string;
  @IsNumber()
  public price: string;
  @IsString()
  @IsOptional()
  public orderStatus: string;
}
