const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// Splits the time until target into days, hours, minutes and seconds
export const getTimeLeft = (target, now = Date.now()) => {
    const totalSeconds = Math.max(0, Math.ceil((new Date(target).getTime() - now) / 1000));

    return {
        totalSeconds,
        days: Math.floor(totalSeconds / DAY),
        hours: Math.floor((totalSeconds % DAY) / HOUR),
        minutes: Math.floor((totalSeconds % HOUR) / MINUTE),
        seconds: totalSeconds % MINUTE,
        isFinished: totalSeconds === 0,
    };
};

export const padTime = (value) => String(value).padStart(2, '0');

export const getNextNewYear = (now = new Date()) => new Date(now.getFullYear() + 1, 0, 1);

export const isNewYearsDay = (date) => date.getMonth() === 0 && date.getDate() === 1;

// On 1 January: today's midnight (already passed, so the page celebrates all day). Any other day: the next 1 January
export const getNewYearTarget = (now = new Date()) =>
    isNewYearsDay(now) ? new Date(now.getFullYear(), 0, 1) : getNextNewYear(now);

// Next time a month/day comes around (month is 0-based), this year or next
export const getNextDate = (month, day, now = new Date()) => {
    const date = new Date(now.getFullYear(), month, day);
    if (date <= now) date.setFullYear(now.getFullYear() + 1);
    return date;
};

// How much of the time between start and end has passed, 0-100
export const getProgress = (start, end, totalSeconds) => {
    const totalSpan = (new Date(end) - new Date(start)) / 1000;
    if (!(totalSpan > 0)) return 100;
    return Math.min(100, Math.max(0, 100 - (totalSeconds / totalSpan) * 100));
};

export const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

export const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

// Midnight at the start of tomorrow, the earliest date a custom countdown can use
export const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
};

// Whole calendar days between two midnights. Rounding absorbs the extra/missing hour on daylight saving days
export const getDaysBetween = (start, end) => Math.round((new Date(end) - new Date(start)) / (DAY * 1000));

// Whole calendar days from today to date: 1 = tomorrow
export const getDaysUntil = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return getDaysBetween(today, date);
};

// "24 Sep 2026", same month names as the calendar
export const formatShortDate = (value) => {
    const date = new Date(value);
    return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const startOfDay = (date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return day;
};

export const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const addMonths = (date, amount) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const formatMonthYear = (date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

// ["Jan", "Feb", ...]
export const SHORT_MONTHS = Array.from({ length: 12 }, (_, month) =>
    new Date(2000, month, 1).toLocaleDateString('en-US', { month: 'short' })
);
