/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';

type LocationStatus = 'idle' | 'detecting' | 'granted' | 'denied' | 'unsupported' | 'error';

interface GeolocationState {
  status: LocationStatus;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

const STORAGE_KEY = 'yourtixside_location_choice';

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    city: null,
    latitude: null,
    longitude: null,
  });

  const requestLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setState((s) => ({ ...s, status: 'unsupported' }));
      return;
    }

    setState((s) => ({ ...s, status: 'detecting' }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { Accept: 'application/json' } }
          );
          const data = await res.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.regency ||
            data?.address?.county ||
            data?.address?.state ||
            null;
          setState({ status: 'granted', city, latitude, longitude });
        } catch {
          setState({ status: 'granted', city: null, latitude, longitude });
        }
        try {
          localStorage.setItem(STORAGE_KEY, 'granted');
        } catch {
          /* ignore */
        }
      },
      () => {
        setState((s) => ({ ...s, status: 'denied' }));
        try {
          localStorage.setItem(STORAGE_KEY, 'denied');
        } catch {
          /* ignore */
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  }, []);

  const dismiss = useCallback(() => {
    setState((s) => ({ ...s, status: 'denied' }));
    try {
      localStorage.setItem(STORAGE_KEY, 'denied');
    } catch {
      /* ignore */
    }
  }, []);

  const hasStoredChoice = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  }, []);

  return { ...state, requestLocation, dismiss, hasStoredChoice };
}
