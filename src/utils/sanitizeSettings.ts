import { maxSettingsLimits, minSettingsLimits } from '../consts/settings';
import { AlarmSound, TickSound } from '../typings/enums';
import { DurationSettingKey, Settings } from '../typings/types';
import { getMinFromMs } from './getMinFromMs';
import { getMsFromMin } from './getMsFromMin';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const toNumber = (value: unknown): number | undefined => {
  const number = typeof value === 'number' ? value : Number(value);
  return typeof value !== 'boolean' && value !== '' && Number.isFinite(number) ? number : undefined;
};

const toBoolean = (value: unknown): boolean | undefined => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
};

const toEnum = <T extends string>(values: Record<string, T>, value: unknown): T | undefined =>
  Object.values(values).includes(value as T) ? (value as T) : undefined;

const toPositive = (value: unknown) => {
  const number = toNumber(value);
  return number !== undefined && number > 0 ? number : undefined;
};

const toVolume = (value: unknown) => {
  const number = toNumber(value);
  return number === undefined ? undefined : clamp(number, 0, 1);
};

type Parsers = { [K in keyof Settings]: (value: unknown) => Settings[K] | undefined };

const createParsers = (clampToLimits: boolean): Parsers => {
  const toCount = (value: unknown) => {
    const number = toPositive(value);
    if (number === undefined) return undefined;
    const count = Math.round(number);
    return clampToLimits ? clamp(count, minSettingsLimits.count, maxSettingsLimits.count) : count;
  };

  const toDuration = (key: DurationSettingKey) => (value: unknown) => {
    const number = toPositive(value);
    if (number === undefined || !clampToLimits) return number;
    return getMsFromMin(clamp(getMinFromMs(number), minSettingsLimits[key], maxSettingsLimits[key]));
  };

  return {
    count: toCount,
    duration: toDuration('duration'),
    shortBreak: toDuration('shortBreak'),
    longBreak: toDuration('longBreak'),
    hasAutoStart: toBoolean,
    alarmSound: value => toEnum(AlarmSound, value),
    alarmSoundVolume: toVolume,
    tickSound: value => toEnum(TickSound, value),
    tickSoundVolume: toVolume,
    allowNotifications: toBoolean,
  };
};

const strictParsers = createParsers(true);
const looseParsers = createParsers(false);

/**
 * Picks known settings out of untrusted input and normalizes each value, dropping anything invalid.
 * `clampToLimits` also forces numbers into the ranges the UI allows: use it for shared links,
 * but not for stored data, which may hold values set on purpose outside the UI (e.g. in tests).
 */
export const sanitizeSettings = (
  input: Record<string, unknown>,
  { clampToLimits = true }: { clampToLimits?: boolean } = {}
): Partial<Settings> => {
  const parsers = clampToLimits ? strictParsers : looseParsers;
  const result: Partial<Record<keyof Settings, unknown>> = {};

  for (const key of Object.keys(parsers) as (keyof Settings)[]) {
    if (!(key in input)) continue;
    const value = parsers[key](input[key]);
    if (value !== undefined) result[key] = value;
  }

  return result as Partial<Settings>;
};
