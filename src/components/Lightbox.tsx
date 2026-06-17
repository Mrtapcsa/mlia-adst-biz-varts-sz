import { useEffect, useState, useCallback } from 'react';
import type { GalleryImage } from '../data/departments';
import { useSmartImage } from '../hooks/useSmartImage';

interface Props {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

// ── Inner image — isolated so the hook resets cleanly per image ──
function LightboxImage({
  image,
  total,
  current,
}: {
  image: GalleryImage;
  total: number;
  current: number;
}) {
  const { src, onError } = useSmartImage(image.localSrc, image.fallbackSrc);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        maxWidth: '90vw',
      }}
    >
      <img
        className="lightbox-img"
        src={src}
        alt={image.caption}
        onError={onError}
      />
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#F0D060',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {image.caption}
        </p>
        {image.subCaption && (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.6)',
              marginTop: 4,
            }}
          >
            {image.subCaption}
          </p>
        )}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(212,175,55,0.5)',
            marginTop: 8,
          }}
        >
          {current + 1} / {total}
        </p>
      </div>
    </div>
  );
}

// ── Nav button helper ────────────────────────────────────────
function NavBtn({
  label,
  children,
  style,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent) => void;
}) {
  const base: React.CSSProperties = {
    background: 'rgba(212,175,55,0.12)',
    border: '1px solid rgba(212,175,55,0.4)',
    color: '#D4AF37',
    width: 48,
    height: 48,
    borderRadius: '50%',
    fontSize: '1.4rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    ...style,
  };

  return (
    <button
      aria-label={label}
      style={base}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          'rgba(212,175,55,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          'rgba(212,175,55,0.12)';
      }}
    >
      {children}
    </button>
  );
}

// ── Main Lightbox ────────────────────────────────────────────
export default function Lightbox({ images, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex);

  const go = useCallback(
    (dir: number) => {
      setCurrent((c) => (c + dir + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  go(1);
      if (e.key === 'ArrowLeft')   go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        aria-label="Close lightbox"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.4)',
          color: '#D4AF37',
          width: 44,
          height: 44,
          borderRadius: '50%',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            'rgba(212,175,55,0.3)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            'rgba(212,175,55,0.12)')
        }
      >
        ✕
      </button>

      {/* Prev */}
      <NavBtn
        label="Previous image"
        style={{ left: 20 }}
        onClick={(e) => { e.stopPropagation(); go(-1); }}
      >
        ‹
      </NavBtn>

      {/* Image (key forces hook to reset on every slide change) */}
      <div onClick={(e) => e.stopPropagation()}>
        <LightboxImage
          key={current}
          image={images[current]}
          total={images.length}
          current={current}
        />
      </div>

      {/* Next */}
      <NavBtn
        label="Next image"
        style={{ right: 20 }}
        onClick={(e) => { e.stopPropagation(); go(1); }}
      >
        ›
      </NavBtn>
    </div>
  );
}
