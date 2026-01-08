"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiTrash2,
  FiGrid,
  FiList
} from 'react-icons/fi';
import Header from './Header';
import Footer from './Footer';
import { getFavorites, toggleFavorite } from '../utils/favorites';

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

const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favoriteProducts = getFavorites();
        setFavorites(favoriteProducts);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
    setFavorites(prev => prev.filter(p => p.id !== product.id));
  };

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
          onClick={(e) => handleToggleFavorite(product, e)}
        >
          <FiHeart className="text-red-500 fill-current hover:text-red-600 transition-colors" />
        </button>
        {product.is_new && (
          <span className="absolute top-2 left-2 bg-amber-800 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your favorites...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
                <p className="text-gray-600">
                  {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-amber-800 rounded-lg divide-x">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-amber-800' : ''}`}
                  >
                    <FiGrid className={viewMode === 'grid' ? 'text-white' : 'text-amber-800'} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-amber-800' : ''}`}
                  >
                    <FiList className={viewMode === 'list' ? 'text-white' : 'text-amber-800'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">My Favorites</span>
            </nav>
          </div>

          {/* Favorites Content */}
          {favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
              <p className="text-gray-600 mb-6">
                Start adding items to your wishlist by clicking the heart icon on products you love.
              </p>
              <Link 
                href="/"
                className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className={`
                grid gap-6 mb-8
                ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'}
              `}>
                {favorites.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Clear All Button */}
              <div className="text-center mb-8">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all favorites?')) {
                      localStorage.removeItem('murugan_furniture_favorites');
                      setFavorites([]);
                    }
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                  <FiTrash2 />
                  <span>Clear All Favorites</span>
                </button>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">You might also like</h2>
                <div className="flex flex-wrap gap-2">
                  {['sofa sets', 'dining tables', 'office chairs', 'bedroom furniture', 'outdoor furniture'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/Search?query=${encodeURIComponent(tag)}`}
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
