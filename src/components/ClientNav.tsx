'use client';

import dynamic from 'next/dynamic';

const DynamicIslandNav = dynamic(
  () => import('@/components/DynamicIslandNav'),
  { ssr: false, loading: () => <div className="h-16" /> }
);

export default function ClientNav() {
  return <DynamicIslandNav />;
}
