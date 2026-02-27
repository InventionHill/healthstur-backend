import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSuccessStoryCategoryDto } from './dto/create-success-story-category.dto';
import { UpdateSuccessStoryCategoryDto } from './dto/update-success-story-category.dto';

@Injectable()
export class SuccessStoryCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateSuccessStoryCategoryDto) {
    const lastItem = await this.prisma.successStoryCategory.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = lastItem ? lastItem.order + 1 : 0;

    return this.prisma.successStoryCategory.create({
      data: {
        ...createDto,
        order,
      },
    });
  }

  async findAll() {
    return this.prisma.successStoryCategory.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findAllActive() {
    return this.prisma.successStoryCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.successStoryCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: string, updateDto: UpdateSuccessStoryCategoryDto) {
    await this.findOne(id);
    return this.prisma.successStoryCategory.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.successStoryCategory.delete({
      where: { id },
    });
  }

  async reorder(updates: { id: string; order: number }[]) {
    return this.prisma.$transaction(
      updates.map(({ id, order }) =>
        this.prisma.successStoryCategory.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
