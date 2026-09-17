export interface HowToStep {
  name: string;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOData {
  h1: string;
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string[];
  featuresTitle: string;
  features: { title: string; text: string }[];
  howToTitle: string;
  howToDescription: string;
  steps: HowToStep[];
  faqTitle: string;
  faqs: FAQItem[];
}

export const seoContent: Record<string, SEOData> = {
  en: {
    h1: 'Pomotomo — Free Online Pomodoro Timer for Deep Work & Productivity',
    title: 'Pomotomo Focus Timer',
    description:
      'Pomotomo is your personal pomodoro focus timer to increase productivity. Work efficiently by dividing tasks into short sessions with breaks. Ideal for focusing and completing tasks.',
    aboutTitle: 'Master Your Time with the Pomodoro Technique',
    aboutText: [
      'The Pomodoro Technique is a proven time-management framework developed by Francesco Cirillo in the late 1980s. It transforms productivity by breaking your workday into focused 25-minute intervals — known as "pomodoros" — separated by short 5-minute pauses, followed by a longer rest after completing four consecutive sessions.',
      'By creating a clear boundary between focused effort and deliberate recovery, Pomotomo eliminates cognitive fatigue, reduces the urge to procrastinate, and keeps your mind alert and engaged throughout the day.',
    ],
    featuresTitle: 'Designed for Uninterrupted Focus',
    features: [
      {
        title: 'Smart Interval Automation',
        text: 'Effortlessly cycle between work sessions and breaks with customizable sound notifications.',
      },
      {
        title: 'Progressive Web App (PWA)',
        text: 'Install Pomotomo on desktop or mobile and enjoy full offline support with zero lag.',
      },
      {
        title: 'Soundscapes & Ambient Audio',
        text: 'Select from bell alerts, gentle chimes, or rhythmic ticking to enhance concentration.',
      },
      {
        title: 'Privacy First',
        text: 'No user tracking, no sign-ups, and no cloud data storage. All your preferences stay in your browser.',
      },
    ],
    howToTitle: 'How to Use Pomotomo in 5 Simple Steps',
    howToDescription:
      'Follow these five steps to optimize your focus and achieve peak daily productivity with Pomotomo.',
    steps: [
      {
        name: 'Choose a single task',
        text: 'Identify the most critical task or project milestone you need to accomplish today.',
      },
      {
        name: 'Start the 25-minute timer',
        text: 'Press Start to begin your 25-minute focus session. Put away all distractions and silence notifications.',
      },
      {
        name: 'Work with single-minded focus',
        text: 'Immerse yourself completely in the task until you hear the sound alert signaling completion.',
      },
      {
        name: 'Take a 5-minute restorative break',
        text: 'Step away from your screen, stretch, drink water, or take deep breaths to refresh your mind.',
      },
      {
        name: 'Repeat 4 cycles and rest longer',
        text: 'After completing four pomodoros, take an extended 15 to 30-minute break before starting a new round.',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'What is the Pomodoro Technique?',
        answer:
          'The Pomodoro Technique is a time management method that alternates between 25-minute periods of deep work and 5-minute breaks. After four cycles, you take a longer 15–30 minute break to recharge.',
      },
      {
        question: 'Can I customize the timer intervals?',
        answer:
          'Yes. In the Settings tab, you can adjust the focus duration, short break, and long break lengths to match your personal energy and workflow.',
      },
      {
        question: 'Does Pomotomo work offline?',
        answer:
          'Yes, Pomotomo is a Progressive Web App (PWA). It is cached by your browser and functions completely offline without an active internet connection.',
      },
      {
        question: 'Is Pomotomo free to use?',
        answer:
          'Pomotomo is 100% free with no subscriptions, paywalls, or advertisements. All features, audio tracks, and theme customizers are available to everyone.',
      },
      {
        question: 'How does Pomotomo protect my privacy?',
        answer:
          'Pomotomo does not collect analytics or personal data. Your settings, sound selections, and theme preferences are stored strictly in your browser\'s local storage.',
      },
    ],
  },
  ru: {
    h1: 'Pomotomo — Бесплатный онлайн Помодоро таймер для продуктивной работы',
    title: 'Помодоро Таймер Фокусировки — Pomotomo',
    description:
      'Pomotomo — ваш персональный таймер помодоро для повышения продуктивности. Работайте эффективно, разделяя задачи на короткие сессии с перерывами.',
    aboutTitle: 'Управляйте временем с помощью техники Помодоро',
    aboutText: [
      'Техника Помодоро — это всемирно признанная методология тайм-менеджмента, созданная Франческо Чирилло в конце 1980-х годов. Она разделяет рабочий процесс на 25-минутные интервалы предельной концентрации внимания (называемые «помодоро») и короткие 5-минутные паузы, а после четырёх циклов предполагает полноценный длительный отдых.',
      'Чёткое разграничение работы и отдыха в таймере Pomotomo помогает победить прокрастинацию, защищает от профессионального выгорания и поддерживает высокий уровень ментальной энергии в течение всего дня.',
    ],
    featuresTitle: 'Преимущества таймера Pomotomo',
    features: [
      {
        title: 'Автоматизация циклов',
        text: 'Плавное автоматическое переключение между сессиями работы и отдыха со звуковыми оповещениями.',
      },
      {
        title: 'Автономная работа (PWA)',
        text: 'Устанавливайте приложение на компьютер или телефон и работайте без доступа к интернету.',
      },
      {
        title: 'Фоновые звуки и сигналы',
        text: 'Выбирайте комфортные звуки колокольчиков, часов или тихий режим для полной концентрации.',
      },
      {
        title: 'Полная конфиденциальность',
        text: 'Никакой рекламы, регистрации и сбора личных данных. Все настройки хранятся только в вашем браузере.',
      },
    ],
    howToTitle: 'Как пользоваться Pomotomo: 5 простых шагов',
    howToDescription:
      'Пошаговая инструкция для достижения максимальной концентрации и эффективности с помощью таймера Pomotomo.',
    steps: [
      {
        name: 'Выберите задачу',
        text: 'Определите одну главную задачу или подзадачу, которую необходимо выполнить в ближайшее время.',
      },
      {
        name: 'Запустите 25-минутный таймер',
        text: 'Нажмите «Старт» и начните работу. Отключите уведомления в мессенджерах и не отвлекайтесь на посторонние дела.',
      },
      {
        name: 'Работайте до звукового сигнала',
        text: 'Сфокусируйтесь только на выбранной цели, пока звуковой сигнал не оповестит о завершении сессии.',
      },
      {
        name: 'Сделайте короткий перерыв на 5 минут',
        text: 'Встаньте из-за стола, разомнитесь, сделайте гимнастику для глаз или выпейте стакан воды.',
      },
      {
        name: 'Повторите 4 раза и сделайте длинный перерыв',
        text: 'После четырёх завершённых помодоро отдохните 15–30 минут, чтобы полностью восстановить силы.',
      },
    ],
    faqTitle: 'Часто задаваемые вопросы (FAQ)',
    faqs: [
      {
        question: 'Что такое метод Помодоро?',
        answer:
          'Это метод управления временем, при котором работа разбивается на 25-минутные отрезки высокой концентрации, чередующиеся с 5-минутными перерывами. После четырёх таких сессий следует длительный отдых на 15–30 минут.',
      },
      {
        question: 'Можно ли изменить длительность сессий и перерывов?',
        answer:
          'Да, в разделе «Настройки» вы можете настроить продолжительность фокуса, короткого и длинного перерывов, а также количество сессий в цикле под свой рабочий ритм.',
      },
      {
        question: 'Работает ли приложение без интернета?',
        answer:
          'Да, Pomotomo — это Progressive Web App (PWA). Все файлы кэшируются браузером, и вы можете открывать таймер даже в режиме полета.',
      },
      {
        question: 'Приложение бесплатно?',
        answer:
          'Да, Pomotomo полностью бесплатно, не содержит платных функций, подписок и встроенной рекламы.',
      },
      {
        question: 'Куда сохраняются мои настройки?',
        answer:
          'Все параметры таймера, звуков и темы сохраняются исключительно локально в памяти вашего браузера (localStorage).',
      },
    ],
  },
  uz: {
    h1: 'Pomotomo — Samarali Ish va Ta’lim Uchun Bepul Onlayn Pomodoro Taymeri',
    title: 'Pomotomo — Diqqatni Jamlash Pomodoro Taymeri',
    description:
      'Pomotomo — unumdorlikni oshirish uchun shaxsiy pomodoro taymeri. Vazifalarni tanaffuslar bilan qisqa seanslarga boʻlib, samarali ishlang.',
    aboutTitle: 'Pomodoro Texnikasi Bilan Vaqtingizni Boshqaring',
    aboutText: [
      'Pomodoro texnikasi — 1980-yillar oxirida Franchesko Chirillo tomonidan ishlab chiqilgan mashhur vaqtni boshqarish usuli. U ish jarayonini 25 daqiqalik to‘liq diqqatni jamlash davrlari («pomodoro») va 5 daqiqalik qisqa tanaffuslarga ajratadi. To‘rtta ish seansidan so‘ng 15–30 daqiqalik uzoq tanaffus beriladi.',
      'Diqqatni bir maqsadga qaratish va muntazam dam olish orqali Pomotomo aqliy charchoqni kamaytiradi, chalg‘ish va kechiktirish odatidan xalos qiladi hamda kun davomida yuqori mahsuldorlikni ta’minlaydi.',
    ],
    featuresTitle: 'Uzluksiz Diqqat Uchun Yaratilgan Afzalliklar',
    features: [
      {
        title: 'Aqlli Intervallar',
        text: 'Ish va dam olish seanslari orasida avtomatik o‘tish hamda moslashtiriladigan ovozli signallar.',
      },
      {
        title: 'Progressive Web App (PWA)',
        text: 'Pomotomo-ni kompyuter yoki telefonga o‘rnating va internetsiz (oflayn) to‘liq rejimda foydalaning.',
      },
      {
        title: 'Yoqimli Audio va Ovozlar',
        text: 'Fokusni oshirish uchun qo‘ng‘iroq ohanglari, sokin signallar yoki ritmik chertish ovozini tanlang.',
      },
      {
        title: '100% Maxfiylik',
        text: 'Hech qanday ro‘yxatdan o‘tish, kuzatuv va shaxsiy ma’lumotlarni yig‘ish yo‘q. Barchasi faqat brauzeringizda saqlanadi.',
      },
    ],
    howToTitle: 'Pomotomo Bilan Ishlashning 5 Oson Qadami',
    howToDescription:
      'Pomotomo yordamida kuningizni maksimal unumli o‘tkazish uchun ushbu 5 qadamga amal qiling.',
    steps: [
      {
        name: 'Bitta aniq vazifani tanlang',
        text: 'Bajarilishi kerak bo‘lgan eng asosiy vazifani belgilang va barcha chalg‘ituvchi omillarni chetga suring.',
      },
      {
        name: '25 daqiqalik taymerni ishga tushiring',
        text: '«Boshlash» tugmasini bosing va barcha bildirishnomalarni o‘chirib, faqat tanlangan ishga sho‘ng‘ing.',
      },
      {
        name: 'Ovozli signalgacha to‘liq diqqat bilan ishlang',
        text: 'Taymer signali yangraguncha faqat shu maqsad ustida tinimsiz ishlang.',
      },
      {
        name: '5 daqiqa qisqa tanaffus qiling',
        text: 'Stoldan turing, yengil badantarbiya qiling, suv iching yoki ko‘zlaringizga dam bering.',
      },
      {
        name: '4 ta tsiklni bajaring va uzoq dam oling',
        text: 'To‘rtta pomodoro yakunlangach, kuchni to‘liq tiklash uchun 15–30 daqiqalik uzoq tanaffus qiling.',
      },
    ],
    faqTitle: 'Ko‘p Beriladigan Savollar (FAQ)',
    faqs: [
      {
        question: 'Pomodoro texnikasi nima?',
        answer:
          'Bu vaqtni boshqarish usuli bo‘lib, 25 daqiqalik qizg‘in ish va 5 daqiqalik dam olish intervallaridan iborat. Har to‘rtta seansdan so‘ng uzoqroq (15–30 daqiqa) tanaffus qilinadi.',
      },
      {
        question: 'Taymer vaqtlarini o‘zgartirish mumkinmi?',
        answer:
          'Ha. «Sozlamalar» bo‘limida ish davomiyligi, qisqa va uzun tanaffuslar vaqtini o‘zingizning qulay ish maromingizga moslab o‘zgartirishingiz mumkin.',
      },
      {
        question: 'Ilova internetsiz ishlaydimi?',
        answer:
          'Ha, Pomotomo — Progressive Web App (PWA). Barcha kerakli fayllar brauzer xotirasiga yuklanadi va hatto tarmoqsiz ham to‘liq ishlaydi.',
      },
      {
        question: 'Pomotomo bepulmi?',
        answer:
          'Ha, dastur mutlaqo bepul, unda obuna, pullik cheklovlar yoki reklamalar mavjud emas.',
      },
      {
        question: 'Mening sozlamalarim qayerda saqlanadi?',
        answer:
          'Barcha sozlamalar, tanlangan mavzular va ovozlar faqat sizning qurilmangizdagi brauzer xotirasida (localStorage) saqlanadi.',
      },
    ],
  },
  de: {
    h1: 'Pomotomo — Kostenloser Online-Pomodoro-Timer für Produktivität & Fokus',
    title: 'Pomodoro Fokus-Timer — Pomotomo',
    description:
      'Pomotomo ist Ihr persönlicher Pomodoro-Fokus-Timer zur Steigerung der Produktivität. Teilen Sie Ihre Aufgaben in kurze Arbeitsphasen mit Pausen ein.',
    aboutTitle: 'Meistern Sie Ihre Zeit mit der Pomodoro-Technik',
    aboutText: [
      'Die Pomodoro-Technik ist eine bewährte Zeitmanagement-Methode, die in den späten 1980er Jahren von Francesco Cirillo entwickelt wurde. Sie unterteilt Ihre Arbeitszeit in konzentrierte 25-Minuten-Intervalle ("Pomodoros"), gefolgt von 5-minütigen kurzen Pausen und einer längeren Erholungsphase nach jeweils vier Intervallen.',
      'Durch diesen strukturierten Wechsel zwischen Fokus und Regeneration baut Pomotomo mentale Ermüdung ab, beugt Aufschieberitis vor und steigert nachhaltig Ihre Leistungsfähigkeit.',
    ],
    featuresTitle: 'Funktionen für maximale Konzentration',
    features: [
      {
        title: 'Automatisierter Ablauf',
        text: 'Fließender Übergang zwischen Arbeits- und Pausenphasen mit dezenten Tonsignalen.',
      },
      {
        title: 'Progressive Web App (PWA)',
        text: 'Installieren Sie Pomotomo auf Desktop oder Smartphone und nutzen Sie den Timer komplett offline.',
      },
      {
        title: 'Akustische Signale & Ticken',
        text: 'Wählen Sie angenehme Signaltöne oder dezentes Ticken zur Unterstützung Ihres Arbeitsfokus.',
      },
      {
        title: '100% Datenschutz',
        text: 'Keine Registrierung, keine Werbung und kein Tracking. Alle Einstellungen verbleiben lokal in Ihrem Browser.',
      },
    ],
    howToTitle: 'So nutzen Sie Pomotomo in 5 einfachen Schritten',
    howToDescription:
      'Schritt-für-Schritt-Anleitung für erfolgreiches Arbeiten und optimale Zeiteinteilung mit Pomotomo.',
    steps: [
      {
        name: 'Aufgabe auswählen',
        text: 'Entscheiden Sie sich für eine konkrete Aufgabe oder ein Teilprojekt, das Sie bearbeiten möchten.',
      },
      {
        name: '25-Minuten-Timer starten',
        text: 'Starten Sie den Timer und eliminieren Sie alle Ablenkungen und Benachrichtigungen.',
      },
      {
        name: 'Fokussiert arbeiten',
        text: 'Arbeiten Sie mit voller Aufmerksamkeit an der gewählten Aufgabe, bis der Signalton ertönt.',
      },
      {
        name: '5 Minuten kurze Pause',
        text: 'Stehen Sie auf, bewegen Sie sich, trinken Sie Wasser und gönnen Sie Ihren Augen eine Pause.',
      },
      {
        name: '4 Runden wiederholen & lange Pause',
        text: 'Gönnen Sie sich nach vier erfolgreichen Pomodoro-Einheiten eine ausgedehnte Pause von 15–30 Minuten.',
      },
    ],
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    faqs: [
      {
        question: 'Was ist die Pomodoro-Technik?',
        answer:
          'Die Pomodoro-Technik ist eine Zeitmanagement-Methode, die 25-minütige Fokusphasen mit 5-minütigen Pausen abwechselt. Nach vier Intervallen folgt eine längere Erholungspause von 15–30 Minuten.',
      },
      {
        question: 'Kann ich die Zeitintervalle anpassen?',
        answer:
          'Ja, in den Einstellungen können Sie die Länge der Arbeits- und Pausenzeiten sowie die Anzahl der Zyklen individuell konfigurieren.',
      },
      {
        question: 'Funktioniert Pomotomo offline?',
        answer:
          'Ja, als Progressive Web App (PWA) wird Pomotomo im Browser gecacht und kann jederzeit ohne aktive Internetverbindung genutzt werden.',
      },
      {
        question: 'Ist Pomotomo kostenlos?',
        answer:
          'Pomotomo ist vollkommen kostenlos, werbefrei und erfordert weder ein Konto noch ein Abonnement.',
      },
      {
        question: 'Werden meine Einstellungen gespeichert?',
        answer:
          'Alle Einstellungen, Ton- und Farbpräferenzen werden sicher und lokal im Speicher Ihres Browsers (localStorage) abgelegt.',
      },
    ],
  },
};

export default seoContent;
