import 'i18next';
import type en from '../localization/locales/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}
