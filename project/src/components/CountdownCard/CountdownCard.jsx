import React from 'react'
import { FiEye, FiTrash2 } from 'react-icons/fi'
import useCountdown from '../../hooks/useCountdown'
import { formatDate } from '../../utils/time'

//import css
import "./CountdownCard.css"

//import components
import CountdownDisplay from '../CountdownDisplay/CountdownDisplay'

// Compact countdown card. note, badge, onSelect and onDelete are optional
const CountdownCard = ({ title, date, emoji, note, badge, isActive = false, onSelect, onDelete }) => {
    const timeLeft = useCountdown(date);

    return (
        <article className={`countdown-card ${isActive ? 'is-active' : ''}`}>
            <div className='countdown-card-head'>
                {emoji && <span className='countdown-card-emoji' aria-hidden="true">{emoji}</span>}
                <div className='countdown-card-info'>
                    <h3 title={title}>{title}</h3>
                    {note && <p className='countdown-card-note' title={note}>{note}</p>}
                    <p>{formatDate(date)} {badge && <span className='badge'>{badge}</span>}</p>
                </div>
                {onDelete && (
                    <button className='icon-btn countdown-card-delete' onClick={onDelete} aria-label={`Delete ${title}`} title="Delete">
                        <FiTrash2 />
                    </button>
                )}
            </div>

            <CountdownDisplay timeLeft={timeLeft} size="sm" />

            {onSelect && (
                <button className='btn btn-sm' onClick={onSelect} disabled={isActive}>
                    <FiEye /> {isActive ? 'Viewing' : 'View'}
                </button>
            )}
        </article>
    )
}

export default CountdownCard
