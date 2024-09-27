import { BadRequestException, Injectable } from "@nestjs/common";
import * as mercadopago from "mercadopago";
import { CreatePreferenceDto } from "./dto/create-preference.dto";



// APP_USR-341628833607988-092515-ad00b538d3678e4da26563c2047b3d6a-2007985284
@Injectable()
export class PaymentsService {
  private client : mercadopago.MercadoPagoConfig;
  private payment : mercadopago.Payment;
  private preference : mercadopago.Preference
  constructor() {
   this.client = new mercadopago.MercadoPagoConfig({
    accessToken: 'APP_USR-341628833607988-092515-ad00b538d3678e4da26563c2047b3d6a-2007985284'
   })

   this.payment = new mercadopago.Payment(this.client)
   this.preference = new mercadopago.Preference(this.client)
  }



  async createPayment(req: Request, createPreferenceDto : CreatePreferenceDto) {
    // this.payment.create({body}).then(console.log).catch(console.log)

    try{
     
      const body = {
        items: [
          {
            id: createPreferenceDto.id,
            title: createPreferenceDto.title,
            quantity: createPreferenceDto.quantity,
            unit_price: createPreferenceDto.unit_price,
            description: createPreferenceDto.description,
            currency_id: 'ARS',
          }
        ],
        back_urls: {
          success: "http://localhost:3000",
          failure: "http://localhost:3000",
          pending: "http://localhost:3000"
        },
        notification_url: "https://adoptree-tunnel.loca.lt/payments/webhook",
        auto_return: "approved"
      }
      const result = await this.preference.create({ body })
      return { url: result.init_point, item: result.items }
        
    } catch(error) {
      return error
    }
  
}

  async receiveWebhook (req: Request) {
    
    // if(body.type === 'payment') {
    //   const data = await this.payment.get({
    //     id: body.data.id
    //   })
     
    //   console.log(data)
     
    // }
    return "webhook"
}

  async successPayment(query: string) {
    console.log("SUCCESS QUERY", query)

  }
}
