import { useEffect } from 'react';
import { APP_NAME } from '../utils/constants';

const useTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
    }, [title]);
};

export default useTitle;
