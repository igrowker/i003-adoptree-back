import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Prisma} from "@prisma/client";

interface FincaCreateRepoInput {
  name: string;
  ubication: string;
  practicesSustainable: string;
  images: string[];
  productor?: {
    nombre: string;
    apellido: string;
    telefono: string;
    email?: string;
    direccion?: string;
    experiencia?: number;
    especialidad?: string;
    certificaciones?: string[];
  };
}

interface FincaUpdateRepoInput {
  name?: string;
  ubication?: string;
  practicesSustainable?: string;
  images?: string[];
  productor?: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    experiencia?: number;
    especialidad?: string;
    certificaciones?: string[];
  };
}

const commonIncludes = {
  arbol: {
    select: {
      active: true,
      statusTree: true,
      type: true,
      price: true,
      user: {
        select: { name: true },
      },
    },
  },
  productor: true,
};

export type FincaRepo = Prisma.FincaGetPayload<{
  include: typeof commonIncludes;
}>;

@Injectable()
export class FincaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private static readonly commonIncludes = commonIncludes;

  async createFinca(input: FincaCreateRepoInput): Promise<FincaRepo> {
    return this.prisma.finca.create({
      include: FincaRepository.commonIncludes,
      data: {
        name: input.name,
        practicesSustainable: input.practicesSustainable,
        ubication: input.ubication,
        images: input.images,
        productor: input.productor
          ? { create: input.productor }
          : undefined,
      },
    });
  }

  async updateFinca(
    id: number,
    input: FincaUpdateRepoInput
  ): Promise<FincaRepo> {
    const existingFinca = await this.prisma.finca.findUnique({
      where: { id },
      include: { productor: true },
    });
  
    if (!existingFinca) {
      throw new NotFoundException(`Finca with ID ${id} not found.`);
    }
  
    let productorData;
    if (input.productor) {
      if (existingFinca.productor) {
        productorData = { update: input.productor };
      } else {
        const { nombre, apellido, telefono } = input.productor;
        if (!nombre || !apellido || !telefono) {
          throw new Error("Los campos 'nombre', 'apellido' y 'telefono' son obligatorios para crear un nuevo productor.");
        }
        productorData = { create: input.productor };
      }
    }
  
    return this.prisma.finca.update({
      include: FincaRepository.commonIncludes,
      where: { id },
      data: {
        ...input,
        productor: productorData,
      },
    });
  }

  async findFincaById(id: number): Promise<FincaRepo | null> {
    return this.prisma.finca.findUnique({
      where: { id },
      include: FincaRepository.commonIncludes,
    });
  }

  async findAllFincas(): Promise<FincaRepo[]> {
    return this.prisma.finca.findMany({
      include: FincaRepository.commonIncludes,
    });
  }

  async deleteFinca(id: number): Promise<FincaRepo> {
    return this.prisma.finca.delete({
      where: { id },
      include: FincaRepository.commonIncludes,
    });
  }
}