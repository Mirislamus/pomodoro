import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../stores/useSettingsStore';
import useUpdateSetting from '../../hooks/useUpdateSetting';
import FieldWrap from '../../shared/FieldWrap/FieldWrap';
import NumericInput from '../../shared/ui/NumericInput/NumericInput';
import SwitchInput from '../../shared/ui/SwitchInput/SwitchInput';
import { maxSettingsLimits, minSettingsLimits } from '../../consts/settings';
import { getMinFromMs, getMsFromMin } from '../../utils';
import { DurationSettingKey, TranslationKey } from '../../typings/types';

const DURATION_STEP = 5;

const durationFields: { key: DurationSettingKey; labelKey: TranslationKey }[] = [
  { key: 'duration', labelKey: 'pomodoro_duration_settings' },
  { key: 'shortBreak', labelKey: 'short_break' },
  { key: 'longBreak', labelKey: 'long_break' },
];

const TimerSettings = () => {
  const { t } = useTranslation();
  const settings = useSettingsStore(state => state.settings);
  const updateSetting = useUpdateSetting();

  return (
    <>
      <FieldWrap>
        <NumericInput
          title={t('pomodoro_count_settings')}
          value={settings.count}
          min={minSettingsLimits.count}
          max={maxSettingsLimits.count}
          onChange={value => updateSetting('count', value)}
        />
      </FieldWrap>
      {durationFields.map(({ key, labelKey }) => (
        <FieldWrap key={key}>
          <NumericInput
            hasMinutes
            title={t(labelKey)}
            value={getMinFromMs(settings[key])}
            step={DURATION_STEP}
            min={minSettingsLimits[key]}
            max={maxSettingsLimits[key]}
            onChange={value => updateSetting(key, getMsFromMin(value))}
          />
        </FieldWrap>
      ))}
      <FieldWrap hasBorder={false}>
        <SwitchInput
          title={t('auto_start')}
          isChecked={settings.hasAutoStart}
          onChange={value => updateSetting('hasAutoStart', value)}
        />
      </FieldWrap>
    </>
  );
};

export default TimerSettings;
