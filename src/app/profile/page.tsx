"use client";
import { useState } from "react";

import { useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/utils/supabase/browser';

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let supabase: ReturnType<typeof createBrowserClient>;
    try {
      supabase = createBrowserClient();
    } catch (e) {
      console.error(e);
      setErrorMessage(e instanceof Error ? e.message : 'Failed to initialize Supabase');
      setIsLoading(false);
      return;
    }

    async function load() {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          setErrorMessage(userError.message);
          return;
        }

        const user = userData.user;
        setEmail(user?.email ?? null);

        if (!user?.id) {
          setErrorMessage('You are not signed in.');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('id, full_name, phone')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          setErrorMessage(profileError.message);
          return;
        }

        setProfile(profileData ?? { id: user.id, full_name: null, phone: null });
      } catch {
        setErrorMessage('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-amber-900">My Profile</h1>
          <Link href="/" className="text-sm text-amber-800 hover:underline">
            Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6">
          {isLoading ? (
            <div className="text-gray-600">Loading...</div>
          ) : errorMessage ? (
            <div>
              <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
                {errorMessage}
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-amber-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-800 transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500">Full Name</div>
                <div className="text-gray-900 font-semibold">
                  {profile?.full_name || '—'}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <div className="text-gray-900 font-semibold">
                  {profile?.phone || '—'}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-gray-900 font-semibold">
                  {email || '—'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
