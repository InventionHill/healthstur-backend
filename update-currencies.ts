import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CURRENCY_MAP: Record<string, string> = {
  IN: 'INR',
  US: 'USD',
  AU: 'AUD',
  CA: 'CAD',
  GB: 'GBP',
  EU: 'EUR',
  AE: 'AED',
  NZ: 'NZD',
  ZA: 'ZAR',
  SG: 'SGD',
};

async function main() {
  console.log('Starting currency code update...');
  const countries = await prisma.country.findMany();

  for (const country of countries) {
    if (country.currencyCode && country.currencyCode.length === 2) {
      const upperCode = country.currencyCode.toUpperCase();
      let newCode = CURRENCY_MAP[upperCode];

      // If we don't have a direct map but it's 2 chars, just append 'D' or something,
      // but ideally the map covers the existing data.
      if (!newCode) {
        newCode = upperCode + 'D'; // fallback
      }

      await prisma.country.update({
        where: { id: country.id },
        data: { currencyCode: newCode },
      });
      console.log(
        `Updated ${country.name} currency from ${country.currencyCode} to ${newCode}`,
      );
    } else {
      console.log(
        `Skipping ${country.name} - currency is already ${country.currencyCode}`,
      );
    }
  }
  console.log('Finished updating currency codes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
