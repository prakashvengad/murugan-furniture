"use client";
import Link from 'next/link';
import { useEffect } from 'react';

export default function AuthCodeErrorPage() {
  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      window.location.href = '/signin';
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h1>
        <p className="text-gray-600 mb-6">
          There was a problem completing your sign in. This could be due to an expired link or a configuration issue.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/signin"
            className="block w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          You will be automatically redirected to the sign in page in 10 seconds.
        </p>
      </div>
    </div>
  );
}
