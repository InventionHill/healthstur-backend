import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConsultationDto: CreateConsultationDto) {
    return this.prisma.consultation.create({
      data: createConsultationDto,
    });
  }

  async findAll() {
    return this.prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });
    if (!consultation) throw new NotFoundException('Consultation not found');
    return consultation;
  }

  async remove(id: string) {
    return this.prisma.consultation.delete({
      where: { id },
    });
  }
}
