import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface AudioContextReturnType {
  setAudio: Dispatch<SetStateAction<string>>;
}

const useAudioContext = (): AudioContextReturnType => {
  const [audio, setAudio] = useState<string>('');
  const audioContext = new AudioContext();

  async function loadAudio(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  }

  async function playAudio(buffer: AudioBuffer) {
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = buffer;
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }

  useEffect(() => {
    if (audio) {
      loadAudio(audio).then(playAudio);
    }
  }, [audio]);

  return {
    setAudio,
  };
};

export default useAudioContext;
