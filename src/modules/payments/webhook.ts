// async receiveWebhook (webhook : any, body: any, req) {
    // BODY:  {
    //   action: 'payment.created',
    //   api_version: 'v1',
    //   data: { id: '88942877224' },
    //   date_created: '2024-09-26T22:36:52Z',
    //   id: 116037003787,
    //   live_mode: true,
    //   type: 'payment',
    //   user_id: '2007985284'
    // }

    // const paymentWebhook = webhook
    // if(body.type === 'payment') {
    //   const data = await this.payment.get({
    //     id: body.data.id
    //   })

    // const data = await this.payment.capture({ id: body.data.id });
    //   console.log(data)
      // console.log(data)
      // const dataCapture = await this.payment.capture({id: body.id}).then(console.log).catch(console.log)
      // console.log(dataCapture)
      // const paymentsHistory = await this.payment.search({})
      // console.log(paymentsHistory)
      // console.log(webhook)
      // console.log(paymentWebhook['data.id'])

      //! 
      // const response = await fetch(
      //   `https://api.mercadopago.com/checkout/preferences/2007985284-4cd6d66c-5de2-41f9-8845-f513883f0b33`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer APP_USR-341628833607988-092515-ad00b538d3678e4da26563c2047b3d6a-2007985284',
      //     },
      //   },
      // );
      // const dataPreferences = await response.json();
      // console.log("DataPagos ",dataPreferences)
      //!

      // return data.map((element) => element.id);
      
      
    // }
    // const responsePagos = await fetch(
    //   `https://api.mercadopago.com/v1/payments/88643713511`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer APP_USR-341628833607988-092515-ad00b538d3678e4da26563c2047b3d6a-2007985284',
    //     },
    //   },
    // )
    // const dataPagos = await responsePagos.json();
    // console.log("DataPagos ",dataPagos)
// { id: '23196896353', topic: 'merchant_order' }
// { id: '23208957582', topic: 'merchant_order' }
// { 'data.id': '88514195287', type: 'payment' }
// { id: '23208957582', topic: 'merchant_order' }
    

//     return "webhook"
//   }