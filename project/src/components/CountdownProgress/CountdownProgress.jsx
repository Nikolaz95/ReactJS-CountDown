import React from 'react'
import useCountdown from '../../hooks/useCountdown'
import { getDaysBetween, getDaysUntil, getProgress, startOfDay } from '../../utils/time'

//import css
import "./CountdownProgress.css"

// Progress bar from start to end, e.g. "2026 is done  276 / 365 days · 75.84%"
const CountdownProgress = ({ start, end, label, showDays = false }) => {
    const { totalSeconds } = useCountdown(end);
    const progress = getProgress(start, end, totalSeconds);

    // Days counted from the start of the first day, so a countdown made in the evening starts at 0, not -1
    const totalDays = getDaysBetween(startOfDay(start), end);
    const daysPassed = Math.min(totalDays, Math.max(0, totalDays - getDaysUntil(end)));

    return (
        <div className='countdown-progress'>
            <div className='countdown-progress-label'>
                <span>{label}</span>
                <span className='countdown-progress-values'>
                    {showDays && <span className='countdown-progress-days'>{daysPassed} / {totalDays} days</span>}
                    <strong>{progress.toFixed(2)}%</strong>
                </span>
            </div>
            <div
                className='countdown-progress-track'
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={label}
            >
                <div className='countdown-progress-fill' style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}

export default CountdownProgress
