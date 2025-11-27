'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/use-cart';
import CartPanel from './shop/CartPanel';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { name: 'Home', icon: HomeIcon, href: '/' },
  { name: 'Shop', icon: ShoppingBagIcon, href: '/shop' },
  { name: 'Cart', icon: ShoppingCartIcon, href: '/cart' },
  { name: 'Profile', icon: UserIcon, href: '/profile' },
];

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('Home');
  const { itemCount, isCartOpen, openCart, closeCart } = useCart();
  const { user } = useAuth();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  // Update active item based on current path
  useEffect(() => {
    const currentItem = navItems.find(item => 
      pathname === item.href || 
      (item.href !== '/' && pathname.startsWith(item.href))
    );
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [pathname]);

  const handleItemClick = (name: string, href: string) => {
    setActiveItem(name);
    
    // Redirect to login if user tries to access profile without being logged in
    if (name === 'Profile' && !user) {
      router.push('/login');
      return;
    }
    
    // Handle cart click
    if (name === 'Cart') {
      openCart();
      return;
    }
    
    // Navigate to the href for other items
    router.push(href);
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <nav className="relative">
          <div className="bg-white/20 backdrop-blur-lg rounded-full shadow-lg overflow-hidden border border-white/20 p-3 backdrop-saturate-150">
            <div className="flex items-center justify-between px-4">
              <div className="flex-shrink-0 mr-6">
                <Link href="/">
                  <img 
                    src="/images/assets/Asset 10FAIRBID.png" 
                    alt="FAIRBID Logo" 
                    className="h-8 w-auto hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleItemClick(item.name, item.href)}
                      className={`p-3 rounded-full transition-colors ${
                        activeItem === item.name ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label={item.name}
                    >
                      <item.icon className="h-6 w-6" />
                      {item.name === 'Cart' && itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                          {itemCount}
                        </span>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      
      <CartPanel isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
