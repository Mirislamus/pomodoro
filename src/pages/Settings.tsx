import {
  Box,
  Button,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  chakra,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { easeIn } from '../theme/foundations/transitions';
import { t } from 'i18next';
import { IconClose, IconCopy } from '../theme/foundations/icons';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import { useSession } from '../contexts/SessionContext/SessionContext';
import { getMinFromMs, getMsFromMin, getSoundName } from '../utils';
import { Settings as SettingsType } from '../typings/types';
import { maxSettingsLimits, minSettingsLimits } from '../consts/settings';
import { useSettingsLink } from '../hooks/useSettingsLink';
import useNotificationPermission from '../hooks/useNotificationPermission';
import Scroll from '../components/ui-kit/Scroll/Scroll';
import ActionButton from '../components/ui-kit/ActionButton/ActionButton';
import FieldWrap from '../components/FieldWrap/FieldWrap';
import NumericInput from '../components/ui-kit/NumericInput/NumericInput';
import SwitchInput from '../components/ui-kit/SwitchInput/SwitchInput';
import PercentSlider from '../components/PercentSlider/PercentSlider';
import SelectMenu from '../components/SelectMenu/SelectMenu';
import PomodoroTooltip from '../components/ui-kit/PomodoroTooltip/PomodoroTooltip';
import useGetAlarmSounds from '../hooks/useGetAlarmSounds';
import useGetTickSounds from '../hooks/useGetTickSounds';

const _Settings: FC = () => {
  const navigate = useNavigate();
  const { settings, setSettings, resetSettings } = useSettings();
  const { resetSession } = useSession();
  const onSettingsLinkCopy = useSettingsLink();
  const { isOpen: isAlarmSoundOpen, onClose: onAlarmSoundClose, onOpen: onAlarmSoundOpen } = useDisclosure();
  const notificationPermission = useNotificationPermission();
  const alarmSounds = useGetAlarmSounds();
  const tickSounds = useGetTickSounds();

  const onChangeSettingsHandler = (value: number | boolean, key: keyof SettingsType) => {
    resetSession();
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
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab>{t('timer')}</Tab>
              <Tab>{t('sounds')}</Tab>
            </TabList>
            <TabIndicator
              top="3px"
              height={{ base: '44px', md: '50px' }}
              bgColor="background.primary"
              borderRadius="100px"
              transition={easeIn}
            />
            <TabPanels
              paddingBlockStart={{ base: '20px', md: '30px' }}
              marginBlockStart={{ base: '20px', md: '0' }}
              borderBlockStart={{ base: '1px solid', md: '0' }}
              borderColor="border"
            >
              <TabPanel>
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
              </TabPanel>
              <TabPanel>
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
                    isOpen={isAlarmSoundOpen}
                    onClose={onAlarmSoundClose}
                    onOpen={onAlarmSoundOpen}
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
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            justifyContent="space-between"
            gap="20px"
            alignItems="center"
            paddingBlockStart="30px"
            marginBlockStart="auto"
            pos="relative"
          >
            <Button w="100%" variant="secondary" size="md" onClick={onResetSettingsHandler} mt="auto">
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

const Settings = chakra(_Settings);
export default Settings;
