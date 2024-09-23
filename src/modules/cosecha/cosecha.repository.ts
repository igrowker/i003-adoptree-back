import { Injectable } from "@nestjs/common";
import { EstadoDeEnvioEnum, Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type CosechaRepo = Prisma.CosechaGetPayload<{
  include: {
    arbol: {
      select: {
        id: true;
        statusTree: true;
        type: true;
        finca: {
          select: {
            id: true;
            name: true;
            practicesSustainable: true;
            ubication: true;
          };
        };
      };
    };
  };
}>;

interface CosechaCreateRepoInput {
  arbolId: number;
  cantidad: number;
  fechaDeEnvio: Date;
  estadoDeEnvio: EstadoDeEnvioEnum;
}

interface CosechaUpdateRepoInput {
  cantidad: number;
  fechaDeEnvio: Date;
  estadoDeEnvio: EstadoDeEnvioEnum;
}

interface CosechaFilterRepoInput {
  arbolId?: number;
}

@Injectable()
export class CosechaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly commonIncludes = {
    arbol: {
      select: {
        id: true,
        statusTree: true,
        type: true,
        finca: {
          select: {
            id: true,
            name: true,
            practicesSustainable: true,
            ubication: true,
          },
        },
      },
    },
  };

  create(input: CosechaCreateRepoInput): Promise<CosechaRepo> {
    return this.prisma.cosecha.create({
      include: this.commonIncludes,
      data: {
        cantidad: input.cantidad,
        estadoDeEnvio: input.estadoDeEnvio,
        fechaDeEnvio: input.fechaDeEnvio,
        arbol: { connect: { id: input.arbolId } },
      },
    });
  }

  findAll(filter?: CosechaFilterRepoInput): Promise<CosechaRepo[]> {
    return this.prisma.cosecha.findMany({
      include: this.commonIncludes,
      where: {
        arbolId: filter?.arbolId,
      },
    });
  }

  findOne(id: number): Promise<CosechaRepo | null> {
    return this.prisma.cosecha.findUnique({
      where: { id },
      include: this.commonIncludes,
    });
  }

  update(id: number, input: CosechaUpdateRepoInput): Promise<CosechaRepo> {
    return this.prisma.cosecha.update({
      where: { id: id },
      data: {
        cantidad: input.cantidad,
        fechaDeEnvio: input.fechaDeEnvio,
        estadoDeEnvio: input.estadoDeEnvio,
      },
      include: this.commonIncludes,
    });
  }

  remove(id: number): Promise<CosechaRepo> {
    return this.prisma.cosecha.delete({
      where: { id },
      include: this.commonIncludes,
    });
  }
}
