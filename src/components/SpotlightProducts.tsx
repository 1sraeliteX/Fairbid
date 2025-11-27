'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { formatPrice } from '@/utils/formatters';
import Link from 'next/link';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { CartItem } from '@/context/CartContext';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import styles from './SpotlightProducts.module.css';

type ItemType = 'product' | 'ad';

interface BaseItem {
  id: number;
  type: ItemType;
  name: string;
  image: string;
  advertiser: string;
}

interface ProductItem extends BaseItem {
  type: 'product';
  price: number;
  category: string;
  seller?: string;
}

interface AdItem extends BaseItem {
  type: 'ad';
  tagline: string;
  cta: string;
}

type SpotlightItem = ProductItem | AdItem;

const spotlightItems: SpotlightItem[] = [
  // Ad 1
  {
    id: 3,
    type: 'ad',
    name: 'Summer Collection',
    image: '/images/ads/summer-sale.jpg',
    advertiser: 'FashionHub',
    tagline: 'Up to 50% off on summer styles',
    cta: 'Explore',
  },
  // Product 1
  {
    id: 1,
    type: 'product',
    name: 'Wireless Earbuds',
    price: 129.99,
    image: '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg',
    category: 'Electronics',
    advertiser: 'TechGadgets',
  },
  // Ad 2
  {
    id: 5,
    type: 'ad',
    name: 'Tech Week',
    image: '/images/ads/tech-week.jpg',
    advertiser: 'TechDeals',
    tagline: 'Limited time tech deals',
    cta: 'Explore',
  },
  // Product 2
  {
    id: 2,
    type: 'product',
    name: 'Smart Watch',
    price: 249.99,
    image: '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg',
    category: 'Wearables',
    advertiser: 'WearableTech',
  },
  // Ad 3
  {
    id: 7,
    type: 'ad',
    name: 'New Arrivals',
    image: '/images/ads/new-arrivals.jpg',
    advertiser: 'FashionHub',
    tagline: 'Discover our latest collection',
    cta: 'Shop Now',
  },
  // Product 3
  {
    id: 4,
    type: 'product',
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg',
    category: 'Gaming',
    advertiser: 'GamerZone',
  },
];

interface SpotlightCardProps {
  item: SpotlightItem;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onAddToCart?: (item: ProductItem) => void;
}

const SpotlightCard = ({ item, isWishlisted, onToggleWishlist, onAddToCart }: SpotlightCardProps) => {
  const isProduct = item.type === 'product';
  
  const cardContent = (
    <>
      {/* Ad Badge */}
      {!isProduct && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded z-10">
          Sponsored Ad
        </div>
      )}
      
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleWishlist(item.id);
        }}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIconOutline className="h-5 w-5 text-gray-600" />
        )}
      </button>
      
      {/* Image */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(item.name)}`;
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">{item.advertiser}</h3>
            {isProduct && (
              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                {(item as ProductItem).category}
              </span>
            )}
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
            {item.name}
          </h2>
          
          {isProduct ? (
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${formatPrice((item as ProductItem).price)}
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {(item as AdItem).tagline}
            </p>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600">
            {isProduct ? 'View Details' : 'Learn More'}
          </span>
          {isProduct && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isProduct && onAddToCart) {
                  onAddToCart(item as ProductItem);
                }
              }}
              className="px-4 py-2 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );

  const cardContainer = (
    <div className="group relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden">
      {cardContent}
    </div>
  );

  if (isProduct) {
    return (
      <Link 
        href={`/products/${item.id}`}
        className="block h-full"
        passHref
      >
        {cardContainer}
      </Link>
    );
  }
  
  return cardContainer;
};

export default function SpotlightProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: ProductItem) => {
    const cartItem: CartItem = {
      ...product,
      seller: product.seller || 'Unknown Seller',
      description: '',
      category: product.category,
      images: [{
        id: product.id.toString(),
        url: product.image,
        alt: product.name
      }],
      rating: 0,
      reviewCount: 0,
      inStock: true,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      quantity: 1
    };
    addToCart?.(cartItem, 1);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">FairBid Spotlight</h2>
          <p className="mt-2 text-lg text-gray-600">Discover amazing products and special offers</p>
        </div>
        
        <div className="relative">
          <div className={styles.scrollContainer}>
            <div className={styles.productsGrid}>
              {spotlightItems.map((item) => (
                <SpotlightCard
                  key={item.id}
                  item={item}
                  isWishlisted={wishlist.includes(item.id)}
                  onToggleWishlist={toggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
