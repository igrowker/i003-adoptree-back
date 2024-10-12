import { Injectable } from '@nestjs/common';
import { Adoption, Prisma } from '@prisma/client'; // Importa los tipos de Prisma para usar en los DTO si es necesario
import { PrismaService } from 'nestjs-prisma'; // Usar el PrismaService de nestjs-prisma

@Injectable()
export class AdoptionService {
  constructor(private prisma: PrismaService) {}

  async createAdoption(userId: number, treeId: number, shippingAddressId: number) {
    return this.prisma.adoption.create({
      data: {
        userId,
        treeId,
        shippingAddressId,
        purchaseDate: new Date(),
      },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async getPendingAdoptions() {
    return this.prisma.adoption.findMany({
      where: { status: 'PENDING' },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }


  async findOneByUserId(userId: number): Promise<Adoption | null> {
    try {
      // Busca el árbol asociado al userId. Ajusta la lógica según tu modelo de datos.
      const adoption = await this.prisma.adoption.findFirst({
        where: { userId },
        include: {
          user: true,
          tree: true
        }
      });
      return adoption || null; // Devuelve el árbol o null si no se encuentra
    } catch (error) {
      console.error('Error fetching arbol by userId:', error);
      throw new Error('Error al obtener el árbol.'); // Maneja el error según tus necesidades
    }
  }
}
