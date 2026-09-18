/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE ONLY — checks/creates EO accounts in the shared AppStore
 * (client-side, localStorage-backed). Replace with real authentication
 * once the Event Creator API exists. A seeded demo account exists in
 * store/AppStore.tsx (seedEOAccounts) — open that file locally to find it.
 */

import { useCallback, useState } from 'react';
import { useAppStore, EOAccount } from '../store/AppStore';

const SESSION_KEY = 'yourtixside_creator_session_email';

export interface EOSignupInput {
  picName: string;
  orgName: string;
  email: string;
  phone: string;
  password: string;
  ktpFileName?: string;
  npwpFileName?: string;
  bankName?: string;
  bankAccount?: string;
  loginMethod: 'manual' | 'google';
}

export function useCreatorAuth() {
  const { eoAccounts, setEoAccounts, logActivity } = useAppStore();
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const session = eoAccounts.find((e) => e.email.toLowerCase() === sessionEmail?.toLowerCase()) ?? null;

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
      const acc = eoAccounts.find((e) => e.email.toLowerCase() === email.trim().toLowerCase());
      if (!acc || acc.password !== password) {
        setError('Email atau password salah.');
        return false;
      }
      if (acc.accountStatus !== 'aktif') {
        setError(`Akun ini berstatus ${acc.accountStatus}. Hubungi Superadmin.`);
        return false;
      }
      setError(null);
      persist(acc.email);
      return true;
    },
    [eoAccounts]
  );

  const signup = useCallback(
    (input: EOSignupInput) => {
      if (eoAccounts.some((e) => e.email.toLowerCase() === input.email.trim().toLowerCase())) {
        setError('Email sudah terdaftar.');
        return false;
      }
      const newAccount: EOAccount = {
        id: `eo${Date.now()}`,
        email: input.email.trim(),
        password: input.password,
        picName: input.picName,
        orgName: input.orgName,
        phone: input.phone,
        ktpFileName: input.ktpFileName,
        npwpFileName: input.npwpFileName,
        bankName: input.bankName,
        bankAccount: input.bankAccount,
        verificationStatus: 'pending',
        accountStatus: 'aktif',
        loginMethod: input.loginMethod,
        joinedAt: new Date().toISOString().slice(0, 10),
        activeEvents: 0,
        team: [],
      };
      setEoAccounts((prev) => [...prev, newAccount]);
      logActivity(`${input.orgName} mendaftar sebagai EO baru — menunggu verifikasi`);
      setError(null);
      persist(newAccount.email);
      return true;
    },
    [eoAccounts, setEoAccounts, logActivity]
  );

  const logout = useCallback(() => {
    persist(null);
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<EOAccount>) => {
      if (!session) return;
      setEoAccounts((prev) => prev.map((e) => (e.id === session.id ? { ...e, ...updates } : e)));
    },
    [session, setEoAccounts]
  );

  return { session, error, login, signup, logout, updateProfile };
}
