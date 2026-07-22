# Sitka Cuve — Session Save

## How to continue
```bash
cd "/home/z3nedar/Downloads/Kimi_Agent_Situs Wolf & Moon/app"
npm run dev
```

## Project structure
```
app/
├── src/
│   ├── components/    Navigation, SocialIcons
│   ├── sections/      HeroSection, NewReleaseSection, DiscographySection,
│   │                  MemoriesSection (videos), AboutSection, ListenSection, Footer
│   ├── hooks/         useLenis (smooth scroll)
│   ├── lib/           images.ts (centralized image/video paths), utils.ts
│   ├── App.tsx        Root layout (section order)
│   └── index.css      Global styles, CSS variables, Tailwind
├── public/
│   ├── images/        Site images (hero, gallery, etc.)
│   └── discography/   12 album covers (1st–12th)
├── tailwind.config.js Custom colors (cream, mist, forest, charcoal, burnt, gold)
└── AGENTS.md          This file
```

## Color theme
- Background: Deep navy (#0D111F)
- Sections: Gradient flow between navy tones
- Text: Warm light gray (#E5E0D8)
- Accent: Gold (#C8A34A)
- See `index.css` :root variables + `tailwind.config.js`

## Videos section
YouTube IDs set in `src/sections/MemoriesSection.tsx`:
- Echo: dKfRDEXINRU
- Myself: 0jMLtwntc18
- Already Know: sc4s_UxuV8g
- A Loner: B2yaAr_5L_g
- Love Me Better: pX3dvbREN9U
- Mine: egty5Wj2JkA

## Key files to edit
| Task | File |
|------|------|
| Add/swap images | `src/lib/images.ts` |
| Add YouTube videos | `src/sections/MemoriesSection.tsx` |
| Change section order | `src/App.tsx` |
| Nav links | `src/components/Navigation.tsx` |
| Colors / theme | `src/index.css` + `tailwind.config.js` |
| Social media links | `src/lib/social.ts` |

## Social media (Sitka Cuve)
Defined in `src/lib/social.ts`:
- Spotify: https://open.spotify.com/artist/5bsJN6S5fx09JEThSbazg1
- YouTube: https://www.youtube.com/channel/UCwdLZqbElsq1jWE5aODFI1A/videos
- Instagram: https://instagram.com/sitkacuve
- TikTok: https://www.tiktok.com/@sitkacuve
- Facebook: https://facebook.com/sitkacuve

## Last session state
- All 7 sections implemented and building
- Dark navy theme with gradient backgrounds
- Video modal working with YouTube embeds
- Horizontal scroll gallery for discography (12 albums)
- Smooth scroll (Lenis + GSAP)
- Mobile hamburger menu in nav bar
- Social media links centralized in `src/lib/social.ts`
- Logo image replaces text in hero section (fade-in + scale animation)
