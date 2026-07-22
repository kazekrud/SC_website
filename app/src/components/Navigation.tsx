import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'New Release', href: '#new-release' },
  { label: 'Discography', href: '#discography' },
  { label: 'About', href: '#about' },
  { label: 'Press', href: '#press' },
  { label: 'Videos', href: '#videos' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textColor = isScrolled ? 'text-charcoal' : 'text-white';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-12 md:h-16 px-3 md:px-8">
        {/* Logo */}
        <a
          href="#"
          className={`font-display text-sm md:text-lg transition-colors duration-300 whitespace-nowrap ${textColor}`}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Sitka Cuve
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`nav-link-style text-xs xl:text-sm relative group transition-colors duration-300 whitespace-nowrap ${textColor}`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1 h-px w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? 'bg-charcoal' : 'bg-white'
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-1 transition-colors duration-300 ${textColor}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: isScrolled ? 'rgba(13,17,31,0.97)' : 'rgba(13,17,31,0.92)' }}
      >
        <div className="flex flex-col px-3 pb-3 pt-1 gap-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-white/80 hover:text-white text-xs py-2 px-2 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
