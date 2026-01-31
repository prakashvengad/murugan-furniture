"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiMic, FiSearch, FiLoader } from 'react-icons/fi';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useSearch } from '@/contexts/SearchContext';

interface ProductSuggestion {
  id: number;
  name: string;
  category: string;
}

export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsSearchOverlayOpen } = useSearch();

  // Reset search state on route changes
  useEffect(() => {
    setQuery('');
    setSuggestions([]);
    setIsLoading(false);
    setShowDropdown(false);
    setDebouncedQuery('');
  }, [pathname]);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('products')
          .select('id, name, category')
          .ilike('name', `%${debouncedQuery}%`)
          .limit(5);

        if (error) {
          console.error('Search error:', error);
          setSuggestions([]);
        } else {
          setSuggestions(data || []);
          setShowDropdown(data && data.length > 0);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update search overlay state
  useEffect(() => {
    setIsSearchOverlayOpen(showDropdown);
  }, [showDropdown, setIsSearchOverlayOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Show dropdown immediately if there's text, hide if empty
    if (value.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: ProductSuggestion) => {
    setQuery('');
    setShowDropdown(false);
    setSuggestions([]);

    // Navigate to SearchResults with category and query
    const params = new URLSearchParams({
      category: suggestion.category,
      q: suggestion.name,
    });
    router.push(`/SearchResults?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      setSuggestions([]);
      router.push(`/SearchResults?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex-1 min-w-0 max-w-xl lg:mx-8 relative">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center w-full min-w-0">
          {/* Microphone button on the left */}
          <button
            type="button"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-500 text-white p-2 rounded-full transition-colors duration-200 z-10"
          >
            <FiMic className="w-4 h-4" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search furniture & appliances..."
            className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full pl-12 pr-12 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 text-sm"
          />

          {/* Search button on the right */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-500 text-white p-2 rounded-full transition-colors duration-200 disabled:opacity-50"
            disabled={!query.trim()}
          >
            {isLoading ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
              <FiSearch className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Dropdown with suggestions */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto"
          >
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-sm">
                      {suggestion.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {suggestion.category}
                    </span>
                  </div>
                </button>
              ))
            ) : debouncedQuery.length >= 2 && !isLoading ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No products found
              </div>
            ) : null}
          </div>
        )}
      </form>

      {/* Decorative elements for unique design */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-60"></div>
    </div>
  );
}
