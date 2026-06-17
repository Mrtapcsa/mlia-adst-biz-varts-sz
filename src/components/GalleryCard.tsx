import type { GalleryImage } from '../data/departments';
import { useSmartImage } from '../hooks/useSmartImage';

interface Props {
  image: GalleryImage;
  index: number;
  onClick: (img: GalleryImage) => void;
}

export default function GalleryCard({ image, index, onClick }: Props) {
  // Tries .jpg → .jpeg → .png locally, then Unsplash if all fail
  const { src, onError } = useSmartImage(image.localSrc, image.fallbackSrc);

  return (
    <div
      className="gallery-card group"
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(image)}
      aria-label={image.caption}
    >
      {/* Image number badge */}
      <span className="img-number z-10">#{String(index + 1).padStart(2, '0')}</span>

      {/* Image — sharp, zero blur, multi-format fallback */}
      <img
        src={src}
        alt={image.caption}
        onError={onError}
        loading="lazy"
        draggable={false}
      />

      {/* Smooth hover caption overlay */}
      <div className="caption-overlay">
        <p className="caption-title">{image.caption}</p>
        {image.subCaption && (
          <p className="caption-sub">{image.subCaption}</p>
        )}
      </div>

      {/* Corner gold accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 40, height: 40,
          background: 'linear-gradient(225deg, rgba(212,175,55,0.2) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
