import { useState, useEffect } from 'react';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../App';
import PageHero from '../components/PageHero';

const timeSlots: string[] = [];
for (let h = 19; h <= 22; h++) {
  timeSlots.push(`${h.toString().padStart(2,'0')}:00`);
  if (h < 22) timeSlots.push(`${h.toString().padStart(2,'0')}:30`);
}
const occasions = ['Compleanno','Anniversario','Cena di lavoro','Degustazione','Fidanzamento','Altro'];

interface FormData {
  nome: string; cognome: string; email: string; telefono: string;
  data: string; orario: string; persone: string; occasione: string; note: string;
}
const emptyForm: FormData = { nome:'',cognome:'',email:'',telefono:'',data:'',orario:'',persone:'2',occasione:'',note:'' };

export default function Prenotazioni() {
  useReveal();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => { document.title = 'Prenotazioni — Bollicine Battipaglia'; }, []);
  const today = new Date().toISOString().split('T')[0];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome||!form.cognome||!form.email||!form.telefono||!form.data||!form.orario) {
      setErrorMsg('Per favore compila tutti i campi obbligatori.');
      setStatus('error'); return;
    }
    setStatus('loading');
    const msg = `Nuova prenotazione Bollicine:%0ANome: ${form.nome} ${form.cognome}%0AEmail: ${form.email}%0ATel: ${form.telefono}%0AData: ${form.data} alle ${form.orario}%0APersone: ${form.persone}%0AOccasione: ${form.occasione||'nessuna'}%0ANote: ${form.note||'nessuna'}`;
    setTimeout(() => {
      window.open(`https://wa.me/393341312931?text=${msg}`, '_blank');
      setStatus('success');
      setForm(emptyForm);
    }, 400);
  };

  return (
    <>
      <PageHero title="Prenota il tuo tavolo" subtitle="Riserva la tua serata"
        image="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[45vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-24 text-center reveal">
                  <CheckCircle size={56} className="text-oro mb-6" />
                  <h2 className="font-serif text-4xl text-white mb-4">Richiesta inviata!</h2>
                  <p className="font-sans text-sm text-white/50 mb-8 leading-relaxed">
                    Si è aperto WhatsApp con i tuoi dati. Invia il messaggio per confermare la prenotazione.<br/>
                    Puoi anche chiamarci al <strong className="text-oro">334 131 2931</strong>.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary">Nuova prenotazione</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 reveal">
                  <h2 className="font-serif text-3xl text-white mb-8">Compila il modulo</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(['nome','cognome'] as const).map(field => (
                      <div key={field}>
                        <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">
                          {field === 'nome' ? 'Nome' : 'Cognome'} <span className="text-oro">*</span>
                        </label>
                        <input type="text" name={field} value={form[field]} onChange={handleChange} required
                          className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200"
                          placeholder={field === 'nome' ? 'Mario' : 'Rossi'} />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Email <span className="text-oro">*</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200"
                        placeholder="mario@email.it" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Telefono <span className="text-oro">*</span></label>
                      <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required
                        className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200"
                        placeholder="+39 333 000 0000" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Data <span className="text-oro">*</span></label>
                      <input type="date" name="data" value={form.data} onChange={handleChange} min={today} required
                        className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Orario <span className="text-oro">*</span></label>
                      <select name="orario" value={form.orario} onChange={handleChange} required
                        className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200">
                        <option value="">Seleziona</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Persone <span className="text-oro">*</span></label>
                      <select name="persone" value={form.persone} onChange={handleChange}
                        className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200">
                        {Array.from({length:20},(_,i)=>i+1).map(n=>(
                          <option key={n} value={n}>{n} {n===1?'persona':'persone'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Occasione speciale</label>
                    <select name="occasione" value={form.occasione} onChange={handleChange}
                      className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200">
                      <option value="">Nessuna occasione specifica</option>
                      {occasions.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Note o richieste speciali</label>
                    <textarea name="note" value={form.note} onChange={handleChange} rows={3}
                      className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors duration-200 resize-none"
                      placeholder="Allergie, intolleranze, richieste particolari..." />
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 border border-red-500/30 bg-red-500/5">
                      <AlertCircle size={18} className="text-red-400 shrink-0" />
                      <p className="font-sans text-sm text-red-400">{errorMsg}</p>
                    </div>
                  )}
                  <button type="submit" disabled={status==='loading'}
                    className="w-full btn-primary text-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {status==='loading' ? 'Apertura WhatsApp...' : 'Prenota via WhatsApp'}
                  </button>
                  <p className="font-sans text-xs text-white/30 text-center">
                    Si aprirà WhatsApp con i tuoi dati già compilati — invia il messaggio per confermare
                  </p>
                </form>
              )}
            </div>
            <div className="space-y-8">
              <div className="reveal">
                <p className="font-sans text-xs tracking-widest uppercase text-oro mb-6">Preferisci chiamare?</p>
                <a href="tel:+393341312931" className="flex items-center gap-3 group mb-4">
                  <div className="p-3 border border-oro/30 group-hover:bg-oro/10 transition-colors">
                    <Phone size={20} className="text-oro" />
                  </div>
                  <div>
                    <p className="font-serif text-xl text-white group-hover:text-oro transition-colors">334 131 2931</p>
                    <p className="font-sans text-xs text-white/30">Sempre disponibili la sera</p>
                  </div>
                </a>
              </div>
              <div className="border-t border-white/5 pt-8 reveal">
                <h3 className="font-serif text-xl text-white mb-4">Orari</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-white/40">Lunedì – Venerdì</span>
                    <span className="font-sans text-xs text-oro">19:00 – 23:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-white/40">Sabato</span>
                    <span className="font-sans text-xs text-oro">19:00 – 23:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-white/40">Domenica</span>
                    <span className="font-sans text-xs text-oro">19:00 – 23:00</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-8 reveal">
                <h3 className="font-serif text-xl text-white mb-4">Dove siamo</h3>
                <p className="font-sans text-xs text-white/40 leading-relaxed">
                  Via Enrico De Nicola 11/13<br/>84091 Battipaglia (SA)<br/>
                  <span className="text-white/25">Vicino alla Stazione</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
