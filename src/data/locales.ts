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
    title: 'Pomotomo — Focus Timer',
    description:
      'Pomotomo is your personal focus timer based on the Pomodoro Technique. Boost productivity by dividing tasks into focused sessions with regular breaks.',
    settingsTitle: 'Settings — Pomotomo',
    settingsDescription:
      'Configure Pomotomo focus timer settings: durations, sounds, notifications, and autostart to suit your productivity workflow.',
  },
  ru: {
    code: 'ru-RU',
    lang: 'ru',
    name: 'Русский',
    title: 'Pomotomo — Таймер фокусировки',
    description:
      'Pomotomo — ваш персональный таймер для продуктивной работы по технике Помодоро. Работайте эффективно, разделяя задачи на короткие сессии с перерывами.',
    settingsTitle: 'Настройки — Pomotomo',
    settingsDescription:
      'Настройте таймер Pomotomo под себя: длительность сессий, короткие и длинные перерывы, звуки и уведомления.',
  },
  uz: {
    code: 'uz-UZ',
    lang: 'uz',
    name: 'O‘zbekcha',
    title: 'Pomotomo — Diqqatni jamlash taymeri',
    description:
      'Pomotomo — Pomodoro texnikasi asosida unumdorlikni oshirish uchun shaxsiy taymer. Vazifalarni tanaffuslar bilan qisqa seanslarga boʻlib, samarali ishlang.',
    settingsTitle: 'Sozlamalar — Pomotomo',
    settingsDescription:
      'Pomotomo taymerini oʻzingizga moslang: seanslar davomiyligi, qisqa va uzun tanaffuslar, ovozlar va bildirishnomalar.',
  },
  de: {
    code: 'de-DE',
    lang: 'de',
    name: 'Deutsch',
    title: 'Pomotomo — Fokus-Timer',
    description:
      'Pomotomo ist Ihr persönlicher Fokus-Timer nach der Pomodoro-Technik zur Steigerung der Produktivität. Teilen Sie Ihre Aufgaben in kurze Arbeitsphasen mit Pausen ein.',
    settingsTitle: 'Einstellungen — Pomotomo',
    settingsDescription:
      'Passen Sie die Pomotomo-Einstellungen an: Zeiten für Fokus und Pausen, Töne, Benachrichtigungen und Autostart.',
  },
};

export default locales;
