'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { FiArrowLeft, FiCheckCircle, FiLock, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { cart, totalPrice, itemCount, openCart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && cart.length === 0 && !orderComplete) {
      const timer = setTimeout(() => router.push('/shop'), 100);
      return () => clearTimeout(timer);
    }
  }, [cart, orderComplete, router, isClient]);

  const handleOrderComplete = (orderId: string) => {
    setOrderNumber(orderId);
    setOrderComplete(true);
    clearCart();
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <FiShoppingCart className="h-8 w-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FiCheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">Thank you for your order!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your order number is <span className="font-medium text-indigo-600">#{orderNumber}</span>
          </p>
          <p className="mt-2 text-gray-600">
            We've sent you an email with your order confirmation and will notify you when your order has shipped.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/shop"
              className="w-full sm:w-auto flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default: show checkout page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-4 text-xl">Complete your purchase securely and easily.</p>
        </div>
      </div>

      {/* Back to Cart Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <button
          onClick={openCart}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          <FiArrowLeft className="mr-1 h-4 w-4" /> Back to Cart
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-span-1">
            <CheckoutForm 
              activeStep={activeStep} 
              setActiveStep={setActiveStep} 
              onOrderComplete={handleOrderComplete} 
            />
            <div className="mt-8 border-t border-gray-200 pt-6 flex items-center justify-center text-sm text-gray-500">
              <FiLock className="h-4 w-4 mr-1.5" /> Secure checkout with SSL encryption
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
