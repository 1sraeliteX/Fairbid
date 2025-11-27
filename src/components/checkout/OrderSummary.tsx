'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { FiLock, FiTrash2 } from 'react-icons/fi';

export default function OrderSummary() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  // Calculate total price from cart items
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const shipping = 0; // Free shipping
  const taxRate = 0.1; // 10% tax
  const tax = totalPrice * taxRate;
  const orderTotal = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
        </div>
        <div className="px-4 py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Start adding some items to your cart.</p>
          <div className="mt-6">
            <a
              href="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-5 sm:p-6">
        <ul role="list" className="divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={product.id} className="py-4 flex">
              <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={product.images[0]?.url || '/images/placeholder.jpg'}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{product.name}</h3>
                    <p className="ml-4">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                  <div className="flex items-center">
                    <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-700">
                      Qty
                    </label>
                    <select
                      id={`quantity-${product.id}`}
                      name={`quantity-${product.id}`}
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                      className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary */}
        <div className="mt-8">
          <div className="space-y-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Shipping</p>
              <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Tax (10%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 pt-4 border-t border-gray-200">
              <p>Total</p>
              <p>${orderTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <FiLock className="h-5 w-5 text-gray-400" />
              <p className="ml-2 text-sm text-gray-500">Secure checkout with SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
