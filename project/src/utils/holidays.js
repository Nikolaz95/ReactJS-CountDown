// Public holidays for ~120 countries from the free Nager.Date API (no key needed)
const API_URL = 'https://date.nager.at/api/v3';
const DEFAULT_COUNTRY = 'US';

// Same request is only sent once per visit
const cache = new Map();

const fetchJson = (url) => {
    if (!cache.has(url)) {
        const request = fetch(url).then(res => {
            if (!res.ok) throw new Error(`Request failed (${res.status})`);
            return res.status === 204 ? [] : res.json();
        });
        request.catch(() => cache.delete(url));
        cache.set(url, request);
    }
    return cache.get(url);
};

export const fetchCountries = () =>
    fetchJson(`${API_URL}/AvailableCountries`)
        .then(countries => [...countries].sort((a, b) => a.name.localeCompare(b.name)));

// "2026-12-25" as local midnight (new Date("2026-12-25") would be UTC)
const parseLocalDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
};

// Holidays from today and the next 12 months, closest first
export const fetchUpcomingHolidays = async (countryCode) => {
    const year = new Date().getFullYear();
    const [thisYear, nextYear] = await Promise.all(
        [year, year + 1].map(y => fetchJson(`${API_URL}/PublicHolidays/${y}/${countryCode}`))
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inOneYear = new Date(today);
    inOneYear.setFullYear(today.getFullYear() + 1);

    const seen = new Set();
    return [...thisYear, ...nextYear]
        .map(holiday => ({
            id: `${holiday.date}-${holiday.name}`,
            name: holiday.name,
            localName: holiday.localName !== holiday.name ? holiday.localName : null,
            date: parseLocalDate(holiday.date),
            isRegional: !holiday.global,
        }))
        .filter(holiday => {
            if (holiday.date < today || holiday.date >= inOneYear || seen.has(holiday.id)) return false;
            seen.add(holiday.id);
            return true;
        })
        .sort((a, b) => a.date - b.date);
};

// Country from the browser language: "sv" -> SE, "hr" -> HR, "de-AT" -> AT
export const detectCountry = () => {
    try {
        return new Intl.Locale(navigator.language).maximize().region ?? DEFAULT_COUNTRY;
    } catch {
        return DEFAULT_COUNTRY;
    }
};

export const getFlagUrl = (countryCode) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const HOLIDAY_EMOJIS = [
    [/christmas/i, '🎄'],
    [/new year/i, '🎆'],
    [/easter/i, '🐣'],
    [/independence|national|statehood|constitution|republic|unity|king|queen/i, '🏛️'],
    [/labou?r|workers/i, '🛠️'],
    [/women|mother/i, '💐'],
    [/thanksgiving/i, '🦃'],
    [/midsummer|summer/i, '☀️'],
    [/victory|liberation|veterans|memorial|armistice|remembrance|anti-fascist/i, '🎖️'],
    [/all saints|souls/i, '🕯️'],
    [/peace/i, '🕊️'],
    [/epiphany|ascension|assumption|pentecost|whit|corpus|good friday|saint|st\. |holy/i, '⛪'],
];

export const getHolidayEmoji = (name) =>
    HOLIDAY_EMOJIS.find(([pattern]) => pattern.test(name))?.[1] ?? '📅';
