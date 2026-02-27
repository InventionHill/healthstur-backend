import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRefundPolicyDto } from './dto/update-refund-policy.dto';

@Injectable()
export class RefundPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async getPolicy() {
    let policy = await this.prisma.refundPolicy.findFirst();
    if (!policy) {
      // Create a default empty record if it doesn't exist
      policy = await this.prisma.refundPolicy.create({
        data: {
          title: 'Refund Policy',
          description:
            'We strive to provide the best health and fitness experience. Please review our refund policy, designed to be fair and transparent for all our programs and subscriptions.',
          content: '<p>Default Refund Policy</p>',
        },
      });
    }
    return policy;
  }

  async updatePolicy(updateDto: UpdateRefundPolicyDto) {
    const policy = await this.getPolicy();
    return this.prisma.refundPolicy.update({
      where: { id: policy.id },
      data: updateDto,
    });
  }
}
