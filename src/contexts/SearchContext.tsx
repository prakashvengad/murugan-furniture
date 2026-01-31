"use client";

import { createContext, useContext, useState } from 'react';

interface SearchContextType {
  isSearchOverlayOpen: boolean;
  setIsSearchOverlayOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchOverlayOpen, setIsSearchOverlayOpen }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
}
