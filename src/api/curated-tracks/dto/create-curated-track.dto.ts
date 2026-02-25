import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateCuratedTrackDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  iconWidth?: number;

  @IsOptional()
  @IsNumber()
  iconHeight?: number;

  @IsString()
  linkText: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
