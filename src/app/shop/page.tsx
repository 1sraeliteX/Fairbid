'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ShopPageSkeleton from '@/components/shop/ShopPageSkeleton';

const ShopPageContent = dynamic(() => import('./ShopPageContent'), {
  ssr: false,
  loading: () => <ShopPageSkeleton />
});

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}
