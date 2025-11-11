"use client";

import {useCart} from '@/context/cart-context';
import {useEffect} from 'react';

export default function ClearCart() {
  const {clearCart} = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
