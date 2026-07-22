import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
  title: string;
  youtubeId: string;
  type: 'Music Video' | 'Lyric Video';
}

// Replace youtubeId with your actual YouTube video IDs
const videos: VideoItem[] = [
  { title: 'Echo', youtubeId: 'dKfRDEXINRU', type: 'Music Video' },
  { title: 'Myself', youtubeId: '0jMLtwntc18', type: 'Lyric Video' },
  { title: 'Already Know', youtubeId: 'sc4s_UxuV8g', type: 'Music Video' },
  { title: 'A Loner', youtubeId: 'B2yaAr_5L_g', type: 'Music Video' },
  { title: 'Love Me Better', youtubeId: 'pX3dvbREN9U', type: 'Music Video' },
  { title: 'Mine', youtubeId: 'egty5Wj2JkA', type: 'Music Video' },
];

export default function MemoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });

    gsap.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    const cards = grid.querySelectorAll('.video-card');
    gsap.set(cards, { opacity: 0, y: 50 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === grid) st.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  return (
    <>
      <section
        ref={sectionRef}
        id="videos"
        className="w-full"
        style={{ padding: 'clamp(80px, 12vh, 160px) 0', background: 'linear-gradient(to bottom, #0D111F, #161C2B)' }}
      >
        <div className="content-container">
          <div className="text-center mb-12">
            <h2
              ref={titleRef}
              className="font-display text-charcoal mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Videos
            </h2>
            <p
              ref={subtitleRef}
              className="font-body text-charcoal/60"
              style={{ fontSize: '1.1rem' }}
            >
              Watch the latest visuals from Sitka Cuve
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {videos.map((video, i) => (
              <button
                key={i}
                onClick={() => video.youtubeId && setActiveVideo(video)}
                disabled={!video.youtubeId}
                className="video-card group block w-full text-left"
              >
                <div
                  className="relative overflow-hidden rounded-sm mb-3"
                  style={{
                    aspectRatio: '16/9',
                    background: '#0D111F',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  {video.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-charcoal/30 font-body text-sm">No video ID set</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-500">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
                      <polygon points="9.5,7 9.5,17 18,12" fill="white" />
                    </svg>
                  </div>
                </div>
                <span className="caption-style text-burnt mb-1 block">{video.type}</span>
                <h3 className="font-display text-charcoal text-lg md:text-xl leading-tight">
                  {video.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl mx-4"
            style={{ aspectRatio: '16/9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full rounded-sm"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
