import { Wine, MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';
import { navigate, type Page } from '../App';
import { useFirestore } from '../hooks/useFirestore';

interface Info {
  nome:string; telefono:string; indirizzo:string;
  facebook:string; instagram:string;
  orari:{ lunedi:string; martedi:string; mercoledi:string; giovedi:string; venerdi:string; sabato:string; domenica:string; };
}

const fallback: Info = {
  nome:'Bollicine', telefono:'334 131 2931',
  indirizzo:'Via Enrico De Nicola 11/13, 84091 Battipaglia (SA)',
  facebook:'https://www.facebook.com/bollicine.wine/', instagram:'',
  orari:{ lunedi:'18:00 - 00:00', martedi:'18:00 - 00:00', mercoledi:'Chiuso', giovedi:'18:00 - 00:00', venerdi:'18:00 - 00:00', sabato:'18:00 - 00:00', domenica:'19:00 - 00:00' }
};

const links: { label:string; page:Page }[] = [
  { label:'Chi Siamo', page:'chi-siamo' },
  { label:'Menu', page:'menu' },
  { label:'Carta dei Vini', page:'vini' },
  { label:'Degustazioni', page:'degustazioni' },
  { label:'Galleria', page:'galleria' },
  { label:'Recensioni', page:'recensioni' },
  { label:'Prenotazioni', page:'prenotazioni' },
  { label:'Eventi', page:'eventi' },
  { label:'Contatti', page:'contatti' },
];

function orarioCompatto(orari: Info['orari']): string {
  if (!orari) return '';
  const chiuso = Object.entries(orari).filter(([,v]) => v === 'Chiuso').map(([k]) =>
    ({lunedi:'Lun',martedi:'Mar',mercoledi:'Mer',giovedi:'Gio',venerdi:'Ven',sabato:'Sab',domenica:'Dom'})[k]
  );
  return chiuso.length > 0 ? `Chiuso ${chiuso.join(', ')}` : 'Aperto tutti i giorni';
}

export default function Footer() {
  const { data: info } = useFirestore<Info>('info', fallback);
  const nome = info.nome || fallback.nome;
  const tel = info.telefono || fallback.telefono;
  const ind = info.indirizzo || fallback.indirizzo;
  const fb = info.facebook || fallback.facebook;
  const ig = info.instagram || '';
  const orarioStr = orarioCompatto(info.orari || fallback.orari);

  return (
    <footer className="bg-grigio border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')} className="flex items-center gap-2 mb-6 group">
              <Wine size={20} className="text-oro" />
              <span className="font-serif text-2xl text-white tracking-widest">{nome.toUpperCase()}</span>
            </button>
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">
              Dove ogni calice racconta una storia.<br />
              Vini d'eccellenza e cucina ricercata<br />
              nel cuore di Battipaglia.
            </p>
            <div className="flex gap-3">
              {fb && (
                <a href={fb} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-oro/50 hover:bg-oro/10 flex items-center justify-center transition-all duration-300 group">
                  <Facebook size={15} className="text-white/40 group-hover:text-oro transition-colors" />
                </a>
              )}
              {ig && (
                <a href={ig} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 hover:border-oro/50 hover:bg-oro/10 flex items-center justify-center transition-all duration-300 group">
                  <Instagram size={15} className="text-white/40 group-hover:text-oro transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Navigazione</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map(l => (
                <button key={l.page} onClick={() => navigate(l.page)}
                  className="text-left font-sans text-sm text-white/50 hover:text-oro transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contatti da Firebase */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Contatti</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-oro mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/50 leading-relaxed">{ind}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-oro shrink-0" />
                <a href={`tel:+39${tel.replace(/\s/g,'')}`}
                  className="font-sans text-sm text-white/50 hover:text-oro transition-colors">{tel}</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-oro shrink-0" />
                <span className="font-sans text-sm text-white/50">{orarioStr}</span>
              </div>
              {fb && (
                <div className="flex items-center gap-3">
                  <Facebook size={16} className="text-oro shrink-0" />
                  <a href={fb} target="_blank" rel="noopener noreferrer"
                    className="font-sans text-sm text-white/50 hover:text-oro transition-colors truncate">
                    {fb.replace('https://www.facebook.com/','').replace('https://facebook.com/','')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">© {new Date().getFullYear()} {nome} — Tutti i diritti riservati</p>
          <p className="font-sans text-xs text-white/30">{ind}</p>
        </div>
      </div>
    </footer>
  );
}