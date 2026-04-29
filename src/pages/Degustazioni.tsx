import { useEffect } from 'react';
import { Clock, Users } from 'lucide-react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface Percorso { name:string; sub:string; desc:string; price:string; durata:string; posti:string; }
interface DegData { titolo:string; desc:string; items:Percorso[]; }

const fallback: DegData = {
  titolo:'Esperienze di degustazione',
  desc:'Luigi vi guiderà in un percorso sensoriale unico tra le migliori etichette della nostra cantina.',
  items:[
    { name:"Bollicine d'Italia", sub:'Franciacorta e spumanti metodo classico', desc:"Un viaggio tra le migliori bollicine italiane. Assaggerete 4 Franciacorta selezionati da Luigi, accompagnati da crostini e tagliere di salumi artigianali.", price:'€ 35', durata:'90 minuti', posti:'Max 8 persone' },
    { name:'Grand Tour dei Rossi', sub:'Grandi rossi italiani in abbinamento', desc:"Un percorso tra i grandi rossi italiani: Barolo, Brunello, Taurasi. Abbinati a formaggi affinati e salumi di qualità selezionati dallo chef.", price:'€ 45', durata:'2 ore', posti:'Max 10 persone' },
    { name:'Il Mondo in un Calice', sub:'Selezione internazionale premium', desc:"Le migliori etichette internazionali: Bordeaux, Borgogna, Napa Valley. Un viaggio enologico senza confini guidato dalla passione di Luigi.", price:'€ 55', durata:'2 ore', posti:'Max 8 persone' },
  ]
};

export default function Degustazioni() {
  useReveal();
  const { data: d } = useFirestore<DegData>('degustazioni', fallback);
  useEffect(() => { document.title = 'Degustazioni — Bollicine Battipaglia'; }, []);
  const items = d.items?.length ? d.items : fallback.items;

  return (
    <>
      <PageHero title="Degustazioni" subtitle="Esperienze guidate"
        image="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[45vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Esperienze guidate</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">{d.titolo||fallback.titolo}</h2>
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-white/50 max-w-xl mx-auto leading-relaxed">{d.desc||fallback.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {items.map((p, i) => (
              <div key={i} className={`border border-white/5 p-8 hover:border-oro/20 transition-all duration-300 reveal reveal-delay-${i+1}`}>
                <p className="font-sans text-xs tracking-widest uppercase text-oro mb-2">{p.sub}</p>
                <h3 className="font-serif text-2xl text-white mb-4">{p.name}</h3>
                <div className="w-8 h-px bg-oro mb-6" />
                <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">{p.desc}</p>
                <div className="flex gap-4 mb-6">
                  {p.durata && <div className="flex items-center gap-2"><Clock size={14} className="text-oro" /><span className="font-sans text-xs text-white/40">{p.durata}</span></div>}
                  {p.posti && <div className="flex items-center gap-2"><Users size={14} className="text-oro" /><span className="font-sans text-xs text-white/40">{p.posti}</span></div>}
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-serif text-3xl text-oro">{p.price}</span>
                  <span className="font-sans text-xs text-white/30">a persona</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota una degustazione</button>
          </div>
        </div>
      </section>
    </>
  );
}