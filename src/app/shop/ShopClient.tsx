'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ShopPageSkeleton from '@/components/shop/ShopPageSkeleton';

// Dynamically import the shop page with SSR disabled to avoid hydration issues
const ShopPageContent = dynamic(() => import('./ShopPageContent'), {
  ssr: false,
  loading: () => <ShopPageSkeleton />
});

export default function ShopClient() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}
