import { useState, useEffect } from 'react';
import { Users, Wine, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';
import PageHero from '../components/PageHero';

const tipi = [
  {
    icon: <Users size={28} className="text-oro" />,
    title: 'Cene Private',
    sub: 'Sala riservata per gruppi e famiglie',
    desc: 'Riservate la nostra sala privata per celebrare i vostri momenti più speciali: compleanni, anniversari, riunioni di famiglia. Offriamo menu personalizzati, selezione vini su misura e un\'attenzione esclusiva per ogni dettaglio.',
    features: ['Sala riservata fino a 20 persone', 'Menu personalizzato con lo chef', 'Selezione vini dedicata con Luigi', 'Decorazioni su richiesta'],
  },
  {
    icon: <Wine size={28} className="text-oro" />,
    title: 'Serate Degustazione',
    sub: 'Eventi tematici mensili',
    desc: 'Ogni mese organizziamo serate tematiche che esplorano un territorio, un\'annata o un vitigno. Un\'opportunità unica per approfondire la propria cultura enologica in un\'atmosfera conviviale e accogliente.',
    features: ['Tema diverso ogni mese', 'Guidati da Luigi', 'Abbinamenti gastronomici', 'Massimo 15 partecipanti'],
  },
  {
    icon: <Briefcase size={28} className="text-oro" />,
    title: 'Eventi Aziendali',
    sub: 'Cene di team e presentazioni',
    desc: 'Bollicine è la location perfetta per cene aziendali, presentazioni di prodotto, team building enogastronomico. Offriamo pacchetti su misura per aziende che vogliono stupire i propri ospiti con un\'esperienza memorabile.',
    features: ['Fino a 25 persone', 'Supporto AV disponibile', 'Menu business su misura', 'Fatturazione aziendale'],
  },
];

export default function Eventi() {
  useReveal();
  const [form, setForm] = useState({ nome: '', email: '', telefono: '', tipo: '', data: '', persone: '', messaggio: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => { document.title = 'Eventi — Bollicine Battipaglia'; }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefono) {
      setStatus('error');
      setErrorMsg('Compila tutti i campi obbligatori.');
      return;
    }
    setStatus('loading');
    const { error } = await supabase.from('event_requests').insert({
      nome: form.nome,
      email: form.email,
      telefono: form.telefono,
      tipo_evento: form.tipo || null,
      data_evento: form.data || null,
      numero_persone: form.persone ? parseInt(form.persone) : null,
      messaggio: form.messaggio || null,
    });
    if (error) {
      setStatus('error');
      setErrorMsg('Errore nell\'invio. Chiamaci al 334 131 2931.');
    } else {
      setStatus('success');
    }
  };

  return (
    <>
      <PageHero
        title="Eventi e occasioni speciali"
        subtitle="Celebra con noi"
        image="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[50vh]"
      />

      <section className="py-28 bg-nero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">La location ideale</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ogni occasione merita il meglio</h2>
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-2xl mx-auto">
              Che si tratti di una cena privata, di un evento aziendale o di una serata degustazione, Bollicine offre il contesto perfetto per rendere ogni momento indimenticabile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {tipi.map((t, i) => (
              <div
                key={t.title}
                className={`p-8 border border-white/5 hover:border-oro/30 transition-all duration-300 group reveal reveal-delay-${i + 1}`}
              >
                <div className="mb-6">{t.icon}</div>
                <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-oro transition-colors">{t.title}</h3>
                <p className="font-sans text-xs text-oro/70 italic mb-4">{t.sub}</p>
                <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">{t.desc}</p>
                <ul className="space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-xs text-white/40">
                      <div className="w-1 h-1 rounded-full bg-oro shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto reveal">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl text-white mb-4">Richiedi un preventivo</h2>
              <p className="font-sans text-sm text-white/40">Compila il modulo e ti ricontatteremo entro 24 ore</p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-oro mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-white mb-3">Richiesta inviata!</h3>
                <p className="font-sans text-sm text-white/50">Ti ricontatteremo entro 24 ore. Puoi anche chiamarci al <span className="text-oro">334 131 2931</span>.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Nome <span className="text-oro">*</span></label>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange} required className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Email <span className="text-oro">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" placeholder="email@esempio.it" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Telefono <span className="text-oro">*</span></label>
                    <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" placeholder="+39 333 000 0000" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Tipo evento</label>
                    <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors">
                      <option value="">Seleziona</option>
                      <option>Cena privata</option>
                      <option>Serata degustazione</option>
                      <option>Evento aziendale</option>
                      <option>Compleanno</option>
                      <option>Anniversario</option>
                      <option>Altro</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Data desiderata</label>
                    <input type="date" name="data" value={form.data} onChange={handleChange} className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">N. persone</label>
                    <input type="number" name="persone" value={form.persone} onChange={handleChange} min={1} max={25} className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors" placeholder="Es. 12" />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">Messaggio</label>
                  <textarea name="messaggio" value={form.messaggio} onChange={handleChange} rows={4} className="w-full bg-grigio border border-white/10 focus:border-oro text-white font-sans text-sm px-4 py-3 outline-none transition-colors resize-none" placeholder="Descrivi la tua idea di evento, esigenze particolari, budget orientativo..." />
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 border border-red-500/30 bg-red-500/5">
                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                    <p className="font-sans text-sm text-red-400">{errorMsg}</p>
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'} className="w-full btn-primary text-center disabled:opacity-50">
                  {status === 'loading' ? 'Invio...' : 'Invia richiesta preventivo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
