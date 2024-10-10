// src/shipping-address/shipping-address.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';

@Controller('shipping-addresses')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  create(@Body() createShippingAddressDto: any) {
    return this.shippingAddressService.createShippingAddress(createShippingAddressDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingAddressService.findOne(+id);
  }

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.shippingAddressService.findAllForUser(+userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShippingAddressDto: any) {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingAddressService.remove(+id);
  }
}