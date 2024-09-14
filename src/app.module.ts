import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArbolModule } from "./modules/arbol/arbol.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

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
    UsersModule,
    AuthModule,
    ArbolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
