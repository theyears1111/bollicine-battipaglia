import { useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface R { nome:string;testo:string;stelle:number;data:string; }
interface RecData { items: R[]; }

const fallback: RecData = { items: [
  {nome:'Martino Spera',testo:'Giovani, preparati, competenti e gentili. Un bel posto per aprire belle bottiglie e stuzzicare con qualcosa di ricercato.',stelle:5,data:'Marzo 2025'},
  {nome:'Valentina Di Fraia',testo:"Un'esperienza gastronomica unica e indimenticabile. Luigi e Bollicine: eccellenza assoluta a Battipaglia.",stelle:5,data:'Settembre 2024'},
  {nome:'Graziella Sansone',testo:'Un paradiso per gli appassionati di vino. Grandi etichette da tutto il mondo e una straordinaria stanza dei vini con i Grand Cru.',stelle:5,data:'Gennaio 2025'},
  {nome:'Biaso Blando',testo:'Serata fantastica, piatti unici dal sapore indescrivibile. Tartar di fassona con gelato al gorgonzola superlativi!',stelle:5,data:'Aprile 2024'},
  {nome:'Fiorella Roviello',testo:'Cena romantica super consigliata! Cantina di vini a vetrata molto suggestiva. Il riso ai funghi con polvere di liquirizia superlativo!',stelle:5,data:'Febbraio 2024'},
  {nome:'Michele Guarracino',testo:'La Mecca delle Bollicine con centinaia di etichette provenienti da tutto il mondo. Materia prima di primissima qualità.',stelle:5,data:'Maggio 2024'},
]};

export default function Recensioni() {
  useReveal();
  useEffect(() => { document.title = 'Recensioni — Bollicine Battipaglia'; }, []);
  const { data } = useFirestore<RecData>('recensioni', fallback);
  const reviews = data.items?.length >= 3 ? data.items : fallback.items;

  return (
    <>
      <PageHero title="Le vostre opinioni" subtitle="Cosa dicono i nostri ospiti"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[40vh]" />
      <section className="py-20 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-end justify-center gap-4 mb-6">
              <span className="font-serif text-8xl text-oro leading-none">4.9</span>
              <div className="pb-4">
                <div className="flex gap-1 mb-2">{[...Array(5)].map((_,i)=><Star key={i} size={22} fill="#C8A96A" className="text-oro"/>)}</div>
                <p className="font-sans text-sm text-white/40">222 recensioni su Google</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {reviews.map((r,i) => (
              <div key={i} className={`p-6 border border-white/5 hover:border-oro/20 transition-all reveal reveal-delay-${(i%3)+1}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-white">{r.nome}</p>
                    <p className="font-sans text-xs text-white/30 mt-0.5">{r.data}</p>
                  </div>
                  <Quote size={20} className="text-oro/30 shrink-0" />
                </div>
                <div className="flex gap-1 mb-4">{[...Array(Number(r.stelle)||5)].map((_,j)=><Star key={j} size={12} fill="#C8A96A" className="text-oro"/>)}</div>
                <p className="font-sans text-sm text-white/55 leading-relaxed">"{r.testo}"</p>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Vieni a trovarci</button>
          </div>
        </div>
      </section>
    </>
  );
}
