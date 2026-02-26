import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const steps = [
  {
    id: 1,
    title: 'Deep Goal & Lifestyle Assessment',
    description: 'Our experts conduct a detailed evaluation covering:',
    points: [
      'Body metrics & health history',
      'Daily routine & work schedule',
      'Food preferences & dietary habits',
      'Stress levels & sleep patterns',
      'Personal fitness goals',
    ],
    footer:
      'This ensures we create a plan that is realistic, sustainable, and customized not generic.',
    image: '/Wellness1.svg',
  },
  {
    id: 2,
    title: 'Personalized Nutrition Blueprint',
    description:
      'Our certified nutrition experts design meal plans tailored to:',
    points: [
      'Caloric & macronutrient requirements',
      'Medical conditions ( PCOS, thyroid )',
      'Food preferences & dietary habits',
      'Cultural & vegetarian preferences',
      'Busy professional lifestyles',
    ],
    footer:
      'No crash diets. No extreme restrictions. Just structured nourishment.',
    image: '/Wellness2.svg',
  },
  {
    id: 3,
    title: 'Smart Fitness Programming',
    description:
      'Our fitness trainers develop goal-specific workout strategies:',
    points: [
      'Fat loss & body toning',
      'Muscle gain & strength building',
      'Postnatal recovery programs',
      'Low-impact knee-friendly workouts',
      'Beginner to advanced training levels',
    ],
    footer: 'We ensure steady, safe, and measurable progress.',
    image: '/Wellness3.svg',
  },
  {
    id: 4,
    title: 'Continuous Monitoring & Adjustments',
    description: "Progress isn't linear and that's okay. Our experts:",
    points: [
      'Track weekly progress',
      'Adjust calories and workouts',
      'Monitor strength, endurance & measurements',
      'Provide motivation and accountability',
    ],
    footer: 'Your plan evolves as your body evolves.',
    image: '/Wellness4.svg',
  },
  {
    id: 5,
    title: 'Mindset & Habit Transformation',
    description:
      'Sustainable success comes from mindset shifts. We guide clients to:',
    points: [
      'Build discipline without burnout',
      'Develop healthy routines',
      'Improve sleep & stress management',
      'Stay consistent even during busy phases',
    ],
    footer:
      'Because real results come from lifestyle change not temporary effort.',
    image: '/Wellness5.svg',
  },
];

const wellnessResource = {
  title: 'Wellness Guide',
  slug: 'wellness',
  heroTitle: 'Real Transformations. Real Results.',
  heroDescription:
    'Discover inspiring success stories from people who achieved their fitness goals with our gym and diet programs. See real progress, real journeys, and real motivation to start your own transformation.',
  heroImage: '/Wellness.jpg',
  steps: steps as any,
  isActive: true,
  order: 0,
};

async function main() {
  console.log('Inserting Resource...');
  await prisma.resource.upsert({
    where: { slug: wellnessResource.slug },
    update: wellnessResource,
    create: wellnessResource,
  });
  console.log('Successfully inserted Wellness Resource!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
