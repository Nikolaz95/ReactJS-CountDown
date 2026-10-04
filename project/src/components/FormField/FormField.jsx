import React from 'react'

//import css
import "./FormField.css"

// Label + input, every other prop goes to the input
const FormField = ({ label, id, ...inputProps }) => {
    return (
        <label className='form-field' htmlFor={id}>
            <span className='form-label'>
                {label}
            </span>
            <input id={id} name={id} className='form-input' {...inputProps} />
        </label>
    )
}

export default FormField
