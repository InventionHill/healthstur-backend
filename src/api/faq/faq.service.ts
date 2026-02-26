import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    return this.prisma.faq.create({
      data: createFaqDto,
    });
  }

  async findAll() {
    return this.prisma.faq.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findAllActive() {
    return this.prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async reorder(updates: { id: string; order: number }[]) {
    const transactions = updates.map((update) =>
      this.prisma.faq.update({
        where: { id: update.id },
        data: { order: update.order },
      }),
    );
    return this.prisma.$transaction(transactions);
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException('Faq not found');
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    return this.prisma.faq.update({
      where: { id },
      data: updateFaqDto,
    });
  }

  async remove(id: string) {
    return this.prisma.faq.delete({
      where: { id },
    });
  }
}
