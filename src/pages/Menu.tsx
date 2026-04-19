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
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:9999,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'24px',
        background:'rgba(11,11,11,0.7)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:'100%', maxWidth:'520px',
          background:'#111',
          border:'1px solid rgba(200,169,106,0.2)',
          borderRadius:'12px',
          overflow:'hidden',
          animation:'popIn 0.2s ease-out',
        }}>
        {/* Foto grande */}
        <div style={{ position:'relative', width:'100%', aspectRatio:'4/3', background:'#0B0B0B' }}>
          <img
            src={imgUrl(dish.foto!, {w:1040, h:780, fit:'fill', q:90})}
            alt={dish.name}
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
          />
          <button
            onClick={onClose}
            style={{
              position:'absolute', top:'12px', right:'12px',
              width:'36px', height:'36px', borderRadius:'50%',
              background:'rgba(11,11,11,0.8)',
              border:'1px solid rgba(255,255,255,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', color:'rgba(255,255,255,0.7)',
              backdropFilter:'blur(8px)',
            }}>
            <X size={16} />
          </button>
        </div>
        {/* Info */}
        <div style={{ padding:'20px 24px 24px' }}>
          <h3 style={{ fontFamily:'Georgia,serif', fontSize:'22px', color:'#fff', margin:'0 0 6px' }}>{dish.name}</h3>
          <p style={{ fontFamily:'system-ui', fontSize:'13px', color:'rgba(255,255,255,0.4)', lineHeight:1.6, margin:'0 0 16px' }}>{dish.desc}</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'Georgia,serif', fontSize:'22px', color:'#C8A96A' }}>{dish.price}</span>
            <button
              onClick={() => { onClose(); navigate('prenotazioni'); }}
              style={{ background:'#C8A96A', color:'#0B0B0B', border:'none', padding:'10px 20px', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', fontWeight:'500', borderRadius:'2px' }}>
              Prenota
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.94) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/5 last:border-0 group">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl text-white mb-1 group-hover:text-oro transition-colors">{dish.name}</h3>
          <p className="font-sans text-xs text-white/40 leading-relaxed">{dish.desc}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-0.5">
          {dish.foto && (
            <button
              onClick={() => setOpen(true)}
              title="Vedi foto"
              style={{ width:'52px', height:'52px', borderRadius:'4px', overflow:'hidden', border:'1px solid rgba(200,169,106,0.25)', flexShrink:0, padding:0, cursor:'pointer', position:'relative' }}>
              <img src={squareUrl(dish.foto)} alt={dish.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              <div style={{ position:'absolute', inset:0, background:'rgba(11,11,11,0)', transition:'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background='rgba(11,11,11,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.background='rgba(11,11,11,0)')} />
            </button>
          )}
          <span className="font-serif text-lg text-oro whitespace-nowrap">{dish.price}</span>
        </div>
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
              La cucina di Bollicine è studiata per esaltare ogni abbinamento con vino.
              Luigi vi guiderà nella scelta della bottiglia perfetta.
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