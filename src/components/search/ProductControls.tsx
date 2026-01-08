// components/search/ProductControls.tsx
"use client";
import React from 'react';
import { FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import { SORT_OPTIONS } from './constants';

interface ProductControlsProps {
  productCount: number;
  activeCategory: string;
  viewMode: 'grid' | 'list';
  sortBy: string;
  showFilters: boolean;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
}

const ProductControls: React.FC<ProductControlsProps> = ({
  productCount,
  activeCategory,
  viewMode,
  sortBy,
  showFilters,
  onViewModeChange,
  onSortChange,
  onToggleFilters
}) => (
  <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between">
      <span className="text-gray-600">
        Showing 1-{productCount} of {productCount} products for "{activeCategory}"
      </span>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleFilters}
            className="flex items-center space-x-2 px-4 py-2 border border-amber-800 rounded-lg hover:bg-"
          >
            <FiFilter className="text-amber-800" />
            <span className="text-amber-800">Filters</span>
          </button>
          <div className="flex items-center border border-amber-800 rounded-lg divide-x">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-amber-800' : ''}`}
            >
              <FiGrid className={`text-amber-800 ${viewMode === 'grid' ? 'text-white' : ''}`} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-amber-800' : ''}`}
            >
              <FiList className={`text-amber-800 ${viewMode === 'list' ? 'text-white' : ''}`} />
            </button>
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-amber-800 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {SORT_OPTIONS.map((option) => (
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
);

export default ProductControls;
