import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '../lib/images';
import { getLenis } from '../lib/lenis';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = images.discography;

const quote = "Every song marks a chapter of our journey, capturing the moments, memories, and experiences that continue to shape us.";

export default function DiscographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    const wrapper = wrapperRef.current;
    const heading = headingRef.current;
    if (!section || !gallery || !wrapper || !heading) return;

    // Heading entrance animation
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });

    gsap.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
      },
    });

    // Horizontal scroll animation
    const scrollWidth = wrapper.scrollWidth - window.innerWidth;
    const startOffset = -(window.innerHeight * 0.5);

    gsap.set(wrapper, { x: startOffset });
    gsap.to(wrapper, {
      x: startOffset - scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: gallery,
        start: 'center center',
        end: '+=250%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = galleryImages.length;
          const idx = Math.round(progress * (total - 1));
          setCurrentIndex(Math.min(idx, total - 1));
        },
      },
    });

    // Quotes entrance animation
    if (quotesRef.current) {
      const quoteCards = quotesRef.current.querySelectorAll('.quote-card');
      gsap.set(quoteCards, { opacity: 0, y: 60 });

      gsap.to(quoteCards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gallery,
          start: 'center center',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === gallery ||
          st.trigger === heading
        ) {
          st.kill();
        }
      });
    };
  }, []);

  const goTo = (index: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const st = ScrollTrigger.getAll().find((t) => t.trigger === gallery);
    if (!st) return;
    const progress = index / (galleryImages.length - 1);
    const targetScroll = st.start + progress * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    setCurrentIndex(index);
  };

  return (
    <section ref={sectionRef} id="discography" className="w-full">
      {/* Heading Block */}
      <div
        ref={headingRef}
        className="w-full"
        style={{ padding: '100px 0', background: 'linear-gradient(to bottom, #161C2B, #0D111F)' }}
      >
        <div className="content-container text-center">
          <h2
            ref={titleRef}
            className="font-display text-charcoal mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
            }}
          >
            The Journey So Far
          </h2>
          <p
            ref={subtitleRef}
            className="font-body text-charcoal/60"
            style={{ fontSize: '1.1rem' }}
          >
            A cinematic world of sound and story
          </p>
        </div>
      </div>

      {/* Horizontal Gallery */}
      <div
        ref={galleryRef}
        id="discography-gallery"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #0D111F, #161C2B)' }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          ref={wrapperRef}
          className="flex items-center gap-0 py-8"
          style={{ willChange: 'transform' }}
        >
          {/* Spacer for centering first image */}
          <div style={{ width: '50vw', flexShrink: 0 }} />

          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-image flex-shrink-0 overflow-hidden rounded-2xl relative group"
              style={{ height: '55vh', aspectRatio: '4/3' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative inline-flex">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block max-w-full rounded-2xl"
                    style={{ maxHeight: '55vh', width: 'auto', height: 'auto' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center rounded-2xl">
                    <h3 className="font-display text-white text-center text-2xl md:text-3xl leading-tight px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{img.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for centering last image */}
          <div style={{ width: '50vw', flexShrink: 0 }} />
        </div>

        {/* Navigation Buttons */}
        <div
          className={`absolute inset-y-0 left-0 right-0 pointer-events-none transition-opacity duration-500 ${
            hovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex <= 0}
            className={`pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentIndex <= 0
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex >= galleryImages.length - 1}
            className={`pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentIndex >= galleryImages.length - 1
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Quotes Section */}
        <div ref={quotesRef} className="w-full" style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}>
          <div className="content-container">
            <div className="max-w-[680px] mx-auto text-center">
              <p
                className="quote-card font-display italic text-charcoal/80 leading-relaxed"
                style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
              >
                {quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
