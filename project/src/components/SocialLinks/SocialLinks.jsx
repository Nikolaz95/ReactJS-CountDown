import React from 'react'
import { FiBriefcase } from 'react-icons/fi'
import { PORTFOLIO_URL, SOCIAL_LINKS } from '../../utils/constants'

//import css
import "./SocialLinks.css"

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' };

const SocialLinks = () => {
    return (
        <div className='social-links'>
            <a href={PORTFOLIO_URL} {...EXTERNAL} className='btn btn-primary'>
                <FiBriefcase /> Portfolio
            </a>
            {SOCIAL_LINKS.map(({ label, href, image }) => (
                <a
                    key={label}
                    href={href}
                    {...(href.startsWith('http') && EXTERNAL)}
                    className='icon-btn social-link'
                    aria-label={label}
                    title={label}
                >
                    <img src={image} alt="" className={`social-link-img social-link-img--${label.toLowerCase()}`} />
                </a>
            ))}
        </div>
    )
}

export default SocialLinks
