// components/search/RelatedSearches.tsx
"use client";
import React from 'react';
import { RELATED_SEARCHES } from './constants';

const RelatedSearches: React.FC = () => (
  <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold mb-4">Related Searches</h2>
    <div className="flex flex-wrap gap-2">
      {RELATED_SEARCHES.map((tag) => (
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
);

export default RelatedSearches;
