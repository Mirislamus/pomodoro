import useAudioPlayer, { AudioPlayer } from './useAudioPlayer';
import useSettingsStore from '../stores/useSettingsStore';
import { TickSound } from '../typings/enums';
import { withBase } from '../utils/url';

const useTickSound = (): AudioPlayer => {
  const tickSound = useSettingsStore(state => state.settings.tickSound);
  const volume = useSettingsStore(state => state.settings.tickSoundVolume);
  const src = tickSound === TickSound.None ? '' : withBase(`/sounds/tick/${tickSound}.mp3`);

  return useAudioPlayer({ src, volume, loop: true });
};

export default useTickSound;
