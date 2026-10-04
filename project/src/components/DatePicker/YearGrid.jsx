import React, { useEffect, useRef } from 'react'

// Scrollable grid of years, opens with the selected year in the middle
const YearGrid = ({ fromYear, toYear, selectedYear, onSelect }) => {
    const gridRef = useRef(null);
    const selectedRef = useRef(null);
    const years = Array.from({ length: toYear - fromYear + 1 }, (_, index) => fromYear + index);

    useEffect(() => {
        const grid = gridRef.current;
        const selected = selectedRef.current;
        if (!grid || !selected) return;
        grid.scrollTop = selected.offsetTop - grid.clientHeight / 2 + selected.clientHeight / 2;
        selected.focus({ preventScroll: true });
    }, []);

    return (
        <div className='calendar-grid calendar-grid--years' ref={gridRef}>
            {years.map(year => (
                <button
                    key={year}
                    type="button"
                    ref={year === selectedYear ? selectedRef : null}
                    className={`calendar-cell ${year === selectedYear ? 'is-selected' : ''}`}
                    aria-pressed={year === selectedYear}
                    onClick={() => onSelect(year)}
                >
                    {year}
                </button>
            ))}
        </div>
    )
}

export default YearGrid
