import type { Teacher } from '../data/departments';
import { useSmartImage } from '../hooks/useSmartImage';

interface Props {
  teacher: Teacher;
}

const DEPT_COLORS: Record<string, { accent: string; glow: string; icon: string }> = {
  'Computer Science': {
    accent: '#00D9FF',
    glow:   'rgba(0,217,255,0.25)',
    icon:   '💻',
  },
  'Visual Arts': {
    accent: '#D4AF37',
    glow:   'rgba(212,175,55,0.25)',
    icon:   '🎨',
  },
  'Business': {
    accent: '#A8E6CF',
    glow:   'rgba(168,230,207,0.25)',
    icon:   '📊',
  },
};

export default function TeacherCard({ teacher }: Props) {
  // Tries .jpg → .jpeg → .png locally, then Unsplash if all fail
  const { src: imgSrc, onError: handleError } = useSmartImage(
    teacher.localSrc,
    teacher.fallbackSrc,
  );

  const colors = DEPT_COLORS[teacher.department] ?? {
    accent: '#D4AF37',
    glow: 'rgba(212,175,55,0.25)',
    icon: '🎓',
  };

  return (
    <div
      className="teacher-card"
      style={{
        padding: '36px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -40, left: '50%',
          transform: 'translateX(-50%)',
          width: 200, height: 200,
          borderRadius: '50%',
          background: colors.glow,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Department icon badge */}
      <div
        style={{
          position: 'absolute',
          top: 16, right: 16,
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${colors.accent}44`,
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: '0.7rem',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: colors.accent,
          textTransform: 'uppercase' as const,
        }}
      >
        {colors.icon} {teacher.department}
      </div>

      {/* Photo — multi-format smart fallback */}
      <div
        className="teacher-photo"
        style={{
          border: `3px solid ${colors.accent}`,
          boxShadow: `0 0 28px ${colors.glow}, 0 0 60px ${colors.glow}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img
          src={imgSrc}
          alt={`${teacher.name} — ${teacher.department}`}
          onError={handleError}
          loading="lazy"
        />
      </div>

      {/* Name & info */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#F5F0E8',
            marginBottom: 4,
          }}
        >
          {teacher.name}
        </h3>

        {/* Accent divider */}
        <div
          style={{
            width: 60, height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
            margin: '10px auto',
          }}
        />

        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: colors.accent,
            marginBottom: 4,
          }}
        >
          {teacher.role}
        </p>

        {/* Courses taught */}
        <div
          style={{
            marginTop: 18,
            padding: '16px 20px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: `1px solid ${colors.accent}22`,
            textAlign: 'left' as const,
          }}
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: colors.accent,
              marginBottom: 10,
            }}
          >
            Courses Taught
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {teacher.courses.map((course, i) => (
              <li
                key={i}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.85)',
                  padding: '4px 0',
                  borderBottom:
                    i < teacher.courses.length - 1
                      ? `1px solid ${colors.accent}18`
                      : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <span
                  style={{ color: colors.accent, flexShrink: 0, marginTop: 1 }}
                >
                  ›
                </span>
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
