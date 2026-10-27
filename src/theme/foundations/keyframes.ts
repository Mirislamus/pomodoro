const keyframes = {
  'fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  'view-enter': {
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'none' },
  },
  'panel-enter': {
    from: { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
    to: { opacity: 1, transform: 'none' },
  },
  'sheet-enter': {
    from: { opacity: 0, transform: 'translateY(32px)' },
    to: { opacity: 1, transform: 'none' },
  },
  'content-enter': {
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'none' },
  },
  'icon-enter': {
    from: { opacity: 0, transform: 'rotate(-90deg) scale(0.6)' },
    to: { opacity: 1, transform: 'none' },
  },
};

export default keyframes;
