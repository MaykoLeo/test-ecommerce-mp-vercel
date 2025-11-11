"use client";

import {useCart} from '@/context/cart-context';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {createOrder} from './actions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {useFormStatus} from 'react-dom';

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" size="lg" className="mt-6 w-full" disabled={pending}>
      {pending ? 'Processing...' : 'Pay with Mercado Pago'}
    </Button>
  );
}

export default function CheckoutPage() {
  const {cartItems, cartTotal} = useCart();
  const router = useRouter();

  useEffect(() => {
    // If we reached this page and the cart is empty, redirect back
    if (cartItems.length === 0) {
      router.replace('/cart');
    }
  }, [cartItems, router]);

  // When the form action completes and redirects, this component will unmount.
  // We clear the cart on the confirmation page using a client component.

  if (cartItems.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="font-headline mb-8 text-3xl font-bold md:text-4xl">
        Checkout
      </h1>
      <form action={createOrder}>
        <input
          type="hidden"
          name="cartItems"
          value={JSON.stringify(cartItems)}
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required minLength={2} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required minLength={5} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required minLength={2} />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" required minLength={2} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" name="zip" required minLength={3} />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue="Argentina"
                    required
                    minLength={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.product.image.url}
                            alt={item.product.image.alt}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <SubmitButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
