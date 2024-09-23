import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Datos para la tabla User
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'Juan',
      surname: 'Pérez',
      direccionEnvio: 'Calle Falsa 123',
      role: 'USER',
      password: 'securepassword',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'Maria',
      surname: 'Gómez',
      direccionEnvio: 'Avenida Siempre Viva 456',
      role: 'ADMIN',
      password: 'securepassword',
    },
  });

  // Datos para la tabla Finca
  const finca1 = await prisma.finca.create({
    data: {
      name: 'Finca La Esperanza',
      ubication: 'Valle del Cauca',
      practicesSustainable: 'Agroforestería',
    },
  });

  const finca2 = await prisma.finca.create({
    data: {
      name: 'Finca El Paraíso',
      ubication: 'Cauca',
      practicesSustainable: 'Permacultura',
    },
  });

  // Datos para la tabla Arbol
  const arbol1 = await prisma.arbol.create({
    data: {
      type: 'Roble',
      statusTree: 'ARBOL_JOVEN',
      fincaId: finca1.id,
      userId: user1.id,
      active: true,
    },
  });

  const arbol2 = await prisma.arbol.create({
    data: {
      type: 'Pino',
      statusTree: 'ARBOL_MADURO',
      fincaId: finca2.id,
      userId: user2.id,
      active: true,
    },
  });

  // Datos para la tabla Cosecha
  const cosecha1 = await prisma.cosecha.create({
    data: {
      arbolId: arbol1.id,
      cantidad: 100,
      fechaDeEnvio: new Date(),
      estadoDeEnvio: 'DESPACHADO',
    },
  });

  const cosecha2 = await prisma.cosecha.create({
    data: {
      arbolId: arbol2.id,
      cantidad: 150,
      fechaDeEnvio: new Date(),
      estadoDeEnvio: 'EN_CAMINO',
    },
  });

  // Datos para la tabla Adoption
  const adoption1 = await prisma.adoption.create({
    data: {
      userId: user1.id,
      treeId: arbol1.id,
      purchaseDate: new Date(),
    },
  });

  const adoption2 = await prisma.adoption.create({
    data: {
      userId: user2.id,
      treeId: arbol2.id,
      purchaseDate: new Date(),
    },
  });

  console.log({ user1, user2, finca1, finca2, arbol1, arbol2, cosecha1, cosecha2, adoption1, adoption2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
