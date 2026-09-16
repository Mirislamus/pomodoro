import { navigate } from 'astro:transitions/client';
import i18n from '../localization/i18n';

export const useAppNavigate = () => {
  return (to: string) => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const currentLang = i18n.resolvedLanguage || 'en';
    const langPrefix = currentLang === 'en' ? '' : `/${currentLang}`;
    const cleanTo = to.startsWith('/') ? to : `/${to}`;
    const target = `${baseUrl}${langPrefix}${cleanTo === '/' ? '/' : cleanTo}`;
    navigate(target);
  };
};

export default useAppNavigate;
