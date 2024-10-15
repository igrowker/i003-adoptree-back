import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { AdoptionService } from "./adoption.service";
import { Adoption } from "@prisma/client";

@Controller("adoptions")
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  async createAdoption(
    @Body()
    adoptionData: {
      userId: number;
      treeId: number;
      shippingAddressId: number;
    },
  ) {
    return this.adoptionService.createAdoption(
      adoptionData.userId,
      adoptionData.treeId,
      adoptionData.shippingAddressId,
    );
  }

  @Get(":userId") // Cambiado a user/:userId para mayor claridad
  async findOneByUserId(
    @Param("userId") userId: string,
  ): Promise<Adoption | null> {
    console.log(userId);
    return this.adoptionService.findOneByUserId(Number(userId)); // Cambia la lógica según sea necesario
  }

  @Get("pending")
  async getPendingAdoptions() {
    return this.adoptionService.getPendingAdoptions();
  }

  // Otros métodos del controlador...
}
