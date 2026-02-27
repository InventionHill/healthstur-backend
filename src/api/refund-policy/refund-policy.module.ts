import { Module } from '@nestjs/common';
import { RefundPolicyService } from './refund-policy.service';
import { RefundPolicyController } from './refund-policy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RefundPolicyService],
  controllers: [RefundPolicyController],
})
export class RefundPolicyModule {}
