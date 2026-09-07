import { ease } from './transitions';

const globals = {
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
};

export default globals;
