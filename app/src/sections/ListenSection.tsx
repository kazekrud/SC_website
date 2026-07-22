import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube } from 'lucide-react';
import { socials } from '../lib/social';

gsap.registerPlugin(ScrollTrigger);

const SpotifyIcon = ({ size = 48, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.72.48-1.08.24-2.88-1.8-6.48-2.16-10.68-1.2-.42.12-.84-.12-.96-.54-.12-.42.12-.84.54-.96 4.56-1.08 8.52-.6 11.76 1.44.36.24.48.72.24 1.08zm1.44-3.24c-.3.42-.84.6-1.26.3-3.24-2.04-8.16-2.64-12-.84-.48.18-1.02-.06-1.2-.54-.18-.48.06-1.02.54-1.2 4.44-1.92 9.96-1.32 13.68 1.08.42.24.6.84.24 1.2zm.12-3.42c-3.96-2.4-9.96-2.64-13.2-1.44-.6.24-1.32-.06-1.56-.66-.24-.6.06-1.32.66-1.56 3.6-1.32 10.2-1.08 14.64 1.56.54.36.72 1.08.42 1.68-.3.54-1.08.78-1.56.42z" />
  </svg>
);

const platforms = [
  {
    name: 'Spotify',
    icon: SpotifyIcon,
    href: socials.spotify,
    color: '#1DB954',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: socials.youtube,
    color: '#FF0000',
  },
];

export default function ListenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set([labelRef.current, titleRef.current], { opacity: 0, y: 30 });

    gsap.to([labelRef.current, titleRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.platform-card');
      gsap.set(cards, { opacity: 0, scale: 0.95 });

      gsap.to(cards, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === cardsRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="w-full"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0', background: 'linear-gradient(to bottom, #161C2B, #0D111F)' }}
    >
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            ref={labelRef}
            className="caption-style text-burnt block mb-4"
          >
            Listen On
          </span>
          <h2
            ref={titleRef}
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Find Us on Your Platform
          </h2>
        </div>

        {/* Platform Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-card group flex flex-col items-center justify-center bg-mist/50 rounded-lg p-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  minWidth: '240px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 12px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                <Icon
                  size={48}
                  className="mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: platform.color }}
                />
                <span
                  className="font-body font-medium text-charcoal"
                  style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}
                >
                  {platform.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
