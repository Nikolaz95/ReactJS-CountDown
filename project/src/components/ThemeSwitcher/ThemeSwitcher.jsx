import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import useTheme from '../../hooks/useTheme'

const ThemeSwitcher = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            className='icon-btn'
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
        >
            {isDark ? <FiSun /> : <FiMoon />}
        </button>
    )
}

export default ThemeSwitcher
