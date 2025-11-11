"use server";

import {redirect} from 'next/navigation';
import {z} from 'zod';
import {products} from '@/lib/products';
import {db} from '@/lib/db';
import type {CartItem} from '@/lib/types';

const shippingAddressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zip: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

const checkoutSchema = z.object({
  cartItems: z.string(), // JSON string of CartItem[]
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zip: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export async function createOrder(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const parsedData = checkoutSchema.safeParse(rawFormData);

  if (!parsedData.success) {
    // This is a basic error handling. In a real app, you'd return field-specific errors.
    console.error(parsedData.error.flatten().fieldErrors);
    throw new Error('Invalid form data. Please check your inputs.');
  }

  const {cartItems: cartItemsJSON, ...shippingAddress} = parsedData.data;
  const cartItems: CartItem[] = JSON.parse(cartItemsJSON);

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty.');
  }

  // Recalculate total on the server to ensure price integrity
  const total = cartItems.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.product.id);
    if (!product) {
      throw new Error(`Product with id ${item.product.id} not found.`);
    }
    return acc + product.price * item.quantity;
  }, 0);

  // Here you would integrate with Mercado Pago SDK to create a payment preference
  // For example:
  // const preference = await mercadopago.preferences.create({ ... });
  // const preferenceId = preference.body.id;
  // For this demo, we'll simulate a successful payment process.

  const order = await db.order.create({
    items: cartItems,
    shippingAddress,
    total,
  });

  // Simulate successful payment and update order status
  await db.order.updateStatus(order.id, 'paid');

  // Redirect to order confirmation page
  redirect(`/order/${order.id}`);
}
