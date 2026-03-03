import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const map: Record<string, string> = {
    EU: 'EUR',
    IN: 'INR',
    TU: 'TRY',
    US: 'USD',
    UK: 'GBP',
  };

  const countries = await prisma.country.findMany();
  for (const country of countries) {
    if (map[country.currencyCode]) {
      await prisma.country.update({
        where: { id: country.id },
        data: { currencyCode: map[country.currencyCode] },
      });
      console.log(
        `Updated ${country.name} from ${country.currencyCode} to ${map[country.currencyCode]}`,
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
