import useSettingsStore from '../stores/useSettingsStore';
import { TickSound } from '../typings/enums';
import { Sound } from '../typings/types';
import { formatSoundName } from '../utils/formatSoundName';

type UseGetTickSoundsProps = {
  onChange?: (value: TickSound) => void;
};

const useGetTickSounds = ({ onChange }: UseGetTickSoundsProps = {}) => {
  const setSettings = useSettingsStore(state => state.setSettings);

  const handleChange = (value: TickSound) => {
    setSettings('tickSound', value);
    onChange?.(value);
  };

  const tickSounds: Sound[] = [
    {
      id: TickSound.None,
      name: formatSoundName(TickSound.None),
      onClick: () => handleChange(TickSound.None),
    },
    {
      id: TickSound.Fast,
      name: formatSoundName(TickSound.Fast),
      onClick: () => handleChange(TickSound.Fast),
    },
    {
      id: TickSound.Slow,
      name: formatSoundName(TickSound.Slow),
      onClick: () => handleChange(TickSound.Slow),
    },
    {
      id: TickSound.BrownNoise,
      name: formatSoundName(TickSound.BrownNoise),
      onClick: () => handleChange(TickSound.BrownNoise),
    },
    {
      id: TickSound.WhiteNoise,
      name: formatSoundName(TickSound.WhiteNoise),
      onClick: () => handleChange(TickSound.WhiteNoise),
    },
  ];

  return tickSounds;
};

export default useGetTickSounds;
