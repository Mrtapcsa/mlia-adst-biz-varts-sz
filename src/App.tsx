import { useState, useCallback } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import GalleryCard from './components/GalleryCard';
import Lightbox from './components/Lightbox';
import TeacherCard from './components/TeacherCard';
import VideoSection from './components/VideoSection';
import {
  computerScienceImages,
  visualArtsImages,
  businessImages,
  computerScienceVideos,
  visualArtsVideos,
  businessVideos,
  teachers,
  type GalleryImage,
  type DeptVideo,
} from './data/departments';

// ── Tab config ────────────────────────────────────────────────
type TabId = 'cs' | 'va' | 'biz' | 'teachers';

const TABS: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: 'cs',       label: 'Computer Science', icon: '💻', color: '#00D9FF' },
  { id: 'va',       label: 'Visual Arts',       icon: '🎨', color: '#D4AF37' },
  { id: 'biz',      label: 'Business',          icon: '📊', color: '#A8E6CF' },
  { id: 'teachers', label: 'Teachers',          icon: '🎓', color: '#F0D060' },
];

const DEPT_DATA: Record<TabId, {
  images: GalleryImage[];
  videos: DeptVideo[];
  title: string;
  subtitle: string;
  accentColor: string;
  description: string;
}> = {
  cs: {
    images: computerScienceImages,
    videos: computerScienceVideos,
    title: 'Computer Science',
    subtitle: 'ADST — Applied Design, Skills & Technology',
    accentColor: '#00D9FF',
    description:
      'Discover student projects in 3D modelling, Electronics LED, Traffic system simulation and modeling. Our Computer Science program bridges creativity with technology.',
  },
  va: {
    images: visualArtsImages,
    videos: visualArtsVideos,
    title: 'Visual Arts',
    subtitle: 'Creative Expression & Contemporary Art',
    accentColor: '#D4AF37',
    description:
      'Experience an amazing collection of student artworks spanning painting, mixed media, and contemporary installations. Visual Arts at MLIA cultivates the creative spirit.',
  },
  biz: {
    images: businessImages,
    videos: businessVideos,
    title: 'Business',
    subtitle: 'Entrepreneurship, Economics & Marketing',
    accentColor: '#A8E6CF',
    description:
      'Explore student-led business ventures, economic analyses, and marketing campaigns. Our Business program empowers future leaders with real-world skills.',
  },
  teachers: {
    images: [],
    videos: [],
    title: 'Meet Our Teachers',
    subtitle: 'The Minds Behind the Exhibition',
    accentColor: '#F0D060',
    description:
      'Our dedicated educators inspire students to push the boundaries of knowledge, creativity, and entrepreneurship. Their passion shapes the next generation of leaders.',
  },
};

export default function App() {
  const [activeTab, setActiveTab]             = useState<TabId>('cs');
  const [lightboxOpen, setLightboxOpen]       = useState(false);
  const [lightboxIndex, setLightboxIndex]     = useState(0);

  const dept = DEPT_DATA[activeTab];

  const openLightbox = useCallback((img: GalleryImage) => {
    const idx = dept.images.findIndex(i => i.id === img.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  }, [dept.images]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* ── Particle layer ── */}
      <ParticleCanvas />

      {/* ── Ambient radial backgrounds ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(212,175,55,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 80% 75%, rgba(0,217,255,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(10,10,30,0.4) 0%, transparent 100%)
          `,
        }}
      />

      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '60px',
          paddingBottom: '48px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            width: '80px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '0 auto 28px',
          }}
        />

        {/* Academy badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '30px',
            padding: '6px 22px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#D4AF37', textTransform: 'uppercase' }}>
            🍁 Maple Leaf International Academy — Shenzhen
          </span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
            lineHeight: 1.15,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            padding: '0 16px',
            marginBottom: '10px',
          }}
        >
          <span className="shimmer-text">ADST&nbsp;·&nbsp;BiZ&nbsp;·&nbsp;VISUAL&nbsp;ARTS</span>
        </h1>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
            lineHeight: 1.15,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            padding: '0 16px',
            marginBottom: '18px',
          }}
        >
          <span className="shimmer-text">EXHIBITION&nbsp;·&nbsp;MLIA&nbsp;–&nbsp;SHENZHEN</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.78rem, 1.8vw, 1rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.55)',
            padding: '0 16px',
            marginBottom: '10px',
          }}
        >
          Maple Leaf International Academy – Shenzhen
        </p>

        {/* Subtitle line 2 */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.5)',
            padding: '0 16px',
          }}
        >
          Applied Design, Skills &amp; Technology · Business · Visual Arts
        </p>

        {/* Bottom decorative line */}
        <div
          style={{
            width: '180px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(0,217,255,0.3), transparent)',
            margin: '28px auto 0',
          }}
        />
      </header>

      {/* ================================================================
          NAVIGATION TABS
          ================================================================ */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '20px 24px',
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`crystal-btn${activeTab === tab.id ? ' active' : ''}`}
              style={
                activeTab === tab.id
                  ? {
                      borderColor: tab.color,
                      color: tab.color,
                      boxShadow: `0 6px 25px ${tab.color}55, 0 2px 0 rgba(255,255,255,0.2) inset, 0 0 30px ${tab.color}33`,
                    }
                  : {}
              }
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span style={{ marginRight: 8, fontSize: '1rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px 80px',
        }}
      >
        {/* ── Department header ──────────────────────────────── */}
        <div
          key={activeTab}
          className="fade-in-up"
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div
            style={{
              display: 'inline-block',
              width: '48px', height: '3px',
              background: dept.accentColor,
              borderRadius: '2px',
              marginBottom: '20px',
              boxShadow: `0 0 12px ${dept.accentColor}`,
            }}
          />
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#F5F0E8',
              marginBottom: '8px',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {dept.title}
          </h2>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: dept.accentColor,
              marginBottom: '20px',
            }}
          >
            {dept.subtitle}
          </p>
          <div className="cinematic-divider" style={{ maxWidth: 320 }} />
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.65)',
              maxWidth: '600px',
              margin: '20px auto 0',
            }}
          >
            {dept.description}
          </p>
        </div>

        {/* ── Gallery or Teachers ────────────────────────────── */}
        {activeTab === 'teachers' ? (
          /* ── TEACHERS GRID ── */
          <div
            className="fade-in-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {teachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        ) : (
          /* ── IMAGE GALLERY ── */
          <>
            {/* Gallery count badge */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(0,0,0,0.4)',
                  border: `1px solid ${dept.accentColor}44`,
                  borderRadius: '20px',
                  padding: '5px 18px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: dept.accentColor,
                }}
              >
                {dept.images.length} Works in Exhibition — Click to View Full Screen
              </span>
            </div>

            <div
              className="fade-in-up"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {dept.images.map((img, idx) => (
                <GalleryCard
                  key={img.id}
                  image={img}
                  index={idx}
                  onClick={openLightbox}
                />
              ))}
            </div>

            {/* Hint text */}
            <p
              style={{
                textAlign: 'center',
                marginTop: '32px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.3)',
                letterSpacing: '0.08em',
              }}
            >
              Hover over images to reveal captions · Click to open full-screen lightbox · Use ← → keys to navigate
            </p>

            {/* ── VIDEO SECTION ── */}
            {dept.videos && dept.videos.length > 0 && (
              <VideoSection
                videos={dept.videos}
                accentColor={dept.accentColor}
                deptName={dept.title}
              />
            )}
          </>
        )}
      </main>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(212,175,55,0.15)',
          background: 'linear-gradient(0deg, rgba(5,5,10,0.98) 0%, rgba(10,10,15,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          padding: '44px 24px 40px',
          textAlign: 'center',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: '200px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
            margin: '0 auto 28px',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            marginBottom: '14px',
          }}
        >
          <span className="shimmer-text">MLIA · SZ · ADST BiZ Visual Arts</span>
        </div>

        <div className="cinematic-divider" style={{ maxWidth: 260, marginBottom: '18px' }} />

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.08em',
            color: '#FFFFFF',
            marginBottom: '10px',
          }}
        >
          © Mr.T 2026 – MLIA-SZ-ADST BiZ Visual Arts – Exhibition. All Rights Reserved.
        </p>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            color: 'rgba(212,175,55,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Maple Leaf International Academy · Shenzhen · Applied Design, Skills &amp; Technology
        </p>

        {/* Bottom decorative dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 24,
          }}
        >
          {['#D4AF37', '#00D9FF', '#D4AF37'].map((c, i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 20 : 6,
                height: 2,
                borderRadius: 1,
                background: c,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </footer>

      {/* ================================================================
          LIGHTBOX
          ================================================================ */}
      {lightboxOpen && dept.images.length > 0 && (
        <Lightbox
          images={dept.images}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
