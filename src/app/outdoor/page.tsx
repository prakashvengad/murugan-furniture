// File: pages/outdoor.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function OutdoorPage() {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');

  // Sample outdoor products data
  const outdoorProducts = [
    {
      id: 1,
      name: 'Patio Dining Set',
      price: 899.99,
      originalPrice: 1099.99,
      rating: 4.5,
      reviewCount: 128,
      description: '7-piece outdoor dining set with weather-resistant cushions',
      image: '/api/placeholder/300/300',
      category: 'furniture',
      isNew: true,
      isElectric: false,
      tags: ['dining', 'patio', 'set']
    },
    {
      id: 2,
      name: 'Outdoor Solar Lights',
      price: 49.99,
      rating: 4.2,
      reviewCount: 86,
      description: 'Set of 6 solar-powered LED pathway lights',
      image: '/api/placeholder/300/300',
      category: 'electric',
      isNew: false,
      isElectric: true,
      tags: ['lighting', 'solar', 'led']
    },
    {
      id: 3,
      name: 'Garden Bench',
      price: 249.99,
      rating: 4.7,
      reviewCount: 64,
      description: 'Teak wood bench with decorative wrought iron details',
      image: '/api/placeholder/300/300',
      category: 'furniture',
      isNew: false,
      isElectric: false,
      tags: ['seating', 'garden', 'bench']
    },
    {
      id: 4,
      name: 'Electric Grill',
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.4,
      reviewCount: 142,
      description: 'Premium electric grill with temperature control',
      image: '/api/placeholder/300/300',
      category: 'electric',
      isNew: true,
      isElectric: true,
      tags: ['cooking', 'grill', 'electric']
    },
    {
      id: 5,
      name: 'Outdoor Sofa Set',
      price: 1299.99,
      rating: 4.8,
      reviewCount: 92,
      description: 'Luxury 5-piece outdoor sofa set with coffee table',
      image: '/api/placeholder/300/300',
      category: 'furniture',
      isNew: false,
      isElectric: false,
      tags: ['seating', 'sofa', 'patio']
    },
    {
      id: 6,
      name: 'Outdoor Heater',
      price: 199.99,
      rating: 4.1,
      reviewCount: 78,
      description: 'Patio heater with adjustable height and heat settings',
      image: '/api/placeholder/300/300',
      category: 'electric',
      isNew: false,
      isElectric: true,
      tags: ['heating', 'patio', 'electric']
    },
    {
      id: 7,
      name: 'Porch Swing',
      price: 349.99,
      originalPrice: 429.99,
      rating: 4.6,
      reviewCount: 115,
      description: 'Comfortable porch swing with weather-resistant canopy',
      image: '/api/placeholder/300/300',
      category: 'furniture',
      isNew: true,
      isElectric: false,
      tags: ['seating', 'swing', 'porch']
    },
    {
      id: 8,
      name: 'Water Fountain',
      price: 159.99,
      rating: 4.3,
      reviewCount: 67,
      description: 'Decorative solar-powered water fountain for garden',
      image: '/api/placeholder/300/300',
      category: 'electric',
      isNew: false,
      isElectric: true,
      tags: ['decor', 'fountain', 'solar']
    }
  ];

  // Filter products based on selected filters
  const filteredProducts = outdoorProducts.filter(product => {
    // Category filter
    if (filter !== 'all' && product.category !== filter) return false;
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Default sort (featured)
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Outdoor Products | Your Furniture & Electric Shop</title>
        <meta name="description" content="Explore our premium outdoor furniture and electric products" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-amber-700">
              HomeStyle
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-amber-700">Home</Link>
              <Link href="/living-room" className="text-gray-600 hover:text-amber-700">Living Room</Link>
              <Link href="/bedroom" className="text-gray-600 hover:text-amber-700">Bedroom</Link>
              <Link href="/outdoor" className="text-amber-700 font-medium">Outdoor</Link>
              <Link href="/appliances" className="text-gray-600 hover:text-amber-700">Appliances</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-amber-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Outdoor Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your outdoor space with our premium furniture and electric products designed for comfort and durability.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition">
              Shop Now
            </button>
            <button className="border border-amber-600 text-amber-700 px-6 py-2 rounded-lg hover:bg-amber-50 transition">
              View Sale
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'all'}
                    onChange={() => setFilter('all')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">All Products</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'furniture'}
                    onChange={() => setFilter('furniture')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Furniture</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'electric'}
                    onChange={() => setFilter('electric')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Electric</span>
                </label>
              </div>
            </div>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Tags Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['patio', 'solar', 'garden', 'dining', 'heating'].map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">
              Apply Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sorting and Results Count */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4 md:mb-0">
                Showing <span className="font-medium">{sortedProducts.length}</span> products
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Product Image</span>
                      </div>
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800">{product.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${product.category === 'furniture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">({product.reviewCount})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          {product.originalPrice ? (
                            <div className="flex items-center">
                              <span className="font-bold text-gray-800">${product.price}</span>
                              <span className="text-gray-500 text-sm line-through ml-2">${product.originalPrice}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-gray-800">${product.price}</span>
                          )}
                        </div>
                        <button className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-700 transition">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setPriceRange([0, 2000]);
                  }}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Stay updated with our latest outdoor collection offers and new product arrivals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-lg sm:rounded-r-none sm:rounded-l-lg flex-1 text-gray-800 focus:outline-none"
            />
            <button className="bg-amber-600 px-6 py-2 rounded-r-lg sm:rounded-l-none sm:rounded-r-lg mt-2 sm:mt-0 hover:bg-amber-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HomeStyle</h3>
              <p className="text-gray-400">
                Premium furniture and electric products for your home and outdoor spaces.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-500">Living Room</a></li>
                <li><a href="#" className="hover:text-amber-500">Bedroom</a></li>
                <li><a href="#" className="hover:text-amber-500">Outdoor</a></li>
                <li><a href="#" className="hover:text-amber-500">Appliances</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-500">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-500">Shipping</a></li>
                <li><a href="#" className="hover:text-amber-500">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>123 Furniture Street</p>
                <p>City, State 12345</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@homestyle.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HomeStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}