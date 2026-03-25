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

  // =====================
  // LISTING TYPES
  // =====================
  await prisma.listingType.createMany({
    data: [
      { name: "Venta", slug: "venta" },
      { name: "Alquiler", slug: "alquiler" },
    ],
    skipDuplicates: true,
  });

  // =====================
  // PROPERTY TYPES
  // =====================
  await prisma.propertyType.createMany({
    data: [
      { name: "Casa", slug: "casa" },
      { name: "Departamento", slug: "departamento" },
      { name: "Cabaña", slug: "cabaña" },
      { name: "Terreno", slug: "terreno" },
      { name: "Oficina", slug: "oficina" },
      { name: "Local", slug: "local" },
    ],
    skipDuplicates: true,
  });

  // =====================
  // FEATURES
  // =====================
  await prisma.feature.createMany({
    data: [
      { name: "Pileta" },
      { name: "Garage" },
      { name: "Balcón" },
      { name: "Terraza" },
      { name: "Patio" },
      { name: "Quincho" },
      { name: "Parrilla" },
      { name: "Aire acondicionado" },
      { name: "Calefacción" },
      { name: "Ascensor" },
      { name: "Seguridad 24hs" },
      { name: "Amoblado" },
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
