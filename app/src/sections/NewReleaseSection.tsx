import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { images } from '../lib/images';

gsap.registerPlugin(ScrollTrigger);

export default function NewReleaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(imageRef.current, { opacity: 0, x: -60 });
    gsap.set([labelRef.current, titleRef.current, dateRef.current, descRef.current, buttonsRef.current], {
      opacity: 0,
      x: 40,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(imageRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(
      [labelRef.current, titleRef.current, dateRef.current, descRef.current, buttonsRef.current],
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="new-release"
      className="w-full"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0', background: 'linear-gradient(to bottom, #0D111F, #161C2B)' }}
    >
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Album Artwork */}
          <div ref={imageRef} className="w-full md:w-[45%] flex-shrink-0">
            <div
              className="relative overflow-hidden rounded"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <img
                src={images.newRelease.albumArt}
                alt="Echo - New Single by Sitka Cuve"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-[55%] flex flex-col items-start">
            <span
              ref={labelRef}
              className="caption-style text-burnt mb-4"
            >
              New Release
            </span>

            <h2
              ref={titleRef}
              className="font-display text-charcoal mb-3"
              style={{
                fontSize: 'clamp(4rem, 8vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              Echo
            </h2>

            <p
              ref={dateRef}
              className="font-body font-medium text-charcoal/50 mb-6"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', letterSpacing: '0.05em' }}
            >
              26.06.2026
            </p>

            <p
              ref={descRef}
              className="font-body text-charcoal/80 leading-relaxed mb-8"
              style={{ maxWidth: '480px', lineHeight: 1.7 }}
            >
              &ldquo;Echo&rdquo; is a cinematic reflection on healing and acceptance, telling the story
              of someone who has moved on from a painful past yet occasionally finds old
              memories resurfacing in unexpected moments. Like an echo, these memories
              briefly linger before fading away, leaving the past where it belongs.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/track/3flYOyL9dQO2cAeFsQaiQ1?si=4e136e21038b4e57"
                target="_blank"
                rel="noopener noreferrer"
                className="button-style inline-flex items-center justify-center gap-2 bg-burnt text-white px-8 h-12 rounded hover:bg-burnt-dark transition-colors duration-300"
                style={{ minWidth: '160px' }}
              >
                <ExternalLink size={16} />
                Listen on Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=dKfRDEXINRU&list=RDdKfRDEXINRU&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="button-style inline-flex items-center justify-center gap-2 bg-transparent text-charcoal border border-charcoal/30 px-8 h-12 rounded hover:bg-charcoal hover:text-white transition-all duration-300"
                style={{ minWidth: '160px' }}
              >
                <ExternalLink size={16} />
                Watch on YouTube
              </a>
            </div>

            <div className="mt-8 w-full max-w-[480px]">
              <iframe
                src="https://open.spotify.com/embed/track/3flYOyL9dQO2cAeFsQaiQ1?utm_source=generator&theme=0&si=01618f7924c0449a"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
