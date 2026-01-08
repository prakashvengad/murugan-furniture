"use client";
// components/SearchResults.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import CategoriesSidebar from './search/CategoriesSidebar';
import ProductCard from './search/ProductCard';
import ProductControls from './search/ProductControls';
import RelatedSearches from './search/RelatedSearches';
import type { Product } from './search/ProductCard';

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Categories Sidebar */}
            <CategoriesSidebar
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />

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

              {/* Product Controls */}
              <ProductControls
                productCount={filteredProducts.length}
                activeCategory={activeCategory}
                viewMode={viewMode}
                sortBy={sortBy}
                showFilters={showFilters}
                onViewModeChange={setViewMode}
                onSortChange={setSortBy}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />

              {/* Products */}
              <div className={`
                grid gap-6
                ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'}
              `}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <button className="bg-white border border-gray-300 rounded-lg px-8 py-3 hover:bg-gray-50 transition-colors font-medium">
                  Load More Products
                </button>
              </div>

              {/* Related Searches */}
              <RelatedSearches />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
