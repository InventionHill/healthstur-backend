import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';

@Injectable()
export class PrivacyPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async getPolicy() {
    let policy = await this.prisma.privacyPolicy.findFirst();
    if (!policy) {
      // Create a default empty record if it doesn't exist
      policy = await this.prisma.privacyPolicy.create({
        data: {
          title: 'Privacy Policy',
          description:
            'Your privacy is critically important to us. This policy outlines how Healthstur collects, uses, and safeguards your personal information when you use our website and fitness services.',
          content: '<p>Default Privacy Policy</p>',
        },
      });
    }
    return policy;
  }

  async updatePolicy(updateDto: UpdatePrivacyPolicyDto) {
    const policy = await this.getPolicy();
    return this.prisma.privacyPolicy.update({
      where: { id: policy.id },
      data: updateDto,
    });
  }
}
