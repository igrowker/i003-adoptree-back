import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Adoption } from '@prisma/client';

@Injectable()
export class AdoptionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Adoption, 'id'>): Promise<Adoption> {
    return this.prisma.adoption.create({
      data,
    });
  }

  async findPendingAdoptions(): Promise<Adoption[]> {
    return this.prisma.adoption.findMany({
      where: { status: 'PENDING' },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async findOne(id: number): Promise<Adoption | null> {
    return this.prisma.adoption.findUnique({
      where: { id },
      include: {
        user: true,  // Incluye relaciones si es necesario
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async findAllForUser(userId: number): Promise<Adoption[]> {
    return this.prisma.adoption.findMany({
      where: { userId },
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async update(id: number, data: Partial<Adoption>): Promise<Adoption> {
    return this.prisma.adoption.update({
      where: { id },
      data,
      include: {
        user: true,
        tree: true,
        shippingAddress: true,
      },
    });
  }

  async remove(id: number): Promise<Adoption> {
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
