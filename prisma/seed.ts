import { PrismaClient, Prisma, StatusTreeEnum, EstadoDeEnvioEnum, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Seed Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        surname: 'User',
        direccionEnvio: 'Calle Admin 123',
        role: RoleEnum.ADMIN,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'Normal',
        surname: 'User',
        direccionEnvio: 'Calle User 456',
        role: RoleEnum.USER,
        password: hashedPassword,
      },
    }),
  ]);

  console.log('Usuarios creados:', users);

  // Seed Fincas
  const fincas = await Promise.all([
    prisma.finca.create({
      data: {
        name: 'Finca El Paraíso',
        ubication: 'Valle del Cauca, Colombia',
        practicesSustainable: 'Uso de compostaje y control biológico de plagas',
      },
    }),
    prisma.finca.create({
      data: {
        name: 'Hacienda La Esperanza',
        ubication: 'Antioquia, Colombia',
        practicesSustainable: 'Sistemas de riego por goteo y energía solar',
      },
    }),
  ]);

  console.log('Fincas creadas:', fincas);

  // Seed Árboles
  const arboles = await Promise.all(
    fincas.flatMap((finca) =>
      ['Café Arábica', 'Café Robusta'].map((type) =>
        prisma.arbol.create({
          data: {
            type,
            fincaId: finca.id,
            userId: users[1].id, // Asignamos al usuario normal
            statusTree: StatusTreeEnum.ARBOL_JOVEN,
            active: true,
          },
        })
      )
    )
  );

  console.log('Árboles creados:', arboles);

  // Seed Cosechas
  const cosechas = await Promise.all(
    arboles.map((arbol) =>
      prisma.cosecha.create({
        data: {
          arbolId: arbol.id,
          cantidad: Math.floor(Math.random() * 100) + 50, // Entre 50 y 150 kg
          fechaDeEnvio: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000), // Fecha aleatoria en los próximos 30 días
          estadoDeEnvio: EstadoDeEnvioEnum.EN_CAMINO,
        },
      })
    )
  );

  console.log('Cosechas creadas:', cosechas);

  console.log('Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });