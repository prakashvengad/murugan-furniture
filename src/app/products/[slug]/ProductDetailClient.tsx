"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiTruck,
  FiRotateCcw,
  FiCheck,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiShare2,
  FiAlertCircle,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiPhone,
  FiMessageCircle
} from 'react-icons/fi';

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  category: string;
  brand?: string;
  color?: string;
  ideal_for?: string;
  rating?: number;
  review_count?: number;
  stock_count?: number;
  is_new?: boolean;
  image_url?: string;
  seller?: {
    name: string;
    rating?: number;
    return_policy?: string;
  };
  details?: Record<string, any>;
  delivery?: {
    estimated_date?: string;
    cutoff_time?: string;
    cod_available?: boolean;
  };
}

interface ProductDetailClientProps {
  product: Product;
  productImages: ProductImage[];
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, productImages, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [pincode, setPincode] = useState('');

  // Get all available images (fallback to main image if no gallery images)
  const allImages = productImages.length > 0 
    ? productImages.map(img => img.image_url)
    : product.image_url 
      ? [product.image_url] 
      : ['/placeholder-product.jpg'];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        size={16}
      />
    ));
  };

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      alert(`Delivery available to ${pincode} by ${product.delivery?.estimated_date || '3-5 business days'}`);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  };

  const handleAddToCart = () => {
    if (product.stock_count === 0) {
      alert('This product is out of stock');
      return;
    }
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    if (product.stock_count === 0) {
      alert('This product is out of stock');
      return;
    }
    alert(`Proceeding to buy ${quantity} x ${product.name}`);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in ${product.name}. Can you provide more details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-700">Home</Link>
            <FiChevronRight className="mx-2" size={14} />
            <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-amber-700">
              {product.category}
            </Link>
            <FiChevronRight className="mx-2" size={14} />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={allImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {discount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded block">
                      {discount}% OFF
                    </span>
                  )}
                  {product.is_new && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded block">
                      NEW
                    </span>
                  )}
                  {product.stock_count === 0 && (
                    <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded block">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <FiHeart className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto py-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-amber-600' : 'border-gray-200'}`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Services */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-700 hover:text-amber-700">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
                <div className="flex items-center text-green-600">
                  <FiRotateCcw className="mr-2" />
                  <span className="text-sm">{product.seller?.return_policy || '7 days return policy'}</span>
                </div>
                <button className="flex items-center text-blue-600">
                  <FiAlertCircle className="mr-2" />
                  <span className="text-sm">Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title & Brand */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              {product.brand && (
                <p className="text-gray-600 mt-2">Brand: <span className="font-medium">{product.brand}</span></p>
              )}
              {product.rating && (
                <div className="flex items-center mt-4">
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                    <span className="font-bold mr-1">{product.rating}</span>
                    {renderStars(product.rating)}
                  </div>
                  <span className="mx-3 text-gray-400">|</span>
                  <span className="text-gray-600">
                    {product.review_count || 0} ratings & {Math.floor((product.review_count || 0) * 0.65)} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="ml-3 text-xl text-gray-500 line-through">₹{product.original_price}</span>
                    <span className="ml-3 text-lg font-bold text-red-600">{discount}% off</span>
                  </>
                )}
              </div>
              {product.stock_count > 0 ? (
                <p className="text-green-600 font-medium mt-2">In stock - {product.stock_count} units available</p>
              ) : (
                <p className="text-red-600 font-medium mt-2">Out of stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <FiMinus size={16} />
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_count || 1, quantity + 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={quantity >= (product.stock_count || 1)}
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* Delivery Check */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Delivery</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  maxLength={6}
                />
                <button
                  onClick={handleCheckDelivery}
                  className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
                >
                  Check
                </button>
              </div>
              {product.delivery?.estimated_date && (
                <p className="text-sm text-gray-600 mt-2">
                  Estimated delivery by {product.delivery.estimated_date}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t py-4 mt-8 lg:mt-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock_count === 0}
                  className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all ${product.stock_count === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-md'
                    }`}
                >
                  ADD TO CART
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={product.stock_count === 0}
                  className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all ${product.stock_count === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-700 text-white hover:bg-amber-800 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center justify-center">
                    <FiShoppingBag className="mr-3" size={20} />
                    BUY NOW
                  </div>
                </button>
              </div>
              
              {/* Offline CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleCallClick}
                  className="flex-1 py-3 px-6 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 flex items-center justify-center"
                >
                  <FiPhone className="mr-2" />
                  Call Us
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex-1 py-3 px-6 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 flex items-center justify-center"
                >
                  <FiMessageCircle className="mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tab Navigation */}
          <div className="border-b">
            <nav className="flex flex-wrap gap-4 md:gap-8">
              {[
                { id: 'details', label: 'Product Details' },
                { id: 'description', label: 'Description' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium transition-colors ${activeTab === tab.id
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-gray-600 hover:text-amber-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white border rounded-b-lg shadow-sm">
            {/* Product Details */}
            {activeTab === 'details' && product.details && (
              <div className="p-6">
                <h3 className="font-bold text-xl mb-6">Specifications</h3>
                <table className="w-full">
                  <tbody className="divide-y">
                    {Object.entries(product.details).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-3 text-gray-600 w-1/3 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="py-3 font-medium">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Description */}
            {activeTab === 'description' && (
              <div className="p-6">
                <h3 className="font-bold text-xl mb-6">Product Description</h3>
                <div className="prose max-w-none text-gray-700">
                  {product.description ? (
                    <p>{product.description}</p>
                  ) : (
                    <p>No description available for this product.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.image_url || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {relatedProduct.is_new && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{relatedProduct.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold text-gray-900">₹{relatedProduct.price}</span>
                        {relatedProduct.original_price && (
                          <>
                            <span className="ml-2 text-sm text-gray-500 line-through">₹{relatedProduct.original_price}</span>
                            <span className="ml-2 text-sm font-bold text-red-600">
                              {Math.round(((relatedProduct.original_price - relatedProduct.price) / relatedProduct.original_price) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
