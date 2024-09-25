import { Injectable } from "@nestjs/common";
import * as mercadopago from "mercadopago";

interface PaymentItem {
  title: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

@Injectable()
export class PaymentsService {
  constructor() {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined");
    }

    // mercadopago.configure({
    //   //   access_token: process.env.MERCADO_PAGO_ACCES_TOKEN,
    // });
  }

  async createPreference(items: PaymentItem[]): Promise<mercadopago.Response> {
    const preference: mercadopago.Preference = {
      items: items,
    };

    const response = await mercadopago.preferences.create(preference);
    return response; // Devuelve el objeto de respuesta directamente
  }
}
