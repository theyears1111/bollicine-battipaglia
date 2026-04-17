import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const RISTORANTE_ID = import.meta.env.VITE_RISTORANTE_ID || 'bollicine';

export async function getDati(sezione: string) {
  const ref = doc(db, 'ristoranti', RISTORANTE_ID, 'dati', sezione);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function setDati(sezione: string, dati: object) {
  const ref = doc(db, 'ristoranti', RISTORANTE_ID, 'dati', sezione);
  await setDoc(ref, dati, { merge: true });
}
