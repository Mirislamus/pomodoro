import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import useAudioContext from './useAudioContext';

interface TickSoundReturnType {
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const useTickSound = (): TickSoundReturnType => {
  const { settings } = useSettings();
  const { setAudio, play, stop, pause } = useAudioContext(true);

  useEffect(() => {
    if (settings.tickSound) {
      setAudio(`/sounds/tick/${settings.tickSound}.mp3`);
    }
  }, [settings.tickSound, setAudio]);

  return {
    play,
    stop,
    pause,
  };
};

export default useTickSound;
