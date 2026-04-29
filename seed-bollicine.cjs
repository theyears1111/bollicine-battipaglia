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
  console.log('Inserimento dati Bollicine in Firebase...');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'info'), {
    nome: 'Bollicine',
    telefono: '334 131 2931',
    email: 'info@bollicinewinebar.it',
    indirizzo: 'Via Enrico De Nicola 11/13, 84091 Battipaglia (SA)',
    maps_url: 'https://maps.google.com/?q=Bollicine+Via+Enrico+De+Nicola+11+Battipaglia',
    facebook: 'https://www.facebook.com/bollicine.wine/',
    instagram: '',
    orari: {
      lunedi: '18:00 - 00:00',
      martedi: '18:00 - 00:00',
      mercoledi: 'Chiuso',
      giovedi: '18:00 - 00:00',
      venerdi: '18:00 - 00:00',
      sabato: '18:00 - 00:00',
      domenica: '19:00 - 00:00'
    }
  });
  console.log('✓ Info & Orari');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'menu_antipasti'), {
    items: [
      { name: 'Cruditè', desc: 'Gambero rosso, scampo, tartare di tonno rosso, tartare di salmone e tartare di gambero rosa', price: '€ 30,00' },
      { name: 'Foie Gras', desc: 'Foie gras di oca da pezzo intero con crostini', price: '€ 15,00' },
      { name: 'Tartare al Tartufo', desc: 'Tartare di scottona certificata da 100g con scaglie di tartufo nero', price: '€ 12,00' },
      { name: 'Burrata al Tartufo', desc: 'Burrata pugliese 200g al tartufo', price: '€ 12,00' },
      { name: 'Perlage', desc: "Tagliere di salumi, formaggi e sott'oli di qualità", price: '€ 27,00' },
      { name: 'Remuage', desc: 'Trio di formaggi di qualità con confetture', price: '€ 12,00' },
      { name: 'Bruschette Cantábrico', desc: 'Bruschette con burro Beppino Occelli e alici del Cantábrico', price: '€ 12,00' },
      { name: "Salumi d'Oca", desc: "Tagliere di salumi d'oca Jolanda de Colò", price: '€ 20,00' },
      { name: 'Patanegra', desc: 'Tagliere di Bellotas 36 mesi a coltello', price: '€ 20,00' }
    ]
  });
  console.log('✓ Antipasti');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'menu_primi'), {
    items: [
      { name: 'Gnocchi Bollicine', desc: 'La ricetta della casa — il piatto signature del locale', price: 'da € 14,00' },
      { name: 'Gnocchi al Gorgonzola', desc: 'Gnocchi di Camaldoli con Gorgonzola Sovrano, pere kaiser e pinoli', price: '€ 14,00' },
      { name: 'Riso ai Funghi con Polvere di Liquirizia', desc: 'Risotto con funghi e polvere di liquirizia calabrese', price: '€ 16,00' },
      { name: 'Tortino di Polenta', desc: 'Tortino di polenta — variante del giorno', price: 'da € 12,00' },
      { name: 'Uovo in Camicia', desc: 'Uovo in camicia su crema di patate, tartufo e guanciale croccante', price: '€ 14,00' }
    ]
  });
  console.log('✓ Primi');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'menu_secondi'), {
    items: [
      { name: 'Selezione di Formaggi Affinati', desc: 'Formaggi selezionati da tutto il mondo con confetture e miele artigianali', price: '€ 14,00' },
      { name: 'Pesce Crudo del Giorno', desc: 'Selezione di crudi di mare pregiati — variabile in base alla disponibilità', price: 'su richiesta' },
      { name: 'Caviale', desc: 'Selezione di caviali pregiati serviti con accompagnamento tradizionale', price: 'su richiesta' }
    ]
  });
  console.log('✓ Secondi');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'vini'), {
    champagne: [
      { name: 'Krug Grande Cuvée', zona: 'Champagne, FR', desc: 'Complesso e maestoso, profumi di frutta matura e pane tostato.', calice: '€ 28', bottiglia: '€ 280' },
      { name: 'Bollinger Special Cuvée', zona: 'Aÿ, Champagne', desc: 'Ricco e strutturato, con note di mela rossa e brioche.', calice: '€ 18', bottiglia: '€ 120' },
      { name: 'Dom Pérignon', zona: 'Épernay, Champagne', desc: 'Leggendario cuvée de prestige. Complessità infinita.', calice: '€ 45', bottiglia: '€ 320' }
    ],
    franciacorta: [
      { name: 'Bellavista Alma Cuvée Brut', zona: 'Franciacorta, BS', desc: 'Equilibrato ed elegante, note floreali e bollicine cremose.', calice: '€ 14', bottiglia: '€ 55' },
      { name: "Ca' del Bosco Cuvée Prestige", zona: 'Erbusco, BS', desc: 'Fruttato e vivace, sentori di pesca bianca.', calice: '€ 15', bottiglia: '€ 60' }
    ],
    bianchi: [
      { name: 'Fiano di Avellino DOCG', zona: 'Campania', desc: 'Eccellenza campana, note di mandorla e mineralità vulcanica.', calice: '€ 12', bottiglia: '€ 42' },
      { name: 'Jermann Vintage Tunina', zona: 'Friuli Venezia Giulia', desc: 'Grande complessità aromatica, miele e frutta esotica.', calice: '€ 16', bottiglia: '€ 70' }
    ],
    rossi: [
      { name: "Barolo Serralunga d'Alba", zona: 'Piemonte', desc: 'Il re dei vini italiani. Rose appassite e catrame.', calice: '€ 20', bottiglia: '€ 90' },
      { name: 'Taurasi DOCG — Mastroberardino', zona: 'Campania', desc: 'Il Barolo del Sud. Ciliegia nera e spezie.', calice: '€ 15', bottiglia: '€ 58' }
    ]
  });
  console.log('✓ Vini');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'recensioni'), {
    items: [
      { nome: 'Martino Spera', testo: 'Giovani, preparati, competenti e gentili. Un bel posto per aprire belle bottiglie e stuzzicare con qualcosa di ricercato. Bella selezione di vini e champagne.', stelle: 5, data: 'Marzo 2025' },
      { nome: 'Valentina Di Fraia', testo: "Un'esperienza gastronomica unica e indimenticabile. Luigi e Bollicine: eccellenza assoluta a Battipaglia.", stelle: 5, data: 'Settembre 2024' },
      { nome: 'Graziella Sansone', testo: 'Un paradiso per gli appassionati di vino. Grandi etichette da tutto il mondo e una straordinaria stanza dei vini con i Grand Cru.', stelle: 5, data: 'Gennaio 2025' },
      { nome: 'Biaso Blando', testo: 'Serata fantastica, piatti unici dal sapore indescrivibile. Tartar di fassona con gelato al gorgonzola superlativi!', stelle: 5, data: 'Aprile 2024' },
      { nome: 'Fiorella Roviello', testo: 'Cena romantica super consigliata! Cantina di vini a vetrata molto suggestiva. Il riso ai funghi con polvere di liquirizia superlativo!', stelle: 5, data: 'Febbraio 2024' },
      { nome: 'Michele Guarracino', testo: 'La Mecca delle Bollicine con centinaia di etichette provenienti da tutto il mondo. Materia prima di primissima qualità.', stelle: 5, data: 'Maggio 2024' }
    ]
  });
  console.log('✓ Recensioni');

  await setDoc(doc(db, 'ristoranti', ID, 'dati', 'eventi'), {
    items: []
  });
  console.log('✓ Eventi');

  console.log('\n✅ FATTO! Tutti i dati di Bollicine sono in Firebase.');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
