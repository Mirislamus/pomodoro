import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();

  gainNode.gain.value = volume;
  gainNode.connect(audioContext.destination);

  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  const playAudio = (buffer: AudioBuffer) => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }

    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = buffer;
    audioSource.loop = loop;

    audioSource.connect(gainNode);
    audioSource.start();

    audioSourceRef.current = audioSource;
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
  };

  const pauseAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
  };

  useEffect(() => {
    gainNode.gain.value = volume;
  }, [volume]);

  const play = () => {
    if (audio) {
      loadAudio(audio).then(playAudio);
    }
  };

  const stop = () => {
    stopAudio();
  };

  const pause = () => {
    pauseAudio();
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
