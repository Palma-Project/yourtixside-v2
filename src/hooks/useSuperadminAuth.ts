/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE ONLY. No backend yet — checks a single hardcoded demo
 * credential (see below) and stores the "session" in localStorage.
 * Replace with real authentication once the Superadmin API exists.
 *
 * The credential is intentionally NOT surfaced in the UI or in chat —
 * open this file locally to find it.
 */

import { useCallback, useState } from 'react';

const SESSION_KEY = 'yourtixside_superadmin_session';

export const DEMO_CREDENTIAL = {
  email: 'admin.demo@yourtix.internal',
  password: 'Rz4-mLp9-xVe',
  name: 'Bimo Setiawan',
  role: 'Superadmin',
};

interface SuperadminSession {
  email: string;
  name: string;
  role: string;
}

function readSession(): SuperadminSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useSuperadminAuth() {
  const [session, setSession] = useState<SuperadminSession | null>(() => readSession());

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === DEMO_CREDENTIAL.email && password === DEMO_CREDENTIAL.password) {
      const newSession: SuperadminSession = {
        email: DEMO_CREDENTIAL.email,
        name: DEMO_CREDENTIAL.name,
        role: DEMO_CREDENTIAL.role,
      };
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      } catch {
        /* ignore */
      }
      setSession(newSession);
      return true;
    }
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

  return { session, login, logout };
}
