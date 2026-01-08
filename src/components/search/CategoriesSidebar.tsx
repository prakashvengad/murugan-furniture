// components/search/CategoriesSidebar.tsx
"use client";
import React from 'react';
import { CATEGORIES } from './constants';

interface CategoriesSidebarProps {
  activeCategory: string;
  onCategoryClick: (categoryName: string) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  activeCategory,
  onCategoryClick
}) => (
  <div className="w-64 flex-shrink-0">
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
      <h2 className="font-bold text-lg mb-6">Categories</h2>
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeCategory === category.name
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
);

export default CategoriesSidebar;
