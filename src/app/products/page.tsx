import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <Link 
            href="/sell" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sell an Item
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Product {i}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${i}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    Product Name {i}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Category {i}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">${(99.99 + i * 10).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
