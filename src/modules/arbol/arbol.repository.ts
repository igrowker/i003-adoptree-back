import { Injectable } from "@nestjs/common";
import { Arbol, Prisma, StatusTreeEnum } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type ArbolRepo = Prisma.ArbolGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
    cosecha: {
      select: {
        id: true;
        cantidad: true;
        fechaDeEnvio: true;
        estadoDeEnvio: true;
      };
    };
  };
}>;

//Intente hacerlo con este export de typo, pero habria que importarlo en el servicio y controlador. Nose si sera bueno.
export type EstadoArbol = {
  id: number;
  statusTree: StatusTreeEnum;
};

interface ArbolCreateRepoInput {
  type: string;
  fincaId: number;
  userId: number;
  statusTree: StatusTreeEnum;
  images: string[];
  price: string;
}

interface ArbolUpdateRepoInput {
  type?: string;
  fincaId?: number;
  userId?: number;
  statusTree?: StatusTreeEnum;
  price?: string;
  active?: boolean;
}

interface ArbolFilterRepoInput {
  fincaId?: number;
  active?: boolean;
  search?: string;
}

@Injectable()
export class ArbolRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly commonIncludes = {
    finca: {
      select: {
        id: true,
        name: true,
        ubication: true,
        practicesSustainable: true,
        productor: true,
      },
    },
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    cosecha: {
      select: {
        id: true,
        cantidad: true,
        fechaDeEnvio: true,
        estadoDeEnvio: true,
      },
    },
  };

  create(input: ArbolCreateRepoInput): Promise<ArbolRepo> {
    return this.prisma.arbol.create({
      include: this.commonIncludes,
      data: {
        finca: { connect: { id: input.fincaId } },
        statusTree: input.statusTree,
        user: { connect: { id: input.userId } },
        type: input.type,
        images: input.images,
      },
    });
  }

  findAll(filters?: ArbolFilterRepoInput): Promise<ArbolRepo[]> {
    // Desestructuramos los filtros opcionales del parámetro `filters` si es proporcionado
    const { fincaId, active, search } = filters || {};

    return this.prisma.arbol.findMany({
      // Incluimos relaciones adicionales para obtener detalles sobre el usuario y la cosecha asociada a cada árbol
      include: this.commonIncludes,
      where: {
        // Si se proporciona un `fincaId`, lo utilizamos para filtrar los árboles por el ID de la finca
        ...(fincaId && { fincaId }),

        // Si se proporciona un valor `active`, aplicamos un filtro basado en el estado del árbol
        // `active` puede ser `true` o `false`:
        // - Si es `true`, excluimos árboles que estén en estado `ARBOL_SECO` (es decir, árboles no activos)
        // - Si es `false`, incluimos solo los árboles en estado `ARBOL_SECO` (es decir, árboles inactivos)
        ...(active !== undefined && {
          statusTree: active
            ? { not: StatusTreeEnum.ARBOL_SECO } // Excluir `ARBOL_SECO` si `active` es true
            : { equals: StatusTreeEnum.ARBOL_SECO }, // Incluir solo `ARBOL_SECO` si `active` es false
        }),

        // Si se proporciona un `search`, aplicamos un filtro basado en el tipo de árbol
        // `search` permite buscar árboles cuyo tipo contenga una cadena específica
        // La opción `mode: 'insensitive'` hace que la búsqueda sea insensible a mayúsculas y minúsculas
        ...(search && {
          type: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
    });
  }

  async findOne(id: number): Promise<ArbolRepo | null> {
    return this.prisma.arbol.findUnique({
      include: this.commonIncludes,
      where: {
        id: id, // Asegúrate de que `id` sea un número
      },
    });
  }

  update(id: number, input: ArbolUpdateRepoInput): Promise<ArbolRepo> {
    return this.prisma.arbol.update({
      include: this.commonIncludes,
      where: { id: id },
      data: {
        statusTree: input.statusTree,
        finca: { connect: { id: input.fincaId } },
        type: input.type,
        user: { connect: { id: input.userId } },
        active: input?.active,
        price: input.price,
      },
    });
  }

  remove(id: number): Promise<Arbol> {
    return this.prisma.arbol.delete({ where: { id: id } });
  }

  findStatusTreeById(
    id: number,
  ): Promise<{ id: number; statusTree: string; images: string[] } | null> {
    return this.prisma.arbol.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        statusTree: true,
        images: true,
      },
    });
  }
}
