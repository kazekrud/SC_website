import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PressSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [
      labelRef.current,
      titleRef.current,
      descRef.current,
      lineRef.current,
      linkRef.current,
    ].filter(Boolean);

    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="press"
      className="w-full"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0', background: 'linear-gradient(to bottom, #1E2A3A, #161C2B)' }}
    >
      <div className="content-container">
        <div className="max-w-[680px] mx-auto text-center">
          <span
            ref={labelRef}
            className="caption-style text-gold block mb-6"
          >
            Press
          </span>

          <h2
            ref={titleRef}
            className="font-display text-charcoal mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Press Kit
          </h2>

          <p
            ref={descRef}
            className="font-body text-charcoal mx-auto mb-8"
            style={{
              maxWidth: '520px',
              lineHeight: 1.7,
              fontSize: '1.05rem',
            }}
          >
            Download our press kit for high-resolution photos, album artwork,
            biography, and media assets.
          </p>

          <div
            ref={lineRef}
            className="w-[60px] h-px bg-gold mx-auto mb-8"
          />

          <a
            ref={linkRef}
            href="https://drive.google.com/drive/folders/1rsqexiuVwV2_x2-bugYE2Mtu0RUka485?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block button-style border border-gold text-gold px-10 py-4 tracking-[0.15em] transition-all duration-300 hover:bg-gold hover:text-background hover:shadow-lg"
          >
            Download Press Kit
          </a>
        </div>
      </div>
    </section>
  );
}
