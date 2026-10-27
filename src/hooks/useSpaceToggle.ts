import { useEffect } from 'react';
import useLatest from './useLatest';

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, [contenteditable="true"], [role="button"], [role="tab"], [role="menuitem"], [role="slider"], [role="dialog"]';

/**
 * Space toggles the timer, unless focus is on something Space already operates
 * or the user has scrolled down to read the page content.
 */
const useSpaceToggle = (onToggle: () => void, isEnabled = true) => {
  const onToggleRef = useLatest(onToggle);

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;
      if (window.scrollY > window.innerHeight / 2) return;

      event.preventDefault();
      onToggleRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, onToggleRef]);
};

export default useSpaceToggle;
