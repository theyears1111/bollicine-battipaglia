import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface Foto { url:string; titolo:string; categoria:string; }
interface GalData { items: Foto[]; }

const fallback: GalData = { items: [
  { url:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'Gnocchi al tartufo', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'La nostra cantina', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'Atmosfera serale', categoria:'Atmosfera' },
  { url:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'Tagliere di salumi', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'Selezione di vini', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600', titolo:'Crostini Cantábrico', categoria:'Cibo' },
]};

const categorie = ['Tutte','Cibo','Vini','Atmosfera','Cantina','Esterno','Eventi'];

export default function Galleria() {
  useReveal();
  const { data } = useFirestore<GalData>('galleria', fallback);
  const [filtro, setFiltro] = useState('Tutte');
  const [lightbox, setLightbox] = useState<Foto|null>(null);
  useEffect(() => { document.title = 'Galleria — Bollicine Battipaglia'; }, []);

  const items = data.items?.length ? data.items : fallback.items;
  const filtrate = filtro==='Tutte' ? items : items.filter(f => f.categoria===filtro);

  return (
    <>
      <PageHero title="Galleria" subtitle="Le nostre immagini"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[40vh]" />
      <section className="py-20 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-3 flex-wrap justify-center mb-12 reveal">
            {categorie.map(c => (
              <button key={c} onClick={() => setFiltro(c)}
                className={`font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${filtro===c ? 'border-oro text-oro bg-oro/10' : 'border-white/10 text-white/40 hover:border-oro/30 hover:text-oro/60'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtrate.map((foto, i) => (
              <div key={i} className={`relative overflow-hidden cursor-pointer group reveal reveal-delay-${(i%3)+1}`}
                style={{aspectRatio:'4/3'}} onClick={() => setLightbox(foto)}>
                <img src={foto.url} alt={foto.titolo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-nero/0 group-hover:bg-nero/40 transition-all duration-300 flex items-end p-4">
                  <p className="font-sans text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{foto.titolo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-nero/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setLightbox(null)}><X size={28} /></button>
          <img src={lightbox.url} alt={lightbox.titolo} className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />
          {lightbox.titolo && <p className="absolute bottom-8 text-white/60 font-sans text-sm">{lightbox.titolo}</p>}
        </div>
      )}
    </>
  );
}