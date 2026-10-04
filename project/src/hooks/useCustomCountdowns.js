import useLocalStorage from './useLocalStorage';

// crypto.randomUUID only works on https/localhost, this also works when testing on a phone over the local network
const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// Older countdowns have no createdAt, but their id starts with the time they were created
const withCreatedAt = (countdown) => ({ ...countdown, createdAt: countdown.createdAt ?? parseInt(countdown.id, 36) });

// The user's own countdowns, saved in the browser
const useCustomCountdowns = () => {
    const [saved, setCountdowns] = useLocalStorage('countdowns', []);
    const countdowns = saved.map(withCreatedAt);

    const addCountdown = ({ title, date }) => {
        const countdown = { id: createId(), title, date, createdAt: Date.now() };
        setCountdowns(current => [countdown, ...current]);
        return countdown;
    };

    const removeCountdown = (id) => {
        setCountdowns(current => current.filter(countdown => countdown.id !== id));
    };

    return { countdowns, addCountdown, removeCountdown };
};

export default useCustomCountdowns;
