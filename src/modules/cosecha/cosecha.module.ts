import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ArbolModule } from "../arbol/arbol.module";
import { CosechaController } from "./cosecha.controller";
import { CosechaRepository } from "./cosecha.repository";
import { CosechaService } from "./cosecha.service";

@Module({
  imports: [ArbolModule],
  controllers: [CosechaController],
  providers: [CosechaRepository, CosechaService, PrismaService],
})
export class CosechaModule {}
