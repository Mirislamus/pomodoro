import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface AudioContextReturnType {
  setAudio: Dispatch<SetStateAction<string>>;
  setVolume: (value: number) => void;
  play: () => void;
}

const useAudioContext = (loop: boolean = false): AudioContextReturnType => {
  const [audio, setAudio] = useState<string>('');
  const [volume, setVolume] = useState<number>(1);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const context = new AudioContext();
      const gain = context.createGain();
      gain.gain.value = volume;
      gain.connect(context.destination);

      setAudioContext(context);
      setGainNode(gain);
    }
  }, []);

  useEffect(() => {
    if (gainNode) {
      gainNode.gain.value = volume;
    }
  }, [volume, gainNode]);

  const loadAudio = async (url: string) => {
    if (!audioContext) return;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  const playAudio = (buffer: AudioBuffer) => {
    if (!audioContext || !gainNode) return;
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = buffer;
    if (loop) {
      audioSource.loop = loop;
    }
    audioSource.connect(gainNode);
    audioSource.start();
  };

  const play = () => {
    if (audio) {
      loadAudio(audio).then(playAudio);
    }
  };

  return {
    setAudio,
    setVolume,
    play,
  };
};

export default useAudioContext;
