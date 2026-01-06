// File: components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useAuthModal } from '@/components/AuthModalProvider';

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const { open } = useAuthModal();

  useEffect(() => {
    const supabase = createBrowserClient();

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
    };
  }, []);

  async function handleSignOut() {
    try {
      const supabase = createBrowserClient();
      await supabase.auth.signOut();
    } catch {
      alert('Failed to sign out');
    }
  }

  return (
    <header className="bg-amber-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative w-16 h-16 overflow-hidden rounded-xl bg-white">

            <Image
              src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/logo/logo.jpg"
              alt="Murugan Furniture logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold">Murugan Furniture</h1>
            <p className="text-amber-200 text-sm">Since 1995</p>
          </div>
        </div>
        
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center gap-x-1 gap-y-2 sm:gap-x-3 md:gap-x-6 font-medium">
            {['Home', 'Products', 'Categories', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="px-3 py-2 hover:bg-amber-700 rounded transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-4 md:mt-0 flex items-center w-full md:w-auto justify-center md:justify-end">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {userEmail ? (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/profile"
                  className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition w-full sm:w-auto text-center"
                >
                  My Profile
                </Link>

                <span className="bg-amber-700/40 border border-amber-200/30 text-amber-50 px-3 py-2 rounded-lg text-sm w-full sm:w-auto truncate">
                  {displayName ?? userEmail}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition w-full sm:w-auto"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => open('signin')}
                className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition w-full sm:w-auto text-center"
              >
                Sign In
              </button>
            )}

            <button className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition w-full sm:w-auto">
              Call: +91 98765 43210
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}