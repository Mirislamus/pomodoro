import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import { useDisclosure } from '@chakra-ui/react';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';
import Timer from '../components/Timer/Timer';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} onLangMenuOpen={onLangMenuOpen} />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <Timer />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 3.5L20.5 21.5" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M13.5378 20.8889C13.3815 21.1583 13.1572 21.3819 12.8873 21.5374C12.6174 21.6928 12.3114 21.7746 12 21.7746C11.6886 21.7746 11.3826 21.6928 11.1127 21.5374C10.8428 21.3819 10.6185 21.1583 10.4622 20.8889M17.3333 9.33333C17.3333 7.91885 16.7714 6.56229 15.7712 5.5621C14.771 4.5619 13.4145 4 12 4C10.5855 4 9.22896 4.5619 8.22876 5.5621C7.22857 6.56229 6.66667 7.91885 6.66667 9.33333C6.66667 15.5556 4 17.3333 4 17.3333H20C20 17.3333 17.3333 15.5556 17.3333 9.33333Z"
            stroke="#222222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Layout>
    </>
  );
};

export default Main;
