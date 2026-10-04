import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { startFireworks } from '../../utils/fireworks'

//import css
import "./Fireworks.css"

// Full-screen fireworks over the page. Plays once, then calls onDone (must be stable, e.g. useCallback)
const Fireworks = ({ duration = 30000, onDone }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        return startFireworks(canvasRef.current, { duration, onDone });
    }, [duration, onDone]);

    return createPortal(<canvas ref={canvasRef} className='fireworks' aria-hidden="true" />, document.body);
}

export default Fireworks
