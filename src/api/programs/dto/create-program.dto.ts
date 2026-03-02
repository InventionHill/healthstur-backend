import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class SolutionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  approach?: string;

  @IsString()
  @IsOptional()
  benefits?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  focusOn?: string[];

  @IsString()
  @IsOptional()
  priceIndia?: string;

  @IsString()
  @IsOptional()
  priceUsa?: string;

  @IsString()
  @IsOptional()
  priceEurope?: string;

  @IsString()
  @IsOptional()
  priceUk?: string;

  @IsString()
  @IsOptional()
  price4WeekIndia?: string;

  @IsString()
  @IsOptional()
  price8WeekIndia?: string;

  @IsString()
  @IsOptional()
  price12WeekIndia?: string;

  @IsString()
  @IsOptional()
  price4WeekUsa?: string;

  @IsString()
  @IsOptional()
  price8WeekUsa?: string;

  @IsString()
  @IsOptional()
  price12WeekUsa?: string;

  @IsString()
  @IsOptional()
  price4WeekEurope?: string;

  @IsString()
  @IsOptional()
  price8WeekEurope?: string;

  @IsString()
  @IsOptional()
  price12WeekEurope?: string;

  @IsString()
  @IsOptional()
  price4WeekUk?: string;

  @IsString()
  @IsOptional()
  price8WeekUk?: string;

  @IsString()
  @IsOptional()
  price12WeekUk?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  iconColor?: string;

  @IsString()
  @IsNotEmpty()
  href: string;

  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsString()
  @IsNotEmpty()
  subtext: string;

  @IsString()
  @IsOptional()
  background?: string;

  @IsString()
  @IsOptional()
  homeHeading?: string;

  @IsString()
  @IsOptional()
  homeSubtext?: string;

  @IsString()
  @IsOptional()
  homeBackground?: string;

  @IsString()
  @IsOptional()
  solutionsHeading?: string;

  @IsString()
  @IsOptional()
  solutionsSubtext?: string;

  @IsArray()
  @IsOptional()
  bullets?: string[];

  @IsArray()
  @IsOptional()
  subItems?: any[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SolutionDto)
  @IsOptional()
  solutions?: SolutionDto[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Curated Track Fields
  @IsBoolean()
  @IsOptional()
  isCurated?: boolean;

  @IsString()
  @IsOptional()
  curatedTitle?: string;

  @IsString()
  @IsOptional()
  curatedDescription?: string;

  @IsString()
  @IsOptional()
  curatedImage?: string;

  @IsString()
  @IsOptional()
  curatedIcon?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  curatedIconWidth?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  curatedIconHeight?: number;

  @IsString()
  @IsOptional()
  curatedLinkText?: string;
}
