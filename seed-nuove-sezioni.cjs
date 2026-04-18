const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDe89pW8QGSLEZLI8DAFCieKIw63xZVmUc",
  authDomain: "siti-ristoranti.firebaseapp.com",
  projectId: "siti-ristoranti",
  storageBucket: "siti-ristoranti.firebasestorage.app",
  messagingSenderId: "1040982710454",
  appId: "1:1040982710454:web:258e9aab18e5e55d972e17"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ID = 'bollicine';

async function seed() {
  console.log('Popolando nuove sezioni Firebase...');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'home'), {
    titolo: "Un'esperienza di",
    sottotitolo: 'vino e cucina',
    testo: "Bollicine è un'esperienza multisensoriale dove la passione per il vino, la cucina raffinata e l'ospitalità si incontrano in perfetta armonia.",
    slogan: 'Battipaglia · Campania',
  });
  console.log('✓ Home');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'chi_siamo'), {
    titolo: 'Un paradiso per gli appassionati di vino',
    testo: "Bollicine è un locale unico nel suo genere a Battipaglia. Un ambiente accogliente e curato, con una cantina a vetrata che custodisce oltre 600 etichette da tutto il mondo: champagne, franciacorta, vini fermi, distillati e liquori.",
    proprietario_nome: 'Luigi Salimbene',
    proprietario_bio: "Luigi è il cuore e l'anima di Bollicine. Giovane, preparato e appassionato, è il sommelier che vi guiderà attraverso una selezione di oltre 600 etichette con competenza e calore. La sua cantina con i Grand Cru più ricercati è la sua creatura.",
    citazione: "Affidatevi a lui e non ve ne pentirete",
    proprietario_foto: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat1_num: '600+', stat1_label: 'Etichette in cantina',
    stat2_num: '4.9',  stat2_label: 'Rating su Google',
    stat3_num: '222+', stat3_label: 'Recensioni',
  });
  console.log('✓ Chi Siamo');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'degustazioni'), {
    titolo: 'Esperienze di degustazione',
    desc: 'Luigi vi guiderà in un percorso sensoriale unico tra le migliori etichette della nostra cantina.',
    items: [
      { name: "Bollicine d'Italia", sub: 'Franciacorta e spumanti metodo classico', desc: "Un viaggio tra le migliori bollicine italiane. Assaggerete 4 Franciacorta selezionati da Luigi, accompagnati da crostini e tagliere di salumi artigianali.", price: '€ 35', durata: '90 minuti', posti: 'Max 8 persone' },
      { name: 'Grand Tour dei Rossi', sub: 'Grandi rossi italiani in abbinamento', desc: "Un percorso tra i grandi rossi italiani: Barolo, Brunello, Taurasi. Abbinati a formaggi affinati e salumi di qualità.", price: '€ 45', durata: '2 ore', posti: 'Max 10 persone' },
      { name: 'Il Mondo in un Calice', sub: 'Selezione internazionale premium', desc: "Le migliori etichette internazionali: Bordeaux, Borgogna, Napa Valley. Un viaggio enologico senza confini guidato da Luigi.", price: '€ 55', durata: '2 ore', posti: 'Max 8 persone' },
    ]
  });
  console.log('✓ Degustazioni');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'galleria'), {
    items: [
      { url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'Gnocchi al tartufo', categoria: 'Cibo' },
      { url: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'La nostra cantina', categoria: 'Vini' },
      { url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'Atmosfera serale', categoria: 'Atmosfera' },
      { url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'Tagliere di salumi', categoria: 'Cibo' },
      { url: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'Selezione di vini', categoria: 'Vini' },
      { url: 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600', titolo: 'Crostini Cantábrico', categoria: 'Cibo' },
    ]
  });
  console.log('✓ Galleria');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'eventi'), {
    items: [
      { titolo: 'Serata Degustazione Champagne', data: 'Ogni ultimo venerdì del mese', desc: "Una serata dedicata alle grandi maison francesi. Luigi vi guiderà tra le bollicine più prestigiose del mondo.", prezzo: '€ 45 a persona', immagine: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { titolo: 'Cena Privata', data: 'Su prenotazione', desc: "Riservate la nostra sala per un'occasione speciale. Compleanno, anniversario, cena di lavoro — creiamo per voi un'esperienza unica.", prezzo: 'Su richiesta', immagine: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ]
  });
  console.log('✓ Eventi');

  console.log('\n✅ FATTO! Tutte le nuove sezioni popolate.');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
