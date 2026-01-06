"use client"
import { Suspense } from 'react';

import SearchResults from '@/components/SearchResults';

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <SearchResults />
    </Suspense>
  );
}
