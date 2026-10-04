import React from 'react'

//import css
import "./PageHeader.css"

// Eyebrow, title, intro text and optional actions at the top of every page
const PageHeader = ({ eyebrow, title, text, children }) => {
    return (
        <section className='page-header'>
            {eyebrow && <p className='page-eyebrow animate-fade-up'>{eyebrow}</p>}
            <h1 className='page-title animate-fade-up' style={{ '--delay': 1 }}>{title}</h1>
            {text && <p className='page-text animate-fade-up' style={{ '--delay': 2 }}>{text}</p>}
            {children && <div className='page-actions animate-fade-up' style={{ '--delay': 3 }}>{children}</div>}
        </section>
    )
}

export default PageHeader
