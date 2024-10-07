import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import useAudioContext from './useAudioContext';

interface AlarmSoundReturnType {
  play: () => void;
}

const useAlarmSound = (): AlarmSoundReturnType => {
  const { settings } = useSettings();
  const { setAudio, play, setVolume } = useAudioContext();

  useEffect(() => {
    if (settings.alarmSound) {
      setAudio(`/sounds/alarm/${settings.alarmSound}.mp3`);
    }
  }, [settings.alarmSound, setAudio]);

  useEffect(() => {
    if (settings.alarmSoundVolume) {
      setVolume(settings.alarmSoundVolume);
    }
  }, [settings.alarmSoundVolume, setVolume]);

  return {
    play,
  };
};

export default useAlarmSound;
