import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VisitorService],
  exports: [VisitorService],
})
export class VisitorModule {}
