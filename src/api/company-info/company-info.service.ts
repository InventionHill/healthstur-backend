import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Injectable()
export class CompanyInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async getInfo() {
    let info = await this.prisma.companyInfo.findFirst();
    if (!info) {
      // Create a default empty record if it doesn't exist
      info = await this.prisma.companyInfo.create({ data: {} });
    }
    return info;
  }

  async updateInfo(updateDto: UpdateCompanyInfoDto) {
    const info = await this.getInfo();
    return this.prisma.companyInfo.update({
      where: { id: info.id },
      data: updateDto,
    });
  }
}
