import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for async data fetching.
 * @param fetcher - Any function returning a Promise (fetch call, service, etc.)
 * @param deps   - Re-runs the fetcher when these values change (like useEffect deps)
 *
 * Usage with a real API:
 *   const { data, loading, error } = useFetch(() => fetch('/api/students').then(r => r.json()), []);
 *
 * Usage with a service layer (see studentService.ts):
 *   const { data, loading, error } = useFetch(() => fetchStudentById(id), [id]);
 */
function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // deps are passed in by the caller — suppressing exhaustive-deps is intentional here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

export default useFetch;
