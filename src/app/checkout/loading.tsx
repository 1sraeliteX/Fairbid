export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-900">Loading checkout...</p>
        <p className="mt-1 text-sm text-gray-500">Please wait while we prepare your order.</p>
      </div>
    </div>
  );
}
