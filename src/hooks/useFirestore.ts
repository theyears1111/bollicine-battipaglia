import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { RISTORANTE_ID } from '../lib/ristorante';

export function useFirestore<T>(sezione: string, fallback: T): { data: T; loading: boolean } {
  // Prova a leggere dalla cache locale per evitare il flash
  const cacheKey = `cache_${RISTORANTE_ID}_${sezione}`;
  const cached = (() => {
    try {
      const raw = localStorage.getItem(cacheKey);
      return raw ? JSON.parse(raw) as T : null;
    } catch { return null; }
  })();

  const [data, setData] = useState<T>(cached || fallback);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    const ref = doc(db, 'ristoranti', RISTORANTE_ID, 'dati', sezione);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const d = snap.data() as T;
        setData(d);
        // Salva in cache locale
        try { localStorage.setItem(cacheKey, JSON.stringify(d)); } catch {}
      }
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [sezione]);

  return { data, loading };
}