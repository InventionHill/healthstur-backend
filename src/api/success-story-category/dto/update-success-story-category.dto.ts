import { PartialType } from '@nestjs/mapped-types';
import { CreateSuccessStoryCategoryDto } from './create-success-story-category.dto';

export class UpdateSuccessStoryCategoryDto extends PartialType(
  CreateSuccessStoryCategoryDto,
) {}
