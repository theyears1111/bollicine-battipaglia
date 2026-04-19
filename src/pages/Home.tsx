import { useEffect } from 'react';
import { Star, Wine, Utensils, Sparkles, ChevronDown } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import { useFirestore } from '../hooks/useFirestore';
import { imgUrl } from '../lib/cloudinary';

const HERO = 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920';
const WINE_BG = 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920';

const reviews = [
  { name:'Martino S.', text:"Giovani, preparati, competenti e gentili. Un bel posto per aprire belle bottiglie.", stars:5 },
  { name:'Valentina D.', text:"Un'esperienza gastronomica unica e indimenticabile. Eccellenza assoluta.", stars:5 },
  { name:'Graziella S.', text:'Un paradiso per gli appassionati di vino. Grandi etichette da tutto il mondo.', stars:5 },
];

interface HomeData {
  titolo:string; sottotitolo:string; testo:string; slogan:string;
  piatto1_nome:string; piatto1_desc:string; piatto1_foto:string;
  piatto2_nome:string; piatto2_desc:string; piatto2_foto:string;
  piatto3_nome:string; piatto3_desc:string; piatto3_foto:string;
}

const fallbackHome: HomeData = {
  titolo:"Un'esperienza di", sottotitolo:'vino e cucina',
  testo:"Bollicine nasce dalla passione di Luigi, sommelier esperto, che ha trasformato un sogno in un luogo dove ogni calice racconta una storia.",
  slogan:'Battipaglia · Campania',
  piatto1_nome:'Gnocchi al Tartufo Nero', piatto1_desc:"Un primo piatto d'eccellenza con tartufo pregiato",
  piatto1_foto:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
  piatto2_nome:'Tagliere di Salumi', piatto2_desc:'Salumi artigianali e formaggi affinati',
  piatto2_foto:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  piatto3_nome:'Crostini Beppino Occelli', piatto3_desc:'Con burro premium e alici del Cantábrico',
  piatto3_foto:'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default function Home() {
  useReveal();
  useEffect(() => { document.title = 'Bollicine — Ristorante e Wine Bar a Battipaglia'; }, []);
  const { data: hd } = useFirestore<HomeData>('home', fallbackHome);

  const piatti = [
    { nome: hd.piatto1_nome||fallbackHome.piatto1_nome, desc: hd.piatto1_desc||fallbackHome.piatto1_desc, foto: hd.piatto1_foto||fallbackHome.piatto1_foto },
    { nome: hd.piatto2_nome||fallbackHome.piatto2_nome, desc: hd.piatto2_desc||fallbackHome.piatto2_desc, foto: hd.piatto2_foto||fallbackHome.piatto2_foto },
    { nome: hd.piatto3_nome||fallbackHome.piatto3_nome, desc: hd.piatto3_desc||fallbackHome.piatto3_desc, foto: hd.piatto3_foto||fallbackHome.piatto3_foto },
  ];

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO} alt="Bollicine" className="absolute inset-0 w-full h-full object-cover"
          style={{ animation:'kenBurns 20s ease-in-out infinite alternate' }} />
        <div className="absolute inset-0 bg-nero/65" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-oro mb-6 reveal">{hd.slogan||fallbackHome.slogan}</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 reveal reveal-delay-1">
            {hd.titolo||fallbackHome.titolo}<br />
            <em className="text-oro italic">{hd.sottotitolo||fallbackHome.sottotitolo}</em>
          </h1>
          <p className="font-sans text-base text-white/60 tracking-widest mb-12 reveal reveal-delay-2">Benvenuti a Bollicine — Battipaglia</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota ora</button>
            <button onClick={() => navigate('menu')} className="btn-ghost">Scopri il menu</button>
          </div>
        </div>
        <button onClick={() => window.scrollTo({top:window.innerHeight,behavior:'smooth'})}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-oro/50 hover:text-oro transition-colors animate-bounce">
          <ChevronDown size={28} />
        </button>
      </section>
      <style>{`@keyframes kenBurns { from { transform:scale(1.05) translate(0,0); } to { transform:scale(1.1) translate(-1%,-1%); } }`}</style>

      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Benvenuti</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 reveal reveal-delay-1">Dove il vino<br />incontra la passione</h2>
            <div className="gold-divider reveal reveal-delay-1" />
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-8 reveal reveal-delay-2">{hd.testo||fallbackHome.testo}</p>
            <button onClick={() => navigate('chi-siamo')} className="btn-secondary reveal reveal-delay-3">La nostra storia</button>
          </div>
          <div className="relative reveal reveal-delay-2">
            <img src={WINE_BG} alt="Cantina Bollicine" className="w-full h-80 md:h-96 object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-oro p-6 hidden md:block">
              <div className="flex items-center gap-2 mb-1">{[...Array(5)].map((_,i)=><Star key={i} size={14} fill="#0B0B0B" className="text-nero"/>)}</div>
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
            {[
              {icon:<Wine size={28} className="text-oro"/>, title:"Vini d'eccellenza", desc:"Una selezione curata dal sommelier Luigi: champagne, franciacorta, grandi etichette italiane e internazionali."},
              {icon:<Utensils size={28} className="text-oro"/>, title:"Cucina ricercata", desc:"Ingredienti di prima qualità, prodotti selezionati, ricette che esaltano la tradizione con eleganza contemporanea."},
              {icon:<Sparkles size={28} className="text-oro"/>, title:"Un'esperienza unica", desc:"Atmosfera accogliente ed elegante, perfetta per serate speciali, degustazioni guidate e momenti indimenticabili."},
            ].map((p,i) => (
              <div key={i} className={`p-8 border border-white/5 hover:border-oro/30 transition-all duration-300 group reveal reveal-delay-${i+1}`}>
                <div className="mb-6">{p.icon}</div>
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-oro transition-colors">{p.title}</h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIATTI IN EVIDENZA — modificabili dall'admin */}
      <section className="py-24 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4 reveal">Dal nostro menu</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white reveal reveal-delay-1">Piatti in evidenza</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {piatti.map((p,i) => (
              <div key={i} className={`group cursor-pointer reveal reveal-delay-${i+1}`} onClick={() => navigate('menu')}>
                <div className="overflow-hidden mb-4" style={{height:'256px'}}>
                  <img src={imgUrl(p.foto, {w:600, h:512, fit:'fill', q:85})} alt={p.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-oro transition-colors">{p.nome}</h3>
                <p className="font-sans text-xs text-white/40">{p.desc}</p>
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
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_,i)=><Star key={i} size={18} fill="#C8A96A" className="text-oro"/>)}</div>
                <p className="font-sans text-xs text-white/40">222 recensioni Google</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {reviews.map((r,i) => (
              <div key={i} className={`p-6 border border-white/5 reveal reveal-delay-${i+1}`}>
                <div className="flex gap-1 mb-4">{[...Array(r.stars)].map((_,j)=><Star key={j} size={14} fill="#C8A96A" className="text-oro"/>)}</div>
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

      <section className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{backgroundImage:`url(${WINE_BG})`,backgroundSize:'cover',backgroundPosition:'center'}}>
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