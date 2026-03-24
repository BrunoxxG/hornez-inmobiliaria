import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.time("Seeding complete 🌱");

  await prisma.company.create({
    data: {
      name: "Hornez Inmobiliaria",
      address: "Camino 4215 - La Paz, Cordoba",
      phone: "1133557799",
    },
  });

  // =====================
  // USERS
  // =====================
  const hashedPassword = await bcrypt.hash("brunogimenez", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Bruno Gimenez",
        email: "brunogimenez@gmail.com",
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    ],
    skipDuplicates: true,
  });

  console.timeEnd("Seeding complete 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
