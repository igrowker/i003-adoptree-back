import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FincaController } from "./finca.controller";
import { FincaRepository } from "./finca.repository";
import { FincaService } from "./finca.service";
import { ProductorModule } from "../productor/productor.module";

@Module({
  imports: [ProductorModule],
  controllers: [FincaController],
  providers: [FincaService, FincaRepository, PrismaService],
})
export class FincaModule {}