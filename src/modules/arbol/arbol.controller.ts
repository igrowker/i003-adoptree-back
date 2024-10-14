import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Arbol } from "@prisma/client";
import { ArbolService } from "./arbol.service";
import { CreateArbolDto } from "./dto/create-arbol.dto";
import { ArbolFilterDto } from "./dto/filter-arbol.dto";
import { UpdateArbolDto } from "./dto/update-arbol";

@Controller("arboles")
export class ArbolController {
  constructor(private readonly arbolService: ArbolService) {}

  // Crear un nuevo árbol
  @Post("create")
  async createArbol(@Body() createArbolDto: CreateArbolDto): Promise<Arbol> {
    return this.arbolService.createArbol(createArbolDto);
  }

  // Obtener todos los árboles
  @Get()
  async findAll(@Query() filter?: ArbolFilterDto): Promise<Arbol[]> {
    return this.arbolService.findAll(filter);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Arbol | null> {
    return this.arbolService.findOne(Number(id));
  }

  // Actualizar un árbol específico
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateArbolDto: UpdateArbolDto
  ): Promise<Arbol> {
    return this.arbolService.update(Number(id), updateArbolDto);
  }

  // Eliminar un árbol específico
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<Arbol> {
    return this.arbolService.remove(Number(id));
  }

  //Obtener estado de un arbol por id
  @Get("estado-arbol/:id")
  async findStatusTreeById(@Param("id") id: string): Promise<{id: number, statusTree: string, images : string[] } | null> {
    return this.arbolService.findStatusTreeById(Number(id));
  }
}
