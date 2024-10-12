import { AlarmSound, TickSound } from "../typings/enums";
import { Sound } from "../typings/types";

export const getSoundName = (name: AlarmSound | TickSound, sounds: Sound[]): string => {
  const foundSound = sounds.find(item => item.id === name);
  if (!foundSound) {
    throw new Error(`Sound with id '${name}' not found`);
  }
  return foundSound.name;
};
