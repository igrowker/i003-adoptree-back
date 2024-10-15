// src/main.ts (o bootstrap.ts)
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PrismaService } from "nestjs-prisma";
import { AppModule } from "./app.module";
import { initializeSocket } from "./socket";

// Exportamos la variable io
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let io: any; // Declarar la variable io para que sea exportada

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpServer = app.getHttpServer();

  // Inicializamos Socket.IO y lo asignamos a la variable exportada
  io = initializeSocket(httpServer);

  if (process.env.DB_LOGS === "true") {
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.$on("query", (e) => {
      let queryString = e.query;
      const params: unknown[] = JSON.parse(e.params);
      params.forEach((param, index) => {
        queryString = queryString.replace(
          `$${index + 1}`,
          typeof param === "string" ? `'${param}'` : String(param),
        );
      });
      console.log(
        `[${e.timestamp}] Query: ${queryString} Duration: ${e.duration}ms \n`,
      );
    });
  }

  app.enableCors({
    credentials: true,
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
  console.log(`App running: http://localhost:${process.env.PORT || 3000}`);

  io.on("connection", () => {
    console.log("Socket.IO server ready");
  });
}

bootstrap();
