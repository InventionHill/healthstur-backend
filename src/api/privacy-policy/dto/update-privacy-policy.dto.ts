import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePrivacyPolicyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
