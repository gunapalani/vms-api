import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  public _id: string;
  @IsString()
  public userId: string;
  @IsString()
  @IsOptional()
  public phoneNumber: string;
  @IsString()
  public userName: string;
  @IsString()
  @IsOptional()
  public email: string | null;
  @IsString()
  @IsOptional()
  public client: string;
  @IsString()
  @IsOptional()
  public createdBy: string;
  @IsString()
  @IsOptional()
  public updatedBy: string;
  @IsString()
  @IsOptional()
  public profileImageUrl: string;
  @IsString()
  @IsOptional()
  public roles: string;
}
