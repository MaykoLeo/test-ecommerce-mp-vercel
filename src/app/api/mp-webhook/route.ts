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
      // We return 200 OK even if processing fails.
      // Mercado Pago only cares that we received the notification.
      // If we returned a 500, it would keep retrying.
      return NextResponse.json({status: 'error', message: 'Failed to process webhook'});
    }
  }
  // Always return a 200 OK response to acknowledge receipt of the webhook
  return NextResponse.json({status: 'ok'});
}
