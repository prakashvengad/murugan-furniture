// File: components/Footer.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHome, FiHeart, FiUser, FiPhone } from 'react-icons/fi';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useAuthModal } from '@/components/AuthModalProvider';
import { getFavorites } from '../utils/favorites';
import { useDevice } from '@/hooks/useDevice';
import { useSearch } from '@/contexts/SearchContext';

export default function Footer() {
  const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images';
  const { isMobile } = useDevice();
  const { isSearchOverlayOpen } = useSearch();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const { open } = useAuthModal();

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    loadUser();

    const loadFavorites = async () => {
      const favorites = await getFavorites();
      setFavoritesCount(favorites.length);
    };
    loadFavorites();
  }, []);

  const DesktopFooter = () => (
    <footer className="w-full max-w-full overflow-x-hidden bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white">
                <Image
                  src={`${R2_PUBLIC_URL}/logo/murugan-furniture.png`}
                  alt="Murugan Furniture logo"
                  width={48}
                  height={48}
                  className="w-full h-auto object-contain"
                  sizes="48px"
                />
              </div>
              <h3 className="text-xl font-bold ml-3">Murugan Furniture</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium furniture and home appliances in Chennai since 1995
            </p>
            <div className="flex flex-wrap gap-4">
              {[/* Social icons */].map((_, i) => (
                <div key={i} className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Categories', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">123 Furniture Street, T. Nagar</p>
              <p className="mb-2">Chennai, Tamil Nadu 600017</p>
              <p className="mb-2">Phone: +91 98765 43210</p>
              <p className="mb-2">Email: info@muruganfurniture.com</p>
              <p>Open: Mon-Sat 10AM-8PM</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusive offers and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full bg-white sm:flex-1 rounded-lg sm:rounded-r-none text-gray-800 focus:outline-none"
              />
              <button className="bg-amber-700 px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-amber-800 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Murugan Furniture & Home Appliances. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const MobileFooter = () => (
    <div className={`fixed bottom-0 left-0 right-0 bg-amber-800 text-white z-60 ${isSearchOverlayOpen ? 'hidden' : ''} md:hidden`}>
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center p-2">
          <FiHome size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center p-2 relative">
          <FiHeart size={24} />
          <span className="text-xs">Favorites</span>
          {favoritesCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoritesCount}</span>}
        </Link>
        {userEmail ? (
          <Link href="/profile" className="flex flex-col items-center p-2">
            <FiUser size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        ) : (
          <button onClick={() => open('signin')} className="flex flex-col items-center p-2">
            <FiUser size={24} />
            <span className="text-xs">Sign In</span>
          </button>
        )}
        <a href="tel:+919876543210" className="flex flex-col items-center p-2">
          <FiPhone size={24} />
          <span className="text-xs">Call</span>
        </a>
      </div>
    </div>
  );

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
}