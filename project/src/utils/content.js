import { FiCalendar, FiGift, FiHardDrive, FiMoon, FiSmartphone, FiStar, FiZap } from 'react-icons/fi';

export const COUNTDOWN_OPTIONS = [
    {
        icon: FiStar,
        title: 'New Year',
        text: 'A full-screen countdown to midnight on 1 January, with a progress bar for the current year.',
        to: '/new-year',
    },
    {
        icon: FiGift,
        title: 'Holidays',
        text: 'Public holidays for your country, from national days to Christmas. Pick any of 100+ countries.',
        to: '/holidays',
    },
    {
        icon: FiCalendar,
        title: 'Custom date',
        text: 'Birthday, vacation, exam or wedding. Pick any date and time and save as many countdowns as you like.',
        to: '/custom',
    },
];

export const APP_FEATURES = [
    { icon: FiZap, title: 'Live to the second', text: 'Days, hours, minutes and seconds update in real time.' },
    { icon: FiSmartphone, title: 'Every device', text: 'Built mobile first, so it looks right on phones, tablets and desktops.' },
    { icon: FiHardDrive, title: 'No account needed', text: 'Your countdowns are saved in your browser and stay there after a refresh.' },
    { icon: FiMoon, title: 'Light & dark', text: 'Switch themes with one click. Your choice is remembered.' },
];

export const HOW_IT_WORKS = [
    'Pick a countdown: New Year, a holiday in your country or your own date.',
    'For a custom countdown, enter a name and a date.',
    'Watch the time tick down. Saved countdowns are there the next time you visit.',
];

export const TECH_STACK = ['React 19', 'React Router 7', 'Custom hooks', 'Vite', 'CSS (mobile first)', 'React Hot Toast', 'React Day Picker', 'Nager.Date API', 'React Icons', 'localStorage'];
