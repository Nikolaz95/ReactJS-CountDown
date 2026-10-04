import React, { useEffect, useRef } from 'react'
import { SHORT_MONTHS } from '../../utils/time'

// 12 months of one year. Months before minDate are disabled
const MonthGrid = ({ year, selectedMonth, minDate, onSelect }) => {
    const selectedRef = useRef(null);

    useEffect(() => {
        selectedRef.current?.focus({ preventScroll: true });
    }, []);

    const isDisabled = (month) =>
        year === minDate.getFullYear() && month < minDate.getMonth();

    return (
        <div className='calendar-grid calendar-grid--months'>
            {SHORT_MONTHS.map((name, month) => (
                <button
                    key={name}
                    type="button"
                    ref={month === selectedMonth ? selectedRef : null}
                    className={`calendar-cell ${month === selectedMonth ? 'is-selected' : ''}`}
                    aria-pressed={month === selectedMonth}
                    disabled={isDisabled(month)}
                    onClick={() => onSelect(month)}
                >
                    {name}
                </button>
            ))}
        </div>
    )
}

export default MonthGrid
