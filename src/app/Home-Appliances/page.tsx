// File: pages/appliances.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AppliancesPage() {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');
  const [brandFilter, setBrandFilter] = useState('all');

  // Sample home appliances products data
  const appliancesProducts = [
    {
      id: 1,
      name: 'Smart Refrigerator',
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.7,
      reviewCount: 234,
      description: 'Energy-efficient smart fridge with touch screen and Wi-Fi connectivity',
      image: '/api/placeholder/300/300',
      category: 'kitchen',
      brand: 'samsung',
      isNew: true,
      tags: ['smart', 'energy-efficient', 'wifi']
    },
    {
      id: 2,
      name: 'Front Load Washing Machine',
      price: 799.99,
      rating: 4.5,
      reviewCount: 187,
      description: 'Large capacity front load washer with multiple wash programs',
      image: '/api/placeholder/300/300',
      category: 'laundry',
      brand: 'lg',
      isNew: false,
      tags: ['large-capacity', 'front-load', 'quiet']
    },
    {
      id: 3,
      name: 'Stainless Steel Microwave',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.3,
      reviewCount: 142,
      description: 'Countertop microwave with sensor cooking and stainless steel design',
      image: '/api/placeholder/300/300',
      category: 'kitchen',
      brand: 'whirlpool',
      isNew: false,
      tags: ['sensor-cooking', 'stainless-steel', 'countertop']
    },
    {
      id: 4,
      name: 'Robot Vacuum Cleaner',
      price: 349.99,
      rating: 4.6,
      reviewCount: 312,
      description: 'Smart robot vacuum with mapping technology and app control',
      image: '/api/placeholder/300/300',
      category: 'cleaning',
      brand: 'irobot',
      isNew: true,
      tags: ['smart', 'mapping', 'app-control']
    },
    {
      id: 5,
      name: 'Air Purifier',
      price: 299.99,
      rating: 4.4,
      reviewCount: 98,
      description: 'HEPA air purifier for large rooms with air quality sensor',
      image: '/api/placeholder/300/300',
      category: 'climate',
      brand: 'dyson',
      isNew: false,
      tags: ['hepa', 'air-quality-sensor', 'large-room']
    },
    {
      id: 6,
      name: 'Dishwasher',
      price: 649.99,
      originalPrice: 799.99,
      rating: 4.5,
      reviewCount: 176,
      description: 'Energy Star rated dishwasher with third rack and quiet operation',
      image: '/api/placeholder/300/300',
      category: 'kitchen',
      brand: 'bosch',
      isNew: false,
      tags: ['energy-star', 'quiet', 'third-rack']
    },
    {
      id: 7,
      name: 'Smart Oven',
      price: 499.99,
      rating: 4.8,
      reviewCount: 124,
      description: 'Smart oven with air frying and convection baking capabilities',
      image: '/api/placeholder/300/300',
      category: 'kitchen',
      brand: 'samsung',
      isNew: true,
      tags: ['smart', 'air-fry', 'convection']
    },
    {
      id: 8,
      name: 'Clothes Dryer',
      price: 699.99,
      rating: 4.4,
      reviewCount: 89,
      description: 'Electric dryer with moisture sensor and multiple drying cycles',
      image: '/api/placeholder/300/300',
      category: 'laundry',
      brand: 'whirlpool',
      isNew: false,
      tags: ['moisture-sensor', 'electric', 'energy-efficient']
    },
    {
      id: 9,
      name: 'Stand Mixer',
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.9,
      reviewCount: 267,
      description: 'Professional stand mixer with multiple attachments and bowl-lift design',
      image: '/api/placeholder/300/300',
      category: 'kitchen',
      brand: 'kitchenaid',
      isNew: false,
      tags: ['professional', 'multiple-attachments', 'powerful']
    }
  ];

  // Filter products based on selected filters
  const filteredProducts = appliancesProducts.filter(product => {
    // Category filter
    if (filter !== 'all' && product.category !== filter) return false;
    
    // Brand filter
    if (brandFilter !== 'all' && product.brand !== brandFilter) return false;
    
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

  // Get unique brands for filter
  const brands = [...new Set(appliancesProducts.map(product => product.brand))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home Appliances | Your Furniture & Electric Shop</title>
        <meta name="description" content="Explore our premium home appliances for your modern household" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-700">
              HomeStyle
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-700">Home</Link>
              <Link href="/living-room" className="text-gray-600 hover:text-blue-700">Living Room</Link>
              <Link href="/bedroom" className="text-gray-600 hover:text-blue-700">Bedroom</Link>
              <Link href="/outdoor" className="text-gray-600 hover:text-blue-700">Outdoor</Link>
              <Link href="/appliances" className="text-blue-700 font-medium">Appliances</Link>
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
      <section className="bg-gradient-to-r from-blue-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Home Appliances</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our premium collection of home appliances designed to make your life easier and more efficient.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Shop Now
            </button>
            <button className="border border-blue-600 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              Energy Efficient Options
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
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">All Appliances</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'kitchen'}
                    onChange={() => setFilter('kitchen')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Kitchen</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'laundry'}
                    onChange={() => setFilter('laundry')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Laundry</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'cleaning'}
                    onChange={() => setFilter('cleaning')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Cleaning</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filter === 'climate'}
                    onChange={() => setFilter('climate')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Climate Control</span>
                </label>
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Brand</h3>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Features Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Features</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-600">Smart Home</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-600">Energy Star</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-600">Wi-Fi Enabled</span>
                </label>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
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
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs capitalize">
                          {product.brand}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-500">
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
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
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
                    setBrandFilter('all');
                    setPriceRange([0, 3000]);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Appliances?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">All our appliances come with extended warranties and quality guarantees.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Energy Efficient</h3>
              <p className="text-gray-600">Our products are designed to save energy and reduce your utility bills.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">We offer free delivery and installation services for all major appliances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Stay updated with our latest appliance offers, new product arrivals, and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-lg sm:rounded-r-none sm:rounded-l-lg flex-1 text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-600 px-6 py-2 rounded-r-lg sm:rounded-l-none sm:rounded-r-lg mt-2 sm:mt-0 hover:bg-blue-700 transition">
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
                <li><Link href="/living-room" className="hover:text-blue-500">Living Room</Link></li>
                <li><Link href="/bedroom" className="hover:text-blue-500">Bedroom</Link></li>
                <li><Link href="/outdoor" className="hover:text-blue-500">Outdoor</Link></li>
                <li><Link href="/appliances" className="hover:text-blue-500">Appliances</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-500">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-500">Shipping</a></li>
                <li><a href="#" className="hover:text-blue-500">Returns</a></li>
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