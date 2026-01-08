"use client";
// components/SearchResults.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiStar,
  FiShoppingCart,
  FiHeart
} from 'react-icons/fi';
import Header from './Header';
import Footer from './Footer';
import { isFavorite, toggleFavorite } from '../utils/favorites';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number;
  discount: number;
  rating: number;
  review_count: number;
  image_url: string;
  free_delivery: boolean;
  is_new: boolean;
  category: string;
}

const SearchResults = ({
  initialProducts,
  category,
}: {
  initialProducts: Product[];
  category: string;
}) => {
  const selectedCategory = category;
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'Living Room');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const categories = [
    { name: 'Living Room', icon: '🛋️' },
    { name: 'Bedroom', icon: '🛏️' },
    { name: 'Dining & Kitchen', icon: '🍽️' },
    { name: 'Home Appliances', icon: '🔌' },
    { name: 'Office Furniture', icon: '🪑' },
    { name: 'Outdoor', icon: '🌿' }
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "discount", label: "Discount" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" }
  ];

  const getSafeImageSrc = (imageUrl?: string) => {
    if (
      typeof imageUrl === 'string' &&
      imageUrl.startsWith('https://') &&
      !imageUrl.includes('YOUR_IMAGE_URL')
    ) {
      return imageUrl;
    }

    return '/placeholder.png';
  };

  useEffect(() => {
    const updateFavorites = () => {
      const favoriteIds = new Set<number>();
      filteredProducts.forEach(product => {
        if (isFavorite(product.id)) {
          favoriteIds.add(product.id);
        }
      });
      setFavorites(favoriteIds);
    };

    updateFavorites();
    
    const handleStorageChange = () => {
      updateFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [filteredProducts]);

  const handleFavoriteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(product.id)) {
        newFavorites.delete(product.id);
      } else {
        newFavorites.add(product.id);
      }
      return newFavorites;
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    const filtered = initialProducts.filter(product =>
      product.category.toLowerCase().includes(categoryName.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer">
      <div className="relative">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={getSafeImageSrc(product.image_url)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        </div>
        <button 
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          onClick={(e) => handleFavoriteClick(product, e)}
        >
          <FiHeart 
            className={`transition-colors ${
              favorites.has(product.id) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>
        {product.is_new && (
          <span className="absolute top-2 left-2 bg-amber-800 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <span className="text-white text-sm font-medium">View Similar</span>
        </div>
      </div>

      <div className="p-4">

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
              ({product.review_count.toLocaleString()})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">₹{product.original_price}</span>
              <span className="text-sm text-amber-800 font-bold ml-2">{product.discount}% off</span>
            </div>
          </div>
          <button className="bg-amber-800 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Categories Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <h2 className="font-bold text-lg mb-6">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeCategory === category.name
                        ? 'bg-amber-100 text-amber-700 border border-amber-300'
                        : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="mb-6">
                <nav className="text-sm text-gray-500">
                  <span>Home / </span>
                  <span>Search Results / </span>
                  <span className="text-gray-900">{activeCategory}</span>
                </nav>
              </div>

              {/* Product Count & Sort Info */}
              <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Showing 1-{filteredProducts.length} of {filteredProducts.length} products for &quot;{activeCategory}&quot;
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-2 border border-amber-800 rounded-lg hover:bg-"
                      >
                        <FiFilter className="text-amber-800" />
                        <span className="text-amber-800">Filters</span>
                      </button>
                      <div className="flex items-center border border-amber-800 rounded-lg divide-x">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 ${viewMode === 'grid' ? 'bg-amber-800' : ''}`}
                        >
                          <FiGrid className="text-amber-800" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 ${viewMode === 'list' ? 'bg-amber-800' : ''}`}
                        >
                          <FiList className="text-amber-800 " />
                        </button>
                      </div>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none bg-white border border-amber-800 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              <span className="text-amber-800"> Sort by: </span> {option.label}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-3 text-amber-800 pointer-events-none" />
                      </div>
                    </div>
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
                {filteredProducts.map((product) => (
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
        </div >
      </div >
      <Footer />
    </>
  );
};

export default SearchResults;