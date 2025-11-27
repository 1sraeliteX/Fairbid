'use client';

import { FiShoppingCart, FiHeart, FiShare2, FiChevronLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: string;
    brand?: string;
    material?: string;
    images: Array<{
      id: string;
      url: string;
      alt: string;
    }>;
  };
  relatedProducts?: Array<any>;
  backUrl?: string;
}

export default function ProductDetail({ 
  product, 
  relatedProducts = [],
  backUrl = '/shop' 
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on our store`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Consider adding a toast notification here
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2" 
          onClick={() => window.history.back()}
        >
          <FiChevronLeft className="h-4 w-4" />
          Back to {backUrl === '/shop' ? 'shop' : 'home'}
        </Button>
        <button
          onClick={handleShare}
          className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Share product"
          title="Share product"
        >
          <FiShare2 className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
            <Image
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].alt}
              fill
              className="object-cover transition-opacity duration-300"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-lg transition-all duration-200',
                  selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-600">{product.category}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-900 mb-6">
              {product.description}
            </p>

            {/* Product Details Section */}
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span>Sold By:</span>
                </div>
                <span className="font-medium text-gray-900">
                  {product.brand || 'Our Store'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span>Category:</span>
                </div>
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                className="w-full py-6 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] bg-primary hover:bg-primary/90 shadow-lg border-2 border-black hover:border-gray-700" 
                size="lg"
              >
                <FiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  'w-full py-6 text-base font-medium transition-all duration-300',
                  'border-2 border-gray-200 hover:border-rose-100',
                  'bg-white hover:bg-rose-50',
                  'text-gray-800 hover:text-rose-600',
                  'shadow-md hover:shadow-rose-100',
                  'transform hover:-translate-y-0.5',
                  'dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
                  isWishlist ? '!bg-rose-50 !border-rose-200 !text-rose-600' : ''
                )}
                onClick={() => setIsWishlist(!isWishlist)}
              >
                <FiHeart 
                  className={cn('mr-2 h-5 w-5 transition-transform duration-300', {
                    'fill-rose-500 text-rose-500 animate-pulse': isWishlist,
                    'group-hover:scale-110': !isWishlist
                  })} 
                />
                <span className={cn('transition-all duration-300', {
                  'font-semibold': isWishlist
                })}>
                  {isWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
