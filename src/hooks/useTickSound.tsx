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
  const { setAudio, play, stop, pause, setVolume } = useAudioContext(true);

  useEffect(() => {
    if (settings.tickSound) {
      setAudio(`/sounds/tick/${settings.tickSound}.mp3`);
    }
  }, [settings.tickSound, setAudio]);

  useEffect(() => {
    if (settings.tickSoundVolume) {
      setVolume(settings.tickSoundVolume);
    }
  }, [settings.tickSoundVolume, setVolume]);

  return {
    play,
    stop,
    pause
  };
};

export default useTickSound;
