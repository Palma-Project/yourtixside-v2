/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Wraps Google Identity Services (loaded via <script> in index.html).
 * Decodes the returned ID token CLIENT-SIDE ONLY — its signature is never
 * verified here. That's fine for a UI prototype but not safe for real
 * "1 person 1 vote" enforcement — see docs/VOTING_BACKEND_MIGRATION.md,
 * which covers verifying the token server-side before trusting the email.
 */

import { useCallback, useEffect, useState } from 'react';

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

function decodeJwtPayload(token: string): Record<string, string> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export function useGoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [ready, setReady] = useState(false);
  const [pendingButtonEl, setPendingButtonEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!CLIENT_ID) return;

    const tryInit = () => {
      if (!window.google) return false;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const payload = decodeJwtPayload(response.credential);
          if (payload) {
            setUser({ email: payload.email, name: payload.name, picture: payload.picture });
          }
        },
      });
      setReady(true);
      return true;
    };

    if (tryInit()) return;
    const interval = setInterval(() => {
      if (tryInit()) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ready && pendingButtonEl && window.google) {
      pendingButtonEl.innerHTML = '';
      window.google.accounts.id.renderButton(pendingButtonEl, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 280,
      });
    }
  }, [ready, pendingButtonEl]);

  const renderButtonInto = useCallback((el: HTMLElement | null) => {
    setPendingButtonEl(el);
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  return { user, ready, configured: !!CLIENT_ID, renderButtonInto, signOut };
}
