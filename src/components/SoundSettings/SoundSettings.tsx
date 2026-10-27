import { useCallback, useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../stores/useSettingsStore';
import useUpdateSetting from '../../hooks/useUpdateSetting';
import useNotificationPermission from '../../hooks/useNotificationPermission';
import useAlarmSound from '../../hooks/useAlarmSound';
import useTickSound from '../../hooks/useTickSound';
import { useAlarmSoundOptions, useTickSoundOptions } from '../../hooks/useSoundOptions';
import FieldWrap from '../../shared/FieldWrap/FieldWrap';
import PercentSlider from '../../shared/ui/PercentSlider/PercentSlider';
import SwitchInput from '../../shared/ui/SwitchInput/SwitchInput';
import SelectMenu from '../SelectMenu/SelectMenu';
import { TickSound } from '../../typings/enums';

const TICK_PREVIEW_DURATION = 5000;

const SoundSettings = () => {
  const { t } = useTranslation();
  const id = useId();
  const settings = useSettingsStore(state => state.settings);
  const updateSetting = useUpdateSetting();
  const notificationPermission = useNotificationPermission();
  const { play: playAlarm } = useAlarmSound();
  const { play: playTick, stop: stopTick } = useTickSound();
  const tickPreviewTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Players pick up a newly selected sound only after re-render, so previews are deferred to effects
  const pendingPreviewRef = useRef<{ alarm: boolean; tick: boolean }>({ alarm: false, tick: false });

  const previewTick = useCallback(() => {
    clearTimeout(tickPreviewTimeoutRef.current);
    playTick();
    tickPreviewTimeoutRef.current = setTimeout(stopTick, TICK_PREVIEW_DURATION);
  }, [playTick, stopTick]);

  const alarmSounds = useAlarmSoundOptions(value => {
    if (value === settings.alarmSound) playAlarm();
    else pendingPreviewRef.current.alarm = true;
  });

  const tickSounds = useTickSoundOptions(value => {
    clearTimeout(tickPreviewTimeoutRef.current);
    stopTick();
    if (value === TickSound.None) return;
    if (value === settings.tickSound) previewTick();
    else pendingPreviewRef.current.tick = true;
  });

  useEffect(() => {
    if (!pendingPreviewRef.current.alarm) return;
    pendingPreviewRef.current.alarm = false;
    playAlarm();
  }, [playAlarm]);

  useEffect(() => {
    if (!pendingPreviewRef.current.tick) return;
    pendingPreviewRef.current.tick = false;
    previewTick();
  }, [previewTick]);

  useEffect(() => () => clearTimeout(tickPreviewTimeoutRef.current), []);

  const isNotificationBlocked = notificationPermission === 'denied';

  return (
    <>
      <FieldWrap>
        <PercentSlider
          id={`${id}-alarm`}
          title={t('finish_sound')}
          value={settings.alarmSoundVolume}
          onChange={value => updateSetting('alarmSoundVolume', value)}
        />
        <SelectMenu describedBy={`${id}-alarm`} value={settings.alarmSound} items={alarmSounds} />
      </FieldWrap>
      <FieldWrap>
        <PercentSlider
          id={`${id}-tick`}
          title={t('tick_sound')}
          value={settings.tickSoundVolume}
          onChange={value => updateSetting('tickSoundVolume', value)}
        />
        <SelectMenu describedBy={`${id}-tick`} value={settings.tickSound} items={tickSounds} />
      </FieldWrap>
      <FieldWrap hasBorder={false}>
        <SwitchInput
          title={t('notifications')}
          description={isNotificationBlocked ? t('notifications_blocked') : undefined}
          isChecked={settings.allowNotifications && !isNotificationBlocked}
          isDisabled={isNotificationBlocked}
          onChange={value => updateSetting('allowNotifications', value)}
        />
      </FieldWrap>
    </>
  );
};

export default SoundSettings;
