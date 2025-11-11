"use client";

import Image from 'next/image';
import Link from 'next/link';
import {useCart} from '@/context/cart-context';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Minus, Plus, Trash2, ShoppingBag} from 'lucide-react';
import type {CartItem} from '@/lib/types';

export default function CartPage() {
  const {cartItems, updateQuantity, removeFromCart, cartTotal, itemCount} =
    useCart();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center md:px-6">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="font-headline mt-8 text-3xl font-bold">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added any scents yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="font-headline mb-8 text-3xl font-bold md:text-4xl">
        Your Shopping Cart
      </h1>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6 lg:col-span-2">
          {cartItems.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({item}: {item: CartItem}) {
  const {updateQuantity, removeFromCart} = useCart();
  const {product, quantity} = item;

  const handleQuantityChange = (change: number) => {
    updateQuantity(product.id, Math.max(1, quantity + change));
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-md">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-cover"
            sizes="100px"
          />
        </div>
        <div className="flex-grow">
          <Link
            href={`/product/${product.id}`}
            className="font-semibold hover:text-primary"
          >
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="mt-1 text-sm font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="h-8 w-12 border-0 p-0 text-center focus-visible:ring-0"
              value={quantity}
              onChange={(e) =>
                updateQuantity(
                  product.id,
                  Math.max(1, parseInt(e.target.value, 10) || 1)
                )
              }
              min="1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
