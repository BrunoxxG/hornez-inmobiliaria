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

  // =====================
  // MOCK PROPERTIES
  // =====================
  const user = await prisma.user.findFirst();
  const venta = await prisma.listingType.findFirst({ where: { slug: "venta" } });
  const alquiler = await prisma.listingType.findFirst({ where: { slug: "alquiler" } });
  const casa = await prisma.propertyType.findFirst({ where: { slug: "casa" } });
  const depto = await prisma.propertyType.findFirst({ where: { slug: "departamento" } });
  const cabana = await prisma.propertyType.findFirst({ where: { slug: "cabaña" } });
  const terreno = await prisma.propertyType.findFirst({ where: { slug: "terreno" } });
  const local = await prisma.propertyType.findFirst({ where: { slug: "local" } });

  if (user && venta && alquiler && casa && depto && cabana && terreno && local) {
    const mockProperties = [
      {
        title: "Casa moderna con pileta en Barrio Privado",
        description: "Hermosa casa de 3 dormitorios con pileta climatizada, quincho y amplio jardín. Ubicada en barrio cerrado con seguridad 24hs.",
        price: 185000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: casa.id,
        address: "Los Álamos 450",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 3,
        bathrooms: 2,
        area: 220,
        lat: -32.3448,
        lng: -65.0107,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Departamento céntrico con balcón",
        description: "Luminoso departamento de 2 ambientes con balcón terraza. A 2 cuadras de la plaza principal. Ideal inversión.",
        price: 78000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: depto.id,
        address: "Av. del Sol 128",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 1,
        bathrooms: 1,
        area: 55,
        lat: -32.3465,
        lng: -65.0132,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Cabaña de montaña con vista panorámica",
        description: "Encantadora cabaña de piedra y madera con vista a las sierras. 2 dormitorios, estufa a leña y deck con parrilla.",
        price: 120000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: cabana.id,
        address: "Camino de las Sierras km 3",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 2,
        bathrooms: 1,
        area: 95,
        lat: -32.3380,
        lng: -65.0200,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Terreno en Barrio La Sebastiana",
        description: "Lote de 800m² con todos los servicios. Gas natural, agua corriente, electricidad. Ideal para construir tu casa.",
        price: 35000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: terreno.id,
        address: "Calle de los Poetas s/n",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: null,
        bathrooms: null,
        area: 800,
        lat: -32.3500,
        lng: -65.0050,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Casa a estrenar en Las Moreras",
        description: "Casa de 4 dormitorios a estrenar en barrio Las Moreras. Garage doble, patio con parrilla, cocina integrada. Lista para habitar.",
        price: 210000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: casa.id,
        address: "Las Moreras lote 24",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        lat: -32.3520,
        lng: -65.0080,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Departamento en alquiler temporario",
        description: "Moderno departamento amoblado de 2 dormitorios. Ideal para turistas. A 5 minutos del centro comercial.",
        price: 450000,
        currency: "ARS" as const,
        listingTypeId: alquiler.id,
        propertyTypeId: depto.id,
        address: "Av. del Deporte 890",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 2,
        bathrooms: 1,
        area: 70,
        lat: -32.3430,
        lng: -65.0150,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Local comercial sobre avenida principal",
        description: "Amplio local de 120m² sobre Av. del Sol. Gran vidriera, depósito y baño. Excelente ubicación comercial.",
        price: 300000,
        currency: "ARS" as const,
        listingTypeId: alquiler.id,
        propertyTypeId: local.id,
        address: "Av. del Sol 560",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: null,
        bathrooms: 1,
        area: 120,
        lat: -32.3460,
        lng: -65.0120,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
      {
        title: "Cabaña con pileta en Barranca Arriba",
        description: "Cabaña rústica con pileta privada y vistas increíbles. 3 dormitorios, living con hogar y amplio parque.",
        price: 155000,
        currency: "USD" as const,
        listingTypeId: venta.id,
        propertyTypeId: cabana.id,
        address: "Barranca Arriba parcela 15",
        city: "Villa de Merlo",
        province: "San Luis",
        zipCode: "5881",
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        lat: -32.3400,
        lng: -65.0180,
        status: "AVAILABLE" as const,
        active: true,
        userId: user.id,
      },
    ];

    for (const prop of mockProperties) {
      await prisma.property.create({ data: prop });
    }

    // Agregar features a algunas propiedades
    const allProperties = await prisma.property.findMany();
    const features = await prisma.feature.findMany();
    const pileta = features.find((f) => f.name === "Pileta");
    const garage = features.find((f) => f.name === "Garage");
    const parrilla = features.find((f) => f.name === "Parrilla");
    const aire = features.find((f) => f.name === "Aire acondicionado");

    if (pileta && garage && parrilla && aire) {
      for (const prop of allProperties.slice(0, 4)) {
        await prisma.propertyFeature.createMany({
          data: [
            { propertyId: prop.id, featureId: pileta.id },
            { propertyId: prop.id, featureId: garage.id },
            { propertyId: prop.id, featureId: parrilla.id },
          ],
          skipDuplicates: true,
        });
      }
      for (const prop of allProperties.slice(4)) {
        await prisma.propertyFeature.createMany({
          data: [
            { propertyId: prop.id, featureId: aire.id },
            { propertyId: prop.id, featureId: parrilla.id },
          ],
          skipDuplicates: true,
        });
      }
    }
  }

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
