const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create necessary directories
const dirs = [
  'src/components/ui',
  'src/components/layout',
  'src/components/forms',
  'src/components/products',
  'src/components/cart',
  'src/hooks',
  'src/utils',
  'src/constants',
  'src/types',
  'src/features'
];

// Create directories
console.log('Creating directories...');
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Move components to appropriate locations
const componentMappings = {
  // Layout components
  'Navbar.tsx': 'src/components/layout/Navbar.tsx',
  'Footer.tsx': 'src/components/layout/Footer.tsx',
  
  // UI components
  'ProductCard.tsx': 'src/components/ui/ProductCard.tsx',
  'ProductSpotlight.tsx': 'src/components/ui/ProductSpotlight.tsx',
  'ProductGrid.tsx': 'src/components/ui/ProductGrid.tsx',
  
  // Form components
  'AmountInput.tsx': 'src/components/forms/AmountInput.tsx',
  'AmountInputExample.tsx': 'src/components/forms/AmountInputExample.tsx',
  'AmountInputTest.tsx': 'src/components/forms/AmountInputTest.tsx',
  'CountryStateSelect.tsx': 'src/components/forms/CountryStateSelect.tsx',
  
  // Product components
  'ProductDetails.tsx': 'src/components/products/ProductDetails.tsx'
};

// Move files
console.log('\nMoving files...');
Object.entries(componentMappings).forEach(([src, dest]) => {
  const srcPath = path.join(__dirname, '..', 'src', 'components', src);
  const destPath = path.join(__dirname, '..', dest);
  
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
    console.log(`Moved: ${src} -> ${dest}`);
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});

// Create index files for better imports
const createIndexFiles = () => {
  const indexFiles = [
    {
      path: 'src/components/ui/index.ts',
      content: `// UI Components
export * from './ProductCard';
export * from './ProductSpotlight';
export * from './ProductGrid';
`
    },
    {
      path: 'src/components/forms/index.ts',
      content: `// Form Components
export * from './AmountInput';
export * from './CountryStateSelect';
`
    },
    {
      path: 'src/components/layout/index.ts',
      content: `// Layout Components
export * from './Navbar';
export * from './Footer';
`
    },
    {
      path: 'src/components/products/index.ts',
      content: `// Product Components
export * from './ProductDetails';
`
    },
    {
      path: 'src/components/index.ts',
      content: `// Re-export all components
export * from './ui';
export * from './forms';
export * from './layout';
export * from './products';
`
    }
  ];

  console.log('\nCreating index files...');
  indexFiles.forEach(({ path: filePath, content }) => {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.writeFileSync(fullPath, content);
    console.log(`Created: ${filePath}`);
  });
};

// Run the index file creation
createIndexFiles();

console.log('\nReorganization complete!');
console.log('Please update your imports to use the new paths.');
