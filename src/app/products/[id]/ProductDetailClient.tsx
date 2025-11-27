'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailsPage from '@/components/product/DetailsPage';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

// This component ensures that the cart and wishlist contexts are available
export default function ProductDetailClient({ product, relatedProducts = [] }: any) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!product) {
    notFound();
  }

  // Only render the DetailsPage on the client side
  if (!isClient) {
    return null;
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <DetailsPage 
          product={product}
          relatedProducts={relatedProducts}
          backUrl="/"
          backText="Back to Home"
        />
      </WishlistProvider>
    </CartProvider>
  );
}
