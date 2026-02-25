import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCuratedTrackDto } from './dto/create-curated-track.dto';
import { UpdateCuratedTrackDto } from './dto/update-curated-track.dto';

@Injectable()
export class CuratedTracksService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCuratedTrackDto) {
    try {
      return await this.prisma.curatedTrack.create({
        data: {
          title: createDto.title,
          description: createDto.description,
          image: createDto.image,
          icon: createDto.icon,
          iconWidth: createDto.iconWidth ?? 30,
          iconHeight: createDto.iconHeight ?? 30,
          linkText: createDto.linkText,
          order: createDto.order ?? 0,
          isActive: createDto.isActive ?? true,
        },
      });
    } catch (error: any) {
      throw new BadRequestException(`Database Error: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.curatedTrack.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const track = await this.prisma.curatedTrack.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Curated Track with ID ${id} not found`);
    }
    return track;
  }

  async reorder(updates: { id: string; order: number }[]) {
    const operations = updates.map((update) =>
      this.prisma.curatedTrack.update({
        where: { id: update.id },
        data: { order: update.order },
      }),
    );
    return this.prisma.$transaction(operations);
  }

  async update(id: string, updateDto: UpdateCuratedTrackDto) {
    const trackExists = await this.prisma.curatedTrack.findUnique({
      where: { id },
    });
    if (!trackExists) {
      throw new NotFoundException(`Curated Track with ID ${id} not found`);
    }
    return this.prisma.curatedTrack.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    const trackExists = await this.prisma.curatedTrack.findUnique({
      where: { id },
    });
    if (!trackExists) {
      throw new NotFoundException(`Curated Track with ID ${id} not found`);
    }
    return this.prisma.curatedTrack.delete({
      where: { id },
    });
  }
}
