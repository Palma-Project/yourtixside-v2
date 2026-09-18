/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE ONLY — checks/creates Customer accounts in the shared
 * AppStore. Login is optional site-wide; only Vote and Take a Moment
 * gate on it. Google sign-in auto-creates an account on first use.
 */

import { useCallback, useState } from 'react';
import { useAppStore, CustomerAccount } from '../store/AppStore';

const SESSION_KEY = 'yourtixside_customer_session_email';

export interface CustomerSignupInput {
  name: string;
  email: string;
  password: string;
  loginMethod: 'manual' | 'google';
}

export function useCustomerAuth() {
  const { customerAccounts, setCustomerAccounts, logActivity } = useAppStore();
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const session = customerAccounts.find((c) => c.email.toLowerCase() === sessionEmail?.toLowerCase()) ?? null;

  const persist = (email: string | null) => {
    try {
      if (email) localStorage.setItem(SESSION_KEY, email);
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setSessionEmail(email);
  };

  const login = useCallback(
    (email: string, password: string) => {
      const acc = customerAccounts.find((c) => c.email.toLowerCase() === email.trim().toLowerCase());
      if (!acc || acc.password !== password) {
        setError('Email atau password salah.');
        return false;
      }
      if (acc.accountStatus !== 'aktif') {
        setError(`Akun ini berstatus ${acc.accountStatus}.`);
        return false;
      }
      setError(null);
      persist(acc.email);
      return true;
    },
    [customerAccounts]
  );

  const signup = useCallback(
    (input: CustomerSignupInput) => {
      if (customerAccounts.some((c) => c.email.toLowerCase() === input.email.trim().toLowerCase())) {
        setError('Email sudah terdaftar.');
        return false;
      }
      const newAccount: CustomerAccount = {
        id: `cust${Date.now()}`,
        email: input.email.trim(),
        password: input.password,
        name: input.name,
        accountStatus: 'aktif',
        loginMethod: input.loginMethod,
        joinedAt: new Date().toISOString().slice(0, 10),
        notifyEmail: { votes: true, complaints: true, promo: false },
        notifyWhatsapp: false,
        language: 'id',
      };
      setCustomerAccounts((prev) => [...prev, newAccount]);
      logActivity(`Customer baru mendaftar: ${input.name}`);
      setError(null);
      persist(newAccount.email);
      return true;
    },
    [customerAccounts, setCustomerAccounts, logActivity]
  );

  /** Finds or silently creates an account for a Google-authenticated email. */
  const continueWithGoogle = useCallback(
    (email: string, name: string) => {
      const existing = customerAccounts.find((c) => c.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        persist(existing.email);
        return;
      }
      const newAccount: CustomerAccount = {
        id: `cust${Date.now()}`,
        email,
        password: '',
        name,
        accountStatus: 'aktif',
        loginMethod: 'google',
        joinedAt: new Date().toISOString().slice(0, 10),
        notifyEmail: { votes: true, complaints: true, promo: false },
        notifyWhatsapp: false,
        language: 'id',
      };
      setCustomerAccounts((prev) => [...prev, newAccount]);
      persist(newAccount.email);
    },
    [customerAccounts, setCustomerAccounts]
  );

  const logout = useCallback(() => {
    persist(null);
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<CustomerAccount>) => {
      if (!session) return;
      setCustomerAccounts((prev) => prev.map((c) => (c.id === session.id ? { ...c, ...updates } : c)));
    },
    [session, setCustomerAccounts]
  );

  return { session, error, login, signup, continueWithGoogle, logout, updateProfile };
}
