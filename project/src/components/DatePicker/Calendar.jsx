import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { addMonths, formatMonthYear, startOfMonth } from '../../utils/time'

//import css
import "./Calendar.css"

//import components
import CalendarHeader from './CalendarHeader'
import YearGrid from './YearGrid'
import MonthGrid from './MonthGrid'

// Three views: days -> (click title) years -> months -> back to days
const Calendar = ({ value, onSelect, minDate, yearsAhead }) => {
    const firstMonth = startOfMonth(minDate);
    const lastMonth = new Date(minDate.getFullYear() + yearsAhead, 11, 1);

    const [view, setView] = useState('days');
    const [month, setMonth] = useState(() => startOfMonth(value ?? minDate));

    // Never show a month outside the allowed range
    const showMonth = (date) => setMonth(date < firstMonth ? firstMonth : date > lastMonth ? lastMonth : date);

    const handleYear = (year) => {
        showMonth(new Date(year, month.getMonth(), 1));
        setView('months');
    };

    const handleMonth = (monthIndex) => {
        showMonth(new Date(month.getFullYear(), monthIndex, 1));
        setView('days');
    };

    const titles = {
        days: formatMonthYear(month),
        months: String(month.getFullYear()),
        years: 'Choose a year',
    };

    return (
        <div className='calendar'>
            <CalendarHeader
                title={titles[view]}
                view={view}
                onTitleClick={() => setView(view === 'years' ? 'days' : 'years')}
                onPrev={() => showMonth(addMonths(month, -1))}
                onNext={() => showMonth(addMonths(month, 1))}
                canPrev={month > firstMonth}
                canNext={month < lastMonth}
            />

            {/* key replays the fade animation when the view changes */}
            <div className='calendar-body' key={view}>
                {view === 'days' && (
                    <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={onSelect}
                        month={month}
                        onMonthChange={showMonth}
                        startMonth={firstMonth}
                        endMonth={lastMonth}
                        disabled={{ before: minDate }}
                        hideNavigation
                        weekStartsOn={1}
                        showOutsideDays
                        fixedWeeks
                        autoFocus
                    />
                )}
                {view === 'years' && (
                    <YearGrid
                        fromYear={firstMonth.getFullYear()}
                        toYear={lastMonth.getFullYear()}
                        selectedYear={month.getFullYear()}
                        onSelect={handleYear}
                    />
                )}
                {view === 'months' && (
                    <MonthGrid
                        year={month.getFullYear()}
                        selectedMonth={month.getMonth()}
                        minDate={minDate}
                        onSelect={handleMonth}
                    />
                )}
            </div>
        </div>
    )
}

export default Calendar
