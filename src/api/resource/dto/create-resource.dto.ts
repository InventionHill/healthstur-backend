import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ResourceStepDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  points?: string[];

  @IsOptional()
  @IsString()
  footer?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateResourceDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  heroTitle: string;

  @IsString()
  heroDescription: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsString()
  stepsTitle?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceStepDto)
  steps?: ResourceStepDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
}
