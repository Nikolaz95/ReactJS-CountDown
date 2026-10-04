import React from 'react'
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Title button that switches days/years view, plus month arrows in the days view
const CalendarHeader = ({ title, view, onTitleClick, onPrev, onNext, canPrev, canNext }) => {
    return (
        <div className='calendar-header'>
            <button
                type="button"
                className={`calendar-title ${view !== 'days' ? 'is-active' : ''}`}
                onClick={onTitleClick}
                aria-live="polite"
                aria-label={view === 'days' ? `${title}, choose month and year` : `${title}, back to days`}
            >
                {title} <FiChevronDown className='calendar-title-chevron' aria-hidden="true" />
            </button>

            {view === 'days' && (
                <div className='calendar-nav'>
                    <button type="button" className='calendar-nav-btn' onClick={onPrev} disabled={!canPrev} aria-label="Previous month">
                        <FiChevronLeft />
                    </button>
                    <button type="button" className='calendar-nav-btn' onClick={onNext} disabled={!canNext} aria-label="Next month">
                        <FiChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}

export default CalendarHeader
