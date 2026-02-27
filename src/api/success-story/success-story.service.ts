import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSuccessStoryDto } from './dto/create-success-story.dto';
import { UpdateSuccessStoryDto } from './dto/update-success-story.dto';

@Injectable()
export class SuccessStoryService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateSuccessStoryDto) {
    const lastItem = await this.prisma.successStory.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = lastItem ? lastItem.order + 1 : 0;

    return this.prisma.successStory.create({
      data: {
        ...createDto,
        achievements: createDto.achievements || [],
        order,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.successStory.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
  }

  async findAllActive() {
    return this.prisma.successStory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const story = await this.prisma.successStory.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!story) {
      throw new NotFoundException(`Story #${id} not found`);
    }
    return story;
  }

  async update(id: string, updateDto: UpdateSuccessStoryDto) {
    await this.findOne(id);
    return this.prisma.successStory.update({
      where: { id },
      data: updateDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.successStory.delete({
      where: { id },
    });
  }

  async reorder(updates: { id: string; order: number }[]) {
    return this.prisma.$transaction(
      updates.map(({ id, order }) =>
        this.prisma.successStory.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
