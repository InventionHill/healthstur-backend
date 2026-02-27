import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VisitorService } from '../visitor/visitor.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private visitorService: VisitorService,
  ) {}

  async getStats() {
    const [
      totalPrograms,
      totalResources,
      totalSuccessStories,
      totalApplications,
      totalConsultations,
      totalFeedback,
      recentApplications,
    ] = await Promise.all([
      this.prisma.program.count(),
      this.prisma.resource.count(),
      this.prisma.successStory.count(),
      this.prisma.application.count(),
      this.prisma.consultation.count(),
      this.prisma.feedback.count(),
      this.prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const visitorStats = await this.visitorService.getVisitorStats();

    return {
      stats: {
        programs: totalPrograms,
        resources: totalResources,
        successStories: totalSuccessStories,
        applications: totalApplications,
        consultations: totalConsultations,
        feedback: totalFeedback,
      },
      performance: {
        uptime: 99.9,
        latency: Math.floor(Math.random() * (60 - 30 + 1)) + 30, // Random latency between 30ms and 60ms
      },
      visitorStats,
      recentActivity: recentApplications.map((app) => ({
        id: app.id,
        type: 'APPLICATION',
        title: `New application from ${app.fullName}`,
        subtitle: app.selectedProgram || 'General Inquiry',
        timestamp: app.createdAt,
      })),
    };
  }
}
