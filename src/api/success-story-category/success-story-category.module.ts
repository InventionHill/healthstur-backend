import { Module } from '@nestjs/common';
import { SuccessStoryCategoryService } from './success-story-category.service';
import { SuccessStoryCategoryController } from './success-story-category.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SuccessStoryCategoryController],
  providers: [SuccessStoryCategoryService],
})
export class SuccessStoryCategoryModule {}
