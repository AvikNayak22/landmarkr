import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.propertyType.createMany({
    data: [
      { value: "Apartment" },
      { value: "Villa" },
      { value: "Condo" },
      { value: "Studio" },
    ],
  });

  await prisma.propertyStatus.createMany({
    data: [
      { value: "Available" },
      { value: "Sold" },
      { value: "Rented" },
      { value: "Under Construction" },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
