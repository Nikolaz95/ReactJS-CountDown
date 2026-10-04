import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const TOAST_OPTIONS = {
    style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
    },
};

const Root = () => {
    return (
        <div className='app'>
            <Header />
            <main className='app-main'>
                <Outlet />
            </main>
            <Footer />
            <Toaster position="top-center" toastOptions={TOAST_OPTIONS} />
            <ScrollRestoration />
        </div>
    )
}

export default Root
