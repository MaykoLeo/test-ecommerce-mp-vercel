'use client';

import Link from 'next/link';
import {ShoppingBag} from 'lucide-react';
import {useCart} from '@/context/cart-context';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

export default function CartIcon() {
  const {itemCount} = useCart();

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingBag className="h-6 w-6" />
        <span className="sr-only">Shopping Cart</span>
        {itemCount > 0 && (
          <Badge
            variant="default"
            className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0 text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
