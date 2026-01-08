// components/search/ProductCard.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { getSafeImageSrc } from './constants';

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

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteClick: (product: Product, e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onFavoriteClick
}) => (
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
        onClick={(e) => onFavoriteClick(product, e)}
      >
        <FiHeart
          className={`transition-colors ${
            isFavorite
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

export default ProductCard;
export type { Product };
