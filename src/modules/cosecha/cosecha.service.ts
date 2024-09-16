import { Injectable } from "@nestjs/common";
import { Cosecha } from "@prisma/client";
import { CosechaRepository } from "./cosecha.repository";
import { CreateCosechaDto } from "./dto/create-cosecha.dto";
import { FilterCosechaDto } from "./dto/filter-cosecha.dto";
import { UpdateCosechaDto } from "./dto/update-cosecha.dto";

@Injectable()
export class CosechaService {
  constructor(private readonly cosechaRepository: CosechaRepository) {}

  create(input: CreateCosechaDto): Promise<Cosecha> {
    return this.cosechaRepository.create(input);
  }

  findAll(filter?: FilterCosechaDto): Promise<Cosecha[]> {
    return this.cosechaRepository.findAll(filter);
  }

  findOne(id: number): Promise<Cosecha | null> {
    return this.cosechaRepository.findOne(id);
  }

  update(id: number, input: UpdateCosechaDto): Promise<Cosecha> {
    return this.cosechaRepository.update(id, input);
  }

  remove(id: number): Promise<Cosecha> {
    return this.cosechaRepository.remove(id);
  }
}
