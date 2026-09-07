import { Box, Button, Flex, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import { easeIn } from '../theme/foundations/transitions';
import { t } from 'i18next';
import { IconClose, IconCopy } from '../theme/foundations/icons';
import { useNavigate } from 'react-router-dom';
import { getMinFromMs, getMsFromMin, getSoundName } from '../utils';
import { Settings as SettingsType } from '../typings/types';
import { maxSettingsLimits, minSettingsLimits } from '../consts/settings';
import { useSettingsLink } from '../hooks/useSettingsLink';
import useNotificationPermission from '../hooks/useNotificationPermission';
import Scroll from '../shared/ui/Scroll/Scroll';
import ActionButton from '../shared/ui/ActionButton/ActionButton';
import FieldWrap from '../shared/FieldWrap/FieldWrap';
import NumericInput from '../shared/ui/NumericInput/NumericInput';
import SwitchInput from '../shared/ui/SwitchInput/SwitchInput';
import PercentSlider from '../shared/ui/PercentSlider/PercentSlider';
import SelectMenu from '../components/SelectMenu/SelectMenu';
import PomodoroTooltip from '../shared/ui/PomodoroTooltip/PomodoroTooltip';
import useGetAlarmSounds from '../hooks/useGetAlarmSounds';
import useGetTickSounds from '../hooks/useGetTickSounds';
import useSettingsStore from '../stores/useSettingsStore';
import useSessionStore from '../stores/useSessionStore';
import useAlarmSound from '../hooks/useAlarmSound';
import useTickSound from '../hooks/useTickSound';
import { TickSound } from '../typings/enums';

const Settings = () => {
  const navigate = useNavigate();
  const settings = useSettingsStore(state => state.settings);
  const setSettings = useSettingsStore(state => state.setSettings);
  const resetSettings = useSettingsStore(state => state.resetSettings);
  const resetSession = useSessionStore(state => state.resetSession);
  const onSettingsLinkCopy = useSettingsLink();
  const { open: isAlarmSoundOpen, onClose: onAlarmSoundClose, onOpen: onAlarmSoundOpen } = useDisclosure();
  const { open: isTickSoundOpen, onClose: onTickSoundClose, onOpen: onTickSoundOpen } = useDisclosure();
  const notificationPermission = useNotificationPermission();
  const { play: playAlarm } = useAlarmSound();
  const { play: playTick, stop: stopTick } = useTickSound();

  const alarmSounds = useGetAlarmSounds({
    onChange: () => playAlarm(),
  });

  const tickSounds = useGetTickSounds({
    onChange: value => {
      if (value === TickSound.None) {
        stopTick();
      } else {
        playTick();
        setTimeout(() => stopTick(), 5000);
      }
    },
  });

  const excludedKeys = [
    'hasAutoStart',
    'alarmSound',
    'tickSound',
    'allowNotifications',
    'alarmSoundVolume',
    'tickSoundVolume',
  ];

  const onChangeSettingsHandler = (value: number | boolean, key: keyof SettingsType) => {
    if (!excludedKeys.includes(key)) {
      resetSession();
    }
    setSettings(key, value);
  };

  const onResetSettingsHandler = () => {
    resetSession();
    resetSettings();
  };

  return (
    <Box
      w="100%"
      pos={{ base: 'fixed', md: 'static' }}
      zIndex="25"
      top="0"
      left="0"
      right="0"
      bottom="0"
      marginBlockStart={{ base: '0', md: '50px', lg: '-5px', xl: '-50px' }}
      marginBlockEnd="auto"
      mx="auto"
      maxW={{ base: '100%', md: '550px' }}
      borderRadius={{ base: '0', md: '30px' }}
      boxShadow="0px 0px 50px rgba(0, 0, 0, 0.1)"
      bgColor="background.settings"
      transition={easeIn}
    >
      <Scroll maxScrollHeight={{ base: '100%', md: 'unset' }}>
        <Flex flexDirection="column" p={{ base: '16px', md: '40px' }}>
          <Flex
            display={{ base: 'flex', md: 'none' }}
            alignItems="center"
            justifyContent="space-between"
            paddingBlockEnd="16px"
          >
            <Text textStyle="text.xl" textTransform="uppercase" color="primary">
              {t('settings')}
            </Text>
            <ActionButton boxSize="40px" variant="fill" onClick={() => navigate('/')}>
              <IconClose mt="-2px" boxSize="20px" />
            </ActionButton>
          </Flex>
          <Tabs.Root variant="soft-rounded" defaultValue="timer">
            <Tabs.List>
              <Tabs.Trigger value="timer">{t('timer')}</Tabs.Trigger>
              <Tabs.Trigger value="sounds">{t('sounds')}</Tabs.Trigger>
              <Tabs.Indicator
                top="3px"
                height={{ base: '44px', md: '50px' }}
                bgColor="background.primary"
                borderRadius="100px"
                transition={easeIn}
              />
            </Tabs.List>
            <Box
              paddingBlockStart={{ base: '20px', md: '30px' }}
              marginBlockStart={{ base: '20px', md: '0' }}
              borderBlockStart={{ base: '1px solid', md: '0' }}
              borderColor="border"
            >
              <Tabs.Content value="timer">
                <FieldWrap>
                  <NumericInput
                    title={t('pomodoro_count_settings')}
                    value={settings.count}
                    step={1}
                    min={minSettingsLimits.count}
                    max={maxSettingsLimits.count}
                    onChange={value => onChangeSettingsHandler(value, 'count')}
                  />
                </FieldWrap>
                <FieldWrap>
                  <NumericInput
                    hasMinutes
                    title={t('pomodoro_duration_settings')}
                    value={getMinFromMs(settings.duration)}
                    step={5}
                    min={minSettingsLimits.duration}
                    max={maxSettingsLimits.duration}
                    onChange={value => onChangeSettingsHandler(getMsFromMin(value), 'duration')}
                  />
                </FieldWrap>
                <FieldWrap>
                  <NumericInput
                    hasMinutes
                    title={t('short_break')}
                    value={getMinFromMs(settings.shortBreak)}
                    step={5}
                    min={minSettingsLimits.shortBreak}
                    max={maxSettingsLimits.shortBreak}
                    onChange={value => onChangeSettingsHandler(getMsFromMin(value), 'shortBreak')}
                  />
                </FieldWrap>
                <FieldWrap>
                  <NumericInput
                    hasMinutes
                    title={t('long_break')}
                    value={getMinFromMs(settings.longBreak)}
                    step={5}
                    min={minSettingsLimits.longBreak}
                    max={maxSettingsLimits.longBreak}
                    onChange={value => onChangeSettingsHandler(getMsFromMin(value), 'longBreak')}
                  />
                </FieldWrap>
                <FieldWrap hasBorder={false}>
                  <SwitchInput
                    title={t('auto_start')}
                    isChecked={settings.hasAutoStart}
                    onChange={value => onChangeSettingsHandler(value, 'hasAutoStart')}
                  />
                </FieldWrap>
              </Tabs.Content>
              <Tabs.Content value="sounds">
                <FieldWrap hasBorder>
                  <PercentSlider
                    title={t('finish_sound')}
                    defaultValue={settings.alarmSoundVolume}
                    onChange={value => onChangeSettingsHandler(value, 'alarmSoundVolume')}
                  />
                  <SelectMenu
                    isOpen={isAlarmSoundOpen}
                    onClose={onAlarmSoundClose}
                    onOpen={onAlarmSoundOpen}
                    selectedItem={getSoundName(settings.alarmSound, alarmSounds)}
                    items={alarmSounds}
                  />
                </FieldWrap>
                <FieldWrap hasBorder>
                  <PercentSlider
                    title={t('tick_sound')}
                    defaultValue={settings.tickSoundVolume}
                    onChange={value => onChangeSettingsHandler(value, 'tickSoundVolume')}
                  />
                  <SelectMenu
                    isOpen={isTickSoundOpen}
                    onClose={onTickSoundClose}
                    onOpen={onTickSoundOpen}
                    selectedItem={getSoundName(settings.tickSound, tickSounds)}
                    items={tickSounds}
                  />
                </FieldWrap>
                <FieldWrap hasBorder={false}>
                  <SwitchInput
                    title={t('notifications')}
                    isChecked={settings.allowNotifications}
                    isDisabled={notificationPermission === 'denied'}
                    onChange={value => {
                      if (notificationPermission === 'default' || notificationPermission === 'granted') {
                        onChangeSettingsHandler(value, 'allowNotifications');
                      }
                    }}
                  />
                </FieldWrap>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
          <Flex
            w="100%"
            justifyContent="space-between"
            gap="20px"
            alignItems="center"
            paddingBlockStart="30px"
            marginBlockStart="auto"
            pos="relative"
          >
            <Button flex="1" minW="0" variant="secondary" size="md" onClick={onResetSettingsHandler} mt="auto">
              {t('reset_settings')}
            </Button>
            <PomodoroTooltip label={t('copy_settings')}>
              <Box>
                <ActionButton size="lg" variant="fill" icon={IconCopy} onClick={onSettingsLinkCopy} />
              </Box>
            </PomodoroTooltip>
          </Flex>
        </Flex>
      </Scroll>
    </Box>
  );
};

export default Settings;
