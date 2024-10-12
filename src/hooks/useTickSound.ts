import { useEffect } from 'react';
import useAudioContext from './useAudioContext';
import useSettingsStore from '../stores/useSettingsStore';

interface TickSoundReturnType {
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const useTickSound = (): TickSoundReturnType => {
  const settings = useSettingsStore(state => state.settings);
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
    pause,
  };
};

export default useTickSound;
