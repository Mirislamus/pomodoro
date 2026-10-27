import { ease } from './transitions';

const globals = {
  html: {
    WebkitTapHighlightColor: 'transparent',
  },
  body: {
    bg: 'background.primary',
    color: 'bodyText',
    minH: '100vh',
    transition: ease,
  },
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])': {
    _focusVisible: {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(237, 68, 85, .55) !important',
    },
  },
  'button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [role="tab"]:not([aria-disabled="true"])': {
    cursor: 'pointer',
  },
  // The SEO article lives outside the React island, under the timer page only
  'html[data-route="settings"] #seo-section': {
    display: 'none',
  },
  // Theme switch: the new theme is revealed by a clip-path circle (see color-mode.tsx),
  // so the default cross-fade and all color transitions are turned off for its duration
  'html.theme-transition::view-transition-old(root), html.theme-transition::view-transition-new(root)': {
    animation: 'none',
    mixBlendMode: 'normal',
  },
  'html.theme-transition *, html.theme-transition *::before, html.theme-transition *::after': {
    transition: 'none !important',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '*, *::before, *::after': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
    },
  },
};

export default globals;
