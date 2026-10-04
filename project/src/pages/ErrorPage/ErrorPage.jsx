import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import useTitle from '../../hooks/useTitle'

//import css
import "./ErrorPage.css"

const ErrorPage = () => {
    useTitle('Page not found');

    return (
        <div className='container page error-page'>
            <p className='error-code gradient-text animate-fade-up'>404</p>
            <h1 className='animate-fade-up' style={{ '--delay': 1 }}>Time ran out on this page</h1>
            <p className='error-text animate-fade-up' style={{ '--delay': 2 }}>The page you are looking for doesn't exist.</p>
            <Link to="/" className='btn btn-primary animate-fade-up' style={{ '--delay': 3 }}>
                <FiHome /> Back to home
            </Link>
        </div>
    )
}

export default ErrorPage
