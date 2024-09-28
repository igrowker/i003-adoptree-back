import { Body, Controller, Get, Post, Query,Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService : PaymentsService) {}
    @Post('create-order')
    async createPayment(
        @Req()req: Request,
        @Body() createPreferenceDto : CreatePreferenceDto,
    ) {
      return this.paymentsService.createPayment(req, createPreferenceDto)
    }

    @Get("success")
    async successPayment(
        @Query() query: string
    ) {
        return this.paymentsService.successPayment(query)
    }
    @Get("failure")
    async failurePayment() {

    }
    @Get("pending")
    async pendingPayment() {

    }

    @Post("webhook")
    async receiveWebhook(
        @Req() req : Request,
    ) {
        return this.paymentsService.receiveWebhook(req)
    }

}
