import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { noop } from '../utils/noop';

interface AudioContextReturnType {
  setAudio: Dispatch<SetStateAction<string>>;
  setVolume: (value: number) => void;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const useAudioContext = (loop: boolean = false): AudioContextReturnType => {
  const [audio, setAudio] = useState<string>('');
  const [volume, setVolume] = useState<number>(1);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    return () => {
      audioContextRef.current?.close();
      audioContextRef.current = null;
      gainNodeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const loadAudio = async (url: string) => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') return null;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContextRef.current.decodeAudioData(arrayBuffer);
  };

  const playAudio = (buffer: AudioBuffer) => {
    if (!audioContextRef.current || !gainNodeRef.current || audioContextRef.current.state === 'closed') return;

    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }

    const audioSource = audioContextRef.current.createBufferSource();
    audioSource.buffer = buffer;
    audioSource.loop = loop;
    audioSource.connect(gainNodeRef.current);
    audioSource.start();

    audioSourceRef.current = audioSource;
  };

  const play = () => {
    if (audio) {
      loadAudio(audio)
        .then(buffer => {
          if (buffer) playAudio(buffer);
        })
        .catch(noop);
    }
  };

  const stop = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
  };

  const pause = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
  };

  return {
    setAudio,
    setVolume,
    play,
    stop,
    pause,
  };
};

export default useAudioContext;
