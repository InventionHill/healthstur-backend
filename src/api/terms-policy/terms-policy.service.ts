import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTermsPolicyDto } from './dto/update-terms-policy.dto';

@Injectable()
export class TermsPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async getPolicy() {
    let policy = await this.prisma.termsPolicy.findFirst();
    if (!policy) {
      // Create a default empty record if it doesn't exist
      policy = await this.prisma.termsPolicy.create({
        data: {
          title: 'Terms & Condition',
          description:
            'By using our website and fitness & diet services, you agree to the following terms and conditions. Please read them carefully before using our programs and content.',
          content: '<p>Default Terms & Conditions</p>',
        },
      });
    }
    return policy;
  }

  async updatePolicy(updateDto: UpdateTermsPolicyDto) {
    const policy = await this.getPolicy();
    return this.prisma.termsPolicy.update({
      where: { id: policy.id },
      data: updateDto,
    });
  }
}
