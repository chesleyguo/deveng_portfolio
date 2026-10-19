import { useCallback, useEffect, useRef, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION).matches);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Flips to true the first time the element scrolls into view, then stops observing
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// A quick springy nudge on hover, à la joshwcomeau.com
export function useBoop({ x = 0, y = 0, rotation = 0, scale = 1, timing = 150 }) {
  const reduced = usePrefersReducedMotion();
  const [booped, setBooped] = useState(false);

  useEffect(() => {
    if (!booped) return undefined;
    const id = setTimeout(() => setBooped(false), timing);
    return () => clearTimeout(id);
  }, [booped, timing]);

  const trigger = useCallback(() => setBooped(true), []);

  const style = reduced
    ? {}
    : {
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: booped
          ? `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
          : 'translate(0px, 0px) rotate(0deg) scale(1)',
        transition: `transform ${booped ? timing : timing * 2}ms cubic-bezier(0.3, 0.7, 0.4, 1.5)`,
      };

  return [style, trigger];
}

// setTimeout with a random delay each tick; pass null delays to pause
export function useRandomInterval(callback, minDelay, maxDelay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (minDelay === null || maxDelay === null) return undefined;
    let id;
    const tick = () => {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      id = setTimeout(() => {
        savedCallback.current();
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(id);
  }, [minDelay, maxDelay]);
}
