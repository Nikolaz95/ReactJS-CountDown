import React from 'react'
import useTitle from '../../hooks/useTitle'
import useNow from '../../hooks/useNow'
import { getNewYearTarget, isNewYearsDay } from '../../utils/time'

//import components
import PageHeader from '../../components/PageHeader/PageHeader'
import CountdownPanel from '../../components/CountdownPanel/CountdownPanel'
import CountdownProgress from '../../components/CountdownProgress/CountdownProgress'

const NewYearPage = () => {
    // Checked every second, so the page switches by itself at midnight on 1 and 2 January
    const today = new Date(useNow());
    const isCelebrating = isNewYearsDay(today);
    const newYear = getNewYearTarget(today);
    const year = newYear.getFullYear();
    const yearStart = new Date(year - 1, 0, 1);
    useTitle(`New Year ${year}`);

    return (
        <div className='container page'>
            {isCelebrating ? (
                <PageHeader
                    eyebrow="Happy New Year"
                    title={<>Welcome to <span className='gradient-text'>{year}</span>!</>}
                    text="The countdown is over. Enjoy the fireworks, they're here all day today."
                />
            ) : (
                <PageHeader
                    eyebrow="New Year countdown"
                    title={<>How long until <span className='gradient-text'>{year} </span>?</>}
                    text="Every second until midnight on 1 January, in your own time zone. At midnight the fireworks start on their own."
                />
            )}

            {/* Fireworks + "Play fireworks again" show while the countdown is finished, which is all of 1 January */}
            <CountdownPanel title={`New Year ${year}`} date={newYear} emoji="🎆" finishedText={`Happy New Year ${year}!`} celebrate>
                <div className='panel'>
                    <CountdownProgress start={yearStart} end={newYear} label={`${year - 1} is done`} showDays />
                </div>
            </CountdownPanel>
        </div>
    )
}

export default NewYearPage
