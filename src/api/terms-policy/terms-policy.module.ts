import { Module } from '@nestjs/common';
import { TermsPolicyService } from './terms-policy.service';
import { TermsPolicyController } from './terms-policy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TermsPolicyService],
  controllers: [TermsPolicyController],
})
export class TermsPolicyModule {}
