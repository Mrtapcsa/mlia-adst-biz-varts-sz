import { useState } from 'react';
import type { DeptVideo } from '../data/departments';
import { useSmartVideo, ytThumbUrl } from '../hooks/useSmartVideo';
import { useSmartImage } from '../hooks/useSmartImage';

interface Props {
  video: DeptVideo;
  accentColor: string;
  index: number;
  onPlay: (video: DeptVideo) => void;
}

// ── Thumbnail sub-component ───────────────────────────────────
function VideoThumbnail({
  video,
  accentColor,
  index,
}: {
  video: DeptVideo;
  accentColor: string;
  index: number;
}) {
  const videoResult = useSmartVideo(video.localBase, video.youtubeId);

  // Poster: custom local thumbnail → YouTube hq thumbnail
  const posterBase = video.thumbnailBase ?? '';
  const ytFallback = ytThumbUrl(video.youtubeId);
  const { src: posterSrc, onError: posterErr } = useSmartImage(
    posterBase || '__no_local_poster__',
    ytFallback,
  );

  const isLocal    = videoResult.type === 'local';
  const isChecking = videoResult.type === 'checking';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        borderRadius: '10px 10px 0 0',
        background: '#0A0A0F',
      }}
    >
      {/* Poster image */}
      <img
        src={posterSrc}
        alt={video.title}
        onError={posterErr}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
        }}
        className="video-thumb-img"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* Source badge: green = local file found, red = YouTube fallback */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: isChecking
          ? 'rgba(80,80,80,0.88)'
          : isLocal
            ? 'rgba(0,180,80,0.92)'
            : 'rgba(200,30,30,0.92)',
        borderRadius: 4,
        padding: '3px 8px',
        fontSize: '0.6rem',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: '#fff',
        textTransform: 'uppercase' as const,
      }}>
        {isChecking ? '⏳ Checking…' : isLocal ? '📁 Local File' : '▶ YouTube'}
      </div>

      {/* Centred play button */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div
          className="play-btn"
          style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}cc 0%, ${accentColor}55 100%)`,
            border: `2px solid ${accentColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 24px ${accentColor}88, 0 0 60px ${accentColor}33`,
            transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" width="26" height="26"
            style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Video number badge */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10,
        background: 'rgba(0,0,0,0.72)',
        border: `1px solid ${accentColor}55`,
        borderRadius: 20,
        padding: '2px 10px',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.6rem',
        fontWeight: 700,
        color: accentColor,
        letterSpacing: '0.06em',
      }}>
        VIDEO #{String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

// ── Main VideoCard ────────────────────────────────────────────
export default function VideoCard({ video, accentColor, index, onPlay }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="video-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPlay(video)}
      aria-label={`Play video: ${video.title}`}
      style={{
        borderRadius: 12,
        border: `1px solid ${hovered ? accentColor : accentColor + '30'}`,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${accentColor}22`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Thumbnail */}
      <VideoThumbnail video={video} accentColor={accentColor} index={index} />

      {/* Info panel */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#F5F0E8',
          marginBottom: 8,
          lineHeight: 1.35,
        }}>
          {video.title}
        </h4>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem',
          lineHeight: 1.65,
          color: 'rgba(245,240,232,0.58)',
        }}>
          {video.description}
        </p>

        {/* Watch prompt */}
        <div style={{
          marginTop: 14,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: accentColor,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.25s',
        }}>
          <svg viewBox="0 0 24 24" fill={accentColor} width="13" height="13">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Video
        </div>
      </div>
    </div>
  );
}
