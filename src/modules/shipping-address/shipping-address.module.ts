import { Module } from '@nestjs/common';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressRepository } from './shipping-address.repository';

@Module({
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepository],
  exports: [ShippingAddressService],
})
export class ShippingAddressModule {}