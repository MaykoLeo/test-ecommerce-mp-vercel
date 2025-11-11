'use server';

import {db} from '@/lib/db';
import {NextResponse} from 'next/server';
import {MercadoPagoConfig, Payment} from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log('Received Mercado Pago Webhook:', body);

  if (body.type === 'payment') {
    const paymentId = body.data.id;
    try {
      const payment = await new Payment(client).get({id: paymentId});

      if (payment && payment.external_reference && payment.status === 'approved') {
        const orderId = payment.external_reference;
        console.log(`Payment for order ${orderId} approved. Updating status.`);

        await db.order.updateStatus(orderId, 'paid');
        console.log(`Order ${orderId} status updated to paid.`);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({error: 'Failed to process webhook'}, {status: 500});
    }
  }

  return NextResponse.json({status: 'ok'});
}
