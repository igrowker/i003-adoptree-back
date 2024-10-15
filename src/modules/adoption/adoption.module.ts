import { Module } from "@nestjs/common";
import { AdoptionService } from "./adoption.service";
import { AdoptionController } from "./adoption.controller";
import { AdoptionRepository } from "./adoption.repository";

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService, AdoptionRepository],
  exports: [AdoptionService],
})
export class AdoptionModule {}
