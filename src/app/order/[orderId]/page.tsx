import {db} from '@/lib/db';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {CheckCircle} from 'lucide-react';
import ClearCart from './_components/clear-cart';

export default async function OrderConfirmationPage({
  params,
}: {
  params: {orderId: string};
}) {
  const order = await db.order.findById(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <ClearCart />
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="bg-secondary/50 p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
              <CardTitle className="font-headline text-3xl">
                Thank You for Your Order!
              </CardTitle>
              <p className="mt-1 text-muted-foreground">
                Your payment was successful and your order is confirmed.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Order ID: {order.id}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Shipping To</h3>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Order Summary</h3>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="capitalize font-medium text-green-600">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="mb-4 font-semibold">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
