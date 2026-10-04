import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

//import css
import "./FeatureCard.css"

// Icon, title and text. With "to" the whole card becomes a link
const FeatureCard = ({ icon: Icon, title, text, to }) => {
    const content = (
        <>
            <span className='feature-icon'><Icon /></span>
            <h3 className='feature-title'>{title}</h3>
            <p className='feature-text'>{text}</p>
            {to && <span className='feature-link'>Open <FiArrowRight /></span>}
        </>
    );

    return to
        ? <Link to={to} className='feature-card is-link'>{content}</Link>
        : <div className='feature-card'>{content}</div>;
}

export default FeatureCard
