import Navigation from './components/Navigation';
import ScrollToNext from './components/ScrollToNext';
import HeroSection from './sections/HeroSection';
import NewReleaseSection from './sections/NewReleaseSection';
import DiscographySection from './sections/DiscographySection';
import MemoriesSection from './sections/MemoriesSection';
import AboutSection from './sections/AboutSection';
import PressSection from './sections/PressSection';
import Footer from './sections/Footer';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <div style={{ background: '#0D111F', height: 'clamp(60px, 6vh, 100px)' }} />
        <NewReleaseSection />
        <div style={{ background: '#161C2B', height: 'clamp(160px, 20vh, 260px)' }} />
        <DiscographySection />
        <MemoriesSection />
        <AboutSection />
        <PressSection />
      </main>
      <ScrollToNext />
      <Footer />
    </div>
  );
}
