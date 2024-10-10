import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // Importa los tipos de Prisma para usar en los DTO si es necesario
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

  async findOne(id: number) {
    const adoption = await this.prisma.adoption.findUnique({
      where: { id },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });

    if (!adoption) {
      
    }

    return adoption;
  }

  async findAllForUser(userId: number) {
    return this.prisma.adoption.findMany({
      where: { userId },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async update(id: number, updateAdoptionDto: Prisma.AdoptionUpdateInput) {
    await this.findOne(id); // Verifica si existe la adopción antes de actualizar

    return this.prisma.adoption.update({
      where: { id },
      data: updateAdoptionDto,
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica si existe la adopción antes de eliminar

    return this.prisma.adoption.delete({
      where: { id },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }
}
