'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export function CartSummary() {
  const { totalPrice, itemCount } = useCart();
  const shipping = itemCount > 0 ? 5.99 : 0; // Example shipping cost
  const total = totalPrice + shipping;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-sm font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Shipping</span>
          <span className="text-sm font-medium">
            {shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}
          </span>
        </div>
        
        <div className="h-px bg-border" />
        
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Total</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button asChild className="w-full" disabled={itemCount === 0}>
          <Link href="/checkout">
            Proceed to Checkout
          </Link>
        </Button>
        
        <p className="mt-2 text-center text-xs text-muted-foreground">
          or{' '}
          <Link 
            href="/products" 
            className="font-medium text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
