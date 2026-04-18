import { Wine, MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';
import { navigate, type Page } from '../App';
import { useFirestore } from '../hooks/useFirestore';

interface Info { telefono:string; indirizzo:string; facebook:string; instagram:string; orari:any; }
const fallback: Info = {
  telefono:'334 131 2931',
  indirizzo:'Via Enrico De Nicola 11/13, 84091 Battipaglia (SA)',
  facebook:'https://www.facebook.com/bollicine.wine/',
  instagram:'',
  orari:{}
};

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
  const { data: c } = useFirestore<Info>('info', fallback);

  return (
    <footer className="bg-grigio border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <button onClick={() => navigate('home')} className="flex items-center gap-2 mb-6 group">
              <Wine size={20} className="text-oro" />
              <span className="font-serif text-2xl text-white tracking-widest">BOLLICINE</span>
            </button>
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">
              Dove ogni calice racconta una storia.<br />
              Vini d'eccellenza e cucina ricercata<br />
              nel cuore di Battipaglia.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {(c.facebook || fallback.facebook) && (
                <a href={c.facebook || fallback.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-oro/50 hover:bg-oro/10 flex items-center justify-center transition-all duration-300 group">
                  <Facebook size={15} className="text-white/40 group-hover:text-oro transition-colors" />
                </a>
              )}
              {c.instagram && (
                <a href={c.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-oro/50 hover:bg-oro/10 flex items-center justify-center transition-all duration-300 group">
                  <Instagram size={15} className="text-white/40 group-hover:text-oro transition-colors" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Navigazione</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <button key={l.page} onClick={() => navigate(l.page)}
                  className="text-left font-sans text-sm text-white/50 hover:text-oro transition-colors">
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
                  {c.indirizzo || fallback.indirizzo}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-oro shrink-0" />
                <a href={`tel:+39${(c.telefono||fallback.telefono).replace(/\s/g,'')}`}
                  className="font-sans text-sm text-white/50 hover:text-oro transition-colors">
                  {c.telefono || fallback.telefono}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-oro shrink-0" />
                <span className="font-sans text-sm text-white/50">Lun–Sab 18:00–00:00 · Dom 19:00–00:00 · Chiuso mercoledì</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar con social */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-white/30">
              © {new Date().getFullYear()} Bollicine — Tutti i diritti riservati
            </p>
            <div className="flex items-center gap-4">
              {(c.facebook || fallback.facebook) && (
                <a href={c.facebook || fallback.facebook} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-xs text-white/30 hover:text-oro transition-colors">
                  Facebook
                </a>
              )}
              {c.instagram && (
                <a href={c.instagram} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-xs text-white/30 hover:text-oro transition-colors">
                  Instagram
                </a>
              )}
              <p className="font-sans text-xs text-white/30">
                Via Enrico De Nicola 11/13 · Battipaglia (SA)
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}