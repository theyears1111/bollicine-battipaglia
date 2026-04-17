import { useEffect } from 'react';
import { Star, Wine, Utensils, Sparkles, ChevronDown } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';

const HERO_IMG = 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920';
const FOOD_1 = 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600';
const FOOD_2 = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600';
const FOOD_3 = 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600';
const WINE_BG = 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920';

const pillars = [
  {
    icon: <Wine size={28} className="text-oro" />,
    title: 'Vini d\'eccellenza',
    desc: 'Una selezione curata dal sommelier Luigi: champagne, franciacorta, grandi etichette italiane e internazionali.',
  },
  {
    icon: <Utensils size={28} className="text-oro" />,
    title: 'Cucina ricercata',
    desc: 'Ingredienti di prima qualità, prodotti selezionati, ricette che esaltano la tradizione con eleganza contemporanea.',
  },
  {
    icon: <Sparkles size={28} className="text-oro" />,
    title: 'Un\'esperienza unica',
    desc: 'Atmosfera accogliente ed elegante, perfetta per serate speciali, degustazioni guidate e momenti indimenticabili.',
  },
];

const highlights = [
  { img: FOOD_1, name: 'Gnocchi al Tartufo Nero', desc: 'Un primo piatto d\'eccellenza con tartufo pregiato' },
  { img: FOOD_2, name: 'Tagliere di Salumi Selezionati', desc: 'Salumi artigianali e formaggi affinati' },
  { img: FOOD_3, name: 'Crostini Beppino Occelli', desc: 'Con burro premium e alici del Cantábrico' },
];

const reviews = [
  { name: 'Martino S.', text: 'Giovani, preparati, competenti e gentili. Un bel posto per aprire belle bottiglie e stuzzicare con qualcosa di ricercato. Bella selezione di vini e champagne.', stars: 5 },
  { name: 'Valentina D.', text: 'Un\'esperienza gastronomica unica e indimenticabile. Luigi e il suo team offrono eccellenza assoluta a Battipaglia.', stars: 5 },
  { name: 'Graziella S.', text: 'Un paradiso per gli appassionati di vino. Grandi etichette da tutto il mondo e una straordinaria stanza dei vini con i Grand Cru.', stars: 5 },
];

export default function Home() {
  useReveal();

  useEffect(() => {
    document.title = 'Bollicine — Ristorante e Wine Bar a Battipaglia';
  }, []);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Ristorante Bollicine — atmosfera elegante"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: 'kenBurns 20s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-nero/65" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-oro mb-6 reveal">
            Battipaglia · Campania
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 reveal reveal-delay-1">
            Un'esperienza di<br />
            <em className="text-oro italic">vino e cucina</em>
          </h1>
          <p className="font-sans text-base text-white/60 tracking-widest mb-12 reveal reveal-delay-2">
            Benvenuti a Bollicine — Battipaglia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">
              Prenota ora
            </button>
            <button onClick={() => navigate('menu')} className="btn-ghost">
              Scopri il menu
            </button>
          </div>
        </div>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-oro/50 hover:text-oro transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translate(0, 0); }
          to { transform: scale(1.1) translate(-1%, -1%); }
        }
      `}</style>

      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Benvenuti</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 reveal reveal-delay-1">
              Dove il vino<br />incontra la passione
            </h2>
            <div className="gold-divider reveal reveal-delay-1" />
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-4 reveal reveal-delay-2">
              Bollicine nasce dalla passione di Luigi, sommelier esperto, che ha trasformato un sogno in un luogo dove ogni calice racconta una storia. Nel cuore di Battipaglia, a pochi passi dalla stazione, troverete un'oasi di eleganza e sapori autentici.
            </p>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-8 reveal reveal-delay-3">
              La nostra cantina ospita etichette rare da tutto il mondo, con una straordinaria selezione di Champagne, Franciacorta e Grand Cru che renderanno ogni visita un'esperienza unica.
            </p>
            <button onClick={() => navigate('chi-siamo')} className="btn-secondary reveal reveal-delay-4">
              La nostra storia
            </button>
          </div>
          <div className="relative reveal reveal-delay-2">
            <img
              src={WINE_BG}
              alt="Selezione vini Bollicine"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-oro p-6 hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#0B0B0B" className="text-nero" />)}
              </div>
              <p className="font-serif text-nero text-3xl font-medium">4.9</p>
              <p className="font-sans text-nero/70 text-xs tracking-widest">222 recensioni</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-grigio">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Perché sceglierci</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white reveal reveal-delay-1">I nostri punti di forza</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`p-8 border border-white/5 hover:border-oro/30 transition-all duration-300 group reveal reveal-delay-${i + 1}`}
              >
                <div className="mb-6">{p.icon}</div>
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-oro transition-colors">{p.title}</h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Dal nostro menu</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white reveal reveal-delay-1">Piatti in evidenza</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, i) => (
              <div
                key={item.name}
                className={`group cursor-pointer reveal reveal-delay-${i + 1}`}
                onClick={() => navigate('menu')}
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-oro transition-colors">{item.name}</h3>
                <p className="font-sans text-xs text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('menu')} className="btn-secondary">Vedi menu completo</button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-grigio">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Cosa dicono di noi</p>
            <div className="flex items-end justify-center gap-3 mb-2 reveal reveal-delay-1">
              <span className="font-serif text-7xl md:text-8xl text-oro">4.9</span>
              <div className="pb-4">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C8A96A" className="text-oro" />)}
                </div>
                <p className="font-sans text-xs text-white/40">222 recensioni Google</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {reviews.map((r, i) => (
              <div key={r.name} className={`p-6 border border-white/5 reveal reveal-delay-${i + 1}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, j) => <Star key={j} size={14} fill="#C8A96A" className="text-oro" />)}
                </div>
                <p className="font-sans text-sm text-white/60 leading-relaxed mb-6 italic">"{r.text}"</p>
                <p className="font-sans text-xs text-oro tracking-widest">{r.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('recensioni')} className="btn-secondary">Leggi tutte le recensioni</button>
          </div>
        </div>
      </section>

      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${WINE_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-nero/80" />
        <div className="relative z-10 text-center px-6 reveal">
          <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Prenota la tua serata</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Riserva il tuo tavolo</h2>
          <div className="w-12 h-px bg-oro mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota ora</button>
            <a href="tel:+393341312931" className="btn-ghost">334 131 2931</a>
          </div>
        </div>
      </section>
    </>
  );
}
