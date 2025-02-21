import { IsString, IsOptional } from 'class-validator';

export class CreateViewModel {
  @IsString()
  public name: string;

  @IsString()
  public organizationMail: string;

  @IsString()
  public clientImageUrl: string;

  @IsString()
  @IsOptional()
  public client_id?: string;

  @IsString()
  @IsOptional()
  public client_secret?: string;
}
