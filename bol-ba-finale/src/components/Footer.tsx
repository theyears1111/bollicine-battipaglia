import { Wine, MapPin, Phone, Clock, Facebook } from 'lucide-react';
import { navigate, type Page } from '../App';

const links: { label: string; page: Page }[] = [
  { label: 'Chi Siamo', page: 'chi-siamo' },
  { label: 'Menu', page: 'menu' },
  { label: 'Carta dei Vini', page: 'vini' },
  { label: 'Degustazioni', page: 'degustazioni' },
  { label: 'Galleria', page: 'galleria' },
  { label: 'Recensioni', page: 'recensioni' },
  { label: 'Prenotazioni', page: 'prenotazioni' },
  { label: 'Eventi', page: 'eventi' },
  { label: 'Contatti', page: 'contatti' },
];

export default function Footer() {
  return (
    <footer className="bg-grigio border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <button onClick={() => navigate('home')} className="flex items-center gap-2 mb-6 group">
              <Wine size={20} className="text-oro" />
              <span className="font-serif text-2xl text-white tracking-widest">BOLLICINE</span>
            </button>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Dove ogni calice racconta una storia.<br />
              Vini d'eccellenza e cucina ricercata<br />
              nel cuore di Battipaglia.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Navigazione</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <button
                  key={l.page}
                  onClick={() => navigate(l.page)}
                  className="text-left font-sans text-sm text-white/50 hover:text-oro transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Contatti</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-oro mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/50 leading-relaxed">
                  Via Enrico De Nicola 11/13<br />
                  84091 Battipaglia (SA)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-oro shrink-0" />
                <a href="tel:+393341312931" className="font-sans text-sm text-white/50 hover:text-oro transition-colors">
                  334 131 2931
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-oro shrink-0" />
                <span className="font-sans text-sm text-white/50">Aperto tutti i giorni dalle 19:00 · Chiuso il mercoledì</span>
              </div>
              <div className="flex items-center gap-3">
                <Facebook size={16} className="text-oro shrink-0" />
                <a
                  href="https://facebook.com/bollicine.wine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white/50 hover:text-oro transition-colors"
                >
                  facebook.com/bollicine.wine
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Bollicine — Tutti i diritti riservati
          </p>
          <p className="font-sans text-xs text-white/30">
            Via Enrico De Nicola 11/13 · Battipaglia (SA) · P.IVA xxxxxxxx
          </p>
        </div>
      </div>
    </footer>
  );
}
