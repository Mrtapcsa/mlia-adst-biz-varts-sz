/**
 * useSmartVideo — Multi-format local video loader with YouTube fallback
 * ======================================================================
 * 1. Tries localBase + '.mp4'
 * 2. Then localBase + '.webm'
 * 3. Then localBase + '.mov'
 * 4. If ALL fail (404 on Netlify) → returns { type:'youtube', youtubeId }
 *
 * Usage:
 *   const result = useSmartVideo(localBase, youtubeId);
 *   if (result.type === 'local') { <video src={result.src} /> }
 *   else                         { <iframe src={ytEmbedUrl} /> }
 *
 * The hook works by pre-fetching HEAD requests for each candidate so we
 * know BEFORE rendering whether the file exists. This avoids the flicker
 * of a broken <video> element.  Falls back to YouTube seamlessly.
 */

import { useState, useEffect } from 'react';

export type VideoFormats = '.mp4' | '.webm' | '.mov';
const FORMATS: VideoFormats[] = ['.mp4', '.webm', '.mov'];

export type SmartVideoResult =
  | { type: 'checking' }
  | { type: 'local';   src: string; format: VideoFormats }
  | { type: 'youtube'; youtubeId: string };

/**
 * @param localBase   Path without extension, e.g. '/videos/CS/cs_video_01'
 * @param youtubeId   YouTube video ID used when no local file is found
 */
export function useSmartVideo(
  localBase: string,
  youtubeId: string,
): SmartVideoResult {
  const [result, setResult] = useState<SmartVideoResult>({ type: 'checking' });

  useEffect(() => {
    let cancelled = false;
    setResult({ type: 'checking' });

    async function probe() {
      for (const fmt of FORMATS) {
        const url = localBase + fmt;
        try {
          // HEAD request — fast, no body downloaded
          const res = await fetch(url, { method: 'HEAD' });
          if (!cancelled && res.ok) {
            setResult({ type: 'local', src: url, format: fmt });
            return;
          }
        } catch {
          // network error / CORS — treat as not found
        }
      }
      // All formats exhausted → YouTube
      if (!cancelled) {
        setResult({ type: 'youtube', youtubeId });
      }
    }

    probe();
    return () => { cancelled = true; };
  }, [localBase, youtubeId]);

  return result;
}

/** Build a YouTube embed URL from a video ID */
export function ytEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
}

/** Build a YouTube thumbnail URL from a video ID */
export function ytThumbUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
