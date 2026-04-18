import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { RISTORANTE_ID } from '../lib/ristorante';

export function useFirestore<T>(sezione: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, 'ristoranti', RISTORANTE_ID, 'dati', sezione);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setData(snap.data() as T);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [sezione]);

  return { data, loading };
}