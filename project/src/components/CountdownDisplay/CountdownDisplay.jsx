import React from 'react'
import { TIME_UNITS } from '../../utils/constants'

//import css
import "./CountdownDisplay.css"

//import components
import TimeUnit from '../TimeUnit/TimeUnit'

// The four boxes (days, hours, minutes, seconds), size "lg" or "sm"
const CountdownDisplay = ({ timeLeft, size = 'lg', finishedText = "Time's up!" }) => {
    if (timeLeft.isFinished) {
        return <p className={`countdown-finished countdown-finished--${size}`}>🎉 {finishedText}</p>;
    }

    return (
        <div className={`countdown-display countdown-display--${size}`} role="timer">
            {TIME_UNITS.map(({ key, label }) => (
                <TimeUnit key={key} value={timeLeft[key]} label={label} />
            ))}
        </div>
    )
}

export default CountdownDisplay
