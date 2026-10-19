import { useEffect, useState } from 'react';
import { useBoop, useInView, usePrefersReducedMotion, useRandomInterval } from './hooks';

/**
 * Small playful UI pieces: sparkles, typewriter, boop, scroll reveal,
 * animated counters, theme toggle, heart button, scroll progress, wave divider.
 */

// ============================================
// SPARKLES
// ============================================

const SPARKLE_PATH =
  'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const makeSparkle = (color) => ({
  id: `${Date.now()}-${Math.random()}`,
  createdAt: Date.now(),
  color,
  size: randomBetween(10, 20),
  style: { top: `${randomBetween(-10, 90)}%`, left: `${randomBetween(0, 100)}%` },
});

export function Sparkles({ color = '#FDB515', children }) {
  const reduced = usePrefersReducedMotion();
  const [sparkles, setSparkles] = useState(() => [0, 1, 2].map(() => makeSparkle(color)));

  useRandomInterval(
    () => {
      const now = Date.now();
      setSparkles((current) => [
        ...current.filter((s) => now - s.createdAt < 750),
        makeSparkle(color),
      ]);
    },
    reduced ? null : 50,
    reduced ? null : 450
  );

  return (
    <span className="sparkle-wrapper">
      {sparkles.map((s) => (
        <span key={s.id} className="sparkle" style={s.style} aria-hidden="true">
          <svg width={s.size} height={s.size} viewBox="0 0 68 68" fill="none">
            <path d={SPARKLE_PATH} fill={s.color} />
          </svg>
        </span>
      ))}
      <strong className="sparkle-child">{children}</strong>
    </span>
  );
}

// ============================================
// TYPEWRITER
// ============================================

export function Typewriter({ words }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const word = words[index % words.length];

  useEffect(() => {
    if (reduced) {
      setText(word);
      const id = setTimeout(() => setIndex((i) => i + 1), 2500);
      return () => clearTimeout(id);
    }

    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1800;
    else if (deleting && text === '') delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, word, reduced]);

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span className="typewriter" aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </>
  );
}

// ============================================
// BOOP & REVEAL
// ============================================

export function Boop({ children, ...config }) {
  const [style, trigger] = useBoop(config);
  return (
    <span onMouseEnter={trigger} onFocus={trigger} style={style}>
      {children}
    </span>
  );
}

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================

export function Counter({ value, decimals = 0, prefix = '', suffix = '' }) {
  const [ref, inView] = useInView(0.4);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setDisplay(value);
      return undefined;
    }
    const duration = 1400;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ============================================
// THEME TOGGLE (sun ↔ moon)
// ============================================

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const dark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // storage unavailable (private mode); theme just won't persist
    }
  }, [theme]);

  return (
    <button
      type="button"
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle className="moon-cutout" cx="30" cy="8" r="6" fill="black" />
        </mask>
        <g mask="url(#moon-mask)">
          <circle className="sun-core" cx="12" cy="12" r="5" fill="currentColor" />
        </g>
        <g className="sun-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  );
}

// ============================================
// HEART BUTTON
// ============================================

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
const MAX_HEARTS = 10;
const HEARTS_KEY = 'portfolio-hearts';

export function HeartButton() {
  const [count, setCount] = useState(() => {
    try {
      return Math.min(Number(localStorage.getItem(HEARTS_KEY)) || 0, MAX_HEARTS);
    } catch {
      return 0;
    }
  });
  const [bursts, setBursts] = useState([]);
  const full = count >= MAX_HEARTS;

  const handleClick = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 800);
    if (full) return;
    const next = count + 1;
    setCount(next);
    try {
      localStorage.setItem(HEARTS_KEY, String(next));
    } catch {
      // ignore
    }
  };

  const fillHeight = (24 * count) / MAX_HEARTS;
  const message =
    count === 0
      ? 'Enjoyed your visit? Leave a heart.'
      : full
        ? 'Thank you so much! 💛'
        : `${count} / ${MAX_HEARTS}, keep clicking!`;

  return (
    <div className="heart">
      <button
        type="button"
        className={`heart-btn ${full ? 'full' : ''}`}
        aria-label={`Send a heart, ${count} of ${MAX_HEARTS}`}
        onClick={handleClick}
      >
        <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true">
          <defs>
            <clipPath id="heart-level">
              <rect
                x="0"
                y={24 - fillHeight}
                width="24"
                height={fillHeight}
                className="heart-level"
              />
            </clipPath>
          </defs>
          <path d={HEART_PATH} className="heart-outline" />
          <path d={HEART_PATH} className="heart-fill" clipPath="url(#heart-level)" />
        </svg>
        {bursts.map((id) => (
          <span key={id} className="heart-burst" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} style={{ '--angle': `${i * 45}deg` }} />
            ))}
          </span>
        ))}
      </button>
      <p className="heart-message" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

// ============================================
// SCROLL PROGRESS & WAVE DIVIDER
// ============================================

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

export function WaveDivider() {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="wave-back"
        d="M0,40 C240,90 480,0 720,35 C960,70 1200,10 1440,45 L1440,90 L0,90 Z"
      />
      <path
        className="wave-front"
        d="M0,55 C260,95 500,20 740,50 C980,80 1220,30 1440,60 L1440,90 L0,90 Z"
      />
    </svg>
  );
}
