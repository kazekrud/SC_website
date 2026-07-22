import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialIcons from '../components/SocialIcons';
import { images } from '../lib/images';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!section || !bg || !content) return;

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 3.5, ease: 'power2.out' }
    )
      .fromTo(
        socialsRef.current?.children ? Array.from(socialsRef.current.children) : [],
        { opacity: 0, y: -20 },
        { opacity: 0.8, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

    // Set scroll indicator to always visible immediately
    gsap.set(scrollIndicatorRef.current, { opacity: 0.6 });

    // Parallax scroll animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    scrollTl.to(bg, { y: 150, ease: 'none' });
    scrollTl.to(content, { opacity: 0, scale: 0.95, ease: 'none' }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scale(1.1)' }}
      >
        <img
            src={images.hero.bg}
          alt="Sitka Cuve - Windswept dune landscape"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(45,41,38,0.4) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        {/* Social Icons */}
        <div ref={socialsRef} className="absolute top-20 md:top-24">
          <SocialIcons color="#FFFFFF" size={20} gap="1.5rem" />
        </div>

        {/* Logo */}
        <div
          ref={titleRef}
          className="opacity-0 flex items-center justify-center"
        >
          <img
            src={images.hero.logo}
            alt="Sitka Cuve"
            style={{
              maxWidth: 'clamp(280px, 50vw, 700px)',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>

        {/* Removed — global scroll arrow in App */}
      </div>
    </section>
  );
}
