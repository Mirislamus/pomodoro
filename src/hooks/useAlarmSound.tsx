import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import useAudioContext from './useAudioContext';

interface AlarmSoundReturnType {
  play: () => void;
}

const useAlarmSound = (): AlarmSoundReturnType => {
  const { settings } = useSettings();
  const { setAudio, play } = useAudioContext();

  useEffect(() => {
    if (settings.alarmSound) {
      setAudio(`/sounds/alarm/${settings.alarmSound}.mp3`);
    }
  }, [settings.alarmSound]);

  return {
    play,
  };
};

export default useAlarmSound;
