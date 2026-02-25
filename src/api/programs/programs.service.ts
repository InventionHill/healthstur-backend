import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramDto) {
    try {
      return await this.prisma.program.create({
        data: {
          name: createProgramDto.name,
          icon: createProgramDto.icon,
          iconColor: createProgramDto.iconColor,
          href: createProgramDto.href,
          heading: createProgramDto.heading,
          subtext: createProgramDto.subtext,
          background: createProgramDto.background,
          homeHeading: createProgramDto.homeHeading,
          homeSubtext: createProgramDto.homeSubtext,
          homeBackground: createProgramDto.homeBackground,
          solutionsHeading: createProgramDto.solutionsHeading,
          solutionsSubtext: createProgramDto.solutionsSubtext,
          bullets: createProgramDto.bullets || [],
          subItems: createProgramDto.subItems || [],
          solutions: (createProgramDto.solutions || []) as any,
          isActive: createProgramDto.isActive ?? true,
        },
      });
    } catch (error: any) {
      throw new BadRequestException(`Database Error: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.program.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return program;
  }

  async reorder(updates: { id: string; order: number }[]) {
    // We use a transaction to ensure all order updates succeed or fail together
    const operations = updates.map((update) =>
      this.prisma.program.update({
        where: { id: update.id },
        data: { order: update.order },
      }),
    );
    return this.prisma.$transaction(operations);
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const programExists = await this.prisma.program.findUnique({
      where: { id },
    });
    if (!programExists) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return this.prisma.program.update({
      where: { id },
      data: {
        ...updateProgramDto,
        solutions: updateProgramDto.solutions as any,
      } as any,
    });
  }

  async remove(id: string) {
    const programExists = await this.prisma.program.findUnique({
      where: { id },
    });
    if (!programExists) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return this.prisma.program.delete({
      where: { id },
    });
  }
}
