import { useEffect } from 'react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { Users, Clock, Star } from 'lucide-react';

const percorsi = [
  {
    name: 'Bollicine d\'Italia',
    sub: 'Franciacorta e spumanti metodo classico',
    price: '€ 35',
    perPerson: 'a persona',
    desc: 'Un viaggio tra le migliori bollicine italiane. Assaggerete 4 Franciacorta selezionati da Luigi, accompagnati da crostini e tagliere di salumi artigianali. Un\'introduzione perfetta al mondo delle bollicine italiane.',
    incluso: ['4 calici di Franciacorta', 'Crostini con burro Beppino Occelli', 'Tagliere di salumi', 'Guida alla degustazione'],
    img: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800',
    durata: '90 minuti',
    posti: 'Max 8 persone',
  },
  {
    name: 'Grand Tour dei Rossi',
    sub: 'Grandi rossi italiani in abbinamento',
    price: '€ 45',
    perPerson: 'a persona',
    desc: 'Un percorso emozionante attraverso i grandi rossi italiani: dal Barolo al Brunello, dal Taurasi all\'Amarone. Ogni vino è abbinato a un piccolo piatto che ne esalta le caratteristiche organolettiche.',
    incluso: ['5 calici di grandi rossi italiani', 'Abbinamenti gastronomici dedicati', 'Descrizione schede tecniche', 'Consulenza personalizzata'],
    img: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    durata: '2 ore',
    posti: 'Max 6 persone',
  },
  {
    name: 'Il Mondo in un Calice',
    sub: 'Selezione internazionale premium',
    price: '€ 55',
    perPerson: 'a persona',
    desc: 'L\'esperienza più esclusiva di Bollicine. Un giro del mondo attraverso i vini più iconici e rari della nostra cantina: Champagne, Borgogna, Bordeaux, Napa Valley e grandi italiani. Un\'esperienza che rimarrà nella memoria.',
    incluso: ['6 calici selezionati da Luigi', 'Etichette premium e rare', 'Menu di abbinamento a 3 portate', 'Accesso alla stanza dei Grand Cru'],
    img: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800',
    durata: '2,5 ore',
    posti: 'Max 4 persone',
  },
];

const abbinamenti = [
  { vino: 'Champagne Brut', cibo: 'Crostini con alici del Cantábrico' },
  { vino: 'Fiano di Avellino', cibo: 'Tagliere di formaggi freschi' },
  { vino: 'Barolo', cibo: 'Filetto di manzo al vino rosso' },
  { vino: 'Franciacorta Saten', cibo: 'Risotto ai gamberi' },
  { vino: 'Amarone', cibo: 'Selezione di formaggi stagionati' },
  { vino: 'Brunello', cibo: 'Tagliolini al ragù di cinghiale' },
];

export default function Degustazioni() {
  useReveal();
  useEffect(() => { document.title = 'Degustazioni — Bollicine Battipaglia'; }, []);

  return (
    <>
      <PageHero
        title="Degustazioni"
        subtitle="Esperienze guidate"
        image="https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[50vh]"
      />

      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Con Luigi come guida</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Un viaggio sensoriale guidato</h2>
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-2xl mx-auto">
              Le nostre degustazioni sono molto più di una semplice assaggio: sono veri e propri viaggi sensoriali guidati da Luigi, che trasforma ogni calice in un racconto, ogni sorso in un'emozione. Perfette per appassionati, principianti e per chi vuole vivere una serata davvero speciale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {percorsi.map((p, i) => (
              <div
                key={p.name}
                className={`border border-white/5 hover:border-oro/30 transition-all duration-300 group reveal reveal-delay-${i + 1}`}
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl text-oro">{p.price}</span>
                    <span className="font-sans text-xs text-white/30">{p.perPerson}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-oro transition-colors">{p.name}</h3>
                  <p className="font-sans text-xs text-oro/70 mb-4 italic">{p.sub}</p>
                  <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {p.incluso.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-sans text-xs text-white/40">
                        <Star size={10} className="text-oro shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-oro" />
                      <span className="font-sans text-xs text-white/30">{p.durata}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-oro" />
                      <span className="font-sans text-xs text-white/30">{p.posti}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-24">
            <div className="text-center mb-12 reveal">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Armonie perfette</p>
              <h2 className="font-serif text-3xl text-white">Abbinamenti consigliati</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {abbinamenti.map((a, i) => (
                <div
                  key={a.vino}
                  className={`p-4 border border-white/5 flex items-center justify-between reveal reveal-delay-${(i % 3) + 1}`}
                >
                  <div>
                    <p className="font-serif text-base text-oro">{a.vino}</p>
                    <p className="font-sans text-xs text-white/40 mt-0.5">con {a.cibo}</p>
                  </div>
                  <div className="w-8 h-px bg-oro/30" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center reveal">
            <p className="font-serif text-2xl text-oro italic mb-4">"Luigi vi guiderà tra le etichette più rare e ricercate"</p>
            <p className="font-sans text-sm text-white/50 mb-8">
              Prenotazione obbligatoria. Disponibile dal lunedì al sabato, dalle 19:00.
            </p>
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">
              Prenota la tua degustazione
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
