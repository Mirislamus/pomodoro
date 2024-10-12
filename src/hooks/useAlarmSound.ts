import { useEffect } from 'react';
import useAudioContext from './useAudioContext';
import useSettingsStore from '../stores/useSettingsStore';

interface AlarmSoundReturnType {
  play: () => void;
}

const useAlarmSound = (): AlarmSoundReturnType => {
  const settings = useSettingsStore(state => state.settings);
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
