import React, { useCallback, useRef, useState } from 'react'
import { FiCalendar, FiChevronDown } from 'react-icons/fi'
import useClickOutside from '../../hooks/useClickOutside'
import { formatDate, getDaysUntil } from '../../utils/time'

//import css
import 'react-day-picker/style.css'
import "./DatePicker.css"

//import components
import Calendar from './Calendar'

const describeDays = (days) => days === 1 ? 'Tomorrow' : `In ${days.toLocaleString('en-GB')} days`;

// Button that opens the calendar. Closes on pick, click outside or Escape
const DatePicker = ({ label, value, onChange, minDate, yearsAhead = 50, placeholder = 'Pick a date' }) => {
    const [open, setOpen] = useState(false);
    const pickerRef = useRef(null);
    const close = useCallback(() => setOpen(false), []);

    useClickOutside(pickerRef, close, open);

    const handleSelect = (date) => {
        if (!date) return;
        onChange(date);
        close();
    };

    return (
        <div className='date-picker' ref={pickerRef}>
            <span className='form-label' id="date-picker-label">{label}</span>

            <button
                type="button"
                className={`date-picker-trigger ${open ? 'is-open' : ''}`}
                onClick={() => setOpen(current => !current)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-labelledby="date-picker-label date-picker-value"
            >
                <span className='date-picker-icon'><FiCalendar /></span>
                <span className='date-picker-text' id="date-picker-value">
                    {value ? (
                        <>
                            <strong>{formatDate(value)}</strong>
                            <small>{describeDays(getDaysUntil(value))}</small>
                        </>
                    ) : (
                        <span className='date-picker-placeholder'>{placeholder}</span>
                    )}
                </span>
                <FiChevronDown className='date-picker-chevron' aria-hidden="true" />
            </button>

            {/* Calendar mounts fresh on every open, so it always starts on the days view */}
            {open && (
                <div className='date-picker-popover' role="dialog" aria-label="Choose a date">
                    <Calendar value={value} onSelect={handleSelect} minDate={minDate} yearsAhead={yearsAhead} />
                </div>
            )}
        </div>
    )
}

export default DatePicker
