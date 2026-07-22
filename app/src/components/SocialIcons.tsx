import { Instagram, Youtube, Facebook } from 'lucide-react';
import { socials } from '../lib/social';

interface SocialIconsProps {
  color?: string;
  size?: number;
  className?: string;
  gap?: string;
}

// TikTok icon component since lucide doesn't have it
const TikTokIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SpotifyIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.72.48-1.08.24-2.88-1.8-6.48-2.16-10.68-1.2-.42.12-.84-.12-.96-.54-.12-.42.12-.84.54-.96 4.56-1.08 8.52-.6 11.76 1.44.36.24.48.72.24 1.08zm1.44-3.24c-.3.42-.84.6-1.26.3-3.24-2.04-8.16-2.64-12-.84-.48.18-1.02-.06-1.2-.54-.18-.48.06-1.02.54-1.2 4.44-1.92 9.96-1.32 13.68 1.08.42.24.6.84.24 1.2zm.12-3.42c-3.96-2.4-9.96-2.64-13.2-1.44-.6.24-1.32-.06-1.56-.66-.24-.6.06-1.32.66-1.56 3.6-1.32 10.2-1.08 14.64 1.56.54.36.72 1.08.42 1.68-.3.54-1.08.78-1.56.42z" />
  </svg>
);

const socialLinks = [
  { icon: SpotifyIcon, href: socials.spotify, label: 'Spotify' },
  { icon: Instagram, href: socials.instagram, label: 'Instagram' },
  { icon: Youtube, href: socials.youtube, label: 'YouTube' },
  { icon: TikTokIcon, href: socials.tiktok, label: 'TikTok' },
  { icon: Facebook, href: socials.facebook, label: 'Facebook' },
];

export default function SocialIcons({ color = 'currentColor', size = 20, className = '', gap = '1.5rem' }: SocialIconsProps) {
  return (
    <div className={`flex items-center ${className}`} style={{ gap }}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300"
            style={{ color }}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
