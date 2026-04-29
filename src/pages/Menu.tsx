import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../App';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';
import { squareUrl, imgUrl } from '../lib/cloudinary';

interface Dish { name:string; desc:string; price:string; foto?:string; }
interface MenuData { items: Dish[]; }

const fallbackAntipasti: MenuData = { items:[
  {name:'Cruditè',desc:'Gambero rosso, scampo, tartare di tonno rosso, tartare di salmone e tartare di gambero rosa',price:'€ 30,00'},
  {name:'Foie Gras',desc:'Foie gras di oca da pezzo intero con crostini',price:'€ 15,00'},
  {name:'Tartare al Tartufo',desc:'Tartare di scottona certificata da 100g con scaglie di tartufo nero',price:'€ 12,00'},
  {name:'Burrata al Tartufo',desc:'Burrata pugliese 200g al tartufo',price:'€ 12,00'},
  {name:'Perlage',desc:"Tagliere di salumi, formaggi e sott'oli di qualità",price:'€ 27,00'},
  {name:'Remuage',desc:'Trio di formaggi di qualità con confetture',price:'€ 12,00'},
  {name:'Bruschette Cantábrico',desc:'Bruschette con burro Beppino Occelli e alici del Cantábrico',price:'€ 12,00'},
  {name:"Salumi d'Oca",desc:"Tagliere di salumi d'oca Jolanda de Colò",price:'€ 20,00'},
  {name:'Patanegra',desc:'Tagliere di Bellotas 36 mesi a coltello',price:'€ 20,00'},
]};

const fallbackPrimi: MenuData = { items:[
  {name:'Gnocchi Bollicine',desc:'La ricetta della casa — il piatto signature del locale',price:'da € 14,00'},
  {name:'Gnocchi al Gorgonzola',desc:'Gnocchi di Camaldoli con Gorgonzola Sovrano, pere kaiser e pinoli',price:'€ 14,00'},
  {name:'Riso ai Funghi con Polvere di Liquirizia',desc:'Risotto con funghi e polvere di liquirizia calabrese',price:'€ 16,00'},
  {name:'Uovo in Camicia',desc:'Uovo in camicia su crema di patate, tartufo e guanciale croccante',price:'€ 14,00'},
]};

const fallbackSecondi: MenuData = { items:[
  {name:'Selezione di Formaggi Affinati',desc:'Formaggi selezionati con confetture e miele artigianali',price:'€ 14,00'},
  {name:'Pesce Crudo del Giorno',desc:'Selezione di crudi di mare pregiati',price:'su richiesta'},
]};

function DishPopup({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(11,11,11,0.88)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
      {/* Wrapper scrollabile con padding */}
      <div style={{ minHeight: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px' }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: '480px',
            background: '#111',
            border: '1px solid rgba(200,169,106,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            animation: 'popIn 0.22s ease-out',
            position: 'relative',
          }}>
          {/* X */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '12px', right: '12px', zIndex: 10,
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(11,11,11,0.75)', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
            }}>
            <X size={15} />
          </button>

          {/* Foto — intera, senza maxHeight così non viene mai tagliata */}
          <img
            src={imgUrl(dish.foto!, { w: 960, q: 90 })}
            alt={dish.name}
            style={{ width: '100%', display: 'block', objectFit: 'contain', background: '#0B0B0B' }}
          />

          {/* Info */}
          <div style={{ padding: '18px 22px 22px', borderTop: '1px solid rgba(200,169,106,0.1)' }}>
            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', color: '#fff', margin: '0 0 6px' }}>{dish.name}</h3>
            <p style={{ fontFamily: 'system-ui', fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: '0 0 14px' }}>{dish.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Georgia,serif', fontSize: '20px', color: '#C8A96A' }}>{dish.price}</span>
              <button
                onClick={() => { onClose(); navigate('prenotazioni'); }}
                style={{ background: '#C8A96A', color: '#0B0B0B', border: 'none', padding: '9px 18px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500, borderRadius: '2px' }}>
                Prenota
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.95) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 56px 90px', alignItems:'center', gap:'12px', paddingBottom:'20px', borderBottom:'1px solid rgba(255,255,255,0.05)' }} className="group last:border-b-0">
        {/* Testo */}
        <div>
          <h3 className="font-serif text-xl text-white mb-1 group-hover:text-oro transition-colors">{dish.name}</h3>
          <p className="font-sans text-xs text-white/40 leading-relaxed">{dish.desc}</p>
        </div>
        {/* Foto — colonna fissa sempre presente per allineamento */}
        <div style={{ width:'56px', height:'56px' }}>
          {dish.foto ? (
            <button onClick={() => setOpen(true)}
              style={{ width:'56px', height:'56px', borderRadius:'4px', overflow:'hidden', border:'1px solid rgba(200,169,106,0.25)', padding:0, cursor:'pointer', background:'#1A1A1A', display:'block' }}>
              <img src={squareUrl(dish.foto)} alt={dish.name}
                style={{ width:'56px', height:'56px', objectFit:'cover', display:'block' }} />
            </button>
          ) : (
            <div style={{ width:'56px', height:'56px' }} />
          )}
        </div>
        {/* Prezzo */}
        <span className="font-serif text-lg text-oro whitespace-nowrap" style={{ textAlign:'right' }}>{dish.price}</span>
      </div>
      {open && dish.foto && <DishPopup dish={dish} onClose={() => setOpen(false)} />}
    </>
  );
}

function MenuSection({ title, items, delay }: { title:string; items:Dish[]; delay:number }) {
  if (!items?.length) return null;
  return (
    <div className={`reveal reveal-delay-${delay} mb-16`}>
      <div className="flex items-center gap-6 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-oro">{title}</h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="space-y-6">
        {items.map((dish,i) => <DishCard key={i} dish={dish} />)}
      </div>
    </div>
  );
}

export default function Menu() {
  useReveal();
  useEffect(() => { document.title = 'Menu — Bollicine Battipaglia'; }, []);
  const { data: antipasti } = useFirestore<MenuData>('menu_antipasti', fallbackAntipasti);
  const { data: primi } = useFirestore<MenuData>('menu_primi', fallbackPrimi);
  const { data: secondi } = useFirestore<MenuData>('menu_secondi', fallbackSecondi);

  return (
    <>
      <PageHero title="Il nostro menu" subtitle="Cucina ricercata"
        image="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[45vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Prodotti certificati</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Un percorso sensoriale</h2>
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
              La cucina di Bollicine è studiata per esaltare ogni abbinamento con vino. Luigi vi guiderà nella scelta della bottiglia perfetta.
            </p>
          </div>
          <MenuSection title="Antipasti" items={antipasti.items} delay={1} />
          <MenuSection title="Primi Piatti" items={primi.items} delay={2} />
          <MenuSection title="Secondi & Specialità" items={secondi.items} delay={3} />
          <div className="text-center mt-12 reveal">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota il tuo tavolo</button>
          </div>
        </div>
      </section>
    </>
  );
}