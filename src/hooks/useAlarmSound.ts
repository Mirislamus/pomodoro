import useAudioPlayer, { AudioPlayer } from './useAudioPlayer';
import useSettingsStore from '../stores/useSettingsStore';
import { withBase } from '../utils/url';

const useAlarmSound = (): AudioPlayer => {
  const alarmSound = useSettingsStore(state => state.settings.alarmSound);
  const volume = useSettingsStore(state => state.settings.alarmSoundVolume);

  return useAudioPlayer({ src: withBase(`/sounds/alarm/${alarmSound}.mp3`), volume });
};

export default useAlarmSound;
