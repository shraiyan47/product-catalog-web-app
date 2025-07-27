import ShimmerSkeleton from "./ShimmerSkeleton"

export default function ProductCardShimmer() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Shimmer */}
      <div className="relative">
        <ShimmerSkeleton className="w-full h-64" />
        {/* Heart icon shimmer */}
        <div className="absolute top-3 right-3">
          <ShimmerSkeleton className="w-9 h-9 rounded-full" />
        </div>
      </div>

      <div className="p-4">
        {/* Title Shimmer - 2 lines */}
        <div className="space-y-2 mb-2">
          <ShimmerSkeleton className="h-4 rounded w-full" />
          <ShimmerSkeleton className="h-4 rounded w-3/4" />
        </div>

        {/* Rating Shimmer */}
        <div className="flex items-center mb-2">
          <ShimmerSkeleton className="w-4 h-4 rounded mr-1" />
          <ShimmerSkeleton className="h-3 rounded w-24" />
        </div>

        {/* Price Shimmer */}
        <ShimmerSkeleton className="h-6 rounded w-20 mb-4" />

        {/* Button Shimmer */}
        <ShimmerSkeleton className="h-10 rounded w-full" />
      </div>
    </div>
  )
}
