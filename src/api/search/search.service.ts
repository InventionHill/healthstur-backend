import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.trim().toLowerCase();

    // 1. Search Programs (basic fields)
    const programs = await this.prisma.program.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        subtext: true,
        heading: true, // Need heading for search check inside memory to avoid multiple DB calls if we just fetch all active programs
        href: true,
        icon: true,
        solutions: true,
      },
    });

    // 2. Search Resources
    const resources = await this.prisma.resource.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        heroDescription: true,
        slug: true,
        steps: true,
      },
    });

    const results = [];

    // Filter Programs and their Solutions in memory
    for (const p of programs) {
      const matchName = p.name?.toLowerCase().includes(searchTerm);
      const matchHeading = p.heading?.toLowerCase().includes(searchTerm);
      const matchSubtext = p.subtext?.toLowerCase().includes(searchTerm);

      if (matchName || matchHeading || matchSubtext) {
        results.push({
          id: p.id,
          type: 'program',
          title: p.name,
          description: p.subtext,
          url: p.href,
          icon: p.icon,
        });
      }

      // Check Solutions
      if (p.solutions && Array.isArray(p.solutions)) {
        p.solutions.forEach((sol: any, index: number) => {
          if (!sol || typeof sol !== 'object' || sol.isActive === false) return;

          const title = sol.title || '';
          const approach = sol.approach || '';
          const description = sol.description || '';
          const benefits = sol.benefits || '';

          const matchTitle = title.toLowerCase().includes(searchTerm);
          const matchApproach = approach.toLowerCase().includes(searchTerm);
          const matchDesc = description.toLowerCase().includes(searchTerm);
          const matchBenefits = benefits.toLowerCase().includes(searchTerm);

          if (matchTitle || matchApproach || matchDesc || matchBenefits) {
            const name = title || 'Unnamed';
            const slugId = name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
            const solutionHref = `${p.href}#${slugId}`;

            // Provide a snippet of context for the description
            let solDesc = description;
            if (matchApproach && !matchDesc) solDesc = `Approach: ${approach}`;
            else if (matchBenefits && !matchDesc)
              solDesc = `Benefits: ${benefits}`;

            results.push({
              id: `${p.id}-sol-${index}`,
              type: 'solution', // Label it differently or keep as program
              title: `${p.name} - ${title}`,
              description: solDesc,
              url: solutionHref,
              icon: p.icon, // Keep program icon for visual consistency
            });
          }
        });
      }
    }

    // Filter Resources and their Steps in memory
    for (const r of resources) {
      const matchTitle = r.title?.toLowerCase().includes(searchTerm);
      const matchHeroDesc = r.heroDescription
        ?.toLowerCase()
        .includes(searchTerm);

      if (matchTitle || matchHeroDesc) {
        results.push({
          id: r.id,
          type: 'resource',
          title: r.title,
          description: r.heroDescription,
          url: `/resources/${r.slug}`,
        });
      }

      // Check Resource Steps
      if (r.steps && Array.isArray(r.steps)) {
        r.steps.forEach((step: any, index: number) => {
          if (!step || typeof step !== 'object') return;

          const title = step.title || '';
          const description = step.description || '';
          const footer = step.footer || '';
          const points = Array.isArray(step.points)
            ? step.points.join(' ')
            : '';

          const matchStepTitle = title.toLowerCase().includes(searchTerm);
          const matchStepDesc = description.toLowerCase().includes(searchTerm);
          const matchStepFooter = footer.toLowerCase().includes(searchTerm);
          const matchStepPoints = points.toLowerCase().includes(searchTerm);

          if (
            matchStepTitle ||
            matchStepDesc ||
            matchStepFooter ||
            matchStepPoints
          ) {
            const name = title || 'Unnamed Step';
            const slugId = name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
            const stepHref = `/resources/${r.slug}#${slugId}`;

            let stepDesc = description;
            if (matchStepPoints && !matchStepDesc)
              stepDesc = `Points: ${points.length > 80 ? points.substring(0, 80) + '...' : points}`;
            else if (matchStepFooter && !matchStepDesc)
              stepDesc = `Footer: ${footer}`;

            results.push({
              id: `${r.id}-step-${index}`,
              type: 'resource-step',
              title: `${r.title} - ${title}`,
              description: stepDesc,
              url: stepHref,
            });
          }
        });
      }
    }

    return results;
  }
}
