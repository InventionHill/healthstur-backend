import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: createTestimonialDto,
    });
  }

  async findAll() {
    return this.prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findAllActive() {
    return this.prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async reorder(updates: { id: string; order: number }[]) {
    const transactions = updates.map((update) =>
      this.prisma.testimonial.update({
        where: { id: update.id },
        data: { order: update.order },
      }),
    );
    return this.prisma.$transaction(transactions);
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    return testimonial;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    return this.prisma.testimonial.update({
      where: { id },
      data: updateTestimonialDto,
    });
  }

  async remove(id: string) {
    return this.prisma.testimonial.delete({
      where: { id },
    });
  }
}
