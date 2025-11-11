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

      if (payment && payment.external_reference) {
        const orderId = payment.external_reference;
        const status = payment.status;

        if (status === 'approved') {
          console.log(`Payment for order ${orderId} APPROVED. Updating status.`);
          await db.order.updateStatus(orderId, 'paid');
          console.log(`Order ${orderId} status updated to paid.`);
        } else if (status === 'rejected') {
          console.log(`Payment for order ${orderId} REJECTED.`);
          // Opcional: Aquí podrías añadir lógica para manejar pagos rechazados,
          // como notificar al usuario o cambiar el estado de la orden a 'rejected'.
        } else {
          console.log(
            `Payment for order ${orderId} has status: ${status}. No action taken.`
          );
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      // Devolvemos 200 OK para que Mercado Pago no reintente la notificación.
      // El error ya está registrado en nuestros logs.
    }
  }

  // Siempre devolver una respuesta 200 OK para confirmar la recepción del webhook.
  return NextResponse.json({status: 'ok'});
}