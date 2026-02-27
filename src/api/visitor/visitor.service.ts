import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VisitorService {
  constructor(private prisma: PrismaService) {}

  async track(ip: string, userAgent: string) {
    if (!ip) return;

    // Set time window to 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Check if this visitor (same IP and User Agent) has visited in the last 24 hours
    const existingVisitor = await this.prisma.visitor.findFirst({
      where: {
        ip,
        userAgent,
        createdAt: {
          gte: twentyFourHoursAgo,
        },
      },
    });

    if (!existingVisitor) {
      await this.prisma.visitor.create({
        data: {
          ip,
          userAgent: userAgent || 'Unknown',
        },
      });
    }
  }

  async getVisitorStats() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const stats = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const count = await this.prisma.visitor.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      stats.push({
        name: days[date.getDay()],
        visitors: count,
      });
    }

    return stats;
  }
}
