import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { flushSync } from 'react-dom';

export interface TransitionOrigin {
  x: number;
  y: number;
}

export type ColorMode = 'light' | 'dark';

export interface ColorModeContextValue {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  /** `origin` is the point (usually the clicked button) the new theme grows from. */
  toggleColorMode: (origin?: TransitionOrigin) => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

export interface ColorModeProviderProps {
  storageKey?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  children?: React.ReactNode;
}

export function ColorModeProvider({
  storageKey = 'chakra-ui-color-mode',
  defaultTheme = 'system',
  children,
}: ColorModeProviderProps) {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(storageKey) || defaultTheme;
      } catch {}
    }
    return defaultTheme;
  });

  const getSystemTheme = (): ColorMode => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const resolvedTheme: ColorMode = theme === 'system' || !theme ? getSystemTheme() : (theme as ColorMode);

  const applyTheme = (color: ColorMode) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(color);
      root.setAttribute('data-theme', color);
      root.style.colorScheme = color;
    }
  };

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setColorMode = (newMode: ColorMode | 'system') => {
    setThemeState(newMode);
    try {
      localStorage.setItem(storageKey, newMode);
    } catch {}
    const resolved = newMode === 'system' ? getSystemTheme() : (newMode as ColorMode);
    applyTheme(resolved);
  };

  const toggleColorMode = (origin?: TransitionOrigin) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // A hidden page renders no frames, so a view transition would stall until it is shown again
    // Astro's router is kept off the native API (see BaseLayout), which stays available here
    const startViewTransition = window.__startViewTransition ?? document.startViewTransition?.bind(document);

    if (!startViewTransition || prefersReducedMotion || document.visibilityState !== 'visible') {
      setColorMode(next);
      return;
    }

    // CSS color transitions would make the browser snapshot a half-switched page
    root.classList.add('theme-transition');
    const transition = startViewTransition(() => flushSync(() => setColorMode(next)));

    transition.ready
      .then(() => {
        const { innerWidth: width, innerHeight: height } = window;
        const x = origin?.x ?? width / 2;
        const y = origin?.y ?? height / 2;
        const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));

        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-transition'));
  };

  const value = useMemo(
    () => ({
      colorMode: resolvedTheme,
      setColorMode: (mode: ColorMode) => setColorMode(mode),
      toggleColorMode,
    }),
    [resolvedTheme]
  );

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);
  if (!context) {
    return {
      colorMode: 'light',
      setColorMode: () => {},
      toggleColorMode: () => {},
    };
  }
  return context;
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}
