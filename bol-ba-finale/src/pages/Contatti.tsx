import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface Orari { lunedi:string;martedi:string;mercoledi:string;giovedi:string;venerdi:string;sabato:string;domenica:string; }
interface Info { nome:string;telefono:string;email:string;indirizzo:string;maps_url:string;facebook:string;instagram:string;orari:Orari; }

const fallback: Info = {
  nome:'Bollicine', telefono:'334 131 2931', email:'info@bollicinewinebar.it',
  indirizzo:'Via Enrico De Nicola 11/13, 84091 Battipaglia (SA)',
  maps_url:'https://maps.google.com/?q=Bollicine+Battipaglia',
  facebook:'https://www.facebook.com/bollicine.wine/', instagram:'',
  orari:{lunedi:'18:00 - 00:00',martedi:'18:00 - 00:00',mercoledi:'Chiuso',giovedi:'18:00 - 00:00',venerdi:'18:00 - 00:00',sabato:'18:00 - 00:00',domenica:'19:00 - 00:00'}
};

export default function Contatti() {
  useReveal();
  const { data: c } = useFirestore<Info>('info', fallback);
  const [form, setForm] = useState({nome:'',email:'',messaggio:''});
  const [ok, setOk] = useState(false);
  useEffect(() => { document.title = 'Contatti — Bollicine Battipaglia'; }, []);

  const giorni = [
    ['Lunedì',c.orari?.lunedi],['Martedì',c.orari?.martedi],['Mercoledì',c.orari?.mercoledi],
    ['Giovedì',c.orari?.giovedi],['Venerdì',c.orari?.venerdi],['Sabato',c.orari?.sabato],['Domenica',c.orari?.domenica]
  ];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(`Messaggio dal sito — ${form.nome}`);
    const b = encodeURIComponent(`Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.messaggio}`);
    window.open(`mailto:${c.email||fallback.email}?subject=${s}&body=${b}`, '_blank');
    setOk(true); setForm({nome:'',email:'',messaggio:''});
  };

  return (
    <>
      <PageHero title="Contattaci" subtitle="Siamo qui per te"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[40vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="reveal">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Dove siamo</p>
              <h2 className="font-serif text-4xl text-white mb-8">Vieni a trovarci</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10"><MapPin size={18} className="text-oro" /></div>
                  <div>
                    <p className="font-sans text-xs uppercase text-white/30 mb-1">Indirizzo</p>
                    <p className="font-sans text-sm text-white/70">{c.indirizzo||fallback.indirizzo}</p>
                    {(c.maps_url||fallback.maps_url) && <a href={c.maps_url||fallback.maps_url} target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-oro hover:underline mt-1 inline-block">Apri in Google Maps →</a>}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10"><Phone size={18} className="text-oro" /></div>
                  <div>
                    <p className="font-sans text-xs uppercase text-white/30 mb-1">Telefono</p>
                    <a href={`tel:+39${(c.telefono||fallback.telefono).replace(/\s/g,'')}`} className="font-sans text-sm text-white/70 hover:text-oro">{c.telefono||fallback.telefono}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10"><Clock size={18} className="text-oro" /></div>
                  <div>
                    <p className="font-sans text-xs uppercase text-white/30 mb-2">Orari</p>
                    {giorni.map(([g,o]) => (
                      <div key={g as string} className="flex justify-between gap-6 mb-1">
                        <span className="font-sans text-xs text-white/40">{g}</span>
                        <span className={`font-sans text-xs ${o==='Chiuso'?'text-white/20':'text-oro'}`}>{o||'—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  {(c.facebook||fallback.facebook) && <a href={c.facebook||fallback.facebook} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 hover:border-oro/30 transition-colors"><Facebook size={18} className="text-oro" /></a>}
                  {c.instagram && <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 hover:border-oro/30 transition-colors"><Instagram size={18} className="text-oro" /></a>}
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Scrivici</p>
              <h2 className="font-serif text-4xl text-white mb-8">Hai una domanda?</h2>
              {ok ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <CheckCircle size={48} className="text-oro mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-3">Messaggio pronto!</h3>
                  <button onClick={() => setOk(false)} className="btn-secondary mt-4">Scrivi ancora</button>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-5">
                  {[['nome','Nome','text'],['email','Email','email']].map(([f,l,t]) => (
                    <div key={f}>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">{l} <span className="text-oro">*</span></label>
                      <input type={t} value={form[f as 'nome'|'email']} onChange={e => setForm(p=>({...p,[f]:e.target.value}))} required className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Messaggio <span className="text-oro">*</span></label>
                    <textarea value={form.messaggio} onChange={e => setForm(p=>({...p,messaggio:e.target.value}))} rows={5} required className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors resize-none" placeholder="Come possiamo aiutarti?" />
                  </div>
                  <button type="submit" className="w-full btn-primary">Invia messaggio</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
