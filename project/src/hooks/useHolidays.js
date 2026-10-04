import { useCallback } from 'react';
import useAsync from './useAsync';
import { fetchCountries, fetchUpcomingHolidays } from '../utils/holidays';

// Upcoming public holidays for one country
export const useHolidays = (countryCode) => {
    const load = useCallback(() => fetchUpcomingHolidays(countryCode), [countryCode]);
    return useAsync(load);
};

// Every country the holiday API supports
export const useHolidayCountries = () => useAsync(fetchCountries);
