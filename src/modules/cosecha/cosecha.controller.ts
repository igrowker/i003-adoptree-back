import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Cosecha } from "@prisma/client";
import { CosechaService } from "./cosecha.service";
import { CreateCosechaDto } from "./dto/create-cosecha.dto";
import { FilterCosechaDto } from "./dto/filter-cosecha.dto";
import { UpdateCosechaDto } from "./dto/update-cosecha.dto";

@Controller("cosechas")
export class CosechaController {
  constructor(private readonly cosechaService: CosechaService) {}

  @Post("create")
  async create(@Body() input: CreateCosechaDto): Promise<Cosecha> {
    return this.cosechaService.create(input);
  }

  @Get()
  findAll(@Query() filter?: FilterCosechaDto): Promise<Cosecha[]> {
    return this.cosechaService.findAll(filter);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Cosecha | null> {
    return this.cosechaService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() input: UpdateCosechaDto,
  ): Promise<Cosecha> {
    return this.cosechaService.update(id, input);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<Cosecha> {
    return this.cosechaService.remove(id);
  }
}
