import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';

type Category = 'Tutti' | 'Cibo' | 'Vini' | 'Atmosfera' | 'Cantina';

interface GalleryItem { src: string; alt: string; category: Exclude<Category, 'Tutti'>; }

const images: GalleryItem[] = [
  { src: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sala elegante Bollicine', category: 'Atmosfera' },
  { src: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Pasta fresca artigianale', category: 'Cibo' },
  { src: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Selezione vini pregiati', category: 'Vini' },
  { src: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Cantina con Grand Cru', category: 'Cantina' },
  { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Tagliere di salumi selezionati', category: 'Cibo' },
  { src: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Champagne e bollicine', category: 'Vini' },
  { src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Atmosfera serale intima', category: 'Atmosfera' },
  { src: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Luigi il sommelier', category: 'Atmosfera' },
  { src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dolce tiramisù artigianale', category: 'Cibo' },
  { src: 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Antipasto raffinato', category: 'Cibo' },
  { src: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Filetto di manzo pregiato', category: 'Cibo' },
  { src: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Gnocchi al tartufo', category: 'Cibo' },
];

const categories: Category[] = ['Tutti', 'Cibo', 'Vini', 'Atmosfera', 'Cantina'];

export default function Galleria() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState<Category>('Tutti');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => { document.title = 'Galleria — Bollicine Battipaglia'; }, []);

  const filtered = activeCategory === 'Tutti'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <>
      <PageHero
        title="Galleria"
        subtitle="Immagini di Bollicine"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[40vh]"
      />

      <section className="py-20 bg-nero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12 reveal">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs tracking-widest uppercase px-6 py-2 transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'border-oro bg-oro text-nero'
                    : 'border-white/20 text-white/60 hover:border-oro hover:text-oro'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div
                key={img.src + i}
                className="break-inside-avoid cursor-pointer group overflow-hidden reveal"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-nero/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-oro transition-colors"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-6 text-white/60 hover:text-oro transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={filtered[lightboxIndex].src}
            alt={filtered[lightboxIndex].alt}
            className="max-w-4xl max-h-[80vh] w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-6 text-white/60 hover:text-oro transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-xs text-white/30 tracking-widest">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  );
}
