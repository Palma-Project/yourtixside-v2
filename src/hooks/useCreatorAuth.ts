/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE ONLY. There is no backend yet, so this checks a single
 * hardcoded demo credential and stores the "session" in localStorage.
 * Replace with real authentication once the Event Creator API exists.
 */

import { useCallback, useState } from 'react';

const SESSION_KEY = 'yourtixside_creator_session';

export const DEMO_CREDENTIAL = {
  email: 'demo@yourtix.dev',
  password: 'demo1234',
  orgName: 'Kolektif Nada Kampus',
  contactName: 'Sarah Amelia',
};

interface CreatorSession {
  email: string;
  orgName: string;
  contactName: string;
}

function readSession(): CreatorSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useCreatorAuth() {
  const [session, setSession] = useState<CreatorSession | null>(() => readSession());
  const [error, setError] = useState<string | null>(null);

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === DEMO_CREDENTIAL.email && password === DEMO_CREDENTIAL.password) {
      const newSession: CreatorSession = {
        email: DEMO_CREDENTIAL.email,
        orgName: DEMO_CREDENTIAL.orgName,
        contactName: DEMO_CREDENTIAL.contactName,
      };
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      } catch {
        /* ignore */
      }
      setSession(newSession);
      setError(null);
      return true;
    }
    setError('Email atau password salah. Gunakan akun demo yang tersedia.');
    return false;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setSession(null);
  }, []);

  return { session, error, login, logout };
}
