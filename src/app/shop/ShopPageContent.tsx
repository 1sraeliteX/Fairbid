'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products, categories, sortOptions, type Product } from '@/data/products';
import { FiFilter, FiX, FiChevronDown, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/shop/ProductCard';

// Modern Price Range Slider Component with Multi-Thumb Slider
const PriceRangeSlider = ({
  min,
  max,
  value: [minVal, maxVal],
  onChange,
  step = 1
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}) => {
  const [minValue, setMinValue] = useState(minVal);
  const [maxValue, setMaxValue] = useState(maxVal);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValRef.current.value);
      
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxValue);
      
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  // Handle min value changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  // Handle max value changes
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  // Format price with currency symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mt-6">
      <div className="mb-1">
        <h4 className="text-sm font-medium text-gray-800 mb-4">Price Range</h4>
        
        {/* Price range display */}
        <div>
          {/* Slider container */}
          <div className="relative py-3 px-2">
            {/* Track */}
            <div className="absolute h-1 w-full bg-gray-200 rounded-full"></div>
            
            {/* Selected range */}
            <div 
              ref={range}
              className="absolute h-1 bg-blue-500 rounded-full"
            ></div>
            
            {/* Min thumb */}
            <div className="absolute w-full">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue}
                ref={minValRef}
                onChange={handleMinChange}
                className={`absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-blue-500 
                  [&::-webkit-slider-thumb]:shadow 
                  [&::-webkit-slider-thumb]:cursor-pointer 
                  [&::-webkit-slider-thumb]:pointer-events-auto`}
              />
            </div>
            
            {/* Max thumb */}
            <div className="absolute w-full">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue}
                ref={maxValRef}
                onChange={handleMaxChange}
                className={`absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-blue-500 
                  [&::-webkit-slider-thumb]:shadow 
                  [&::-webkit-slider-thumb]:cursor-pointer 
                  [&::-webkit-slider-thumb]:pointer-events-auto`}
              />
            </div>
            
            {/* Price display */}
            <div className="mt-4 text-center">
              <span className="text-sm font-medium text-gray-900">
                {formatPrice(minValue)} - {formatPrice(maxValue)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Price inputs */}
        <div className="mt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1.5">
                Min Price
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">$</span>
                </div>
                <input
                  type="number"
                  id="minPrice"
                  min={min}
                  max={maxValue - step}
                  value={minValue}
                  onChange={(e) => {
                    const value = Math.min(Number(e.target.value), maxValue - step);
                    setMinValue(value);
                    onChange([value, maxValue]);
                  }}
                  className="block w-full pl-8 pr-4 py-2.5 text-base font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex-shrink-0 flex items-end pb-2.5">
              <span className="text-gray-400 text-2xl font-light">—</span>
            </div>
            
            <div className="flex-1">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1.5">
                Max Price
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">$</span>
                </div>
                <input
                  type="number"
                  id="maxPrice"
                  min={minValue + step}
                  max={max}
                  value={maxValue}
                  onChange={(e) => {
                    const value = Math.max(Number(e.target.value), minValue + step);
                    setMaxValue(value);
                    onChange([minValue, value]);
                  }}
                  className="block w-full pl-8 pr-4 py-2.5 text-base font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
          
          {/* Price range display */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
              <span>Price Range: </span>
              <span className="font-bold ml-1">{formatPrice(minValue)} - {formatPrice(maxValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  selectedCategories, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minPrice,
  maxPrice
}: { 
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (min: number, max: number) => void;
  minPrice: number;
  maxPrice: number;
}) => {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:max-w-sm`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label="Close filters"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-2 px-4">
          {/* Categories Section */}
          <div className="py-4 border-b border-gray-200">
            <h4 className="text-base font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 -mr-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center py-1.5 px-2 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)}
                    onChange={() => onCategoryChange(category)}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range Section */}
          <div className="py-4 border-b border-gray-200">
            <PriceRangeSlider
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={([min, max]) => onPriceRangeChange(min, max)}
              step={1}
            />
          </div>
          
          {/* Apply Button (Mobile) */}
          <div className="md:hidden sticky bottom-0 bg-white py-3 border-t border-gray-200 -mx-4 px-4 mt-4">
            <button
              onClick={onClose}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shop Page Component
export default function ShopPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  
  // Create a URL with the updated search params
  const router = useRouter();
  
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set(name, value);
    return params.toString();
  }, [searchParams]);
  
  // State for filters
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  // Close sort dropdown when clicking outside
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get min and max prices from products
  const minPrice = 0;
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price), 1000) / 100) * 100;
  
  // Apply filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes('All') ||
                         selectedCategories.includes(product.category);
    
    // Filter by price range
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return categoryMatch && priceMatch;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id; // Assuming higher IDs are newer
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev.filter(c => c !== 'All'), category]
      );
    }
  };
  
  // Handle price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([Math.min(min, priceRange[1]), Math.max(max, priceRange[0])]);
  };
  
  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }
    
    if (sortBy !== 'featured') {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }
    
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      params.set('min_price', priceRange[0].toString());
      params.set('max_price', priceRange[1].toString());
    } else {
      params.delete('min_price');
      params.delete('max_price');
    }
    
    // Update URL without causing a page reload
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }, [selectedCategories, sortBy, priceRange, pathname, minPrice, maxPrice, searchParams]);
  
  // Read initial filters from URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Set categories
    const categoriesParam = params.get('categories');
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(','));
    }
    
    // Set sort
    const sortParam = params.get('sort');
    if (sortParam && sortOptions.some(opt => opt.value === sortParam)) {
      setSortBy(sortParam);
    }
    
    // Set price range
    const minPriceParam = params.get('min_price');
    const maxPriceParam = params.get('max_price');
    if (minPriceParam && maxPriceParam) {
      setPriceRange([
        Math.max(Number(minPriceParam), minPrice),
        Math.min(Number(maxPriceParam), maxPrice)
      ]);
    } else {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [searchParams, minPrice, maxPrice]);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Shop</h1>
          <p className="mt-4 text-xl max-w-3xl">
            Discover our amazing collection of products at the best prices.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="h-5 w-5" />
              Filters
            </button>
            
            <div className="relative w-48">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="group w-full flex items-center justify-between pl-4 pr-3 py-2.5 text-sm font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                aria-labelledby="sort-label"
              >
                <span id="sort-label">
                  {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by'}
                </span>
                <FiChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isSortOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsSortOpen(false)}
                    aria-hidden="true"
                  />
                  <ul
                    className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-all duration-100 ease-out origin-top-right"
                    role="listbox"
                    tabIndex={-1}
                    data-state={isSortOpen ? 'open' : 'closed'}
                  >
                    {sortOptions.map((option) => (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={sortBy === option.value}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${sortBy === option.value ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'}`}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="checkbox"
                      checked={selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              
              <PriceRangeSlider
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={handlePriceRangeChange}
                step={1}
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1-{sortedProducts.length}</span> of{' '}
                <span className="font-medium">{sortedProducts.length}</span> results
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-3 text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <div className="relative w-48" ref={sortDropdownRef}>
                  <button
                    type="button"
                    id="sort"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="group w-full flex items-center justify-between pl-4 pr-3 py-2.5 text-sm font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    aria-haspopup="listbox"
                    aria-expanded={isSortOpen}
                    aria-labelledby="sort-label"
                  >
                    <span id="sort-label">
                      {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by'}
                    </span>
                    <FiChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isSortOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isSortOpen && (
                    <ul
                      className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-all duration-100 ease-out origin-top-right"
                      role="listbox"
                      tabIndex={-1}
                      data-state={isSortOpen ? 'open' : 'closed'}
                    >
                      {sortOptions.map((option) => (
                        <li
                          key={option.value}
                          role="option"
                          aria-selected={sortBy === option.value}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${sortBy === option.value ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'}`}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <Link 
                    href={`/products/${product.slug}`} 
                    key={product.id} 
                    className="h-full transition-transform duration-200 hover:-translate-y-1"
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([minPrice, maxPrice]);
                      setSortBy('featured');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}
