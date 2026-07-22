import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: '/images/about/gallery/portrait-1.jpg', alt: 'Portrait 1', aspect: 'portrait' },
  { src: '/images/about/gallery/landscape-1.jpg', alt: 'Landscape 1', aspect: 'landscape' },
  { src: '/images/about/gallery/portrait-2.jpg', alt: 'Landscape 2', aspect: 'landscape' },
  { src: '/images/about/gallery/landscape-2.jpg', alt: 'Landscape 2', aspect: 'landscape' },
  { src: '/images/about/gallery/landscape-3.jpg', alt: 'Landscape 3', aspect: 'landscape' },
  { src: '/images/about/gallery/landscape-4.jpg', alt: 'Landscape 4', aspect: 'landscape' },
];

const memberPhotos = {
  krud: '/images/about/members/krud.jpg',
  fey: '/images/about/members/fey.jpg',
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const conceptRef = useRef<HTMLParagraphElement>(null);
  const krudRef = useRef<HTMLDivElement>(null);
  const feyRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textElements = [
      labelRef.current,
      titleRef.current,
      bioRef.current,
      conceptRef.current,
      krudRef.current,
      feyRef.current,
    ].filter(Boolean);

    gsap.set(textElements, { opacity: 0, y: 40 });

    gsap.to(textElements, {
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

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === gridRef.current) st.kill();
      });
    };
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0', background: 'linear-gradient(to bottom, #0D111F, #161C2B)' }}
    >
      <div className="content-container">
        <div className="max-w-[960px] mx-auto">
          <span
            ref={labelRef}
            className="caption-style text-burnt block mb-6"
          >
            About
          </span>

          <h2
            ref={titleRef}
            className="font-display text-charcoal mb-12 text-center md:text-left md:max-w-[580px] md:mx-0"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Get to Know Sitka Cuve
          </h2>

          <div className="md:grid md:grid-cols-2 md:gap-10 md:mb-12">
            <p
              ref={bioRef}
              className="font-body text-charcoal/70 mb-6 md:mb-0"
              style={{
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
               They met through an online platform and instantly connected over their shared vision for music. <strong>Even though they live in different places, they continue to create music together,</strong> blending pop with influences from Western and Japanese artists.
            </p>

            <p
              ref={conceptRef}
              className="font-body text-charcoal/70"
              style={{
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
               <strong>Sitka Cuve embraces an anonymous/faceless concept,</strong> with the hope that listeners will focus on the music and the stories behind each song, rather than the appearance of the artists.
            </p>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-10">
            <div ref={krudRef} className="mb-8 md:mb-0">
              <div className="flex items-center gap-5 mb-3">
                <div className="w-[150px] h-[150px] rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={memberPhotos.krud} alt="Krud" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-charcoal text-lg">Krud</h3>
                  <p className="font-body text-charcoal/60 text-xs">Music Composer / Guitarist</p>
                </div>
              </div>
              <p className="font-body text-charcoal/60 text-sm mb-1">Birthday: February 16</p>
              <p className="font-body text-charcoal/70 text-sm leading-relaxed">
                Krud has been passionate about music since childhood, learning piano, drums, and guitar before performing live throughout high school. His diverse influences shape Sitka Cuve's signature sound.
              </p>
            </div>

            <div ref={feyRef}>
              <div className="flex items-center gap-5 mb-3">
                <div className="w-[150px] h-[150px] rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={memberPhotos.fey} alt="Fey V" className="w-full h-full object-cover object-[50%_20%]" />
                </div>
                <div>
                  <h3 className="font-display text-charcoal text-lg">Fey V</h3>
                  <p className="font-body text-charcoal/60 text-xs">Lead Vocalist</p>
                </div>
              </div>
              <p className="font-body text-charcoal/60 text-sm mb-1">Birthday: February 24</p>
              <p className="font-body text-charcoal/70 text-sm leading-relaxed">
                Inspired by R&B, soul, and pop, Fey V has been developing her voice from an early age. Her experience in a university choir helped refine her vocals, bringing warmth and emotion to every Sitka Cuve song.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 md:mt-20 max-w-[960px] mx-auto"
        >
          <div className="hidden md:grid md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-3 h-full" onContextMenu={(e) => e.preventDefault()}>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-1 col-end-2 row-start-1 row-end-3 relative" onClick={() => openLightbox(0)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[0].src} alt={photos[0].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-2 col-end-3 row-start-1 row-end-2 relative" onClick={() => openLightbox(1)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[1].src} alt={photos[1].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-3 col-end-4 row-start-1 row-end-2 relative" onClick={() => openLightbox(2)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[2].src} alt={photos[2].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-2 col-end-4 row-start-2 row-end-3 relative" onClick={() => openLightbox(3)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[3].src} alt={photos[3].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-1 col-end-2 row-start-3 row-end-4 relative" onClick={() => openLightbox(4)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[4].src} alt={photos[4].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="gallery-item overflow-hidden rounded-sm cursor-pointer col-start-2 col-end-4 row-start-3 row-end-4 relative" onClick={() => openLightbox(5)}>
              <div className="absolute inset-0 z-10" />
              <img src={photos[5].src} alt={photos[5].alt} className="w-full h-full object-cover" draggable={false} />
            </div>
          </div>

          <div className="md:hidden flex flex-col gap-3" onContextMenu={(e) => e.preventDefault()}>
            {photos.map((photo, index) => (
              <div key={photo.src} className="gallery-item overflow-hidden rounded-sm cursor-pointer relative" onClick={() => openLightbox(index)}>
                <div className="absolute inset-0 z-10" />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover"
                  style={{ aspectRatio: photo.aspect === 'portrait' ? '2/3' : '16/9' }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <ChevronLeft size={36} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <ChevronRight size={36} />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain pointer-events-none"
            draggable={false}
          />

          <div className="absolute bottom-6 text-white/50 text-xs">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
