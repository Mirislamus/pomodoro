import { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type ColorMode = 'light' | 'dark';

export interface ColorModeContextValue {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
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

  const toggleColorMode = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setColorMode(next);
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
