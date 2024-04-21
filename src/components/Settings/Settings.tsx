import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { easeIn } from '../../theme/foundations/transitions';
import { t } from 'i18next';

const _Settings: FC = ({ ...props }) => {
  return (
    <Box
      pos="absolute"
      w="100%"
      left="0"
      right="0"
      mx="auto"
      maxW="550px"
      borderRadius="30px"
      p="40px"
      boxShadow="0px 0px 50px rgba(0, 0, 0, 0.1)"
      bgColor="background.settings"
      {...props}
    >
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>{t('timer')}</Tab>
          <Tab>{t('notification')}</Tab>
        </TabList>
        <TabIndicator top="3px" height="50px" bgColor="background.primary" borderRadius="100px" transition={easeIn} />
        <TabPanels paddingBlockStart="30px">
          <TabPanel>
            <p>one!</p>
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
