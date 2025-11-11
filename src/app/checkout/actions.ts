"use server";

import {redirect} from 'next/navigation';
import {z} from 'zod';
import {products} from '@/lib/products';
import {db} from '@/lib/db';
import type {CartItem} from '@/lib/types';
import {MercadoPagoConfig, Preference} from 'mercadopago';

const checkoutSchema = z.object({
  cartItems: z.string(), // JSON string of CartItem[]
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zip: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function createOrder(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const parsedData = checkoutSchema.safeParse(rawFormData);

  if (!parsedData.success) {
    console.error(parsedData.error.flatten().fieldErrors);
    throw new Error('Invalid form data. Please check your inputs.');
  }

  const {cartItems: cartItemsJSON, ...shippingAddress} = parsedData.data;
  const cartItems: CartItem[] = JSON.parse(cartItemsJSON);

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty.');
  }

  const total = cartItems.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.product.id);
    if (!product) {
      throw new Error(`Product with id ${item.product.id} not found.`);
    }
    return acc + product.price * item.quantity;
  }, 0);

  const order = await db.order.create({
    items: cartItems,
    shippingAddress,
    total,
  });

  const preference = await new Preference(client).create({
    body: {
      items: cartItems.map((item) => ({
        id: item.product.id,
        title: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        currency_id: 'ARS',
      })),
      payer: {
        name: shippingAddress.name,
        // email: would need to collect this
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/order/${order.id}`,
        failure: `${process.env.NEXT_PUBLIC_URL}/cart`,
        pending: `${process.env.NEXT_PUBLIC_URL}/order/${order.id}`,
      },
      auto_return: 'approved',
      external_reference: order.id,
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/mp-webhook?source_news=webhooks`,
    },
  });

  redirect(preference.init_point!);
}
