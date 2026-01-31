"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiPhone, FiMessageCircle, FiMinus, FiPlus, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useAuthModal } from '@/components/AuthModalProvider';
import { getFavorites } from '@/utils/favorites';

interface ProductImage {
  id: number;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number;
  discount: number;
  category: string;
  stock_quantity: number;
  is_active: boolean;
  is_new: boolean;
  product_images: ProductImage[];
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images';
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { open } = useAuthModal();

  const images = product.product_images || [];
  const selectedImage = images[selectedImageIndex];
  const inStock = product.stock_quantity > 0;
  const savings = product.original_price - product.price;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', { productId: product.id, quantity });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    handleAddToCart();
    // Redirect to checkout
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-600">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-amber-600 capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              {selectedImage ? (
                <Image
                  src={`${R2_PUBLIC_URL}/${selectedImage.image_url}`}
                  alt={selectedImage.alt_text || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              {/* Favorite Button */}
              <button
                onClick={handleFavorite}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              >
                <FiHeart
                  className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}`}
                />
              </button>

              {/* New Badge */}
              {product.is_new && (
                <span className="absolute top-4 left-4 bg-amber-800 text-white text-xs px-2 py-1 rounded z-10">
                  NEW
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? 'border-amber-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={`${R2_PUBLIC_URL}/${image.image_url}`}
                      alt={image.alt_text || `${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) 24 reviews</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.original_price > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {savings > 0 && (
                <p className="text-sm text-green-600 font-medium mt-1">
                  You save ₹{savings.toLocaleString()}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className={`p-3 rounded-lg ${inStock ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-medium">
                {inStock ? `✓ In Stock (${product.stock_quantity} available)` : '✗ Out of Stock'}
              </p>
            </div>

            {/* Short Description */}
            {product.description && (
              <div className="prose prose-sm text-gray-600">
                <p>{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            {inStock && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-0 focus:ring-0"
                    min="1"
                    max={product.stock_quantity}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  inStock
                    ? 'bg-amber-800 text-white hover:bg-amber-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart className="inline mr-2" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Buy Now
              </button>

              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center py-3 px-4 border border-amber-800 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <FiPhone className="mr-2" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20this%20product"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-3 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <FiMessageCircle className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <FiTruck className="w-5 h-5 text-amber-800" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                  <p className="text-xs text-gray-500">Within Chennai</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="w-5 h-5 text-amber-800" />
                <div>
                  <p className="text-sm font-medium text-gray-900">1 Year Warranty</p>
                  <p className="text-xs text-gray-500">Manufacturer Warranty</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiRefreshCw className="w-5 h-5 text-amber-800" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">7 Days Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="prose prose-sm text-gray-600">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p>No description available for this product.</p>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Product ID</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">{inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 text-amber-800 hover:text-amber-900"
                >
                  <FiPhone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </a>
                <p className="text-sm text-gray-600">
                  Monday - Saturday: 10AM - 8PM<br />
                  Sunday: 11AM - 6PM
                </p>
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About Murugan Furniture</h3>
              <p className="text-sm text-gray-600">
                Trusted furniture and home appliances store in Chennai since 1995. We offer quality products at affordable prices with excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
