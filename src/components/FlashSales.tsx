'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  originalPrice?: number;
  discount?: number;
}

const FlashSales = () => {
  // Mock flash sale products data (3 products)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Noise Cancelling Headphones',
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      category: 'Audio',
      image: '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 179.99,
      originalPrice: 229.99,
      discount: 22,
      category: 'Wearables',
      image: '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg'
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      category: 'Gaming',
      image: '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg'
    }
  ]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0
  });

  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header with countdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Flash Sales</h2>
            <p className="text-gray-600 dark:text-gray-300">Limited time offers. Don't miss out!</p>
          </div>
          
          <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Hours</span>
            </div>
            <span className="text-2xl font-bold text-gray-400">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Minutes</span>
            </div>
            <span className="text-2xl font-bold text-gray-400">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Seconds</span>
            </div>
          </div>
        </div>

        {/* Products Grid - 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {product.discount}% OFF
                  </div>
                )}
                
                {/* Product Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-gray-900 dark:text-white font-medium text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.category}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    
                    <button 
                      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic here
                        console.log('Added to cart:', product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
            View All Flash Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
