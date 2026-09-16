export interface LocaleMeta {
  code: string;
  lang: string;
  name: string;
  title: string;
  description: string;
  settingsTitle: string;
  settingsDescription: string;
}

export const defaultLocale = 'en';

export const locales: Record<string, LocaleMeta> = {
  en: {
    code: 'en-US',
    lang: 'en',
    name: 'English',
    title: 'Pomotomo Focus Timer',
    description:
      'Pomotomo is your personal pomodoro focus timer to increase productivity. Work efficiently by dividing tasks into short sessions with breaks. Ideal for focusing and completing tasks.',
    settingsTitle: 'Settings - Pomotomo Focus Timer',
    settingsDescription:
      'Configure Pomotomo focus timer settings: durations, sounds, notifications, and autostart to suit your productivity workflow.',
  },
  ru: {
    code: 'ru-RU',
    lang: 'ru',
    name: 'Русский',
    title: 'Помодоро Таймер Фокусировки — Pomotomo',
    description:
      'Pomotomo — ваш персональный таймер помодоро для повышения продуктивности. Работайте эффективно, разделяя задачи на короткие сессии с перерывами.',
    settingsTitle: 'Настройки — Pomotomo',
    settingsDescription:
      'Настройте таймер Pomotomo под себя: длительность сессий, короткие и длинные перерывы, звуки и уведомления.',
  },
  de: {
    code: 'de-DE',
    lang: 'de',
    name: 'Deutsch',
    title: 'Pomodoro Fokus-Timer — Pomotomo',
    description:
      'Pomotomo ist Ihr persönlicher Pomodoro-Fokus-Timer zur Steigerung der Produktivität. Teilen Sie Ihre Aufgaben in kurze Arbeitsphasen mit Pausen ein.',
    settingsTitle: 'Einstellungen — Pomotomo',
    settingsDescription:
      'Passen Sie die Pomotomo-Einstellungen an: Zeiten für Fokus und Pausen, Töne, Benachrichtigungen und Autostart.',
  },
};

export default locales;
