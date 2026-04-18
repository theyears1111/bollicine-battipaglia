import { useEffect } from 'react';
import { Calendar, Users } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface Evento { titolo:string; data:string; desc:string; prezzo:string; immagine:string; }
interface EventiData { items: Evento[]; }

const fallback: EventiData = { items: [
  { titolo:'Serata Degustazione Champagne', data:'Ogni ultimo venerdì del mese', desc:"Una serata dedicata alle grandi maison francesi. Luigi vi guiderà tra le bollicine più prestigiose del mondo, con abbinamenti gastronomici studiati ad hoc.", prezzo:'€ 45 a persona', immagine:'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { titolo:'Cena Privata', data:'Su prenotazione', desc:"Riservate la nostra sala per un'occasione speciale. Compleanno, anniversario, cena di lavoro — creiamo per voi un'esperienza unica e personalizzata.", prezzo:'Su richiesta', immagine:'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800' },
]};

export default function Eventi() {
  useReveal();
  const { data } = useFirestore<EventiData>('eventi', fallback);
  useEffect(() => { document.title = 'Eventi — Bollicine Battipaglia'; }, []);
  const items = data.items?.length ? data.items : fallback.items;

  return (
    <>
      <PageHero title="Eventi" subtitle="Serate speciali"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[40vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Serate speciali</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Vivi un'esperienza unica</h2>
            <div className="w-12 h-px bg-oro mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {items.map((ev, i) => (
              <div key={i} className={`border border-white/5 hover:border-oro/20 transition-all duration-300 overflow-hidden reveal reveal-delay-${i+1}`}>
                {ev.immagine && <img src={ev.immagine} alt={ev.titolo} className="w-full object-cover" style={{height:'220px'}} />}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={14} className="text-oro" />
                    <span className="font-sans text-xs text-oro tracking-widest uppercase">{ev.data}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-4">{ev.titolo}</h3>
                  <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">{ev.desc}</p>
                  {ev.prezzo && (
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl text-oro">{ev.prezzo}</span>
                      <button onClick={() => navigate('prenotazioni')} className="btn-secondary" style={{fontSize:'11px', padding:'8px 16px'}}>Prenota</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Contattaci per un evento privato</button>
          </div>
        </div>
      </section>
    </>
  );
}