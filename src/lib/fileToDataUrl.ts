/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Converts a File (from a file input) into a base64 data: URL so it can be
 * stored in the shared AppStore and rendered directly as an <img src>.
 * Prototype-only: fine for a handful of images, but real uploads should go
 * to object storage (S3/R2/etc.) once a backend exists — data URLs bloat
 * localStorage fast.
 */

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Extracts the YouTube video ID from common URL formats, or null if not recognized. */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
    /(?:youtube\.com\/shorts\/)([^?]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
