import React from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiGithub } from 'react-icons/fi'
import { APP_NAME, AUTHOR, REPO_URL } from '../../utils/constants'

//import css
import "./Footer.css"

//import components
import SocialLinks from '../SocialLinks/SocialLinks'

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container footer-inner'>
                <div className='footer-brand'>
                    <Link to="/" className='footer-title'>
                        <FiClock /> {APP_NAME}
                    </Link>
                    <p className='footer-note'>
                        Designed & built by <strong>{AUTHOR}</strong>
                    </p>
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className='footer-repo'>
                        <FiGithub /> View source on GitHub
                    </a>
                </div>

                <SocialLinks />

                <p className='footer-copy'>© {CURRENT_YEAR} {AUTHOR}. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
