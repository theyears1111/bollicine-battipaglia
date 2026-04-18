import { useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../App';
import PageHero from '../components/PageHero';
import { useFirestore } from '../hooks/useFirestore';

interface ChiSiamoData {
  titolo:string; testo:string;
  proprietario_nome:string; proprietario_bio:string;
  citazione:string; proprietario_foto:string;
  stat1_num:string; stat1_label:string;
  stat2_num:string; stat2_label:string;
  stat3_num:string; stat3_label:string;
}

const fallback: ChiSiamoData = {
  titolo:'Un paradiso per gli appassionati di vino',
  testo:"Bollicine è un locale unico nel suo genere a Battipaglia. Un ambiente accogliente e curato, con una cantina a vetrata che custodisce oltre 600 etichette da tutto il mondo: champagne, franciacorta, vini fermi, distillati e liquori.",
  proprietario_nome:'Luigi Salimbene',
  proprietario_bio:"Luigi è il cuore e l'anima di Bollicine. Giovane, preparato e appassionato, è il sommelier che vi guiderà attraverso una selezione di oltre 600 etichette con competenza e calore.",
  citazione:"Affidatevi a lui e non ve ne pentirete",
  proprietario_foto:'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800',
  stat1_num:'600+', stat1_label:'Etichette in cantina',
  stat2_num:'4.9', stat2_label:'Rating su Google',
  stat3_num:'222+', stat3_label:'Recensioni',
};

export default function ChiSiamo() {
  useReveal();
  const { data: d } = useFirestore<ChiSiamoData>('chi_siamo', fallback);
  useEffect(() => { document.title = 'Chi Siamo — Bollicine Battipaglia'; }, []);

  const stats = [
    { n: d.stat1_num||fallback.stat1_num, l: d.stat1_label||fallback.stat1_label },
    { n: d.stat2_num||fallback.stat2_num, l: d.stat2_label||fallback.stat2_label },
    { n: d.stat3_num||fallback.stat3_num, l: d.stat3_label||fallback.stat3_label },
  ];

  return (
    <>
      <PageHero title="Chi siamo" subtitle="La nostra storia"
        image="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[45vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-28">
            <div className="reveal">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Il locale</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">{d.titolo||fallback.titolo}</h2>
              <div className="w-12 h-px bg-oro mb-8" />
              <p className="font-sans text-sm text-white/60 leading-relaxed">{d.testo||fallback.testo}</p>
            </div>
            <div className="reveal reveal-delay-2">
              <img src="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cantina Bollicine" className="w-full object-cover" style={{height:'480px'}} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-28">
            <div className="order-2 md:order-1 reveal">
              <img src={d.proprietario_foto||fallback.proprietario_foto}
                alt={d.proprietario_nome||fallback.proprietario_nome} className="w-full object-cover" style={{height:'480px'}} />
            </div>
            <div className="order-1 md:order-2 reveal reveal-delay-2">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Il proprietario</p>
              <h2 className="font-serif text-4xl text-white mb-8">{d.proprietario_nome||fallback.proprietario_nome}</h2>
              <div className="w-12 h-px bg-oro mb-8" />
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">{d.proprietario_bio||fallback.proprietario_bio}</p>
              {(d.citazione||fallback.citazione) && (
                <p className="font-sans text-sm text-white/60 leading-relaxed italic border-l border-oro pl-6">"{d.citazione||fallback.citazione}" — Cliente</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-20 reveal">
            {stats.map(s => (
              <div key={s.l} className="text-center">
                <p className="font-serif text-4xl text-oro mb-2">{s.n}</p>
                <p className="font-sans text-xs text-white/40 tracking-wide uppercase">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">Prenota una serata</button>
          </div>
        </div>
      </section>
    </>
  );
}