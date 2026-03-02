import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({
      data: createCountryDto,
    });
  }

  async findAll() {
    return this.prisma.country.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  async update(id: string, updateCountryDto: Partial<CreateCountryDto>) {
    const country = await this.findOne(id);
    return this.prisma.country.update({
      where: { id: country.id },
      data: updateCountryDto,
    });
  }

  async remove(id: string) {
    const country = await this.findOne(id);
    return this.prisma.country.delete({
      where: { id: country.id },
    });
  }
}
