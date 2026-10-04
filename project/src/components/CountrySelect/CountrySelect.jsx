import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { getFlagUrl } from '../../utils/holidays'

//import css
import "./CountrySelect.css"

const CountrySelect = ({ value, countries, onChange }) => {
    return (
        <div className='country-select'>
            <label htmlFor="country" className='country-select-label'>Country</label>
            <div className='country-select-field'>
                <img src={getFlagUrl(value)} alt="" className='country-select-flag' />
                <select id="country" value={value} onChange={(e) => onChange(e.target.value)}>
                    {/* Keeps the current country visible while the list is loading */}
                    {countries.length === 0 && <option value={value}>{value}</option>}
                    {countries.map(({ countryCode, name }) => (
                        <option key={countryCode} value={countryCode}>{name}</option>
                    ))}
                </select>
                <FiChevronDown className='country-select-icon' aria-hidden="true" />
            </div>
        </div>
    )
}

export default CountrySelect
