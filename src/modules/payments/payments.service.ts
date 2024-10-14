import {  Injectable, NotFoundException } from "@nestjs/common";
import * as mercadopago from "mercadopago";
import { CreatePreferenceDto } from "./dto/create-preference.dto";
import { ArbolRepository } from "../arbol/arbol.repository";
import { io } from "../../main";





@Injectable()
export class PaymentsService {
  private client : mercadopago.MercadoPagoConfig;
  private payment : mercadopago.Payment;
  private preference : mercadopago.Preference
  constructor(private arbolRepository : ArbolRepository) {

    

   this.client = new mercadopago.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN ? process.env.MP_ACCESS_TOKEN : ''
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
				},
			],
			back_urls: {
				success: process.env.FRONT_URL,
				failure: process.env.FRONT_URL,
				pending: process.env.FRONT_URL,
			},
			notification_url: process.env.MP_WEBHOOK,
			auto_return: 'approved',
		};
      const result = await this.preference.create({ body })
      return { url: result.init_point, item: result.items }
        
    } catch(error) {
      return error
    }
  
}

  async receiveWebhook (req) {

   const paidState = req.body

   if(paidState) {
     if(paidState.type === 'payment') {

       try{
        //* payment.capture solo funciona con credenciales de Lives token = TEST. El .get funciona con usuarios prueba token=APP_USR
         const data = await this.payment.get({
           id: paidState.data.id
         })

         //* Verificamos que el estado del pago este aprovado.
         if(data.status == 'approved') {
          
          //* Obtengo el cuerpo del pago. (Objeto que pago el usuario)
          if(data.additional_info && data.additional_info.items) {
            const items = data.additional_info.items[0]
            
            //* parseo el id del objeto comprado String -> Number. (Mercadopago lo requiere string y nuestra bd lo requiere Number)
            const idParsed = Number(items.id)
            
            //* Obtengo el arbol con el id pagado para posteriormente cambiar el estado de active -> true
            const arbolPagado = await this.arbolRepository.findOne(idParsed)
            if (!arbolPagado) {
              throw new NotFoundException('Árbol no encontrado'); // No encuentra arbol, pero el pago se hizo.
            }

            io.emit('new_adption', arbolPagado)

            //* el update de arbolRepository requiere un parametro input con una interface definida en el repo (ArbolUpdateRepoInput)
            const input = {
              type: arbolPagado?.type,
              fincaId: arbolPagado?.fincaId,
              userId: arbolPagado?.userId,
              statesTree: arbolPagado?.statusTree,
              active: false
            }

            //* paso los datos para hacer el update del estado
            await this.arbolRepository.update(idParsed, input)
           

          }
        }
       } catch(error) {
        console.log(error)
       }
     }
   }
    return "webhook"
}

}
