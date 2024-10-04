import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type FincaRepo = Prisma.FincaGetPayload<{
  include: {
    arbol: {
      select: {
        active: true;
        statusTree: true;
        price: true;
        type: true;
        user: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

interface FincaCreateRepoInput {
  name: string;
  ubication: string;
  practicesSustainable: string;
  productor: string;
}

interface FincaUpdateRepoInput {
  name?: string;
  ubication?: string;
  practicesSustainable?: string;
  productor: string;
}

interface FincaFilterRepoInput {
  id: number;
}

@Injectable()
export class FincaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public readonly commonIncludes = {
    arbol: {
      select: {
        active: true,
        statusTree: true,
        type: true,
        price: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    },
  };

  async createFinca(input: FincaCreateRepoInput): Promise<FincaRepo> {
    return this.prisma.finca.create({
      include: this.commonIncludes,
      data: {
        name: input.name,
        practicesSustainable: input.practicesSustainable,
        ubication: input.ubication,
        productor: input.productor
      },
    });
  }

  async updateFinca(
    id: number,
    input: FincaUpdateRepoInput
  ): Promise<FincaRepo> {
    return this.prisma.finca.update({
      include: this.commonIncludes,
      where: { id: id },
      data: {
        name: input.name,
        practicesSustainable: input.practicesSustainable,
        ubication: input.ubication,
      },
    });
  }

  async deleteFinca(id: number): Promise<FincaRepo> {
    // Primero, eliminamos los árboles asociados
    await this.prisma.arbol.deleteMany({ where: { fincaId: id } });

    // Luego, eliminamos la finca
    return this.prisma.finca.delete({
      include: this.commonIncludes,
      where: { id },
    });
  }

  async findAllFincas(filter?: FincaFilterRepoInput): Promise<FincaRepo[]> {
    return this.prisma.finca.findMany({
      include: this.commonIncludes,
      where: {
        id: filter?.id,
      },
    });
  }

  async findFincaById(id: number): Promise<FincaRepo | null> {
    return this.prisma.finca.findUnique({
      include: this.commonIncludes,
      where: { id: id },
    });
  }
}
