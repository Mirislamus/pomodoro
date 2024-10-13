import { useEffect } from 'react';
import useAudioContext from './useAudioContext';
import useSettingsStore from '../stores/useSettingsStore';
import { TickSound } from '../typings/enums';

interface TickSoundReturnType {
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const useTickSound = (): TickSoundReturnType => {
  const settings = useSettingsStore(state => state.settings);
  const allowTickSound = settings.tickSound !== TickSound.None;
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

  const playTickSound = () => {
    if (allowTickSound) {
      play();
    }
  };

  const pauseTickSound = () => {
    if (allowTickSound) {
      pause();
    }
  };


  return {
    play: playTickSound,
    stop,
    pause: pauseTickSound,
  };
};

export default useTickSound;
