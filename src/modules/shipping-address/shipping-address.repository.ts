import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ShippingAddress } from '@prisma/client';

@Injectable()
export class ShippingAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<ShippingAddress, 'id'>): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.create({
      data: {
        fullName: data.fullName, // Usa el fullName del DTO
        address: data.address, // Usa el address del DTO
        city: data.city, // Usa el city del DTO
        province: data.province, // Usa el province del DTO
        postalCode: data.postalCode, // Usa el postalCode del DTO
        country: data.country, // Usa el country del DTO
        phoneNumber: data.phoneNumber, // Usa el phoneNumber del DTO
        user: {
          connect: {
            id: data.userId, // Aquí es donde necesitas pasar el userId recibido
          },
        },
      },
    });
  }
  

  async findOne(id: number): Promise<ShippingAddress | null> {
    return this.prisma.shippingAddress.findUnique({ where: { id } });
  }

  async findAllForUser(userId: number): Promise<ShippingAddress[]> {
    return this.prisma.shippingAddress.findMany({ where: { userId } });
  }

  async update(id: number, data: Partial<ShippingAddress>): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.update({ where: { id }, data });
  }

  async remove(id: number): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.delete({ where: { id } });
  }
}