import { ease } from './transitions';

const globals = {
  body: {
    bg: 'background.primary',
    minH: '100vh',
    transition: ease,
  },
  '*': {
    _focusVisible: {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(237, 68, 85, .55) !important',
    },
  },
};

export default globals;
