export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative">
        <div className="w-full h-64 bg-gray-300"></div>
        {/* Heart icon skeleton */}
        <div className="absolute top-3 right-3 w-9 h-9 bg-gray-300 rounded-full"></div>
      </div>

      <div className="p-4">
        {/* Title Skeleton - 2 lines */}
        <div className="space-y-2 mb-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Price Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-20 mb-4"></div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  )
}
