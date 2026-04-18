import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';
import { thumbUrl, imgUrl } from '../lib/cloudinary';

interface Foto { url:string; titolo:string; categoria:string; }
interface GalData { items: Foto[]; }

const fallback: GalData = { items: [
  { url:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Gnocchi al tartufo', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'La nostra cantina', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Atmosfera serale', categoria:'Atmosfera' },
  { url:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Tagliere di salumi', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Selezione di vini', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Crostini Cantábrico', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Il sommelier Luigi', categoria:'Atmosfera' },
  { url:'https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Champagne in cantina', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Serata speciale', categoria:'Atmosfera' },
]};

const categorie = ['Tutte','Cibo','Vini','Atmosfera','Cantina','Esterno','Eventi'];

export default function Galleria() {
  const { data } = useFirestore<GalData>('galleria', fallback);
  const [filtro, setFiltro] = useState('Tutte');
  const [lightbox, setLightbox] = useState<Foto|null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  useEffect(() => { document.title = 'Galleria — Bollicine Battipaglia'; }, []);

  const items = data.items?.length ? data.items : fallback.items;
  const filtrate = filtro === 'Tutte' ? items : items.filter(f => f.categoria === filtro);

  const openLightbox = (foto: Foto, idx: number) => { setLightbox(foto); setLightboxIdx(idx); };
  const prev = () => { const i = (lightboxIdx-1+filtrate.length)%filtrate.length; setLightbox(filtrate[i]); setLightboxIdx(i); };
  const next = () => { const i = (lightboxIdx+1)%filtrate.length; setLightbox(filtrate[i]); setLightboxIdx(i); };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key==='ArrowLeft') prev();
      if (e.key==='ArrowRight') next();
      if (e.key==='Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lightboxIdx]);

  const col1 = filtrate.filter((_,i) => i%3===0);
  const col2 = filtrate.filter((_,i) => i%3===1);
  const col3 = filtrate.filter((_,i) => i%3===2);

  return (
    <>
      <PageHero title="Galleria" subtitle="Le nostre immagini"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[40vh]" />
      <section className="py-20 bg-nero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 flex-wrap justify-center mb-14">
            {categorie.map(c => (
              <button key={c} onClick={() => setFiltro(c)}
                className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${filtro===c ? 'border-oro text-oro bg-oro/10' : 'border-white/10 text-white/40 hover:border-oro/40 hover:text-oro/60'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-start">
            {[col1, col2, col3].map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3">
                {col.map((foto, fi) => {
                  const globalIdx = filtrate.indexOf(foto);
                  const tall = (ci+fi)%3===0;
                  return (
                    <div key={fi} className="relative overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: tall ? '3/4' : '4/3' }}
                      onClick={() => openLightbox(foto, globalIdx)}>
                      <img
                        src={thumbUrl(foto.url)}
                        alt={foto.titolo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-nero/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="font-sans text-xs text-white/80">{foto.titolo}</p>
                        <p className="font-sans text-xs text-oro/60 mt-0.5">{foto.categoria}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {filtrate.length === 0 && (
            <p className="text-center font-sans text-sm text-white/30 py-20">Nessuna foto in questa categoria</p>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-nero/97 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10" onClick={() => setLightbox(null)}><X size={28} /></button>
          <button className="absolute left-4 md:left-10 text-white/40 hover:text-oro transition-colors z-10 text-5xl font-thin leading-none" onClick={e=>{e.stopPropagation();prev();}}>‹</button>
          <button className="absolute right-4 md:right-10 text-white/40 hover:text-oro transition-colors z-10 text-5xl font-thin leading-none" onClick={e=>{e.stopPropagation();next();}}>›</button>
          <div className="max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
            <img src={imgUrl(lightbox.url, {w:1200, q:90})} alt={lightbox.titolo}
              className="w-full max-h-[80vh] object-contain" />
            <div className="text-center mt-4">
              <p className="font-serif text-lg text-white">{lightbox.titolo}</p>
              <p className="font-sans text-xs text-oro/60 mt-1">{lightbox.categoria}</p>
              <p className="font-sans text-xs text-white/20 mt-2">{lightboxIdx+1} / {filtrate.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}