import useSettingsStore from '../stores/useSettingsStore';
import { AlarmSound } from '../typings/enums';
import { Sound } from '../typings/types';
import { formatSoundName } from '../utils/formatSoundName';

type UseGetAlarmSoundsProps = {
  onChange?: (value: AlarmSound) => void;
};

const useGetAlarmSounds = ({ onChange }: UseGetAlarmSoundsProps = {}) => {
  const setSettings = useSettingsStore(state => state.setSettings);

  const handleChange = (value: AlarmSound) => {
    setSettings('alarmSound', value);
    onChange?.(value);
  };

  const alarmSounds: Sound[] = [
    {
      id: AlarmSound.Bell,
      name: formatSoundName(AlarmSound.Bell),
      onClick: () => handleChange(AlarmSound.Bell),
    },
    {
      id: AlarmSound.Bird,
      name: formatSoundName(AlarmSound.Bird),
      onClick: () => handleChange(AlarmSound.Bird),
    },
    {
      id: AlarmSound.Wood,
      name: formatSoundName(AlarmSound.Wood),
      onClick: () => handleChange(AlarmSound.Wood),
    },
    {
      id: AlarmSound.Digital,
      name: formatSoundName(AlarmSound.Digital),
      onClick: () => handleChange(AlarmSound.Digital),
    },
    {
      id: AlarmSound.Kitchen,
      name: formatSoundName(AlarmSound.Kitchen),
      onClick: () => handleChange(AlarmSound.Kitchen),
    },
  ];

  return alarmSounds;
};

export default useGetAlarmSounds;
