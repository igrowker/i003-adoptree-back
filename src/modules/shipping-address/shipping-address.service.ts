/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shipping-address/shipping-address.service.ts
import { Injectable } from "@nestjs/common";
import { ShippingAddress } from "@prisma/client";
import { ShippingAddressRepository } from "./shipping-address.repository";
// import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
// import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
// import { ERROR_KEYS } from '../../constants';

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly shippingAddressRepository: ShippingAddressRepository,
  ) {}

  async createShippingAddress(
    createShippingAddressDto: any,
  ): Promise<ShippingAddress> {
    const { userId, ...shippingData } = createShippingAddressDto;

    return this.shippingAddressRepository.create({
      ...shippingData, // Resto de los datos del envío
      userId: userId, // Asegúrate de agregar userId directamente
    });
  }

  async findOne(id: number): Promise<ShippingAddress | null> {
    const address = await this.shippingAddressRepository.findOne(id);
    if (!address) {
      // throw new NotFoundException(ERROR_KEYS.SHIPPING_ADDRESS_NOT_FOUND);
    }
    return address;
  }

  async findAllForUser(userId: number): Promise<ShippingAddress[]> {
    return this.shippingAddressRepository.findAllForUser(userId);
  }

  async update(
    id: number,
    updateShippingAddressDto: any,
  ): Promise<ShippingAddress> {
    await this.findOne(id); // Verifica si existe
    return this.shippingAddressRepository.update(id, updateShippingAddressDto);
  }

  async remove(id: number): Promise<ShippingAddress> {
    await this.findOne(id); // Verifica si existe
    return this.shippingAddressRepository.remove(id);
  }
}
