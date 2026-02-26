import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testimonials = [
  {
    name: 'Jennifer Wu',
    role: 'YOGA ENTHUSIAST',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    quote:
      "I've tried every app out there. FITNESSTUR is the only one that actually looks at my whole lifestyle, not just my calories.",
    stars: 5,
    isActive: true,
    order: 0,
  },
  {
    name: 'Michael Ross',
    role: 'BUSY DAD',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    quote:
      'The 15-minute home workouts saved my dad bod. I can actually keep up with my kids now without getting winded.',
    stars: 5,
    isActive: true,
    order: 1,
  },
  {
    name: 'Amara Patel',
    role: 'CORPORATE PROFESSIONAL',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    quote:
      'The stress management tools are a game changer. I use the breathing exercises before every big meeting.',
    stars: 5,
    isActive: true,
    order: 2,
  },
  {
    name: 'David Kim',
    role: 'MARATHON RUNNER',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    quote:
      "The nutrition plans are spot on. I'm hitting PRs comfortably now. Who knew I wasn't eating enough?",
    stars: 5,
    isActive: true,
    order: 3,
  },
  {
    name: 'Sarah Jenkins',
    role: 'TRANSFORMATION WINNER',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    quote:
      "Lost 20lbs in 3 months safely. The coaches don't just give you a plan, they give you the mindset to stick to it.",
    stars: 5,
    isActive: true,
    order: 4,
  },
  {
    name: 'James Wilson',
    role: 'POWERLIFTER',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    quote:
      'Finally, a platform that respects strength training. The progressive overload tracking is elite.',
    stars: 5,
    isActive: true,
    order: 5,
  },
  {
    name: 'Emily Chen',
    role: 'POST-NATAL MOM',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    quote:
      'Gentle, safe, and effective. Helped me reconnect with my core after pregnancy without fear.',
    stars: 5,
    isActive: true,
    order: 6,
  },
  {
    name: 'Marcus Johnson',
    role: 'CROSSFIT ATHLETE',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    quote:
      'The community challenges push me harder. Seeing others crush their goals makes me want to crush mine.',
    stars: 5,
    isActive: true,
    order: 7,
  },
];

async function main() {
  console.log('Inserting testimonials...');
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log('Successfully inserted all testimonials!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
