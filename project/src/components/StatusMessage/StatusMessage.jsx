import React from 'react'

//import css
import "./StatusMessage.css"

// Centered box for empty, loading and error states
const StatusMessage = ({ icon: Icon, title, text, isLoading = false, children }) => {
    return (
        <div className='status-message panel' role={isLoading ? 'status' : undefined}>
            <Icon className={isLoading ? 'status-icon is-spinning' : 'status-icon'} aria-hidden="true" />
            <h2>{title}</h2>
            {text && <p>{text}</p>}
            {children}
        </div>
    )
}

export default StatusMessage
