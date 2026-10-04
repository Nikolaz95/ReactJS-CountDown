import React from 'react'
import { FiAlertCircle, FiCalendar, FiLoader, FiRefreshCw } from 'react-icons/fi'
import useTitle from '../../hooks/useTitle'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useHolidayCountries, useHolidays } from '../../hooks/useHolidays'
import { detectCountry, getHolidayEmoji } from '../../utils/holidays'

//import css
import "./HolidaysPage.css"

//import components
import PageHeader from '../../components/PageHeader/PageHeader'
import CountrySelect from '../../components/CountrySelect/CountrySelect'
import CountdownPanel from '../../components/CountdownPanel/CountdownPanel'
import CountdownCard from '../../components/CountdownCard/CountdownCard'
import StatusMessage from '../../components/StatusMessage/StatusMessage'

// Shared props for the big panel and the small cards
const toCountdownProps = (holiday) => ({
    title: holiday.name,
    note: holiday.localName,
    date: holiday.date,
    emoji: getHolidayEmoji(holiday.name),
    badge: holiday.isRegional ? 'Regional' : null,
});

const HolidaysPage = () => {
    useTitle('Holidays');

    // First visit: country from the browser language. After that: the user's choice
    const [country, setCountry] = useLocalStorage('country', detectCountry());
    const { data: countries } = useHolidayCountries();
    const { data: holidays, loading, error, retry } = useHolidays(country);

    const countryName = countries?.find(({ countryCode }) => countryCode === country)?.name ?? country;
    const [next, ...upcoming] = holidays ?? [];

    return (
        <div className='container page'>
            <PageHeader
                eyebrow="Public holidays"
                title={<>Holidays in <span className='gradient-text'>{countryName}</span></>}
                text="Every country celebrates different days. We picked your country from your browser language, change it below if it's wrong."
            >
                <CountrySelect value={country} countries={countries ?? []} onChange={setCountry} />
            </PageHeader>

            {loading && <StatusMessage icon={FiLoader} title="Loading holidays..." isLoading />}

            {error && (
                <StatusMessage
                    icon={FiAlertCircle}
                    title="Couldn't load holidays"
                    text="Check your internet connection or pick another country."
                >
                    <button className='btn' onClick={retry}><FiRefreshCw /> Try again</button>
                </StatusMessage>
            )}

            {!loading && !error && !next && (
                <StatusMessage
                    icon={FiCalendar}
                    title="No holidays found"
                    text={`There are no public holidays for ${countryName} in the next 12 months.`}
                />
            )}

            {!loading && next && (
                <>
                    <CountdownPanel key={next.id} {...toCountdownProps(next)} finishedText={`Happy ${next.name}!`} />

                    {upcoming.length > 0 && (
                        <section className='section'>
                            <h2 className='section-title'>Coming up <span>({upcoming.length})</span></h2>
                            <div className='card-grid'>
                                {upcoming.map(holiday => (
                                    <CountdownCard key={holiday.id} {...toCountdownProps(holiday)} />
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}

            <p className='holidays-source'>
                Holiday data from <a href="https://date.nager.at" target="_blank" rel="noopener noreferrer">Nager.Date</a>.
                "Regional" holidays are only celebrated in part of the country.
            </p>
        </div>
    )
}

export default HolidaysPage
