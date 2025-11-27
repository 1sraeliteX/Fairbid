'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconOutline, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '@/context/CartContext';
import SpotlightProducts from '@/components/SpotlightProducts';
import FlashSales from '@/components/FlashSales';

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
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
    }, 1);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 rounded-3xl overflow-hidden mx-4 mt-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/assets/hero.jpg"
            alt="E-commerce shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" aria-hidden="true" />
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Smart Trading,</span>
            <span className="block text-indigo-400">Fair Prices</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Buy and sell smarter with a platform that puts fairness first — giving every buyer and seller the chance to get the right price without leaving home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.5
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="w-full flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
            </motion.div>
            <Link 
              href="/sell" 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white bg-white/10 hover:bg-white/20 md:py-4 md:text-lg md:px-10 backdrop-blur-sm transition-colors duration-200"
            >
              Sell an Item
            </Link>
          </div>
        </div>
      </div>

      {/* Spotlight Products Section */}
      <div className="rounded-3xl overflow-hidden">
        <SpotlightProducts />
      </div>

      {/* Featured Products */}
      <div id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            },
            hidden: { opacity: 0 }
          }}
        >
          {[
            {
              id: 1,
              name: 'Wireless Headphones',
              price: 199.99,
              category: 'Audio',
              image: '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg'
            },
            {
              id: 2,
              name: 'Smart Watch Pro',
              price: 249.99,
              category: 'Wearables',
              image: '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg'
            },
            {
              id: 3,
              name: 'Mechanical Keyboard',
              price: 149.99,
              category: 'Accessories',
              image: '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg'
            },
            {
              id: 4,
              name: 'Premium Smartphone',
              price: 799.99,
              category: 'Mobile',
              image: '/images/products/mohammad-metri-E-0ON3VGrBc-unsplash.jpg'
            },
            {
              id: 5,
              name: 'Wireless Earbuds',
              price: 129.99,
              category: 'Audio',
              image: '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg'
            },
            {
              id: 6,
              name: 'Fitness Tracker',
              price: 89.99,
              category: 'Wearables',
              image: '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg'
            },
            {
              id: 7,
              name: 'Gaming Mouse',
              price: 79.99,
              category: 'Gaming',
              image: '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg'
            },
            {
              id: 8,
              name: 'Bluetooth Speaker',
              price: 119.99,
              category: 'Audio',
              image: '/images/products/varun-gaba-dcgB3CgidlU-unsplash.jpg'
            },
            {
              id: 9,
              name: 'Professional Camera',
              price: 1299.99,
              category: 'Photography',
              image: '/images/products/charlesdeluvio-3IMl0kCxpHQ-unsplash.jpg'
            },
            {
              id: 10,
              name: 'Gaming Laptop',
              price: 1499.99,
              category: 'Computers',
              image: '/images/products/daniel-korpai-wW7XbWYoqK8-unsplash.jpg'
            },
            {
              id: 11,
              name: 'Smart Home Hub',
              price: 199.99,
              category: 'Smart Home',
              image: '/images/products/galina-n-miziNqvJx5M-unsplash.jpg'
            },
            {
              id: 12,
              name: 'Wireless Charger',
              price: 49.99,
              category: 'Accessories',
              image: '/images/products/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg'
            }
          ].map((product) => (
            <motion.div 
              key={product.id}
              className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full"
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: 'spring', stiffness: 100 }
                },
                hidden: { 
                  opacity: 0, 
                  y: 20,
                  transition: { type: 'spring', stiffness: 100 }
                }
              }}
            >
              <Link href={`/products/${product.id}`} className="block h-full">
                <div className="relative h-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-0 right-0 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {wishlist.includes(product.id) ? (
                      <HeartIconSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIconOutline className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Add to Cart
                      <ShoppingCartIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Flash Sales Section */}
      <FlashSales />
    </div>
  );
}
