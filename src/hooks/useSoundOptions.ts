import useSettingsStore from '../stores/useSettingsStore';
import { AlarmSound, TickSound } from '../typings/enums';
import { Sound } from '../typings/types';
import { formatSoundName } from '../utils/formatSoundName';

const createSoundOptions = <T extends AlarmSound | TickSound>(values: T[], onSelect: (value: T) => void): Sound<T>[] =>
  values.map(id => ({ id, name: formatSoundName(id), onClick: () => onSelect(id) }));

export const useAlarmSoundOptions = (onChange?: (value: AlarmSound) => void) => {
  const setSettings = useSettingsStore(state => state.setSettings);

  return createSoundOptions(Object.values(AlarmSound), value => {
    setSettings('alarmSound', value);
    onChange?.(value);
  });
};

export const useTickSoundOptions = (onChange?: (value: TickSound) => void) => {
  const setSettings = useSettingsStore(state => state.setSettings);

  return createSoundOptions(Object.values(TickSound), value => {
    setSettings('tickSound', value);
    onChange?.(value);
  });
};
