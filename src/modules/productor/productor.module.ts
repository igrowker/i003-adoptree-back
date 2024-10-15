import { Module } from "@nestjs/common";
import { ProductorRepository } from "./productor.repository";

@Module({
  providers: [ProductorRepository],
  exports: [ProductorRepository],
})
export class ProductorModule {}
