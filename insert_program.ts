import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.program.create({
    data: {
      name: 'Design Verification Program',
      icon: 'Dumbbell',
      href: '/programs/design-verification',
      heading: 'Design Review Setup',
      subtext:
        'This program tests the web design dynamically populated solutions.',
      bullets: ['Workouts', 'Nutrition'],
      subItems: [],
      solutions: [
        {
          id: 'sol-1',
          title: 'Visual Layout Test',
          description:
            'This solution checks the rendering of approach, benefits, and images.',
          approach: 'Automated generation using script.',
          benefits:
            'Ensures UI matches expectations without manual data entry.',
          image: '/Weight.svg',
        },
      ],
    },
  });
}
main()
  .then(() => console.log('Success'))
  .catch((e) => console.log(e));
