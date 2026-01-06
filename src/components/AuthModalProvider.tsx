"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthModalMode = 'signin' | 'signup';

type AuthModalContextValue = {
  isOpen: boolean;
  mode: AuthModalMode;
  redirectTo: string;
  open: (mode?: AuthModalMode) => void;
  close: () => void;
  setMode: (mode: AuthModalMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return ctx;
}

function getCurrentPathWithQuery() {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname + window.location.search;
}

export default function AuthModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>('signin');
  const [redirectTo, setRedirectTo] = useState('/');

  function open(nextMode: AuthModalMode = 'signin') {
    setMode(nextMode);
    setRedirectTo(getCurrentPathWithQuery());
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    if (!isOpen) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      isOpen,
      mode,
      redirectTo,
      open,
      close,
      setMode,
    }),
    [isOpen, mode, redirectTo],
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}
