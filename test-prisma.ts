import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.program.create({
      data: {
        name: 'ssss',
        href: '/programs/ssss',
        heading: 'asdasdasd',
        subtext: 'asdasd',
        icon: '',
        background: '',
        bullets: [],
        subItems: [],
        solutions: [],
      },
    });
    console.log('Success!');
  } catch (e) {
    console.error('Prisma Error:');
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
