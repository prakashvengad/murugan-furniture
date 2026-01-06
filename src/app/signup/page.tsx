"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { createBrowserClient } from '@/utils/supabase/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebookF, FaCheck, FaSpinner } from 'react-icons/fa';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amber-50" />}>
      <SignUpInner />
    </Suspense>
  );
}

function SignUpInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = useMemo(() => {
    return searchParams.get('redirectTo') || '/';
  }, [searchParams]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Clear messages after 5 seconds
  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  async function handleOAuthSignIn(provider: 'google' | 'facebook') {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : `Failed to sign in with ${provider}`;
      setErrorMessage(message);
      clearMessages();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Full name is required');
      clearMessages();
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Phone is required');
      clearMessages();
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      clearMessages();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      clearMessages();
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
          data: {
            full_name: fullName,
            phone,
          },
        },
      });

      if (error) {
        throw error;
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
          throw profileError;
        }
      }

      if (data.session) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.replace(redirectTo);
        }, 1500);
        return;
      }

      setSuccessMessage('Account created! Please check your email to confirm your account.');
      setTimeout(() => {
        router.replace(`/signin?redirectTo=${encodeURIComponent(redirectTo)}`);
      }, 3000);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      clearMessages();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          {/* Animated Header */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-8 py-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            <div className="flex items-center relative z-10">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative w-12 h-12 overflow-hidden rounded-xl bg-white"
              >
                <Image
                  src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/logo/logo.jpg"
                  alt="Murugan Furniture logo"
                  fill
                  className="object-contain p-1"
                  priority
                  sizes="48px"
                />
              </motion.div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="ml-3"
              >
                <h1 className="text-2xl font-bold">Create account</h1>
                <p className="text-amber-100 text-sm">Join Murugan Furniture</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Messages */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </motion.div>
            )}
            
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
              >
                <FaCheck className="text-green-500 mr-2" />
                <p className="text-green-600 text-sm">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={onSubmit} className="px-8 py-8">
            {/* Full Name Field */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-5"
            >
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                placeholder="Your full name"
                required
              />
            </motion.div>

            {/* Phone Field */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }}
              className="mb-5"
            >
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                placeholder="Your phone number"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-5"
            >
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                placeholder="you@example.com"
                required
              />
            </motion.div>

            {/* Password Field */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                placeholder="At least 6 characters"
                required
              />
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                placeholder="Re-enter password"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-lg font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Creating...
                </span>
              ) : (
                'Create Account'
              )}
            </motion.button>

            {/* Divider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 mb-6 flex items-center"
            >
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </motion.div>

            {/* OAuth Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isSubmitting}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="text-red-500 mr-2" />
                <span className="font-medium">Google</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleOAuthSignIn('facebook')}
                disabled={isSubmitting}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFacebookF className="text-blue-600 mr-2" />
                <span className="font-medium">Facebook</span>
              </motion.button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              Already have an account?{' '}
              <Link 
                href={`/signin?redirectTo=${encodeURIComponent(redirectTo)}`} 
                className="text-amber-700 font-medium hover:text-amber-800 transition duration-200 relative group"
              >
                Sign in
                <span className="absolute left-0 right-0 bottom-0 h-px bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-amber-800 transition duration-200 group"
          >
            <svg 
              className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}