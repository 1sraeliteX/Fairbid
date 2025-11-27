'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiEye } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/formatters';

// Extend the Product type to include quantity for cart items
interface CartItem extends Product {
  quantity: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const [wishlist, setWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem: CartItem = { ...product, quantity };
    addToCart(cartItem);
  };

  return (
    <div
      className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200 group"
        aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart 
          className={cn('h-5 w-5 transition-colors duration-200', {
            'fill-rose-500 text-rose-500': wishlist,
            'text-gray-600 group-hover:text-rose-500': !wishlist
          })} 
        />
      </button>

      {/* Product Image */}
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden relative">
        <Link href={`/shop/products/${product.slug}`} className="block w-full h-48">
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
              priority={product.featured}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-sm text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Quick View Button */}
          <div className={`absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors">
              <FiEye className="h-5 w-5" />
            </button>
          </div>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <Link href={`/shop/products/${product.slug}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{product.name}</h3>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">${formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">${formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <div className="mt-1">
            <p className="text-xs text-gray-500">Sold by: <span className="text-gray-700">{product.seller || 'FairBid Store'}</span></p>
          </div>
        </Link>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        >
          Add to Cart
          <FiShoppingCart className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
