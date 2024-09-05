import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/theme';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import { SessionProvider } from './contexts/SessionContext/SessionContext';
import Main from './Main';
import './theme/typography/fonts.css';
import './localization/i18n';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SettingsProvider>
        <SessionProvider>
          <Main />
        </SessionProvider>
      </SettingsProvider>
    </ChakraProvider>
  );
};

export default App;
