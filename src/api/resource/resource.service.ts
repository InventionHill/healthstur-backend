import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto) {
    return await this.prisma.resource.create({
      data: createResourceDto as any,
    });
  }

  async findAllAdmin() {
    return await this.prisma.resource.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findAll() {
    return await this.prisma.resource.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
    });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async findBySlug(slug: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { slug },
    });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    return await this.prisma.resource.update({
      where: { id },
      data: updateResourceDto as any,
    });
  }

  async remove(id: string) {
    return await this.prisma.resource.delete({
      where: { id },
    });
  }

  async reorder(items: { id: string; order: number }[]) {
    return await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.resource.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
  }
}
