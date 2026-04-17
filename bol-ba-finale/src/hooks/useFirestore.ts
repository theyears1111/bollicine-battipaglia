import { useState, useEffect } from 'react';
import { getDati } from '../lib/ristorante';

export function useFirestore<T>(sezione: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDati(sezione)
      .then(d => { if (d) setData(d as T); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sezione]);

  return { data, loading };
}
