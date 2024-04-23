import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { easeIn } from '../../theme/foundations/transitions';
import { t } from 'i18next';
import ActionButton from '../ui-kit/ActionButton/ActionButton';
import { IconClose } from '../../theme/foundations/icons';
import { useNavigate } from 'react-router-dom';
import NumericInput from '../ui-kit/NumericInput/NumericInput';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { Settings } from '../../contexts/SettingsContext/types';
import { useSession } from '../../contexts/SessionContext/SessionContext';

const _Settings: FC = ({ ...props }) => {
  const navigate = useNavigate();
  const { settings, setSettings } = useSettings();
  const { resetSession } = useSession();

  const onChangeSettingsHandler = (value: number, key: keyof Settings) => {
    resetSession();
    setSettings(key, value);
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
      mt={{ base: '0', md: '75px', lg: '-5px', xl: '-75px' }}
      mx="auto"
      maxW="550px"
      borderRadius={{ base: '0', md: '30px' }}
      p={{ base: '16px', md: '40px' }}
      boxShadow="0px 0px 50px rgba(0, 0, 0, 0.1)"
      bgColor={{ base: 'background.settings.mobile', md: 'background.settings.desktop' }}
      {...props}
    >
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
          <Tab>{t('notification')}</Tab>
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
            <NumericInput
              title={t('pomodoro_count')}
              value={settings.count}
              step={1}
              min={2}
              max={10}
              onChange={value => onChangeSettingsHandler(value, 'count')}
            />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Setting = chakra(_Settings);
export default Setting;
