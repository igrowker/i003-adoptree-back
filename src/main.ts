import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PrismaService } from "nestjs-prisma";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log query events
  if (process.env.DB_LOGS === "true") {
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.$on("query", (e) => {
      let queryString = e.query;

      // Cambiar `any[]` a `unknown[]` y manejar el tipo de manera más segura
      const params: unknown[] = JSON.parse(e.params);

      params.forEach((param, index) => {
        queryString = queryString.replace(
          `$${index + 1}`,
          typeof param === "string" ? `'${param}'` : String(param) // Asegurarse de convertir a string
        );
      });

      console.log(
        `[${e.timestamp}] Query: ${queryString} Duration: ${e.duration}ms \n`
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
}

bootstrap();
