import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type ProductorRepo = Prisma.ProductorGetPayload<{
  include: {
    finca: true;
  };
}>;

interface ProductorCreateRepoInput {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
  experiencia?: number;
  especialidad?: string;
  certificaciones?: string[];
  fincaId: number;
}

interface ProductorUpdateRepoInput {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  experiencia?: number;
  especialidad?: string;
  certificaciones?: string[];
}

@Injectable()
export class ProductorRepository {
  constructor(private readonly prisma: PrismaService) {}

  public readonly commonIncludes = {
    finca: true,
  };

  async createProductor(
    input: ProductorCreateRepoInput,
  ): Promise<ProductorRepo> {
    return this.prisma.productor.create({
      include: this.commonIncludes,
      data: input,
    });
  }

  async updateProductor(
    id: number,
    input: ProductorUpdateRepoInput,
  ): Promise<ProductorRepo> {
    return this.prisma.productor.update({
      where: { id },
      data: input,
      include: this.commonIncludes,
    });
  }

  async findProductorById(id: number): Promise<ProductorRepo | null> {
    return this.prisma.productor.findUnique({
      where: { id },
      include: this.commonIncludes,
    });
  }

  async findProductorByFincaId(fincaId: number): Promise<ProductorRepo | null> {
    return this.prisma.productor.findUnique({
      where: { fincaId },
      include: this.commonIncludes,
    });
  }

  async findAllProductores(): Promise<ProductorRepo[]> {
    return this.prisma.productor.findMany({
      include: this.commonIncludes,
    });
  }

  async deleteProductor(id: number): Promise<ProductorRepo> {
    return this.prisma.productor.delete({
      where: { id },
      include: this.commonIncludes,
    });
  }
}
