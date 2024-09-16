import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFincaDto } from "./dto/create-finca.dto";
import { UpdateFincaDto } from "./dto/update-finca.dto";
import { FincaRepository } from "./finca.repository";

@Injectable()
export class FincaService {
  constructor(private readonly fincaRepository: FincaRepository) {}

  async createFinca(input: CreateFincaDto) {
    return this.fincaRepository.createFinca(input);
  }

  async updateFinca(id: number, input: UpdateFincaDto) {
    const finca = await this.fincaRepository.findFincaById(id);
    if (!finca) {
      throw new NotFoundException(`Finca with ID ${id} not found`);
    }
    return this.fincaRepository.updateFinca(id, input);
  }

  async deleteFinca(id: number) {
    const finca = await this.fincaRepository.findFincaById(id);
    if (!finca) {
      throw new NotFoundException(`Finca with ID ${id} not found`);
    }

    return this.fincaRepository.deleteFinca(id);
  }

  async getAllFincas() {
    return this.fincaRepository.findAllFincas();
  }

  async getFincaDetails(id: number) {
    const finca = await this.fincaRepository.findFincaById(id);
    if (!finca) {
      throw new NotFoundException(`Finca with ID ${id} not found`);
    }
    return finca;
  }
}
