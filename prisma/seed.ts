import { PrismaClient, StatusTreeEnum, EstadoDeEnvioEnum, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Eliminar datos existentes
  await prisma.cosecha.deleteMany({});
  await prisma.arbol.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.productor.deleteMany({});
  await prisma.finca.deleteMany({});

  // Seed Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        role: RoleEnum.ADMIN,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'Normal',
        role: RoleEnum.USER,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'manager@example.com',
        name: 'Manager',
        role: RoleEnum.USER,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'farmer@example.com',
        name: 'Farmer',
        role: RoleEnum.USER,
        password: hashedPassword,
      },
    }),
  ]);

  console.log('Usuarios creados:', users);

  // Seed Fincas y Productores
  const fincasWithProductores = await Promise.all([
    prisma.finca.create({
      data: {
        name: 'Finca El Paraíso',
        ubication: 'Mendoza, Argentina',
        practicesSustainable: 'Uso de compostaje y control biológico de plagas',
        images: ["https://sevilla.abc.es/agronoma/wp-content/uploads/sites/13/2020/09/Finca-El-Cerro-1.jpg", "https://efeagro.com/wp-content/uploads/2016/07/foto-limones.jpg"],
        productor: {
          create: {
            nombre: "Juan",
            apellido: "Garcia",
            telefono: "+54 9 11 1234-5678",
            email: "juan.garcia@example.com",
            experiencia: 15,
            especialidad: "Cítricos",
            certificaciones: ["Orgánico", "Comercio Justo"]
          }
        }
      },
      include: { productor: true },
    }),
    prisma.finca.create({
      data: {
        name: 'Hacienda La Esperanza',
        ubication: 'Tucumán, Argentina',
        practicesSustainable: 'Sistemas de riego por goteo y energía solar',
        images: ["https://content.cuerpomente.com/medio/2023/02/02/naranja-salvaje-un-proyecto-con-la-colaboracion-de-wwf_c3bb7f3b_1280x720.jpg", "https://predios.com.co/wp-content/uploads/2021/07/DJI_0208-scaled.jpg"],
        productor: {
          create: {
            nombre: "Clara",
            apellido: "Molina",
            telefono: "+54 9 381 8765-4321",
            email: "clara.molina@example.com",
            experiencia: 20,
            especialidad: "Agricultura sostenible",
            certificaciones: ["Rainforest Alliance", "Global G.A.P."]
          }
        }
      },
      include: { productor: true },
    }),
    prisma.finca.create({
      data: {
        name: 'Citrícola San Juan',
        ubication: 'San Juan, Argentina',
        practicesSustainable: 'Manejo integrado de plagas y uso eficiente del agua',
        images: ["https://example.com/sanjuan1.jpg", "https://example.com/sanjuan2.jpg"],
        productor: {
          create: {
            nombre: "Miguel",
            apellido: "Fernández",
            telefono: "+54 9 264 5555-6666",
            email: "miguel.fernandez@example.com",
            experiencia: 18,
            especialidad: "Limones y pomelos",
            certificaciones: ["ISO 9001", "BRC Food Safety"]
          }
        }
      },
      include: { productor: true },
    }),
    prisma.finca.create({
      data: {
        name: 'Finca Los Naranjos',
        ubication: 'Entre Ríos, Argentina',
        practicesSustainable: 'Agricultura regenerativa y biodiversidad',
        images: ["https://example.com/entrerios1.jpg", "https://example.com/entrerios2.jpg"],
        productor: {
          create: {
            nombre: "Laura",
            apellido: "Gómez",
            telefono: "+54 9 343 7777-8888",
            email: "laura.gomez@example.com",
            experiencia: 22,
            especialidad: "Naranjas y mandarinas",
            certificaciones: ["Demeter", "EU Organic"]
          }
        }
      },
      include: { productor: true },
    }),
    prisma.finca.create({
      data: {
        name: 'Citrus Valley',
        ubication: 'Jujuy, Argentina',
        practicesSustainable: 'Conservación de suelos y polinizadores',
        images: ["https://example.com/jujuy1.jpg", "https://example.com/jujuy2.jpg"],
        productor: {
          create: {
            nombre: "Carlos",
            apellido: "Rodríguez",
            telefono: "+54 9 388 9999-0000",
            email: "carlos.rodriguez@example.com",
            experiencia: 25,
            especialidad: "Cítricos orgánicos",
            certificaciones: ["USDA Organic", "Fair for Life"]
          }
        }
      },
      include: { productor: true },
    }),
  ]);

  console.log('Fincas y Productores creados:', fincasWithProductores);

  const arbolesList = [
    {
      name: "Mandarino",
      images: ["https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Nules_Clementine_2_FGT_decc1cf3-e565-48e4-b98b-e3f9df416a6f.jpg?v=1707159745", "https://cdn.shopify.com/s/files/1/0059/8835/2052/files/clementine.jpg?v=17071597450", "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Nules_Clementine_5_9a2f56e0-8f82-403d-8d2e-2db6fc509560.jpg?v=1707159745"],
      price: "5000"
    },
    {
      name: "Naranjo",
      images: ["https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Navel_Orange_1_FGT.jpg?v=1642179120", "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Navel_Orange_4.jpg?v=1642179120"],
      price: "7000"
    },
    {
      name: "Limonero",
      images: ["https://example.com/limonero1.jpg", "https://example.com/limonero2.jpg"],
      price: "6000"
    },
    {
      name: "Pomelo",
      images: ["https://example.com/pomelo1.jpg", "https://example.com/pomelo2.jpg"],
      price: "5500"
    },
    {
      name: "Lima",
      images: ["https://example.com/lima1.jpg", "https://example.com/lima2.jpg"],
      price: "4800"
    }
  ]

  // Seed Árboles
  const arboles = await Promise.all(
    fincasWithProductores.flatMap((finca) =>
      arbolesList.map((type) =>
        prisma.arbol.create({
          data: {
            type: type.name,
            fincaId: finca.id,
            userId: users[Math.floor(Math.random() * users.length)].id, // Asignamos a un usuario aleatorio
            statusTree: StatusTreeEnum.ARBOL_JOVEN,
            active: true,
            images: type.images,
            price: type.price
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
          estadoDeEnvio: EstadoDeEnvioEnum.EN_PREPARACION,
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