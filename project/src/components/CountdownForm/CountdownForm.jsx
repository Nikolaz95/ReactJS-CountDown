import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import { getTomorrow } from '../../utils/time'

//import css
import "./CountdownForm.css"

//import components
import FormField from '../FormField/FormField'
import DatePicker from '../DatePicker/DatePicker'

const EMPTY_FORM = { title: '', date: null };

const CountdownForm = ({ onAdd }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const tomorrow = useMemo(() => getTomorrow(), []);

    const updateField = (name, value) => setForm(current => ({ ...current, [name]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = form.title.trim();

        if (!title || !form.date) return toast.error('Please add a name and a date.');
        // The picker gives midnight of the chosen day, so the countdown ends when that day starts
        if (form.date <= new Date()) return toast.error('Pick a date in the future.');

        onAdd({ title, date: form.date.toISOString() });
        toast.success(`"${title}" countdown started!`);
        setForm(EMPTY_FORM);
    };

    return (
        <form className='countdown-form panel' onSubmit={handleSubmit} noValidate>
            <h2 className='countdown-form-title'>New countdown</h2>

            <FormField
                label="Name"
                id="title"
                placeholder="e.g. My birthday, Summer vacation"
                maxLength={40}
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
            />
            <DatePicker
                label="Date"
                value={form.date}
                onChange={(date) => updateField('date', date)}
                minDate={tomorrow}
            />

            <button type="submit" className='btn btn-primary countdown-form-submit'>
                <FiPlus /> Start countdown
            </button>
        </form>
    )
}

export default CountdownForm
