import useSettingsStore from '../stores/useSettingsStore';
import { AlarmSound } from '../typings/enums';
import { Sound } from '../typings/types';
import { formatSoundName } from '../utils/formatSoundName';

const useGetAlarmSounds = () => {
  const setSettings = useSettingsStore(state => state.setSettings);

  const alarmSounds: Sound[] = [
    {
      id: AlarmSound.Bell,
      name: formatSoundName(AlarmSound.Bell),
      onClick: () => setSettings('alarmSound', AlarmSound.Bell),
    },
    {
      id: AlarmSound.Bird,
      name: formatSoundName(AlarmSound.Bird),
      onClick: () => setSettings('alarmSound', AlarmSound.Bird),
    },
    {
      id: AlarmSound.Wood,
      name: formatSoundName(AlarmSound.Wood),
      onClick: () => setSettings('alarmSound', AlarmSound.Wood),
    },
    {
      id: AlarmSound.Digital,
      name: formatSoundName(AlarmSound.Digital),
      onClick: () => setSettings('alarmSound', AlarmSound.Digital),
    },
    {
      id: AlarmSound.Kitchen,
      name: formatSoundName(AlarmSound.Kitchen),
      onClick: () => setSettings('alarmSound', AlarmSound.Kitchen),
    },
  ];

  return alarmSounds;
};

export default useGetAlarmSounds;
