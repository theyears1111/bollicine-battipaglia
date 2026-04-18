import { useEffect } from 'react';
import { Star, Wine, Utensils, Sparkles, ChevronDown } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import { useFirestore } from '../hooks/useFirestore';

const HERO_IMG = 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920';
const FOOD_1 = 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600';
const FOOD_2 = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600';
const FOOD_3 = 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600';
const WINE_BG = 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface HomeData { titolo:string; sottotitolo:string; testo:string; slogan:string; }
const fallbackHome: HomeData = {
  titolo:"Un'esperienza di",
  sottotitolo:'vino e cucina',
  testo:"Bollicine è un'esperienza multisensoriale dove la passione per il vino, la cucina raffinata e l'ospitalità si incontrano in perfetta armonia.",
  slogan:'Benvenuti a Bollicine — Battipaglia',
};

const reviews = [
  { name:'Martino S.', text:'Giovani, preparati, competenti e gentili. Bella selezione di vini e champagne.', stars:5 },
  { name:'Valentina D.', text:"Un'esperienza gastronomica unica e indimenticabile. Eccellenza assoluta.", stars:5 },
  { name:'Graziella S.', text:'Un paradiso per gli appassionati di vino. Grandi etichette da tutto il mondo.', stars:5 },
];

export default function Home() {
  useReveal();
  const { data: hd } = useFirestore<HomeData>('home', fallbackHome);
  useEffect(() => { document.title = 'Bollicine — Ristorante e Wine Bar a Battipaglia'; }, []);

  return (
    <>
      {/* HERO con Ken Burns */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO_IMG} alt="Ristorante Bollicine"
          className="absolute inset-0 w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-nero/65" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-oro mb-6 reveal">
            {hd.slogan || fallbackHome.slogan}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 reveal reveal-delay-1">
            {hd.titolo || fallbackHome.titolo}<br />
            <em className="text-oro italic">{hd.sottotitolo || fallbackHome.sottotitolo}</em>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-2">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota ora</button>
            <button onClick={() => navigate('menu')} className="btn-ghost">Scopri il menu</button>
          </div>
        </div>
        <button onClick={() => window.scrollTo({top:window.innerHeight,behavior:'smooth'})}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-oro transition-colors animate-bounce">
          <ChevronDown size={28} />
        </button>
      </section>

      {/* FILOSOFIA */}
      <section className="py-32 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">La nostra essenza</p>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 reveal reveal-delay-1">Più di un ristorante</h2>
            <div className="w-24 h-px bg-oro mx-auto mb-8" />
            <p className="font-sans text-lg text-white/50 max-w-2xl mx-auto leading-relaxed reveal reveal-delay-2">
              {hd.testo || fallbackHome.testo}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {[
              { icon:<Wine size={32} className="text-oro"/>, title:"Vini d'eccellenza", desc:"Una selezione curata dal sommelier Luigi: champagne, franciacorta, grandi etichette italiane e internazionali." },
              { icon:<Utensils size={32} className="text-oro"/>, title:"Cucina ricercata", desc:"Ingredienti di prima qualità, prodotti selezionati, ricette che esaltano la tradizione con eleganza." },
              { icon:<Sparkles size={32} className="text-oro"/>, title:"Un'esperienza unica", desc:"Atmosfera accogliente ed elegante, perfetta per serate speciali e degustazioni guidate." },
            ].map((p, i) => (
              <div key={i} className={`text-center reveal reveal-delay-${i+1}`}>
                <div className="w-16 h-16 border border-oro/30 flex items-center justify-center mx-auto mb-6">{p.icon}</div>
                <h3 className="font-serif text-2xl text-white mb-4">{p.title}</h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANTEPRIMA MENU */}
      <section className="py-20 bg-grigio">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Assaggia</p>
            <h2 className="font-serif text-4xl text-white mb-4">In evidenza dal menu</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {img:FOOD_1, name:'Gnocchi al Tartufo Nero', desc:"Un primo piatto d'eccellenza con tartufo pregiato"},
              {img:FOOD_2, name:'Tagliere di Salumi Selezionati', desc:'Salumi artigianali e formaggi affinati'},
              {img:FOOD_3, name:'Crostini Beppino Occelli', desc:'Con burro premium e alici del Cantábrico'},
            ].map((d, i) => (
              <div key={i} className={`group overflow-hidden reveal reveal-delay-${i+1}`}>
                <div className="overflow-hidden" style={{height:'240px'}}>
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="py-6">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-oro transition-colors">{d.name}</h3>
                  <p className="font-sans text-xs text-white/40">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('menu')} className="btn-secondary">Vedi il menu completo</button>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="relative py-28 overflow-hidden">
        <img src={WINE_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-end justify-center gap-3 mb-4">
              <span className="font-serif text-7xl text-oro leading-none">4.9</span>
              <div className="pb-3">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_,i)=><Star key={i} size={18} fill="#C8A96A" className="text-oro"/>)}</div>
                <p className="font-sans text-xs text-white/40">222 recensioni su Google</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {reviews.map((r, i) => (
              <div key={i} className={`border border-white/5 p-6 hover:border-oro/20 transition-all reveal reveal-delay-${i+1}`}>
                <div className="flex gap-1 mb-4">{[...Array(r.stars)].map((_,j)=><Star key={j} size={12} fill="#C8A96A" className="text-oro"/>)}</div>
                <p className="font-sans text-sm text-white/55 leading-relaxed mb-4">"{r.text}"</p>
                <p className="font-sans text-xs text-oro font-medium">{r.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('recensioni')} className="btn-ghost">Leggi tutte le recensioni</button>
          </div>
        </div>
      </section>

      {/* CTA PRENOTAZIONE */}
      <section className="py-24 bg-grigio">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Riserva il tuo tavolo</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Vivi l'esperienza Bollicine</h2>
          <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota ora</button>
        </div>
      </section>
    </>
  );
}