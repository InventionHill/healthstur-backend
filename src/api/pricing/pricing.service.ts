import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDurationDto } from './dto/create-duration.dto';
import { UpdateDurationDto } from './dto/update-duration.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  // PUBLIC
  async getPublicPricing() {
    return this.prisma.pricingDuration.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        plans: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // DURATIONS
  async createDuration(data: CreateDurationDto) {
    const maxOrderDuration = await this.prisma.pricingDuration.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = maxOrderDuration ? maxOrderDuration.order + 1 : 0;

    return this.prisma.pricingDuration.create({
      data: {
        ...data,
        order,
      },
    });
  }

  async findAllDurations() {
    return this.prisma.pricingDuration.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { plans: true },
        },
      },
    });
  }

  async findOneDuration(id: string) {
    const duration = await this.prisma.pricingDuration.findUnique({
      where: { id },
      include: { plans: { orderBy: { order: 'asc' } } },
    });
    if (!duration) throw new NotFoundException('Duration not found');
    return duration;
  }

  async updateDuration(id: string, data: UpdateDurationDto) {
    return this.prisma.pricingDuration.update({
      where: { id },
      data,
    });
  }

  async removeDuration(id: string) {
    return this.prisma.pricingDuration.delete({
      where: { id },
    });
  }

  async reorderDurations(orders: { id: string; order: number }[]) {
    await this.prisma.$transaction(
      orders.map((item) =>
        this.prisma.pricingDuration.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
    return { success: true };
  }

  // PLANS
  async createPlan(data: CreatePlanDto) {
    const maxOrderPlan = await this.prisma.pricingPlan.findFirst({
      where: { durationId: data.durationId },
      orderBy: { order: 'desc' },
    });
    const order = maxOrderPlan ? maxOrderPlan.order + 1 : 0;

    return this.prisma.pricingPlan.create({
      data: {
        ...data,
        order,
      },
    });
  }

  async findAllPlans() {
    return this.prisma.pricingPlan.findMany({
      orderBy: { order: 'asc' },
      include: {
        duration: true,
      },
    });
  }

  async findOnePlan(id: string) {
    const plan = await this.prisma.pricingPlan.findUnique({
      where: { id },
    });
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  async updatePlan(id: string, data: UpdatePlanDto) {
    return this.prisma.pricingPlan.update({
      where: { id },
      data,
    });
  }

  async removePlan(id: string) {
    return this.prisma.pricingPlan.delete({
      where: { id },
    });
  }

  async reorderPlans(orders: { id: string; order: number }[]) {
    await this.prisma.$transaction(
      orders.map((item) =>
        this.prisma.pricingPlan.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
    return { success: true };
  }
}
