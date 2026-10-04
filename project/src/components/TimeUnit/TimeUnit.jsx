import React from 'react'
import { padTime } from '../../utils/time'

//import css
import "./TimeUnit.css"

// One box of the countdown, e.g. "08 Hours"
const TimeUnit = ({ value, label }) => {
    return (
        <div className='time-unit'>
            {/* key restarts the tick animation every time the number changes */}
            <span className='time-unit-value' key={value}>{padTime(value)}</span>
            <span className='time-unit-label'>{label}</span>
        </div>
    )
}

export default TimeUnit
