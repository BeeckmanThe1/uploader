import React, { useEffect, useState } from 'react';

const progressorWidth = 60
const progressBarWidth = 350

export const ProgressBar = () => {
    const [progress, setProgress] = useState(- progressorWidth * 100/progressBarWidth);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newValue = prev + 0.5
                return newValue % 100.5
            })
        }, 7);
        return () => clearInterval(interval);
    }, []);

    const left2 = `${progress}%`
    const left1 = `calc(${left2} - 100%)`

    const width = `${progressorWidth}px`

    return <div className='isw-progress-bar'>
        <div style={{ left: left1, width }} className='isw-progressor'/>
        <div style={{ left: left2, width }} className='isw-progressor'/>
    </div>
}