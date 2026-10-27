import { useCallback, useEffect, useRef } from 'react';
import { getAudioContext, loadAudioBuffer } from '../utils/audio';

interface UseAudioPlayerOptions {
  /** Sound URL. An empty string turns the player into a no-op. */
  src: string;
  volume: number;
  loop?: boolean;
}

export interface AudioPlayer {
  play: () => void;
  stop: () => void;
}

const useAudioPlayer = ({ src, volume, loop = false }: UseAudioPlayerOptions): AudioPlayer => {
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const volumeRef = useRef(volume);
  // Bumped on every play/stop so a sound that finishes loading after stop() never starts
  const requestIdRef = useRef(0);

  useEffect(() => {
    volumeRef.current = volume;
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    const source = sourceRef.current;
    sourceRef.current = null;
    if (source) {
      try {
        source.stop();
      } catch {
        // already stopped
      }
      source.disconnect();
    }
  }, []);

  const play = useCallback(() => {
    const context = getAudioContext();
    if (!context || !src) return;

    stop();
    const requestId = requestIdRef.current;

    const start = async () => {
      if (context.state === 'suspended') await context.resume();
      const buffer = await loadAudioBuffer(context, src);
      if (requestId !== requestIdRef.current) return;

      if (!gainRef.current) {
        gainRef.current = context.createGain();
        gainRef.current.connect(context.destination);
      }
      gainRef.current.gain.value = volumeRef.current;

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      source.connect(gainRef.current);
      source.start();
      sourceRef.current = source;
    };

    // Sounds are a nice-to-have: a failed fetch or decode must never break the timer
    start().catch(() => {});
  }, [src, loop, stop]);

  useEffect(
    () => () => {
      stop();
      gainRef.current?.disconnect();
      gainRef.current = null;
    },
    [stop]
  );

  return { play, stop };
};

export default useAudioPlayer;
