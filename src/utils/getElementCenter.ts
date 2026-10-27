import type { TransitionOrigin } from '../components/ui/color-mode';

export const getElementCenter = (element: Element): TransitionOrigin => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { x: left + width / 2, y: top + height / 2 };
};
