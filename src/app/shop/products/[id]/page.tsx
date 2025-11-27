'use client';

import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import DetailsPage from '@/components/product/DetailsPage';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  if (!product) {
    notFound();
  }

  return (
    <DetailsPage 
      product={product}
      relatedProducts={relatedProducts}
      backUrl="/shop"
    />
  );
}
