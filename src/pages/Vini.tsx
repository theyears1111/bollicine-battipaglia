import { useEffect } from 'react';
import { navigate } from '../App';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';

interface Wine { name: string; zona: string; annata: string; desc: string; calice: string; bottiglia: string; }

const champagne: Wine[] = [
  { name: 'Krug Grande Cuvée', zona: 'Champagne, FR', annata: 'NV', desc: 'Complesso e maestoso, profumi di frutta matura, pane tostato e spezie dolci. Bollicine fini e persistenti.', calice: '€ 28', bottiglia: '€ 280' },
  { name: 'Bollinger Special Cuvée', zona: 'Aÿ, Champagne', annata: 'NV', desc: 'Ricco e strutturato, con note di mela rossa, brioche e lieviti. Il classico champagne da abbinamento gastronomico.', calice: '€ 18', bottiglia: '€ 120' },
  { name: 'Ruinart Blanc de Blancs', zona: 'Reims, Champagne', annata: 'NV', desc: 'Fresco e delicato, espressione pura di Chardonnay con sentori di agrumi, biancospino e mineralità gessosa.', calice: '€ 22', bottiglia: '€ 150' },
  { name: 'Dom Pérignon', zona: 'Épernay, Champagne', annata: '2015', desc: 'Leggendario cuvée de prestige. Complessità infinita, freschezza vibrante, lunghissima persistenza aromatica.', calice: '€ 45', bottiglia: '€ 320' },
];

const franciacorta: Wine[] = [
  { name: 'Bellavista Alma Cuvée Brut', zona: 'Franciacorta, BS', annata: 'NV', desc: 'Equilibrato ed elegante, note floreali e fruttate, bollicine cremose. L\'eccellenza italiana delle bollicine.', calice: '€ 14', bottiglia: '€ 55' },
  { name: 'Ca\' del Bosco Cuvée Prestige', zona: 'Erbusco, BS', annata: 'NV', desc: 'Fruttato e vivace, con sentori di pesca bianca, fiori bianchi e leggero tostato. Ambasciatore del Franciacorta.', calice: '€ 15', bottiglia: '€ 60' },
  { name: 'Contadi Castaldi Saten', zona: 'Adro, BS', annata: '2019', desc: 'Morbido e avvolgente nel suo stile Saten. Perlage finissimo, note di crema pasticcera e fiori d\'arancio.', calice: '€ 16', bottiglia: '€ 65' },
  { name: 'Ferghettina Dosage Zéro', zona: 'Adro, BS', annata: '2018', desc: 'Secco e minerale, senza dosaggio. Complessità e verticità per i palati più esigenti.', calice: '€ 18', bottiglia: '€ 75' },
];

const bianchi: Wine[] = [
  { name: 'Jermann Vintage Tunina', zona: 'Friuli Venezia Giulia', annata: '2021', desc: 'Blend di varietà locali, grande complessità aromatica. Miele, frutta esotica, mineralità sapida.', calice: '€ 16', bottiglia: '€ 70' },
  { name: 'Fiano di Avellino DOCG Mastroberardino', zona: 'Campania', annata: '2022', desc: 'Eccellenza campana, note di mandorla, pesca bianca, nocciola. Mineralità vulcanica inconfondibile.', calice: '€ 12', bottiglia: '€ 42' },
  { name: 'Planeta Cometa Fiano', zona: 'Sicilia', annata: '2022', desc: 'Fiano in versione siciliana: frutta gialla, miele d\'acacia, finale sapido e persistente.', calice: '€ 10', bottiglia: '€ 36' },
  { name: 'Livio Felluga Pinot Grigio', zona: 'Collio, Friuli', annata: '2022', desc: 'Elegante e raffinato, pera, fiori di campo, buona acidità. Perfetto abbinamento con i nostri antipasti.', calice: '€ 11', bottiglia: '€ 38' },
];

const rossi: Wine[] = [
  { name: 'Barolo Serralunga d\'Alba — Fontanafredda', zona: 'Piemonte', annata: '2018', desc: 'Il re dei vini italiani. Rose appassite, catrame, ribes nero. Tannini austeri e finale eterno.', calice: '€ 20', bottiglia: '€ 90' },
  { name: 'Brunello di Montalcino — Biondi Santi', zona: 'Toscana', annata: '2017', desc: 'Aristocratico e longevo. Ciliegia selvatica, tabacco, note ferrose. La storia del vino italiano in un calice.', calice: '€ 35', bottiglia: '€ 180' },
  { name: 'Taurasi DOCG — Mastroberardino', zona: 'Campania', annata: '2016', desc: 'Il Barolo del Sud. Ciliegia nera, spezie, tabacco. Un\'opera d\'arte enologica campana.', calice: '€ 15', bottiglia: '€ 58' },
  { name: 'Amarone della Valpolicella — Allegrini', zona: 'Veneto', annata: '2017', desc: 'Potente e avvolgente, uvaggi appassiti. Prugna, cioccolato fondente, moka. Grandioso nel finale.', calice: '€ 22', bottiglia: '€ 98' },
];

const internazionali: Wine[] = [
  { name: 'Château Margaux', zona: 'Bordeaux, FR', annata: '2016', desc: 'Premier Grand Cru Classé. Eleganza bordeolaise per eccellenza. Cassis, cedro, grafite. Monumentale.', calice: '€ 55', bottiglia: '€ 480' },
  { name: 'Opus One', zona: 'Napa Valley, USA', annata: '2019', desc: 'La leggenda californiana. Frutto esuberante e struttura europea. Merlot e Cabernet in perfetto equilibrio.', calice: '€ 38', bottiglia: '€ 320' },
  { name: 'Vega Sicilia Único', zona: 'Ribera del Duero, ES', annata: '2014', desc: 'Il vino spagnolo più iconico. Complesso e maestoso, frutto, legno, spezie. Un viaggio sensoriale.', calice: '€ 42', bottiglia: '€ 350' },
];

const naturali: Wine[] = [
  { name: 'COS Pithos Bianco', zona: 'Sicilia', annata: '2021', desc: 'Vinificato in anfora, ossidativo e caratteriale. Albicocca, bergamotto, note terrose. Naturalezza pura.', calice: '€ 12', bottiglia: '€ 42' },
  { name: 'Foradori Teroldego', zona: 'Trentino', annata: '2021', desc: 'Bio e biodinamico. Ciliegia fresca, fiori viola, spezie dolci. Beva agile e sincera.', calice: '€ 11', bottiglia: '€ 38' },
  { name: 'Dettori Bianco', zona: 'Sardegna', annata: '2020', desc: 'Vino naturale senza solfiti aggiunti. Cannonau vinificato in bianco: agrumi, salgemma, erbe aromatiche.', calice: '€ 14', bottiglia: '€ 50' },
];

function WineSection({ title, subtitle, wines, delay }: { title: string; subtitle: string; wines: Wine[]; delay: number }) {
  return (
    <div className={`reveal reveal-delay-${delay} mb-16`}>
      <div className="flex items-center gap-6 mb-2">
        <h2 className="font-serif text-3xl text-oro">{title}</h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <p className="font-sans text-xs text-white/40 tracking-widest mb-8">{subtitle}</p>
      <div className="space-y-6">
        {wines.map((wine) => (
          <div key={wine.name} className="pb-6 border-b border-white/5 last:border-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-serif text-xl text-white">{wine.name}</h3>
                <p className="font-sans text-xs text-white/30 tracking-widest">{wine.zona} · {wine.annata}</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs text-white/40">Calice <span className="text-oro font-medium">{wine.calice}</span></p>
                <p className="font-sans text-xs text-white/40">Bottiglia <span className="text-oro font-medium">{wine.bottiglia}</span></p>
              </div>
            </div>
            <p className="font-sans text-xs text-white/50 leading-relaxed">{wine.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Vini() {
  useReveal();
  useEffect(() => { document.title = 'Carta dei Vini — Bollicine Battipaglia'; }, []);

  return (
    <>
      <PageHero
        title="Carta dei Vini"
        subtitle="Un viaggio sensoriale"
        image="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920"
        height="h-[50vh]"
      />

      <section className="py-28 bg-nero">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <h2 className="font-serif text-3xl text-white mb-4">La nostra filosofia</h2>
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Ogni bottiglia nella nostra cantina è il frutto di una ricerca attenta e appassionata. Luigi seleziona personalmente ogni etichetta, privilegiando produttori che mettono l'anima nel loro lavoro. Dalle grandi maison di Champagne alle piccole cantine artigianali italiane, ogni vino racconta una storia che vale la pena ascoltare.
            </p>
          </div>

          <WineSection title="Champagne" subtitle="Le grandi maison della Champagne francese" wines={champagne} delay={1} />
          <WineSection title="Franciacorta" subtitle="Il metodo classico italiano — il nostro punto di forza" wines={franciacorta} delay={2} />
          <WineSection title="Vini Bianchi Italiani" subtitle="Dal nord al sud della penisola" wines={bianchi} delay={1} />
          <WineSection title="Vini Rossi Italiani" subtitle="Grandi etichette e scoperte preziose" wines={rossi} delay={2} />
          <WineSection title="Vini Internazionali" subtitle="Il meglio del mondo in un calice" wines={internazionali} delay={1} />
          <WineSection title="Vini Naturali e Biologici" subtitle="Per i palati curiosi e consapevoli" wines={naturali} delay={2} />

          <div className="mt-12 p-8 border border-oro/20 text-center reveal">
            <p className="font-serif text-2xl text-oro italic mb-4">Chiedi una consulenza al nostro sommelier</p>
            <p className="font-sans text-sm text-white/50 mb-6">
              Luigi è a tua disposizione ogni sera per guidarti nella scelta del vino perfetto per la tua serata.
            </p>
            <button onClick={() => navigate('prenotazioni')} className="btn-primary">
              Prenota una serata
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
