export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  seller: string;
}

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Sports',
  'Toys',
  'Books',
  'Other'
] as const;

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'rating', label: 'Top Rated' },
];

// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-noise-canceling-headphones',
    description: 'Experience crystal-clear sound with industry-leading noise cancellation technology. Perfect for music lovers and professionals alike.',
    price: 249.99,
    originalPrice: 299.99,
    images: [
      {
        id: '1-1',
        url: '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg',
        alt: 'Wireless Noise-Canceling Headphones front view'
      },
      {
        id: '1-2',
        url: '/images/products/varun-gaba-dcgB3CgidlU-unsplash.jpg',
        alt: 'Wireless Noise-Canceling Headphones side view'
      }
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1245,
    inStock: true,
    featured: true,
    tags: ['wireless', 'bluetooth', 'noise-canceling', 'audio'],
    colors: ['black', 'silver', 'blue']
  },
  {
    id: 2,
    name: '4K Ultra HD Smart TV',
    slug: '4k-ultra-hd-smart-tv',
    description: 'Stunning 4K resolution with smart features and voice control. Bring the theater experience home.',
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      {
        id: 'tv-1',
        url: '/images/products/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg',
        alt: 'Large 4K TV mounted on a wall'
      }
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 278,
    inStock: true,
    featured: true,
    tags: ['tv', '4k', 'smart-tv']
  },
  {
    id: 3,
    name: 'Premium Leather Wallet',
    slug: 'premium-leather-wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and RFID protection.',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      {
        id: 'wallet-1',
        url: '/images/products/mitzie-organics-dnstpPqCBbw-unsplash.jpg',
        alt: 'Premium Leather Wallet front view'
      },
      {
        id: 'wallet-2',
        url: '/images/products/varun-gaba-dcgB3CgidlU-unsplash.jpg',
        alt: 'Premium Leather Wallet open view'
      }
    ],
    category: 'Fashion',
    rating: 4.6,
    reviewCount: 324,
    inStock: true,
    tags: ['accessories', 'leather', 'wallet', 'rfid'],
    colors: ['brown', 'black']
  },
  {
    id: 4,
    name: 'Gaming Laptop Pro',
    slug: 'gaming-laptop-pro',
    description: 'High-performance gaming laptop with the latest graphics and fast refresh rate display.',
    price: 1599.99,
    originalPrice: 1799.99,
    images: [
      {
        id: 'laptop-1',
        url: '/images/products/daniel-korpai-wW7XbWYoqK8-unsplash.jpg',
        alt: 'Gaming laptop with RGB keyboard'
      }
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    featured: true,
    tags: ['gaming', 'laptop', 'performance']
  },
  {
    id: 5,
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'Premium sound quality with active noise cancellation and comfortable fit for all-day wear.',
    price: 179.99,
    originalPrice: 199.99,
    images: [
      {
        id: 'earbuds-1',
        url: '/images/products/kiran-ck-LSNJ-pltdu8-unsplash.jpg',
        alt: 'White wireless earbuds in a case'
      }
    ],
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 287,
    inStock: true,
    tags: ['wireless', 'earbuds', 'audio']
  },
  {
    id: 6,
    name: 'Premium Smartphone Pro',
    slug: 'premium-smartphone-pro',
    description: 'The latest flagship smartphone with a stunning display and powerful performance.',
    price: 899.99,
    originalPrice: 999.99,
    images: [
      {
        id: 'phone-1',
        url: '/images/products/mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
        alt: 'Black smartphone on a table'
      }
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 356,
    inStock: true,
    featured: true,
    tags: ['smartphone', 'flagship', 'camera']
  },
  {
    id: 7,
    name: 'Yoga Mat',
    slug: 'yoga-mat',
    description: 'Eco-friendly, non-slip yoga mat with carrying strap. Perfect for all types of yoga and exercises.',
    price: 39.99,
    images: [
      {
        id: 'camera-1',
        url: '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg',
        alt: 'DSLR Camera with lens'
      },
      {
        id: 'camera-2',
        url: '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg',
        alt: 'DSLR Camera side view'
      }
    ],
    category: 'Sports',
    rating: 4.7,
    reviewCount: 789,
    inStock: true,
    tags: ['yoga', 'fitness', 'exercise', 'mat'],
    colors: ['purple', 'blue', 'green', 'pink']
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Portable Bluetooth speaker with 20-hour battery life and waterproof design. Perfect for outdoor adventures.',
    price: 79.99,
    originalPrice: 99.99,
    inStock: true,
    featured: true,
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 256,
    tags: ['speaker', 'bluetooth', 'portable', 'audio'],
    colors: ['black', 'blue', 'red'],
    images: [
      {
        id: 'laptop-1',
        url: '/images/products/daniel-korpai-wW7XbWYoqK8-unsplash.jpg',
        alt: 'Thin and Light Laptop'
      }
    ],
  },
  {
    id: 9,
    name: 'Fitness Tracker',
    slug: 'fitness-tracker',
    description: 'Track your workouts, heart rate, and sleep patterns with this advanced fitness tracker.',
    price: 99.99,
    originalPrice: 129.99,
    images: [
      {
        id: 'tracker-1',
        url: '/images/products/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg',
        alt: 'Fitness tracker on a wrist'
      },
      {
        id: 'watch-1',
        url: '/images/products/mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
        alt: 'Smart Watch on wrist'
      },
      {
        id: 'tracker-3',
        url: '/images/products/galina-n-miziNqvJx5M-unsplash.jpg',
        alt: 'Smart Watch display'
      }
    ],
    category: 'Wearables',
    rating: 4.4,
    reviewCount: 312,
    inStock: true,
    tags: ['smartwatch', 'wearable', 'fitness', 'tech'],
    colors: ['black', 'silver', 'gold']
  }
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

// Helper function to get featured products
export const getFeaturedProducts = (count: number = 4): Product[] => {
  return products
    .filter(product => product.featured)
    .slice(0, count);
};

// Helper function to get related products
export const getRelatedProducts = (currentProductId: number, count: number = 4): Product[] => {
  const currentProduct = products.find(p => p.id === currentProductId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== currentProductId && 
      (product.category === currentProduct.category || 
       product.tags?.some(tag => currentProduct.tags?.includes(tag)))
    )
    .slice(0, count);
};
