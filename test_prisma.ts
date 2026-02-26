import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.resource.create({
    data: {
      title: 'Prisma Test',
      slug: 'prisma-test',
      heroTitle: 'T',
      heroDescription: 'D',
      steps: [{ title: 'Step 1' }],
    },
  });
  console.log(res);
}
main().finally(() => prisma.$disconnect());
