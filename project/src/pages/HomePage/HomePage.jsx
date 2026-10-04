import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import useTitle from '../../hooks/useTitle'
import { getNextNewYear } from '../../utils/time'
import { APP_FEATURES, COUNTDOWN_OPTIONS } from '../../utils/content'

//import css
import "./HomePage.css"

//import components
import PageHeader from '../../components/PageHeader/PageHeader'
import CountdownCard from '../../components/CountdownCard/CountdownCard'
import FeatureCard from '../../components/FeatureCard/FeatureCard'

const HomePage = () => {
    useTitle('Every second counts');
    const newYear = useMemo(() => getNextNewYear(), []);

    return (
        <div className='container page'>
            <div className='home-hero'>
                <PageHeader
                    eyebrow="Every second counts"
                    title={<>Count down to the moments <span className='gradient-text'>that matter</span></>}
                    text="CountDown shows exactly how long until New Year, the next holiday or any date you choose, down to the second. It works on your phone, tablet and desktop."
                >
                    <Link to="/custom" className='btn btn-primary'><FiPlus /> Create a countdown</Link>
                    <Link to="/new-year" className='btn'>New Year countdown</Link>
                </PageHeader>

                <div className='home-preview animate-fade-up' style={{ '--delay': 4 }}>
                    <p className='home-preview-label'><span className='live-dot' /> Live right now</p>
                    <CountdownCard title={`New Year ${newYear.getFullYear()}`} date={newYear} emoji="🎆" />
                </div>
            </div>

            <section className='section'>
                <h2 className='section-title'>Choose your countdown</h2>
                <div className='card-grid'>
                    {COUNTDOWN_OPTIONS.map(option => <FeatureCard key={option.title} {...option} />)}
                </div>
            </section>

            <section className='section'>
                <h2 className='section-title'>Why CountDown?</h2>
                <div className='card-grid card-grid--small'>
                    {APP_FEATURES.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                </div>
            </section>
        </div>
    )
}

export default HomePage
