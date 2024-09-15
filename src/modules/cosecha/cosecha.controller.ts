import { Controller } from "@nestjs/common";
import { CosechaService } from "./cosecha.service";

@Controller("cosechas")
export class CosechaController {
  constructor(private readonly cosechaService: CosechaService) {}
}
