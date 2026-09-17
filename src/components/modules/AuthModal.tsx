/**
 * @file AuthModal.tsx
 * @description Dedicated Authentication Modal for Cookie Fluffs
 * Allows users to Sign In, Register, or switch accounts with a single click.
 */

import React, { useState } from 'react';
import { X, LogIn, UserPlus, CheckCircle2, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { CookieLogo } from '../CookieLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; email: string; tier: string; initials: string }) => void;
  isCurrentlyLoggedIn?: boolean;
  currentUserName?: string;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isCurrentlyLoggedIn,
  currentUserName,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Jervin Paul R.');
  const [email, setEmail] = useState('jervinpaulromualdo@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'JR';
      onLoginSuccess({
        name: name.trim() || 'Cookie Lover',
        email: email.trim() || 'baker@cloudfluffs.com',
        tier: 'VIP',
        initials,
      });
      onClose();
    }, 450);
  };

  const handleQuickDemoLogin = (role: 'vip' | 'newbie') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'vip') {
        onLoginSuccess({
          name: 'Jervin Paul R.',
          email: 'jervinpaulromualdo@gmail.com',
          tier: 'VIP',
          initials: 'JP',
        });
      } else {
        onLoginSuccess({
          name: 'Mia Santos',
          email: 'mia.santos@gmail.com',
          tier: 'Sweet Explorer',
          initials: 'MS',
        });
      }
      onClose();
    }, 300);
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="auth-modal-card"
        className="w-full max-w-sm bg-[#fff5f7] rounded-3xl border border-[#fbcfe8] shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with bakery theme */}
        <div className="relative bg-gradient-to-b from-[#fce7f3] to-[#fff5f7] p-5 pb-4 border-b border-[#fbcfe8] text-center">
          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#523628] flex items-center justify-center transition cursor-pointer shadow-2xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white p-2 mx-auto flex items-center justify-center shadow-xs border border-[#fbcfe8] mb-2">
            <CookieLogo size={32} />
          </div>

          <h2 className="text-lg font-serif font-bold text-[#4a3024]">
            {isCurrentlyLoggedIn
              ? 'Your Cookie Account'
              : mode === 'login'
              ? 'Welcome Back, Baker!'
              : 'Join Cookie Fluffs'}
          </h2>
          <p className="text-xs text-[#be185d] font-semibold mt-0.5">
            {isCurrentlyLoggedIn
              ? `Currently signed in as ${currentUserName}`
              : 'Earn Crumb Points, save custom recipes & track orders'}
          </p>
        </div>

        <div className="p-5">
          {isCurrentlyLoggedIn ? (
            /* Logged in state view with logout button */
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-white border border-[#fce7f3] shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#fce7f3] text-[#523628] font-bold text-base flex items-center justify-center mx-auto mb-2 border border-[#fbcfe8]">
                  JP
                </div>
                <h3 className="text-sm font-bold text-[#4a3024]">{currentUserName}</h3>
                <p className="text-xs text-[#74513e]">jervinpaulromualdo@gmail.com</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fce7f3] text-[#be185d] text-[11px] font-bold border border-[#fbcfe8]">
                  <Sparkles className="w-3 h-3" />
                  <span>VIP Crumb Tier • 420 Fluff Points</span>
                </div>
              </div>

              <button
                id="btn-confirm-logout"
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Log Out of Account</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-[#74513e] hover:text-[#523628] cursor-pointer"
              >
                Keep Browsing
              </button>
            </div>
          ) : (
            /* Login / Register Form */
            <div>
              {/* Quick Demo Shortcut Buttons */}
              <div className="mb-4 p-3 rounded-2xl bg-white border border-[#fce7f3] shadow-2xs">
                <p className="text-[11px] font-bold text-[#74513e] mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#ec4899]" />
                  <span>Quick One-Click Sign-In:</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('vip')}
                    className="py-1.5 px-2 rounded-xl bg-[#fce7f3] hover:bg-[#fbcfe8] text-[#523628] text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border border-[#fbcfe8]"
                  >
                    <span>🍪 Jervin (VIP)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('newbie')}
                    className="py-1.5 px-2 rounded-xl bg-[#fce7f3] hover:bg-[#fbcfe8] text-[#523628] text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border border-[#fbcfe8]"
                  >
                    <span>✨ Mia (New)</span>
                  </button>
                </div>
              </div>

              {/* Mode switch tabs */}
              <div className="flex rounded-xl bg-[#fce7f3]/60 p-1 mb-4 border border-[#fbcfe8]">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    mode === 'login'
                      ? 'bg-white text-[#4a3024] shadow-xs'
                      : 'text-[#74513e] hover:text-[#4a3024]'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    mode === 'register'
                      ? 'bg-white text-[#4a3024] shadow-xs'
                      : 'text-[#74513e] hover:text-[#4a3024]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#74513e] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jervin Paul Romualdo"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-xs text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-[#74513e] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-xs text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#74513e] mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-xs text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 px-4 rounded-2xl bg-[#523628] text-[#fff5f7] hover:bg-[#684635] active:scale-98 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      {mode === 'login' ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                      <span>{mode === 'login' ? 'Sign In to Cookie Fluffs' : 'Create Cookie Account'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
