import { useEffect, useRef } from 'react';
import type { DeptVideo } from '../data/departments';
import { useSmartVideo, ytEmbedUrl } from '../hooks/useSmartVideo';

interface Props {
  video: DeptVideo;
  accentColor: string;
  onClose: () => void;
}

// ── Inner player — isolated so the hook resolves cleanly ──────
function PlayerInner({
  video,
  accentColor,
  onClose,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const result   = useSmartVideo(video.localBase, video.youtubeId);

  // Auto-play local video when src is ready
  useEffect(() => {
    if (result.type === 'local' && videoRef.current) {
      videoRef.current.play().catch(() => {/* browser autoplay policy */});
    }
  }, [result]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${video.title}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* ── Close button ── */}
      <button
        onClick={onClose}
        aria-label="Close video player"
        style={{
          position: 'absolute',
          top: 20, right: 24,
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.45)',
          color: '#D4AF37',
          width: 44, height: 44,
          borderRadius: '50%',
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={e =>
          ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,175,55,0.3)')
        }
        onMouseLeave={e =>
          ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,175,55,0.12)')
        }
      >
        ✕
      </button>

      {/* ── Video wrapper ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Player area */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%', // 16:9
            borderRadius: 12,
            overflow: 'hidden',
            border: `1px solid ${accentColor}44`,
            boxShadow: `0 0 60px ${accentColor}22, 0 30px 80px rgba(0,0,0,0.8)`,
            background: '#000',
          }}
        >
          {result.type === 'checking' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: `3px solid ${accentColor}44`,
                borderTop: `3px solid ${accentColor}`,
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.1em',
              }}>
                Checking local files…
              </p>
            </div>
          )}

          {result.type === 'local' && (
            <video
              ref={videoRef}
              src={result.src}
              controls
              autoPlay
              playsInline
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                background: '#000',
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {result.type === 'youtube' && (
            <iframe
              src={ytEmbedUrl(result.youtubeId)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                border: 'none',
              }}
            />
          )}
        </div>

        {/* Video info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 12,
          padding: '0 4px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              color: '#F5F0E8',
              marginBottom: 6,
            }}>
              {video.title}
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.6,
              maxWidth: 600,
            }}>
              {video.description}
            </p>
          </div>
          {/* Source badge */}
          <div style={{
            flexShrink: 0,
            background: result.type === 'local'
              ? 'rgba(0,160,70,0.18)'
              : 'rgba(200,30,30,0.18)',
            border: `1px solid ${result.type === 'local' ? '#00C04688' : '#FF444488'}`,
            borderRadius: 8,
            padding: '6px 14px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: result.type === 'local' ? '#00C046' : '#FF8888',
            alignSelf: 'flex-start',
            marginTop: 4,
          }}>
            {result.type === 'checking'
              ? '⏳ Checking…'
              : result.type === 'local'
                ? '📁 Playing Local File'
                : '▶ Playing via YouTube'}
          </div>
        </div>

        {/* Keyboard hint */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.66rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.08em',
        }}>
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}

// ── Exported component ────────────────────────────────────────
export default function VideoPlayer({ video, accentColor, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <PlayerInner
      key={video.id}
      video={video}
      accentColor={accentColor}
      onClose={onClose}
    />
  );
}
