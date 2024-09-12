import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [{ emit: "event", level: "query" }],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
