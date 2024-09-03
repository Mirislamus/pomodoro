import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface AudioContextReturnType {
  setAudio: Dispatch<SetStateAction<string>>;
  setVolume: (value: number) => void;
  play: () => void;
}

const useAudioContext = (): AudioContextReturnType => {
  const [audio, setAudio] = useState<string>('');
  const [volume, setVolume] = useState<number>(1);
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();

  gainNode.gain.value = volume;
  gainNode.connect(audioContext.destination);

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  const playAudio = (buffer: AudioBuffer) => {
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = buffer;
    audioSource.connect(gainNode);
    audioSource.start();
  };

  useEffect(() => {
    gainNode.gain.value = volume;
  }, [volume]);

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
