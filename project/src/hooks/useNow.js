import { useEffect, useState } from 'react';

// Current time that updates on every full second, so all countdowns tick together
const useNow = () => {
    const [now, setNow] = useState(Date.now);

    useEffect(() => {
        let timeoutId;
        const scheduleTick = () => {
            timeoutId = setTimeout(() => {
                setNow(Date.now());
                scheduleTick();
            }, 1000 - (Date.now() % 1000));
        };
        scheduleTick();

        return () => clearTimeout(timeoutId);
    }, []);

    return now;
};

export default useNow;
