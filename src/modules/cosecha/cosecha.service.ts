import { Injectable } from "@nestjs/common";
import { CosechaRepository } from "./cosecha.repository";

@Injectable()
export class CosechaService {
  constructor(private readonly cosechaRepository: CosechaRepository) {}
}
