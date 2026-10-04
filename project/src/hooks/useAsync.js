import { useEffect, useState } from 'react';

// Runs an async function and returns { data, loading, error, retry }. load must be stable (module function or useCallback)
const useAsync = (load) => {
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState({ load: null, attempt: -1, data: null, error: null });

    useEffect(() => {
        let ignore = false;

        load()
            .then(data => !ignore && setResult({ load, attempt, data, error: null }))
            .catch(error => !ignore && setResult({ load, attempt, data: null, error }));

        // Ignore an old answer if the user already picked something else
        return () => { ignore = true; };
    }, [load, attempt]);

    // Still loading until the result belongs to the current request
    const loading = result.load !== load || result.attempt !== attempt;
    const retry = () => setAttempt(count => count + 1);

    return {
        data: loading ? null : result.data,
        error: loading ? null : result.error,
        loading,
        retry,
    };
};

export default useAsync;
