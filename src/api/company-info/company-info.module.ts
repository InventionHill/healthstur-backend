import { Module } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfoController } from './company-info.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CompanyInfoService],
  controllers: [CompanyInfoController],
})
export class CompanyInfoModule {}
