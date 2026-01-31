// File: components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiHeart, FiMenu, FiX, FiUser, FiPhone } from 'react-icons/fi';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useAuthModal } from '@/components/AuthModalProvider';
import { getFavorites } from '../utils/favorites';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open } = useAuthModal();

  useEffect(() => {
    let supabase: ReturnType<typeof createBrowserClient>;
    try {
      supabase = createBrowserClient();
    } catch (e) {
      console.error(e);
      setUserEmail(null);
      setDisplayName(null);
      return;
    }

    // Load favorites count
    const updateFavoritesCount = () => {
      try {
        const favorites = getFavorites();
        setFavoritesCount(favorites.length);
      } catch (error) {
        console.error('Error loading favorites count:', error);
      }
    };

    updateFavoritesCount();
    window.addEventListener('storage', updateFavoritesCount);

    async function loadProfile(userId: string, fallbackEmail?: string | null, fallbackName?: string | null) {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('id', userId)
          .maybeSingle();

        if (!error && data?.full_name) {
          setDisplayName(data.full_name);
          return;
        }

        setDisplayName(fallbackName ?? fallbackEmail ?? null);
      } catch {
        setDisplayName(fallbackName ?? fallbackEmail ?? null);
      }
    }

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      const metadataName = (data.user?.user_metadata as { full_name?: string } | undefined)?.full_name ?? null;
      if (data.user?.id) {
        loadProfile(data.user.id, data.user.email ?? null, metadataName);
      } else {
        setDisplayName(null);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      const metadataName = (session?.user?.user_metadata as { full_name?: string } | undefined)?.full_name ?? null;
      if (session?.user?.id) {
        loadProfile(session.user.id, session.user.email ?? null, metadataName);
      } else {
        setDisplayName(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
      window.removeEventListener('storage', updateFavoritesCount);
    };
  }, []);

  async function handleSignOut() {
    try {
      const supabase = createBrowserClient();
      await supabase.auth.signOut();
      setIsMobileMenuOpen(false);
    } catch (e) {
      console.error(e);
      alert('Failed to sign out');
    }
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full max-w-full overflow-x-hidden box-border bg-amber-800 text-white fixed top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section - Left */}
            <div className="flex items-center flex-shrink-0">
              <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full bg-white">
                <Image
                  src={`${R2_PUBLIC_URL}/logo/murugan-furniture.png`}
                  alt="Murugan Furniture logo"
                  fill
                  className="object-contain p-1"
                  priority
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold">Murugan Furniture</h1>
                <p className="text-amber-200 text-xs md:text-sm">Since 1995</p>
              </div>
              <div className="ml-3 sm:hidden">
                <h1 className="text-base font-bold">Murugan</h1>
                <p className="text-amber-200 text-xs">Furniture</p>
              </div>
            </div>

            {/* Desktop Search Component - Hidden on mobile */}
            <div className="hidden lg:block flex-1 mx-4">
              <HeaderSearch />
            </div>

            {/* Desktop Actions - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Favorites Link */}
              <Link
                href="/favorites"
                className="relative bg-white text-amber-800 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition flex items-center gap-2"
              >
                <FiHeart className="text-lg" />
                <span className="hidden lg:inline">Favorites</span>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {userEmail ? (
                <>
                  <Link
                    href="/profile"
                    className="bg-white text-amber-800 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition flex items-center gap-2"
                  >
                    <FiUser className="lg:hidden" />
                    <span className="hidden lg:inline">Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="bg-white text-amber-800 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition"
                  >
                    Sign Out
                  </button>
                  <span className="bg-amber-700/40 border border-amber-200/30 text-amber-50 px-3 py-2 rounded-lg text-sm max-w-[120px] truncate hidden lg:block">
                    {displayName ?? userEmail}
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => open('signin')}
                  className="bg-white text-amber-800 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition flex items-center gap-2"
                >
                  <FiUser className="lg:hidden" />
                  <span className="hidden lg:inline">Sign In</span>
                </button>
              )}

              <a
                href="tel:+919876543210"
                className="bg-white text-amber-800 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition flex items-center gap-2"
              >
                <FiPhone className="lg:hidden" />
                <span className="hidden lg:inline">Call Us</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-white text-amber-800 p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Search Bar - Below logo */}
          <div className="mt-3 lg:hidden">
            <HeaderSearch />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-amber-800 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white mr-3">
                <Image
                  src={`${R2_PUBLIC_URL}/logo/murugan-furniture.png`}
                  alt="Murugan Furniture logo"
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              </div>
              <div>
                <h2 className="font-bold">Murugan Furniture</h2>
                <p className="text-amber-200 text-sm">Since 1995</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white text-amber-800 p-2 rounded-full"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* User Info Section */}
          {userEmail && (
            <div className="mb-6 p-4 bg-amber-700/40 rounded-lg border border-amber-200/30">
              <p className="font-semibold truncate">{displayName ?? userEmail}</p>
              <p className="text-amber-200 text-sm truncate">{userEmail}</p>
            </div>
          )}

          {/* Mobile Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 bg-amber-700/40 hover:bg-amber-700/60 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <FiHeart className="text-lg" />
                    <span>Favorites</span>
                  </div>
                  {favoritesCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </li>

              {userEmail ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-4 bg-amber-700/40 hover:bg-amber-700/60 rounded-lg transition"
                    >
                      <FiUser />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 p-4 bg-amber-700/40 hover:bg-amber-700/60 rounded-lg transition text-left"
                    >
                      <span>Sign Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      open('signin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-4 bg-amber-700/40 hover:bg-amber-700/60 rounded-lg transition text-left"
                  >
                    <FiUser />
                    <span>Sign In</span>
                  </button>
                </li>
              )}

              <li>
                <a
                  href="tel:+919876543210"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-4 bg-amber-700/40 hover:bg-amber-700/60 rounded-lg transition"
                >
                  <FiPhone />
                  <div>
                    <div className="font-medium">Call Us</div>
                    <div className="text-amber-200 text-sm">+91 98765 43210</div>
                  </div>
                </a>
              </li>
            </ul>
          </nav>

          {/* Footer in Mobile Menu */}
          <div className="mt-8 pt-6 border-t border-amber-700">
            <p className="text-amber-200 text-sm text-center">
              © {new Date().getFullYear()} Murugan Furniture
            </p>
            <p className="text-amber-300 text-xs text-center mt-1">
              Quality Furniture Since 1995
            </p>
          </div>
        </div>
      </div>
    </>
  );
}