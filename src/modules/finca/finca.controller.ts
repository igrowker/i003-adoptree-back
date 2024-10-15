import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Finca } from "@prisma/client";
import { CreateFincaDto } from "./dto/create-finca.dto";
import { UpdateFincaDto } from "./dto/update-finca.dto";
import { FincaService } from "./finca.service";

@Controller("fincas")
export class FincaController {
  constructor(private readonly fincaService: FincaService) {}

  @Post()
  async createFinca(@Body() createFincaDto: CreateFincaDto): Promise<Finca> {
    const finca = await this.fincaService.createFinca(createFincaDto);
    return finca;
  }

  @Get()
  async getAllFincas(): Promise<Finca[]> {
    return this.fincaService.getAllFincas();
  }

  @Get(":id")
  async getFincaDetails(@Param("id") id: number): Promise<Finca> {
    return this.fincaService.getFincaDetails(Number(id));
  }

  @Put(":id")
  async updateFinca(
    @Param("id") id: number,
    @Body() updateFincaDto: UpdateFincaDto,
  ): Promise<Finca> {
    return this.fincaService.updateFinca(Number(id), updateFincaDto);
  }

  @Delete(":id")
  async deleteFinca(@Param("id") id: number): Promise<Finca> {
    return this.fincaService.deleteFinca(Number(id));
  }
}
