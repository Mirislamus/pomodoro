import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import { useDisclosure } from '@chakra-ui/react';

const App: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={() => console.log('menu')} />
      </Layout>
    </>
  );
};

export default App;
