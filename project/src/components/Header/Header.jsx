import React, { useCallback, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiClock, FiMenu, FiX } from 'react-icons/fi'
import { NAV_LINKS } from '../../utils/constants'
import useClickOutside from '../../hooks/useClickOutside'

//import css
import "./Header.css"

//import components
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    // Mobile menu closes on a click/tap outside the header or on Escape
    useClickOutside(headerRef, closeMenu, menuOpen);

    return (
        <header className='header' ref={headerRef}>
            <div className='container header-inner'>
                <Link to="/" className='logo' onClick={closeMenu}>
                    <span className='logo-icon'><FiClock /></span>
                    <span className='logo-text'>Count<span className='gradient-text'>Down</span></span>
                </Link>

                <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink key={to} to={to} end={to === '/'} className='nav-link' onClick={closeMenu}>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className='header-actions'>
                    <ThemeSwitcher />
                    <button
                        className='icon-btn menu-toggle'
                        onClick={() => setMenuOpen(open => !open)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
