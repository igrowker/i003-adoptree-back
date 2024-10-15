import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFincaDto } from "./dto/create-finca.dto";
import { UpdateFincaDto } from "./dto/update-finca.dto";
import { FincaRepository } from "./finca.repository";
import { ProductorRepository } from "../productor/productor.repository";

@Injectable()
export class FincaService {
  constructor(
    private readonly fincaRepository: FincaRepository,
    private readonly productorRepository: ProductorRepository,
  ) {}

  async createFinca(createFincaDto: CreateFincaDto) {
    const { productor, ...fincaData } = createFincaDto;

    const createdFinca = await this.fincaRepository.createFinca(fincaData);

    if (productor) {
      await this.productorRepository.createProductor({
        ...productor,
        fincaId: createdFinca.id,
      });
    }

    return createdFinca;
  }

  async updateFinca(id: number, updateFincaDto: UpdateFincaDto) {
    const { productor, ...fincaData } = updateFincaDto;

    const updatedFinca = await this.fincaRepository.updateFinca(id, fincaData);

    if (productor) {
      const existingProductor =
        await this.productorRepository.findProductorByFincaId(id);
      if (existingProductor) {
        await this.productorRepository.updateProductor(
          existingProductor.id,
          productor,
        );
      } else {
        await this.productorRepository.createProductor({
          ...productor,
          fincaId: id,
        });
      }
    }

    return updatedFinca;
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
