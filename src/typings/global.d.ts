export {};

declare global {
  interface Window {
    /** Native `document.startViewTransition`, set aside before Astro's router loads (see BaseLayout). */
    __startViewTransition?: Document['startViewTransition'];
  }
}
