import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdoptionService } from './adoption.service';

@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  async createAdoption(@Body() adoptionData: { userId: number; treeId: number; shippingAddressId: number }) {
    return this.adoptionService.createAdoption(
      adoptionData.userId,
      adoptionData.treeId,
      adoptionData.shippingAddressId
    );
  }

  @Get('pending')
  async getPendingAdoptions() {
    return this.adoptionService.getPendingAdoptions();
  }

  // Otros métodos del controlador...
}