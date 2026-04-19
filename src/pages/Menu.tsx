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

function DishCard({ dish }: { dish: Dish }) {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/5 last:border-0 group">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl text-white mb-1 group-hover:text-oro transition-colors">{dish.name}</h3>
          <p className="font-sans text-xs text-white/40 leading-relaxed">{dish.desc}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-0.5">
          {dish.foto && (
            <button onClick={() => setPopup(true)}
              className="relative overflow-hidden hover:opacity-90 transition-opacity group/img"
              style={{ width:'56px', height:'56px', borderRadius:'4px', flexShrink:0, border:'1px solid rgba(200,169,106,0.2)' }}>
              <img src={squareUrl(dish.foto)} alt={dish.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-nero/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <span style={{ color:'#C8A96A', fontSize:'16px' }}>🔍</span>
              </div>
            </button>
          )}
          <span className="font-serif text-lg text-oro whitespace-nowrap">{dish.price}</span>
        </div>
      </div>

      {popup && dish.foto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', background:'rgba(11,11,11,0.85)' }}
          onClick={() => setPopup(false)}>
          <div
            className="relative max-w-md w-full"
            style={{ animation:'popupIn 0.25s ease-out' }}
            onClick={e => e.stopPropagation()}>
            {/* Bottone chiudi */}
            <button
              onClick={() => setPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-grigio border border-white/10 text-white/60 hover:text-white hover:border-oro/40 transition-all">
              <X size={16} />
            </button>
            {/* Foto */}
            <div style={{ borderRadius:'8px', overflow:'hidden', border:'1px solid rgba(200,169,106,0.15)' }}>
              <img
                src={imgUrl(dish.foto, {w:800, q:90})}
                alt={dish.name}
                className="w-full object-cover"
                style={{ maxHeight:'60vh', objectFit:'contain', background:'#111' }}
              />
              {/* Info sotto foto */}
              <div style={{ background:'#111', padding:'16px 20px', borderTop:'1px solid rgba(200,169,106,0.1)' }}>
                <h3 className="font-serif text-xl text-white mb-1">{dish.name}</h3>
                <p className="font-sans text-xs text-white/40 leading-relaxed mb-3">{dish.desc}</p>
                <p className="font-serif text-lg text-oro">{dish.price}</p>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes popupIn {
              from { opacity:0; transform:scale(0.95) translateY(10px); }
              to { opacity:1; transform:scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
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