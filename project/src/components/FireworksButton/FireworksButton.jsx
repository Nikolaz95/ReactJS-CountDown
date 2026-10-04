import React, { useCallback, useState } from 'react'
import { FiSquare } from 'react-icons/fi'

//import components
import Fireworks from '../Fireworks/Fireworks'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Starts/stops the fireworks. autoPlay: start right away (used when the countdown hits zero)
const FireworksButton = ({ label = 'Preview fireworks', autoPlay = false }) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const stop = useCallback(() => setIsPlaying(false), []);

    // No fireworks for people who turned animations off in their system settings
    if (prefersReducedMotion()) return null;

    return (
        <>
            {isPlaying && <Fireworks onDone={stop} />}
            <button className='btn' onClick={() => setIsPlaying(current => !current)}>
                {isPlaying ? <><FiSquare /> Stop fireworks</> : <>🎆 {label}</>}
            </button>
        </>
    )
}

export default FireworksButton
