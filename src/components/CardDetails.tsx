"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
  FiMinus
} from 'react-icons/fi';

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [pincode, setPincode] = useState('');

  // Product data
  const product = {
    id: 'SFFHGEP3BVFHKKCH',
    name: 'BOLDFIT Men Flip Flops (Black, 7)',
    brand: 'BOLDFIT',
    color: 'Black',
    idealFor: 'Men',
    price: 589,
    originalPrice: 1999,
    discount: 70,
    rating: 4.6,
    reviewCount: 20,
    images: [
      '/placeholder-product.jpg',
      '/placeholder-product-2.jpg',
      '/placeholder-product-3.jpg',
      '/placeholder-product-4.jpg'
    ],
    seller: {
      name: 'RetailNet',
      rating: 4.3,
      returnPolicy: '10 days return policy'
    },
    details: {
      strapMaterial: 'Pu',
      soleMaterial: 'EVA',
      weight: '250 g',
      packOf: 1,
      netQuantity: 1,
      articleNumber: 'BasicSlidz',
      type: 'Flip Flops',
      euroSize: '42',
      size: '7 UK/India',
      character: 'None',
      brandColor: 'Black'
    },
    delivery: {
      estimatedDate: '3 Feb, Tuesday',
      cutoffTime: '2:51',
      codAvailable: true
    },
    offers: [
      'Bank Offer: 10% instant discount on ICICI Bank Credit Card',
      'Special Price: Get extra 10% off (price inclusive of cashback/coupon)',
      'Partner Offer: Buy this product and get 20% off on your next purchase',
      'T&C Apply'
    ]
  };

  const reviews = [
    {
      id: 1,
      rating: 5,
      user: 'prerana dixit',
      date: '11 days ago',
      text: 'I really liked these sleepers. They are comfortable to wear for long hours and do not hurt the feet. The material feels durable and the grip is also good. Perfect for daily wear at home.',
      location: 'Certified Buyer, Jaipur'
    },
    {
      id: 2,
      rating: 5,
      user: 'Raj',
      date: '1 day ago',
      text: 'I am really satisfied with these slippers. The material is soft, durable, and the sole provides excellent grip, making them perfect for daily use. They are very comfortable to wear for long hours without any foot pain. The fitting is perfect, and the design looks stylish and premium.',
      location: 'Certified Buyer, Panipat'
    },
    {
      id: 3,
      rating: 5,
      user: 'Yashu Pal',
      date: '6 days ago',
      text: 'These flip flops are super comfortable and soft. The cushions are really great and the design is awesome. I loved it and highly recommend this.',
      location: 'Certified Buyer, North Delhi'
    }
  ];

  const availableSizes = [
    '6 (Euro 40)',
    '7 (Euro 41)',
    '8 (Euro 42)',
    '9 (Euro 43)',
    '10 (Euro 44)',
    '11 (Euro 45)'
  ];

  const relatedProducts = [
    {
      id: 1,
      name: 'BOLDFIT Men Sports Sandals',
      price: 699,
      originalPrice: 1999,
      discount: 65,
      image: '/placeholder-related.jpg'
    },
    {
      id: 2,
      name: 'Nike Men Flip Flops',
      price: 1299,
      originalPrice: 2999,
      discount: 57,
      image: '/placeholder-related.jpg'
    },
    {
      id: 3,
      name: 'Adidas Adilette Slides',
      price: 1499,
      originalPrice: 3499,
      discount: 57,
      image: '/placeholder-related.jpg'
    },
    {
      id: 4,
      name: 'Puma Men Sandals',
      price: 899,
      originalPrice: 1999,
      discount: 55,
      image: '/placeholder-related.jpg'
    }
  ];

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
      alert(`Delivery available to ${pincode} by ${product.delivery.estimatedDate}`);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    alert(`Proceeding to buy ${quantity} x ${product.name} (Size: ${selectedSize})`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-amber-700">Home</a>
            <FiChevronRight className="mx-2" size={14} />
            <a href="#" className="hover:text-amber-700">Footwear</a>
            <FiChevronRight className="mx-2" size={14} />
            <a href="#" className="hover:text-amber-700">Men's Footwear</a>
            <FiChevronRight className="mx-2" size={14} />
            <a href="#" className="hover:text-amber-700">Flip Flops</a>
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded block">
                    {product.discount}% OFF
                  </span>
                  {product.details.packOf > 1 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded block">
                      Pack of {product.details.packOf}
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
            <div className="flex space-x-2 overflow-x-auto py-2">
              {product.images.map((img, index) => (
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

            {/* Services */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-700 hover:text-amber-700">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
                <div className="flex items-center text-green-600">
                  <FiRotateCcw className="mr-2" />
                  <span className="text-sm">{product.seller.returnPolicy}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <FiAlertCircle className="mr-2" />
                  <span className="text-sm">Report</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title & Brand */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-2">Brand: <span className="font-medium">{product.brand}</span></p>
              <div className="flex items-center mt-4">
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                  <span className="font-bold mr-1">{product.rating}</span>
                  {renderStars(product.rating)}
                </div>
                <span className="mx-3 text-gray-400">|</span>
                <span className="text-gray-600">
                  {product.reviewCount} ratings & {Math.floor(product.reviewCount * 0.65)} reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="ml-3 text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="ml-3 text-lg font-bold text-red-600">{product.discount}% off</span>
              </div>
              <p className="text-green-600 font-medium mt-2">Special price</p>
            </div>

            {/* Offers */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Available offers</h3>
              <ul className="space-y-3">
                {product.offers.map((offer, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {offer.includes('T&C') ? (
                        <FiAlertCircle className="text-gray-400 mr-2" />
                      ) : (
                        <FiCheck className="text-green-600 mr-2" />
                      )}
                    </div>
                    <span className={`${offer.includes('T&C') ? 'text-gray-500' : 'text-gray-700'}`}>
                      {offer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Seller</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{product.seller.name}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      <span className="font-bold mr-1">{product.seller.rating}</span>
                      {renderStars(product.seller.rating)}
                    </div>
                  </div>
                </div>
                <button className="text-amber-700 font-medium hover:underline">
                  See other sellers
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t py-4 mt-8 lg:mt-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all ${!selectedSize
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-md'
                    }`}
                >
                  ADD TO CART
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={!selectedSize}
                  className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all ${!selectedSize
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
                { id: 'reviews', label: 'Ratings & Reviews' },
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
            {activeTab === 'details' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
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
                  <div>
                    <h3 className="font-bold text-xl mb-6">Manufacturing, Packaging and Import Info</h3>
                    <div className="space-y-4 text-gray-700">
                      <p>Country of Origin: India</p>
                      <p>Manufactured and Packed by: BOLDFIT Lifestyle Pvt. Ltd.</p>
                      <p>Customer Care Address: BOLDFIT Lifestyle Pvt. Ltd., Mumbai, Maharashtra</p>
                      <p>Import Info: Not imported, manufactured locally</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-2xl">Customer Reviews</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                        <span className="text-2xl font-bold mr-2">{product.rating}</span>
                        <div>
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-sm">
                            {product.reviewCount} ratings & {reviews.length} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-amber-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800">
                    Write a review
                  </button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="ml-3 font-medium">{review.user}</span>
                        </div>
                        <span className="text-gray-500 text-sm mt-2 sm:mt-0">{review.date}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">{review.location}</span>
                        <button className="text-amber-700 text-sm font-medium hover:underline">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="border border-gray-300 rounded-lg px-8 py-3 hover:bg-gray-50 transition-colors font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}