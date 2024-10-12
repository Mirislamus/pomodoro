import useSettingsStore from '../stores/useSettingsStore';
import { TickSound } from '../typings/enums';
import { Sound } from '../typings/types';
import { formatSoundName } from '../utils/formatSoundName';

const useGetTickSounds = () => {
  const setSettings = useSettingsStore(state => state.setSettings);

  const tickSounds: Sound[] = [
    {
      id: TickSound.None,
      name: formatSoundName(TickSound.None),
      onClick: () => setSettings('tickSound', TickSound.None),
    },
    {
      id: TickSound.Fast,
      name: formatSoundName(TickSound.Fast),
      onClick: () => setSettings('tickSound', TickSound.Fast),
    },
    {
      id: TickSound.Slow,
      name: formatSoundName(TickSound.Slow),
      onClick: () => setSettings('tickSound', TickSound.Slow),
    },
    {
      id: TickSound.BrownNoise,
      name: formatSoundName(TickSound.BrownNoise),
      onClick: () => setSettings('tickSound', TickSound.BrownNoise),
    },
    {
      id: TickSound.WhiteNoise,
      name: formatSoundName(TickSound.WhiteNoise),
      onClick: () => setSettings('tickSound', TickSound.WhiteNoise),
    },
  ];

  return tickSounds;
};

export default useGetTickSounds;
