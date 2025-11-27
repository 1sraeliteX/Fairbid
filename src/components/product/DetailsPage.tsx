'use client';

import { FiShoppingCart, FiHeart, FiShare2, FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { useWishlist } from '@/context/WishlistContext';

import { Product } from '@/data/products';

interface DetailsPageProps {
  product: Product & {
    originalPrice?: number;
    brand?: string;
    material?: string;
  };
  relatedProducts?: Product[];
  backUrl?: string;
  backText?: string;
}

export default function DetailsPage({ 
  product, 
  relatedProducts = [],
  backUrl = '/shop',
  backText = 'Back to shop'
}: DetailsPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isInWishlistState, setIsInWishlistState] = useState(false);

  // Update wishlist state when product or wishlist changes
  useEffect(() => {
    setIsInWishlistState(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity,
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      category: product.category,
      slug: product.slug,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      inStock: product.inStock !== undefined ? product.inStock : true
    };
    
    setIsAddingToCart(true);
    addToCart(cartItem, quantity);
    
    // Reset the button state after animation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleWishlistClick = () => {
    if (isInWishlistState) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsInWishlistState(!isInWishlistState);
  };

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
          {backText}
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
                ${formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${formatPrice(product.originalPrice)}
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
              <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={decrementQuantity}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`flex-1 py-6 rounded-full text-base font-medium transition-all duration-300 transform ${
                    isAddingToCart ? 'bg-green-600 scale-100' : 'bg-indigo-600 hover:scale-[1.02] hover:bg-indigo-700'
                  } text-white shadow-md`} 
                  size="lg"
                >
                  <FiShoppingCart className={`mr-2 h-5 w-5 ${isAddingToCart ? 'animate-bounce' : ''}`} />
                  {isAddingToCart ? 'Added to Cart!' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
                </Button>
                
                <Button 
                  onClick={handleWishlistClick}
                  variant={isInWishlistState ? 'default' : 'outline'}
                  className={`py-6 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    isInWishlistState 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-800 hover:border-gray-700'
                  }`}
                  size="lg"
                  aria-label={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlistState ? (
                    <>
                      <FiCheck className="mr-2 h-5 w-5" />
                      In Wishlist
                    </>
                  ) : (
                    <>
                      <FiHeart className="mr-2 h-5 w-5" />
                      Add to Wishlist
                    </>
                  )}
                </Button>
              </div>
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
