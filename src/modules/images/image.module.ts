import { PrismaService } from "nestjs-prisma";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";
import { Module } from "@nestjs/common";





@Module({
    controllers: [ImageController],
    providers: [ImageService, ImageRepository, PrismaService],
  })
  export class ImageModule {}