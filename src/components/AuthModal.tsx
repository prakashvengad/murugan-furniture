"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useAuthModal } from './AuthModalProvider';

export default function AuthModal() {
  const { isOpen, close, mode, setMode, redirectTo } = useAuthModal();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const title = useMemo(() => {
    return mode === 'signin' ? 'Sign in to continue' : 'Create your account';
  }, [mode]);

  useEffect(() => {
    if (!isOpen) return;
    setMessage(null);
    setErrorMessage(null);
    setFullName('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const supabase = createBrowserClient();

      if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMessage('Full name is required');
          return;
        }

        if (!phone.trim()) {
          setErrorMessage('Phone is required');
          return;
        }

        if (password.length < 6) {
          setErrorMessage('Password must be at least 6 characters');
          return;
        }

        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
            data: {
              full_name: fullName,
              phone,
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        if (data.user?.id && data.session) {
          const { error: profileError } = await supabase.from('user_profiles').upsert(
            {
              id: data.user.id,
              full_name: fullName,
              phone,
            },
            { onConflict: 'id' },
          );

          if (profileError) {
            setErrorMessage(profileError.message);
            return;
          }
        }

        if (data.session) {
          close();
          return;
        }

        setMessage('Account created! Please check your email to confirm your account.');
        setTimeout(() => {
          close();
        }, 1500);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        setErrorMessage(error?.message || 'Failed to sign in');
        return;
      }

      close();
    } catch {
      setErrorMessage(mode === 'signin' ? 'Failed to sign in' : 'Failed to sign up');
    } finally {
      setIsSubmitting(false);
    }
  }

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <div
      onMouseDown={onBackdropClick}
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white">
                <Image
                  src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/logo/logo.jpg"
                  alt="Murugan Furniture logo"
                  fill
                  className="object-contain p-1"
                  priority
                  sizes="40px"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold">Murugan Furniture</h2>
                <p className="text-amber-100 text-sm">{title}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="text-white/90 hover:text-white text-xl leading-none px-2"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 gap-2 bg-amber-50 border border-amber-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'signin' ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-900/70 hover:text-amber-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'signup' ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-900/70 hover:text-amber-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          {errorMessage ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {message ? (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {message}
            </div>
          ) : null}

          {mode === 'signup' ? (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="auth-fullname">Full Name</label>
              <input
                id="auth-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your full name"
                required
              />
            </div>
          ) : null}

          {mode === 'signup' ? (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="auth-phone">Phone</label>
              <input
                id="auth-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your phone number"
                required
              />
            </div>
          ) : null}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your password"
              required
            />
          </div>

          {mode === 'signup' ? (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="auth-confirm">Confirm Password</label>
              <input
                id="auth-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Re-enter password"
                required
              />
            </div>
          ) : (
            <div className="mb-6" />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-amber-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-amber-800 transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting
              ? mode === 'signin'
                ? 'Signing in...'
                : 'Creating...'
              : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
