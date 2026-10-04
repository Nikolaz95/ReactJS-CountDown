import React from 'react'
import useTitle from '../../hooks/useTitle'
import { AUTHOR } from '../../utils/constants'
import { HOW_IT_WORKS, TECH_STACK } from '../../utils/content'

//import css
import "./AboutPage.css"

//import components
import PageHeader from '../../components/PageHeader/PageHeader'
import SocialLinks from '../../components/SocialLinks/SocialLinks'

const AboutPage = () => {
    useTitle('About');

    return (
        <div className='container page'>
            <PageHeader
                eyebrow="About"
                title={<>About <span className='gradient-text'>CountDown</span></>}
                text="A small, fast app that answers one simple question: how much time is left?"
            />

            <div className='about-grid'>
                <section className='panel about-block'>
                    <h2>What is CountDown?</h2>
                    <p>
                        CountDown is a countdown timer for the moments you are waiting for. See how long until
                        New Year, the next holiday, or any date you pick yourself, in days, hours, minutes and seconds.
                    </p>
                    <p>It is made for every screen, from a small phone to a wide desktop monitor.</p>
                </section>

                <section className='panel about-block'>
                    <h2>How it works</h2>
                    <ol className='about-steps'>
                        {HOW_IT_WORKS.map(step => <li key={step}>{step}</li>)}
                    </ol>
                </section>

                <section className='panel about-block'>
                    <h2>Your data stays with you</h2>
                    <p>
                        No sign-up and no tracking. Your countdowns are saved in your browser's local storage,
                        so only you can see them. Public holidays come from the free Nager.Date API, which only
                        receives the country you picked.
                    </p>
                </section>

                <section className='panel about-block'>
                    <h2>Built with</h2>
                    <ul className='about-tags'>
                        {TECH_STACK.map(tech => <li key={tech}>{tech}</li>)}
                    </ul>
                </section>
            </div>

            <section className='section panel about-author'>
                <div>
                    <p className='page-eyebrow'>Made by</p>
                    <h2>{AUTHOR}</h2>
                    <p>
                        I built CountDown as a portfolio project to practise clean React: small reusable components,
                        custom hooks and responsive, mobile-first CSS. Feel free to get in touch or check out my other projects.
                    </p>
                </div>
                <SocialLinks />
            </section>
        </div>
    )
}

export default AboutPage
