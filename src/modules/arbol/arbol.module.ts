import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ArbolController } from "./arbol.controller";
import { ArbolRepository } from "./arbol.repository";
import { ArbolService } from "./arbol.service";

@Module({
  providers: [ArbolService, ArbolRepository, PrismaService],
  controllers: [ArbolController],
  exports: [ArbolRepository]
})
export class ArbolModule {}
