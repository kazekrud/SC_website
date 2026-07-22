import SocialIcons from '../components/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full" style={{ paddingTop: '80px', paddingBottom: '40px', background: 'linear-gradient(to bottom, #0D111F, #060A14)' }}>
      <div className="content-container">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <h3
            className="font-display text-white"
            style={{ fontSize: '2rem' }}
          >
            Sitka Cuve
          </h3>
          <SocialIcons color="#FFFFFF" size={18} gap="1rem" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="caption-style text-white/40">
            &copy; 2026 Sitka Cuve. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="caption-style text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="caption-style text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
