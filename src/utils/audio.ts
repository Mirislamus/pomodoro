type AudioContextConstructor = typeof AudioContext;

let sharedContext: AudioContext | null = null;
const bufferCache = new Map<string, Promise<AudioBuffer>>();

/** One AudioContext for the whole app: browsers cap how many can be alive at once. */
export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!sharedContext || sharedContext.state === 'closed') {
    const Constructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
    sharedContext = Constructor ? new Constructor() : null;
  }

  return sharedContext;
};

/**
 * Autoplay policies only let audio start after a user gesture. Calling this from
 * a click handler lets sounds triggered later (e.g. the alarm) play reliably.
 */
export const unlockAudio = () => {
  const context = getAudioContext();
  if (context?.state === 'suspended') {
    context.resume().catch(() => {});
  }
};

export const loadAudioBuffer = (context: AudioContext, url: string): Promise<AudioBuffer> => {
  let buffer = bufferCache.get(url);

  if (!buffer) {
    buffer = fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load sound: ${url}`);
        return response.arrayBuffer();
      })
      .then(data => context.decodeAudioData(data));
    buffer.catch(() => bufferCache.delete(url));
    bufferCache.set(url, buffer);
  }

  return buffer;
};
