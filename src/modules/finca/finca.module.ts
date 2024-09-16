import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FincaController } from "./finca.controller";
import { FincaRepository } from "./finca.repository";
import { FincaService } from "./finca.service";

@Module({
  controllers: [FincaController],
  providers: [FincaService, FincaRepository, PrismaService],
})
export class FincaModule {}
