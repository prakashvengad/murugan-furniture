"use client";
// components/SearchResults.tsx
import React, { useState } from 'react';
import { 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiStar, 
  FiShoppingCart,
  FiHeart,
  FiTruck
} from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  freeDelivery: boolean;
  isNew: boolean;
  category: string;
}

const SearchResults = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Remote Control Toy Car Set",
      description: "4WD High Speed Stunt Car with LED Lights",
      price: 499,
      originalPrice: 1299,
      discount: 62,
      rating: 4.3,
      reviewCount: 1245,
      image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400&h=400&fit=crop",
      freeDelivery: true,
      isNew: true,
      category: "Remote Control Cars"
    },
    {
      id: 2,
      name: "Die Cast Metal Car Collection",
      description: "1:24 Scale Model Cars with Display Case",
      price: 799,
      originalPrice: 1999,
      discount: 60,
      rating: 4.5,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop",
      freeDelivery: true,
      isNew: false,
      category: "Model Cars"
    },
    {
      id: 3,
      name: "Car Wall Sticker Decals",
      description: "3D Vinyl Stickers for Home & Office Decor",
      price: 199,
      originalPrice: 499,
      discount: 60,
      rating: 4.1,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w-400&h=400&fit=crop",
      freeDelivery: false,
      isNew: true,
      category: "Car Decor"
    },
    {
      id: 4,
      name: "Car-Shaped Backpack",
      description: "Kids School Bag with Wheels and Horn Sound",
      price: 699,
      originalPrice: 1499,
      discount: 53,
      rating: 4.4,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      freeDelivery: true,
      isNew: false,
      category: "Car Accessories"
    },
    {
      id: 5,
      name: "Car Print T-Shirt",
      description: "Premium Cotton T-Shirt with Sports Car Design",
      price: 299,
      originalPrice: 799,
      discount: 63,
      rating: 4.2,
      reviewCount: 789,
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
      freeDelivery: true,
      isNew: true,
      category: "Apparel"
    },
    {
      id: 6,
      name: "Car-Themed Bed Sheet Set",
      description: "Double Bedsheet with Car Prints for Kids Room",
      price: 899,
      originalPrice: 1999,
      discount: 55,
      rating: 4.0,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      freeDelivery: true,
      isNew: false,
      category: "Home Decor"
    }
  ];

  const filters = [
    { name: "Category", options: ["Remote Control Cars", "Model Cars", "Car Decor", "Car Accessories", "Apparel", "Home Decor"] },
    { name: "Price", options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"] },
    { name: "Discount", options: ["10% and above", "20% and above", "30% and above", "50% and above"] },
    { name: "Rating", options: ["4★ & above", "3★ & above", "2★ & above"] },
    { name: "Delivery", options: ["Free Delivery", "Express Delivery"] }
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "discount", label: "Discount" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" }
  ];

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <FiHeart className="text-gray-600" />
        </button>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <span className="text-white text-sm font-medium">View Similar</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{product.category}</span>
          {product.freeDelivery && (
            <span className="flex items-center text-xs text-green-600">
              <FiTruck className="mr-1" /> Free
            </span>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <div className="flex items-center bg-green-100 text-green-800 text-xs px-1 rounded">
              <span className="font-bold">{product.rating}</span>
              <FiStar className="ml-1" size={12} />
            </div>
            <span className="text-xs text-gray-500 ml-2">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
              <span className="text-sm text-pink-600 font-bold ml-2">{product.discount}% off</span>
            </div>
          </div>
          <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Cars</h1>
              <span className="text-sm text-gray-500">10,000+ products</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FiFilter />
                <span>Filters</span>
              </button>
              <div className="flex items-center border rounded-lg divide-x">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <FiGrid />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <FiList />
                </button>
              </div>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Sort by: {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button className="text-pink-600 text-sm font-medium">Clear All</button>
              </div>
              
              {filters.map((filter, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-medium text-gray-900 mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option, idx) => (
                      <label key={idx} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded text-pink-600 focus:ring-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {index < filters.length - 1 && (
                    <div className="border-t my-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="text-sm text-gray-500">
                <span>Home / </span>
                <span>Search Results / </span>
                <span className="text-gray-900">Cars</span>
              </nav>
            </div>

            {/* Product Count & Sort Info */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Showing 1-{products.length} of 10,000+ products for &quot;Cars&quot;
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Sorted by:</span>
                  <span className="font-medium">
                    {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={`
              grid gap-6
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'}
            `}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="bg-white border border-gray-300 rounded-lg px-8 py-3 hover:bg-gray-50 transition-colors font-medium">
                Load More Products
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Related Searches</h2>
              <div className="flex flex-wrap gap-2">
                {['toy cars', 'car accessories', 'car decor', 'rc cars', 'model cars', 'car gifts'].map((tag) => (
                  <a 
                    key={tag}
                    href="#"
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;