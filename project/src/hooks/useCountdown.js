import useNow from './useNow';
import { getTimeLeft } from '../utils/time';

// Live { days, hours, minutes, seconds, isFinished } until targetDate
const useCountdown = (targetDate) => {
    const now = useNow();
    return getTimeLeft(targetDate, now);
};

export default useCountdown;
