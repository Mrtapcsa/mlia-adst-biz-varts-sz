import { useState, useCallback } from 'react';
import type { DeptVideo } from '../data/departments';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';

interface Props {
  videos: DeptVideo[];
  accentColor: string;
  deptName: string;
}

export default function VideoSection({ videos, accentColor, deptName }: Props) {
  const [activeVideo, setActiveVideo] = useState<DeptVideo | null>(null);

  const openPlayer  = useCallback((v: DeptVideo) => setActiveVideo(v), []);
  const closePlayer = useCallback(() => setActiveVideo(null), []);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      {/* ── Section wrapper ── */}
      <section
        style={{
          marginTop: 64,
          padding: '48px 0 0',
          position: 'relative',
        }}
        aria-label={`${deptName} Videos`}
      >
        {/* Section divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}55, ${accentColor}99, ${accentColor}55, transparent)`,
          marginBottom: 44,
        }} />

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          {/* Decorative film-strip icons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
            <span style={{ fontSize: '1.3rem' }}>🎬</span>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
          </div>

          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            color: '#F5F0E8',
            marginBottom: 8,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            {deptName} — Video Gallery
          </h3>

          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: accentColor,
            marginBottom: 6,
          }}>
            Exhibition Film Collection
          </p>

          {/* How-to hint */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.74rem',
            color: 'rgba(245,240,232,0.38)',
            letterSpacing: '0.05em',
            marginTop: 6,
          }}>
            Click any card to play · Local files take priority · YouTube used as fallback
          </p>

          {/* File format hint */}
          <div style={{
            display: 'inline-flex',
            gap: 8,
            marginTop: 12,
            flexWrap: 'wrap' as const,
            justifyContent: 'center',
          }}>
            {['.mp4', '.webm', '.mov', 'YouTube'].map((fmt, i) => (
              <span
                key={fmt}
                style={{
                  background: i < 3 ? 'rgba(0,180,80,0.1)' : 'rgba(200,30,30,0.1)',
                  border: `1px solid ${i < 3 ? '#00C04644' : '#FF444444'}`,
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: i < 3 ? '#00C046aa' : '#FF8888aa',
                  letterSpacing: '0.06em',
                }}
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div
          className="fade-in-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {videos.map((video, idx) => (
            <VideoCard
              key={video.id}
              video={video}
              accentColor={accentColor}
              index={idx}
              onPlay={openPlayer}
            />
          ))}
        </div>

        {/* Upload guide */}
        <div style={{
          marginTop: 28,
          padding: '16px 20px',
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${accentColor}22`,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>📂</span>
          <div>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: accentColor,
              marginBottom: 4,
            }}>
              How to add your own videos
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.65,
            }}>
              Drop your video files (
              <code style={{ color: accentColor, fontSize: '0.72rem' }}>.mp4</code>,{' '}
              <code style={{ color: accentColor, fontSize: '0.72rem' }}>.webm</code>, or{' '}
              <code style={{ color: accentColor, fontSize: '0.72rem' }}>.mov</code>
              ) into{' '}
              <code style={{ color: accentColor, fontSize: '0.72rem' }}>
                public/videos/{deptName.replace(/ /g, '_')}_Videos/
              </code>{' '}
              using the exact filenames in the README.md inside that folder.
              The site will automatically use your local video and show a green{' '}
              <span style={{ color: '#00C046' }}>📁 Local File</span> badge.
              If the file isn't found, YouTube is used seamlessly as a fallback.
            </p>
          </div>
        </div>
      </section>

      {/* ── Video Player Modal ── */}
      {activeVideo && (
        <VideoPlayer
          video={activeVideo}
          accentColor={accentColor}
          onClose={closePlayer}
        />
      )}
    </>
  );
}
