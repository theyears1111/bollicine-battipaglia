import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';
import { thumbUrl, imgUrl } from '../lib/cloudinary';

interface Foto { url:string; titolo:string; categoria:string; }
interface GalData { items: Foto[]; }
interface Dish { name:string; desc:string; price:string; foto?:string; }
interface MenuData { items: Dish[]; }

const fallbackGalleria: GalData = { items: [
  { url:'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Atmosfera serale', categoria:'Atmosfera' },
  { url:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Pasta fresca', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Selezione vini', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Tagliere di salumi', categoria:'Cibo' },
  { url:'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Champagne', categoria:'Vini' },
  { url:'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=800', titolo:'Crostini Cantábrico', categoria:'Cibo' },
]};

const categorie = ['Tutte','Cibo','Vini','Atmosfera','Cantina','Esterno','Eventi'];

export default function Galleria() {
  useReveal();
  const [filtro, setFiltro] = useState('Tutte');
  const [lightboxIdx, setLightboxIdx] = useState<number|null>(null);
  useEffect(() => { document.title = 'Galleria — Bollicine Battipaglia'; }, []);

  const { data: galData } = useFirestore<GalData>('galleria', fallbackGalleria);
  const { data: antipasti } = useFirestore<MenuData>('menu_antipasti', { items:[] });
  const { data: primi } = useFirestore<MenuData>('menu_primi', { items:[] });
  const { data: secondi } = useFirestore<MenuData>('menu_secondi', { items:[] });

  // Foto dal menu con foto caricate → categoria Cibo automatica
  const fotoMenu: Foto[] = [
    ...(antipasti.items||[]),
    ...(primi.items||[]),
    ...(secondi.items||[]),
  ]
    .filter(d => d.foto && d.foto.length > 0)
    .map(d => ({ url: d.foto!, titolo: d.name, categoria: 'Cibo' }));

  // Unisci galleria manuale + foto menu (evita duplicati per URL)
  const galItems = galData.items?.length ? galData.items : fallbackGalleria.items;
  const galUrls = new Set(galItems.map(f => f.url));
  const fotoMenuNuove = fotoMenu.filter(f => !galUrls.has(f.url));
  const tuttiItems: Foto[] = [...galItems, ...fotoMenuNuove];

  const filtrate = filtro === 'Tutte' ? tuttiItems : tuttiItems.filter(f => f.categoria === filtro);

  const prev = () => { if (lightboxIdx === null) return; setLightboxIdx((lightboxIdx-1+filtrate.length)%filtrate.length); };
  const next = () => { if (lightboxIdx === null) return; setLightboxIdx((lightboxIdx+1)%filtrate.length); };

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key==='Escape') setLightboxIdx(null);
      if (e.key==='ArrowLeft') prev();
      if (e.key==='ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, filtrate.length]);

  // Masonry 3 colonne
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
          {/* Filtri */}
          <div className="flex gap-3 flex-wrap justify-center mb-14">
            {categorie.map(c => (
              <button key={c} onClick={() => setFiltro(c)}
                className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                  filtro===c ? 'border-oro text-oro bg-oro/10' : 'border-white/10 text-white/40 hover:border-oro/40 hover:text-oro/60'
                }`}>
                {c}
              </button>
            ))}
          </div>

          {/* Masonry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-start">
            {[col1, col2, col3].map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3">
                {col.map((foto, fi) => {
                  const globalIdx = filtrate.indexOf(foto);
                  const tall = (ci+fi)%3===0;
                  return (
                    <div key={fi}
                      className="relative overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: tall ? '3/4' : '4/3' }}
                      onClick={() => setLightboxIdx(globalIdx)}>
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

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-nero/97 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIdx(null)}><X size={28} /></button>
          <button className="absolute left-4 md:left-10 text-white/40 hover:text-oro transition-colors z-10 text-5xl font-thin leading-none"
            onClick={e=>{e.stopPropagation();prev();}}>‹</button>
          <button className="absolute right-4 md:right-10 text-white/40 hover:text-oro transition-colors z-10 text-5xl font-thin leading-none"
            onClick={e=>{e.stopPropagation();next();}}>›</button>
          <div className="max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
            <img
              src={imgUrl(filtrate[lightboxIdx].url, {w:1200, q:90})}
              alt={filtrate[lightboxIdx].titolo}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="font-serif text-lg text-white">{filtrate[lightboxIdx].titolo}</p>
              <p className="font-sans text-xs text-oro/60 mt-1">{filtrate[lightboxIdx].categoria}</p>
              <p className="font-sans text-xs text-white/20 mt-2">{lightboxIdx+1} / {filtrate.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}