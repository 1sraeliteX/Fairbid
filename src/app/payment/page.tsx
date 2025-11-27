'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCreditCard, FiGlobe, FiDollarSign, FiLock, FiArrowLeft, FiCopy, FiChevronDown } from 'react-icons/fi';
import { FaBitcoin } from 'react-icons/fa';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Fetch the amount from URL params
  useEffect(() => {
    const amountParam = searchParams.get('amount');
    if (amountParam) {
      setAmount(parseFloat(amountParam));
    }
  }, [searchParams]);

  // Format amount as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Calculate Bitcoin amount (mock conversion rate)
  const getBitcoinAmount = (usd: number) => {
    // Using a mock conversion rate of 1 BTC = 50000 USD
    const btcAmount = usd / 50000;
    return btcAmount.toFixed(8);
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: <FiCreditCard className="h-6 w-6 text-indigo-600" />,
      description: 'Pay with Visa, Mastercard, American Express, or other cards',
    },
    {
      id: 'internet-banking',
      name: 'Internet Banking',
      icon: <FiGlobe className="h-6 w-6 text-blue-600" />,
      description: 'Direct bank transfer from your online banking',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FiDollarSign className="h-6 w-6 text-blue-400" />,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      icon: <FaBitcoin className="h-6 w-6 text-orange-500" />,
      description: 'Pay with Bitcoin or other cryptocurrencies',
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, you would handle the payment processing here
      // and then redirect to a success page
      router.push('/checkout?success=true');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Payment</h1>
            <p className="mt-2 text-lg md:text-xl text-indigo-100">Complete your purchase securely and easily</p>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          <FiArrowLeft className="mr-1 h-4 w-4" /> Back to checkout
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Payment Method</h2>
          <p className="text-gray-600">Choose your preferred payment option to complete your purchase</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedMethod === method.id ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50">
                        {method.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={selectedMethod === method.id}
                        onChange={() => {}}
                        className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedMethod === 'credit-card' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      name="card-name"
                      placeholder="John Doe"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'internet-banking' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Internet Banking</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You will be redirected to your bank's secure payment page to complete the transaction.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <div className="relative">
                      <div 
                        className={`relative w-full bg-white border border-gray-300 rounded-lg shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-black`}
                      >
                        <select
                          id="bank"
                          name="bank"
                          className="block w-full h-12 pl-4 pr-12 py-3 text-base font-medium text-gray-800 bg-transparent border-none focus:ring-0 focus:outline-none appearance-none"
                        >
                          <option value="" disabled className="text-gray-400">Select your bank</option>
                          <option value="chase" className="text-gray-900">Chase Bank</option>
                          <option value="bankofamerica" className="text-gray-900">Bank of America</option>
                          <option value="wellsfargo" className="text-gray-900">Wells Fargo</option>
                          <option value="citibank" className="text-gray-900">Citibank</option>
                          <option value="usbank" className="text-gray-900">U.S. Bank</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <FiChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'paypal' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pay with PayPal</h3>
                <p className="text-sm text-gray-600 mb-6">
                  You will be redirected to PayPal to complete your purchase securely.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-xs mx-auto"
                >
                  Continue to PayPal
                </button>
              </div>
            )}

            {selectedMethod === 'bitcoin' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pay with Bitcoin</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Send the exact amount to the following Bitcoin address:
                </p>
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">Bitcoin Address:</span>
                    <button 
                      onClick={() => copyToClipboard('3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                      title="Copy to clipboard"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                      <FiCopy className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-4">
                    <code className="text-sm font-mono break-all text-black">3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5</code>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Amount (USD)</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(amount)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Amount (BTC)</div>
                      <div className="text-sm font-medium text-gray-900">
                        {amount > 0 ? getBitcoinAmount(amount) : '0.00000000'} BTC
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please send the exact amount. The payment will be processed after 3 confirmations on the blockchain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              <p>By completing your purchase, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>.</p>
            </div>
            <button
              type="button"
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                !selectedMethod || isProcessing
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiLock className="mr-2 h-5 w-5" />
                  Complete Payment
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <FiLock className="h-4 w-4 text-gray-400 mr-2" />
          <span>Secure payment processing powered by our payment partners</span>
        </div>
      </div>
    </div>
  );
}
