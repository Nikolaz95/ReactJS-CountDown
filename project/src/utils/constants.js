import gmailIcon from '../assets/icons/icon-gmail.png';
import githubIcon from '../assets/icons/icon-github.png';
import linkedinIcon from '../assets/icons/icon-linkedin.png';

export const APP_NAME = 'CountDown';

export const AUTHOR = 'Nikola Zovko';
export const PORTFOLIO_URL = 'https://nikolazovkoportfolio.netlify.app/#home';
export const REPO_URL = 'https://github.com/Nikolaz95/ReactJS-CountDown';

export const SOCIAL_LINKS = [
    { label: 'Email', href: 'mailto:nikolajoe95@gmail.com', image: gmailIcon },
    { label: 'GitHub', href: 'https://github.com/Nikolaz95', image: githubIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikola-zovko-a50779247/', image: linkedinIcon },
];

export const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/new-year', label: 'New Year' },
    { to: '/holidays', label: 'Holidays' },
    { to: '/custom', label: 'Custom' },
    { to: '/about', label: 'About' },
];

export const TIME_UNITS = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' },
];
