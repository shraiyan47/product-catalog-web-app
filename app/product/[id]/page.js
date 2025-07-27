import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { getProductById } from "../../lib/products"
import ProductActions from "./ProductActions"

export default async function ProductDetail({ params }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-lg text-gray-600">
                    {product.rating.rate} out of 5 ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            )}

            <p className="text-4xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}
