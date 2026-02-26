import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  'Personalized Diet & Nutrition Plans',
  'Weight Loss & Fat Loss Programs',
  'Muscle Gain Nutrition',
  '3-Meal Vegetarian Diet Plans',
  'PCOS/PCOD Natural Management',
  'Menopause Wellness Support',
  'Postnatal Fitness & Nutrition',
  'Lifestyle Coaching & Habit Building',
];

async function main() {
  console.log('Inserting default services...');

  // Check if services already exist
  const count = await prisma.service.count();
  if (count > 0) {
    console.log('Services already exist in the database. Deleting them.');
    await prisma.service.deleteMany();
  }

  for (let i = 0; i < services.length; i++) {
    await prisma.service.create({
      data: {
        name: services[i],
        order: i,
      },
    });
  }
  console.log('Successfully inserted default services!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
