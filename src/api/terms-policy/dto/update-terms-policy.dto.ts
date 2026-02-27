import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTermsPolicyDto {
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
