import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getLenis } from '../lib/lenis';

const sectionIds = ['#new-release', '#discography', '#videos', '#about', '#profile'];

export default function ScrollToNext() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const check = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      setVisible(!nearBottom);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const handleClick = () => {
    const gallery = document.querySelector('#discography-gallery');
    const lenis = getLenis();

    // Check if gallery is pinned (visible and its center at/above viewport center)
    let galleryPinned = false;
    if (gallery) {
      const rect = gallery.getBoundingClientRect();
      const galleryCenterViewport = rect.top + rect.height / 2;
      if (galleryCenterViewport <= window.innerHeight / 2 + 100 && rect.bottom > 0) {
        galleryPinned = true;
      }
    }

    if (galleryPinned) {
      if (lenis) {
        lenis.scrollTo('#videos', { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      }
      return;
    }

    // Find next section
    const scrollY = window.scrollY;
    const viewportMid = scrollY + window.innerHeight / 2;
    let nextTarget = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.querySelector(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + scrollY;
        if (elTop > viewportMid) {
          nextTarget = id;
          break;
        }
      }
    }

    if (nextTarget === '#discography' && gallery && lenis) {
      // Scroll to gallery center → first image centered
      const rect = gallery.getBoundingClientRect();
      const galleryCenter = rect.top + window.scrollY + rect.height / 2;
      const targetY = galleryCenter - window.innerHeight / 2;
      lenis.scrollTo(targetY, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else if (lenis) {
      lenis.scrollTo(nextTarget, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
    >
      <ChevronDown className="text-white" size={28} />
    </button>
  );
}
