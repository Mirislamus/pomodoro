import { AlarmSound, TickSound } from "../typings/enums";

export const formatSoundName = (name: AlarmSound | TickSound): string => {
  return name
    .replace(/^(alarm-|tick-)/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
