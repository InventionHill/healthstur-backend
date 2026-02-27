import { Module } from '@nestjs/common';
import { SuccessStoryService } from './success-story.service';
import { SuccessStoryController } from './success-story.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SuccessStoryController],
  providers: [SuccessStoryService],
})
export class SuccessStoryModule {}
