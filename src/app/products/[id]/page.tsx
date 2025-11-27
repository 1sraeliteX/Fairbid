import { notFound } from 'next/navigation';
import { getRelatedProducts, products, Product } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Convert id to number since our product IDs are numbers
  const productId = parseInt(params.id, 10);
  const product = products.find((p: Product) => p.id === productId);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}

export async function generateStaticParams() {
  // Example static generation
  return [];
}
