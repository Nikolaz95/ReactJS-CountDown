import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import useCountdown from '../../hooks/useCountdown'
import { formatDate, formatTime } from '../../utils/time'

//import css
import "./CountdownPanel.css"

//import components
import CountdownDisplay from '../CountdownDisplay/CountdownDisplay'
import FireworksButton from '../FireworksButton/FireworksButton'

// The big countdown: title, target date and the large time boxes. celebrate: fireworks when it hits zero
const CountdownPanel = ({ title, date, emoji, note, badge, finishedText, celebrate = false, children }) => {
    const timeLeft = useCountdown(date);

    return (
        <section className='countdown-panel animate-fade-up' style={{ '--delay': 3 }}>
            <div className='countdown-panel-head'>
                {emoji && <span className='countdown-panel-emoji' aria-hidden="true">{emoji}</span>}
                <div>
                    <h2 className='countdown-panel-title'>{title}</h2>
                    {note && <p className='countdown-panel-note'>{note}</p>}
                    <p className='countdown-panel-date'>
                        <FiCalendar /> {formatDate(date)} at {formatTime(date)}
                        {badge && <span className='badge'>{badge}</span>}
                    </p>
                </div>
            </div>

            <CountdownDisplay timeLeft={timeLeft} finishedText={finishedText} />

            {celebrate && timeLeft.isFinished && (
                <div className='countdown-panel-celebrate'>
                    <FireworksButton label="Play fireworks again" autoPlay />
                </div>
            )}

            {children}
        </section>
    )
}

export default CountdownPanel
