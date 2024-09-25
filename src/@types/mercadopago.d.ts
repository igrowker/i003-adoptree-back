declare module "mercadopago" {
  interface Item {
    id?: string;
    title: string;
    description?: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
    picture_url?: string;
    category_id?: string;
    expiration_date?: string;
  }

  interface Preference {
    items: Item[];
    back_urls?: {
      success?: string;
      failure?: string;
      pending?: string;
    };
    auto_return?: string;
    payer?: {
      name?: string;
      surname?: string;
      email?: string;
      phone?: {
        area_code?: string;
        number?: string;
      };
      address?: {
        street_name?: string;
        street_number?: number;
        zip_code?: string;
      };
    };
  }

  interface AdditionalInfo {
    message?: string;
    transaction_id?: string;
    // Agrega otras propiedades que puedas necesitar
  }

  interface Response {
    id: string;
    init_point: string;
    sandbox_init_point: string;
    additional_info?: AdditionalInfo; // Usar la nueva interfaz aquí
  }

  export const configure: (config: { access_token: string }) => void;
  export const preferences: {
    create: (preference: Preference) => Promise<Response>;
  };
}
