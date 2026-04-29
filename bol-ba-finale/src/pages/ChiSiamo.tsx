import { useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../App';
import PageHero from '../components/PageHero';

export default function ChiSiamo() {
  useReveal();
  useEffect(() => { document.title = 'Chi Siamo — Bollicine Battipaglia'; }, []);
  return (
    <>
      <PageHero title="Chi siamo" subtitle="La nostra storia"
        image="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920" height="h-[45vh]" />
      <section className="py-28 bg-nero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-28">
            <div className="reveal">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Il locale</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">Un paradiso per gli appassionati di vino</h2>
              <div className="w-12 h-px bg-oro mb-8" />
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                Bollicine è un locale unico nel suo genere a Battipaglia. Un ambiente accogliente e curato, con una cantina a vetrata che custodisce oltre 600 etichette: champagne, prosecco, spumante, vini fermi, distillati e liquori provenienti da tutto il mondo.
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                La cucina è studiata ad hoc da Dalila Albanez per accompagnare la straordinaria selezione di vini: prodotti certificati Longino & Cardenal e Jolanda de Colò, materie prime di eccellenza assoluta.
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                Ideale per giovani, coppie e amici che vogliono vivere un'esperienza autentica tra enogastronomia e convivialità. Che sia un aperitivo, una cena ricercata o una degustazione guidata, da Bollicine ogni momento diventa speciale.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <img src="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cantina Bollicine" className="w-full object-cover" style={{height:'480px'}} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-28">
            <div className="order-2 md:order-1 reveal">
              <img src="https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luigi sommelier" className="w-full object-cover" style={{height:'480px'}} />
            </div>
            <div className="order-1 md:order-2 reveal reveal-delay-2">
              <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">Il proprietario</p>
              <h2 className="font-serif text-4xl text-white mb-8">Luigi</h2>
              <div className="w-12 h-px bg-oro mb-8" />
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                Luigi è il cuore e l'anima di Bollicine. Giovane, preparato e appassionato, è il sommelier che vi guiderà attraverso una selezione di oltre 600 etichette con competenza e calore.
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                La sua cantina — una stanza a vetrata spettacolare con i Grand Cru più ricercati — è la sua creatura. Ogni bottiglia è scelta con cura, ogni abbinamento studiato per esaltare i sapori della cucina di Dalila.
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed italic border-l border-oro pl-6">
                "Affidatevi a lui e non ve ne pentirete. Sicuramente da consigliare per serate speciali." — Cliente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 reveal">
            {[
              { n: '600+', label: 'Etichette in cantina' },
              { n: '4.9', label: 'Rating su Google' },
              { n: '222+', label: 'Recensioni' },
              { n: '#2', label: 'Ristorante a Battipaglia' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <p className="font-serif text-4xl text-oro mb-2">{s.n}</p>
                <p className="font-sans text-xs text-white/40 tracking-wide uppercase">{s.label}</p>
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
