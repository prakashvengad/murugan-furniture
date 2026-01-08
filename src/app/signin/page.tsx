"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useEffect } from 'react';
import { createBrowserClient } from '@/utils/supabase/browser';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-amber-400 animate-spin" style={{ animationDelay: '0.1s' }}></div>
        </div>
      </div>
    }>
      <SignInInner />
    </Suspense>
  );
}

function SignInInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const redirectTo = useMemo(() => {
    return searchParams.get('redirectTo') || '/';
  }, [searchParams]);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign-in error:', error);
        setErrorMessage(error.message);
        return;
      }

      if (!data.session) {
        setErrorMessage('Authentication failed. Please check your credentials.');
        return;
      }

      console.log('User signed in successfully:', data.user);

      // Success animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9800', '#FFB74D', '#FFA726']
      });

      router.replace(redirectTo);
    } catch (error: unknown) {
      console.error('Unexpected sign-in error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider: 'google' | 'facebook') {
    setIsSocialLoading(provider);
    setErrorMessage(null);
    
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        setErrorMessage(error.message);
      }
    } catch (error: unknown) {
      console.error('Unexpected OAuth error:', error);
      setErrorMessage(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsSocialLoading(null);
    }
  }

  if (isLoading) {
    return null; // Suspense will handle loading
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          {/* Floating elements for visual interest */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-transparent opacity-30 blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-tl from-orange-200 to-transparent opacity-20 blur-xl"
          />

          {/* Main Card */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-8 py-10 overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-amber-300 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300 rounded-full translate-x-1/3 translate-y-1/3" />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative flex items-center"
              >
                <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-white shadow-lg">
                  <Image
                    src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/logo/logo.jpg"
                    alt="Murugan Furniture logo"
                    fill
                    className="object-contain p-2"
                    priority
                    sizes="56px"
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                  <p className="text-amber-100/90 text-sm mt-1">Sign in to continue your journey</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleEmailSignIn} className="px-8 py-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-amber-600" />
                    Email Address
                  </div>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 bg-white/50 transition-all duration-200"
                  placeholder="you@example.com"
                  required
                />
                <div className="absolute left-8 mt-3 ml-4 text-gray-400">
                  <FaEnvelope />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-2"
              >
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                  <div className="flex items-center">
                    <FaLock className="mr-2 text-amber-600" />
                    Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 bg-white/50 transition-all duration-200"
                    placeholder="Your password"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showPassword ? 'hide' : 'show'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between mb-8"
              >
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
                >
                  {showPassword ? 'Hide password' : 'Show password'}
                </button>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign In with Email'
                  )}
                </span>
              </motion.button>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center my-8"
              >
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500 font-medium">Or continue with</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </motion.div>

              {/* Social Sign-in Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialSignIn('google')}
                  disabled={isSocialLoading !== null}
                  className="flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 py-3 px-4 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:shadow-md transition-all duration-200"
                >
                  {isSocialLoading === 'google' ? (
                    <div className="h-5 w-5 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaGoogle className="mr-3 text-red-500 text-lg" />
                      Google
                    </>
                  )}
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialSignIn('facebook')}
                  disabled={isSocialLoading !== null}
                  className="flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 py-3 px-4 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:shadow-md transition-all duration-200"
                >
                  {isSocialLoading === 'facebook' ? (
                    <div className="h-5 w-5 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaFacebook className="mr-3 text-blue-600 text-lg" />
                      Facebook
                    </>
                  )}
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-sm text-gray-600"
              >
                Don&apos;t have an account?{' '}
                <Link 
                  href={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`} 
                  className="text-amber-700 font-semibold hover:text-amber-900 hover:underline transition-colors"
                >
                  Create one now
                </Link>
              </motion.div>
            </form>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-center"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-amber-800 font-medium group transition-colors"
          >
            <motion.span
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              ←
            </motion.span>
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}