const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const app = initializeApp({
  apiKey: "AIzaSyDe89pW8QGSLEZLI8DAFCieKIw63xZVmUc",
  authDomain: "siti-ristoranti.firebaseapp.com",
  projectId: "siti-ristoranti",
  storageBucket: "siti-ristoranti.firebasestorage.app",
  messagingSenderId: "1040982710454",
  appId: "1:1040982710454:web:258e9aab18e5e55d972e17"
});

const db = getFirestore(app);

async function seed() {
  await setDoc(doc(db, 'ristoranti', 'bollicine', 'dati', 'home'), {
    titolo: "Un'esperienza di",
    sottotitolo: 'vino e cucina',
    testo: "Bollicine nasce dalla passione di Luigi, sommelier esperto, che ha trasformato un sogno in un luogo dove ogni calice racconta una storia. Nel cuore di Battipaglia troverete un'oasi di eleganza e sapori autentici.",
    slogan: 'Battipaglia · Campania',
    piatto1_nome: 'Gnocchi al Tartufo Nero',
    piatto1_desc: "Un primo piatto d'eccellenza con tartufo pregiato",
    piatto1_foto: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    piatto2_nome: 'Tagliere di Salumi Selezionati',
    piatto2_desc: 'Salumi artigianali e formaggi affinati',
    piatto2_foto: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    piatto3_nome: 'Crostini Beppino Occelli',
    piatto3_desc: 'Con burro premium e alici del Cantábrico',
    piatto3_foto: 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600',
  });
  console.log('✅ Home aggiornata con i 3 piatti in evidenza!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
