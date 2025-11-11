"use client";

import {useState} from 'react';
import {useCart} from '@/context/cart-context';
import type {Product} from '@/lib/types';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {Minus, Plus, ShoppingCart} from 'lucide-react';

export default function AddToCartForm({product}: {product: Product}) {
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();
  const {toast} = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          className="h-10 w-16 border-0 text-center focus-visible:ring-0"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
          }
          min="1"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}
