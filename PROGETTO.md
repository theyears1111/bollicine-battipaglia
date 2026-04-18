# Siti Ristoranti — Manuale Tecnico

## Business
Vendo siti web professionali a ristoranti (~500€). Template riutilizzabile, cliente autonomo tramite pannello admin.

## Stack Tecnico
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Database:** Firebase Firestore (un solo progetto per tutti i clienti)
- **Auth admin:** Firebase Authentication (email + password)
- **Hosting:** Vercel (gratis, build illimitati)
- **Repository:** GitHub (ogni cliente = branch o repo separato)

## Firebase
- **Progetto:** `siti-ristoranti`
- **Struttura dati:** `ristoranti/{RISTORANTE_ID}/dati/{sezione}`
- **Sezioni:** info, home, chi_siamo, menu_antipasti, menu_primi, menu_secondi, vini, degustazioni, galleria, eventi, recensioni
- **Variabile env:** `VITE_RISTORANTE_ID=bollicine` (cambia per ogni cliente)

## Aggiungere un nuovo cliente (10 minuti)
1. Duplica repo GitHub `bollicine-battipaglia` → rinomina con nome cliente
2. Cambia `VITE_RISTORANTE_ID` nel `.env` con il nome del nuovo ristorante (es. `pizzeria-mario`)
3. Crea progetto Vercel → importa repo → aggiungi env var `VITE_RISTORANTE_ID`
4. Esegui script `seed-[cliente].cjs` per popolare Firebase con i dati iniziali
5. Crea utente Firebase Authentication con email+password del cliente
6. Consegna: URL sito + URL admin (`/admin`) + email + password

## File Importanti
```
src/
  admin/
    Admin.tsx          ← login page
    AdminPanel.tsx     ← pannello completo con tutte le sezioni
  lib/
    firebase.ts        ← config Firebase
    ristorante.ts      ← RISTORANTE_ID + funzioni getDati/setDati
  hooks/
    useFirestore.ts    ← hook realtime con onSnapshot
    useReveal.ts       ← animazioni scroll
  pages/               ← tutte le pagine del sito
  components/          ← Navbar, Footer, PageHero, MobileBookingBtn
```

## Design System
- **Colori:** nero `#0B0B0B`, oro `#C8A96A`, grigio `#1A1A1A`
- **Font:** Cormorant Garamond (serif, titoli) + Inter (sans, testo)
- **Classi Tailwind custom:** `btn-primary`, `btn-secondary`, `btn-ghost`, `text-oro`, `bg-nero`, `bg-grigio`
- **Animazioni:** classe `reveal` + `reveal-delay-1/2/3/4` per fade-in allo scroll

## Pannello Admin
- URL: `[sito]/#admin`
- Login: email + password Firebase
- Sezioni modificabili: Info & Orari, Home, Chi Siamo, Antipasti, Primi, Secondi, Carta Vini, Degustazioni, Galleria (max 10 foto via URL), Eventi, Recensioni
- Salvataggio: real-time su Firestore → sito aggiornato istantaneamente

## Regole Firestore
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ristoranti/{ristoranteId}/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Convenzioni Codice
- Ogni pagina usa `useFirestore<T>('sezione', fallback)` per leggere da Firebase
- I dati fallback sono sempre definiti nella pagina stessa
- L'admin usa `getDati/setDati` da `ristorante.ts`
- Nessuna dipendenza esterna oltre Firebase + Lucide icons

## Cliente Bollicine
- **Sito:** bollicine-battipaglia.vercel.app
- **Admin:** bollicine-battipaglia.vercel.app/#admin
- **Firebase ID:** bollicine
- **Telefono:** 334 131 2931
- **Indirizzo:** Via Enrico De Nicola 11/13, Battipaglia (SA)

## Prossimi miglioramenti pianificati
- Ken Burns hero + cursore dorato (in corso)
- Animazioni Framer Motion (valutare)
- Sistema di prenotazione avanzato
