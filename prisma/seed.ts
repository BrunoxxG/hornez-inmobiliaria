import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash(process.env.SEED_DEFAULT_PASSWORD || "cambiar-esta-clave", 10);

  await prisma.user.createMany({
    data: [
      { name: "Bruno Gimenez", email: "brunogimenez@gmail.com", password, role: "SUPERADMIN" },
      { name: "Mirko", email: "mirko@gmail.com", password, role: "BASIC" },
    ],
    skipDuplicates: true,
  });

  await prisma.listingType.createMany({
    data: [{ name: "Venta", slug: "venta" }],
    skipDuplicates: true,
  });

  await prisma.propertyType.createMany({
    data: [
      { name: "Casa", slug: "casa" },
      { name: "Loteo", slug: "loteo" },
      { name: "Terreno", slug: "terreno" },
    ],
    skipDuplicates: true,
  });

  await prisma.feature.createMany({
    data: [
      { name: "Agua de red", slug: "agua-de-red", category: "SERVICE" },
      { name: "Energia monofasica", slug: "energia-monofasica", category: "SERVICE" },
      { name: "Recoleccion de residuos", slug: "recoleccion-de-residuos", category: "SERVICE" },
      { name: "Cercado", slug: "cercado", category: "ADDITIONAL" },
    ],
    skipDuplicates: true,
  });

  await prisma.locality.createMany({
    data: [{ name: "La Paz" }, { name: "Las Chacras" }, { name: "Luyaba" }],
    skipDuplicates: true,
  });

  const user = await prisma.user.findUnique({ where: { email: "brunogimenez@gmail.com" } });
  const venta = await prisma.listingType.findUnique({ where: { slug: "venta" } });
  const casa = await prisma.propertyType.findUnique({ where: { slug: "casa" } });
  const terreno = await prisma.propertyType.findUnique({ where: { slug: "terreno" } });
  const agua = await prisma.feature.findUnique({ where: { slug: "agua-de-red" } });
  const cercado = await prisma.feature.findUnique({ where: { slug: "cercado" } });

  if (!user || !venta || !casa || !terreno || !agua || !cercado) return;

  const properties = [
    {
      title: "Departamento céntrico con balcón",
      description: "Luminoso departamento de 2 ambientes con balcón terraza. A 2 cuadras de la plaza principal. Ideal inversión.",
      price: 78000,
      propertyTypeId: terreno.id,
      address: "Av. del Sol 128",
      city: "Las Chacras",
      province: "Córdoba",
      totalRooms: 5,
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      currency: "USD" as const,
      lat: -32.3465,
      lng: -65.0132,
      documentation: "DEED" as const,
      standOut: true,
      featureSlugs: ["agua-de-red", "cercado"],
    },
    {
      title: "Cabaña de montaña con vista panorámica",
      description: "Encantadora cabaña de piedra y madera con vista a las sierras. 2 dormitorios, estufa a leña y deck con parrilla.",
      price: 120000,
      propertyTypeId: casa.id,
      address: "Camino de las Sierras km 3",
      city: "La Paz",
      province: "Córdoba",
      totalRooms: 2,
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      currency: "USD" as const,
      lat: -32.338,
      lng: -65.02,
      documentation: "POSSESSORY_RIGHTS" as const,
      standOut: true,
      featureSlugs: ["agua-de-red", "cercado"],
    },
    {
      title: "Departamento en alquiler temporario",
      description: "Moderno departamento amoblado de 2 dormitorios. Ideal para turistas. A 5 minutos del centro comercial.",
      price: 450000,
      propertyTypeId: casa.id,
      address: "Av. del Deporte 890",
      city: "Luyaba",
      province: "Córdoba",
      totalRooms: 5,
      bedrooms: 2,
      bathrooms: 1,
      area: 70,
      currency: "ARS" as const,
      lat: -32.343,
      lng: -65.015,
      documentation: "DEED" as const,
      standOut: true,
      featureSlugs: ["agua-de-red"],
    },
  ];

  for (const property of properties) {
    const { featureSlugs, ...data } = property;
    const created = await prisma.property.create({
      data: {
        ...data,
        listingTypeId: venta.id,
        status: "AVAILABLE",
        active: true,
        userId: user.id,
        approvalStatus: "APPROVED",
        video: "-",
      },
    });

    const featureIds = await prisma.feature.findMany({
      where: { slug: { in: featureSlugs } },
      select: { id: true },
    });

    await prisma.propertyFeature.createMany({
      data: featureIds.map((feature) => ({ propertyId: created.id, featureId: feature.id })),
      skipDuplicates: true,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
