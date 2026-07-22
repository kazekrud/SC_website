import { useEffect } from 'react';
import { createLenis, destroyLenis } from '../lib/lenis';

export function useLenis() {
  useEffect(() => {
    createLenis();
    return () => destroyLenis();
  }, []);
}
