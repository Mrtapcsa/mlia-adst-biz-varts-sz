/**
 * useSmartImage — Multi-format fallback image loader
 * ====================================================
 * Tries every localSrc candidate (all three formats: .jpg, .jpeg, .png)
 * in order. If ALL local candidates fail (404 on Netlify or localhost),
 * it falls back to the provided Unsplash URL so the site never looks broken.
 *
 * Usage:
 *   const { src, onError } = useSmartImage(localBasePath, fallbackUrl);
 *   <img src={src} onError={onError} />
 *
 * Where localBasePath is WITHOUT extension, e.g.:
 *   "/images/Computer_Science_Photos/01"
 */

import { useState, useCallback } from 'react';

// The order in which formats are tried
const FORMATS = ['.jpg', '.jpeg', '.png'] as const;

/**
 * Build every candidate URL for a given base path.
 * e.g. "/images/Computer_Science_Photos/01"
 *  → ["/images/Computer_Science_Photos/01.jpg",
 *     "/images/Computer_Science_Photos/01.jpeg",
 *     "/images/Computer_Science_Photos/01.png"]
 */
export function buildCandidates(basePath: string): string[] {
  // If the basePath already ends with a known extension, strip it so we
  // can re-add all three variants (supports legacy data that still has .jpg).
  const stripped = basePath.replace(/\.(jpe?g|png)$/i, '');
  return FORMATS.map(ext => stripped + ext);
}

interface SmartImageState {
  /** The current <img src> value to render */
  src: string;
  /** Pass this directly to <img onError={...}> */
  onError: () => void;
  /** True once we have given up on all local candidates and shown the fallback */
  usingFallback: boolean;
}

/**
 * @param localBasePath  Path without extension, e.g. "/images/CS/01"
 *                       OR with extension – the hook strips it automatically.
 * @param fallbackSrc    Unsplash (or any external) URL used when all local
 *                       candidates fail.
 */
export function useSmartImage(
  localBasePath: string,
  fallbackSrc: string,
): SmartImageState {
  const candidates = buildCandidates(localBasePath);

  // Start with the very first candidate (.jpg)
  const [index, setIndex] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  const currentSrc = usingFallback ? fallbackSrc : candidates[index];

  const onError = useCallback(() => {
    if (usingFallback) return; // already on fallback, nothing more to try

    const nextIndex = index + 1;
    if (nextIndex < candidates.length) {
      // Try the next format variant
      setIndex(nextIndex);
    } else {
      // All local candidates exhausted → use Unsplash fallback
      setUsingFallback(true);
    }
  }, [index, candidates.length, usingFallback]);

  return { src: currentSrc, onError, usingFallback };
}
