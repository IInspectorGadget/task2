import { Gender, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with users...');

  const batchSize = 1000;
  const totalUsers = 1000000;

  for (let i = 0; i < totalUsers; i += batchSize) {
    const users = Array.from({ length: batchSize }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 10, max: 80 }),
      gender: faker.helpers.arrayElement([
        Gender.MALE,
        Gender.FEMALE,
        Gender.OTHER,
      ]),
      trouble: faker.datatype.boolean(),
    }));

    await prisma.user.createMany({ data: users });

    console.log(`Inserted ${i + batchSize} / ${totalUsers} users`);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
