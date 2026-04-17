import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getDati, setDati } from '../lib/ristorante';

interface Props { user: User; onLogout: () => void; }

const sezioni = [
  { id:'info', label:'Info & Orari', icon:'📋' },
  { id:'menu_antipasti', label:'Antipasti', icon:'🍽️' },
  { id:'menu_primi', label:'Primi Piatti', icon:'🍝' },
  { id:'menu_secondi', label:'Secondi', icon:'🥩' },
  { id:'vini', label:'Carta Vini', icon:'🍷' },
  { id:'recensioni', label:'Recensioni', icon:'⭐' },
  { id:'eventi', label:'Eventi', icon:'🗓️' },
];

const s: React.CSSProperties = {
  minHeight:'100vh', background:'#0B0B0B', display:'flex', fontFamily:'system-ui'
};

export default function AdminPanel({ user, onLogout }: Props) {
  const [sezione, setSezione] = useState('info');
  const [dati, setDatiState] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSaved(false);
    getDati(sezione).then(d => {
      setDatiState(d || getDefault(sezione));
      setLoading(false);
    });
  }, [sezione]);

  const save = async () => {
    setSaving(true);
    await setDati(sezione, dati);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={s}>
      <div style={{ width:'240px', background:'#111', borderRight:'1px solid rgba(200,169,106,0.15)', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'24px 20px', borderBottom:'1px solid rgba(200,169,106,0.15)' }}>
          <h1 style={{ color:'#C8A96A', fontFamily:'Georgia,serif', fontSize:'20px', margin:0 }}>Admin</h1>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'11px', margin:'4px 0 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.email}</p>
        </div>
        <nav style={{ flex:1, padding:'12px 0', overflowY:'auto' }}>
          {sezioni.map(sec => (
            <button key={sec.id} onClick={() => setSezione(sec.id)}
              style={{ width:'100%', background: sezione === sec.id ? 'rgba(200,169,106,0.15)' : 'transparent', border:'none', borderLeft: sezione === sec.id ? '3px solid #C8A96A' : '3px solid transparent', color: sezione === sec.id ? '#C8A96A' : 'rgba(255,255,255,0.5)', padding:'12px 20px', textAlign:'left', cursor:'pointer', fontSize:'13px', display:'flex', alignItems:'center', gap:'10px', transition:'all 0.2s' }}>
              <span style={{ fontSize:'16px' }}>{sec.icon}</span>
              {sec.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 20px', borderTop:'1px solid rgba(200,169,106,0.15)' }}>
          <button onClick={onLogout}
            style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', padding:'10px', cursor:'pointer', fontSize:'12px', letterSpacing:'0.05em' }}>
            Esci
          </button>
        </div>
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'20px 32px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h2 style={{ color:'#fff', fontSize:'18px', fontWeight:'400', margin:0 }}>
            {sezioni.find(s => s.id === sezione)?.icon} {sezioni.find(s => s.id === sezione)?.label}
          </h2>
          <button onClick={save} disabled={saving || loading}
            style={{ background: saved ? '#3B6D11' : '#C8A96A', color: saved ? '#EAF3DE' : '#0B0B0B', border:'none', padding:'10px 24px', fontSize:'12px', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', fontWeight:'500', opacity: (saving||loading) ? 0.6 : 1, transition:'background 0.3s' }}>
            {saved ? '✓ Salvato!' : saving ? 'Salvataggio...' : 'Salva modifiche'}
          </button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'32px' }}>
          {loading ? (
            <p style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', marginTop:'80px' }}>Caricamento...</p>
          ) : (
            <FormEditor sezione={sezione} dati={dati} onChange={setDatiState} />
          )}
        </div>
      </div>
    </div>
  );
}

function FormEditor({ sezione, dati, onChange }: { sezione:string; dati:any; onChange:(d:any)=>void }) {
  const update = (path: string, value: any) => {
    const keys = path.split('.');
    const newDati = JSON.parse(JSON.stringify(dati || {}));
    let obj = newDati;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onChange(newDati);
  };

  const updateItem = (array: string, index: number, field: string, value: string) => {
    const newDati = JSON.parse(JSON.stringify(dati || {}));
    if (!newDati[array]) newDati[array] = [];
    if (!newDati[array][index]) newDati[array][index] = {};
    newDati[array][index][field] = value;
    onChange(newDati);
  };

  const addItem = (array: string, template: object) => {
    const newDati = JSON.parse(JSON.stringify(dati || {}));
    if (!newDati[array]) newDati[array] = [];
    newDati[array].push({ ...template });
    onChange(newDati);
  };

  const removeItem = (array: string, index: number) => {
    const newDati = JSON.parse(JSON.stringify(dati || {}));
    newDati[array].splice(index, 1);
    onChange(newDati);
  };

  if (sezione === 'info') return <InfoForm dati={dati} update={update} />;
  if (sezione.startsWith('menu_')) return <MenuForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione === 'vini') return <ViniForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione === 'recensioni') return <RecensioniForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione === 'eventi') return <EventiForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  return null;
}

const inputStyle: React.CSSProperties = { width:'100%', background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', padding:'10px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'4px', fontFamily:'system-ui' };
const labelStyle: React.CSSProperties = { display:'block', color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' };
const fieldStyle: React.CSSProperties = { marginBottom:'20px' };
const cardStyle: React.CSSProperties = { background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'20px', marginBottom:'16px' };
const sectionTitle: React.CSSProperties = { color:'#C8A96A', fontSize:'14px', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px', marginTop:'0' };

function InfoForm({ dati, update }: any) {
  const giorni = ['lunedi','martedi','mercoledi','giovedi','venerdi','sabato','domenica'];
  const labels: any = { lunedi:'Lunedì',martedi:'Martedì',mercoledi:'Mercoledì',giovedi:'Giovedì',venerdi:'Venerdì',sabato:'Sabato',domenica:'Domenica' };
  return (
    <div style={{ maxWidth:'600px' }}>
      <div style={cardStyle}>
        <p style={sectionTitle}>Contatti</p>
        {[['nome','Nome ristorante'],['telefono','Telefono'],['email','Email'],['indirizzo','Indirizzo'],['facebook','Facebook URL'],['instagram','Instagram URL'],['maps_url','Google Maps URL']].map(([k,l]) => (
          <div key={k} style={fieldStyle}>
            <label style={labelStyle}>{l}</label>
            <input style={inputStyle} value={dati?.[k]||''} onChange={e => update(k, e.target.value)} />
          </div>
        ))}
      </div>
      <div style={cardStyle}>
        <p style={sectionTitle}>Orari di apertura</p>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginBottom:'16px' }}>Scrivi "Chiuso" per i giorni di chiusura</p>
        {giorni.map(g => (
          <div key={g} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px', width:'80px', flexShrink:0 }}>{labels[g]}</span>
            <input style={{ ...inputStyle, flex:1 }} value={dati?.orari?.[g]||''} onChange={e => update(`orari.${g}`, e.target.value)} placeholder="es. 18:00 - 00:00" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={{ maxWidth:'700px' }}>
      {(dati?.items||[]).map((item: any, i: number) => (
        <div key={i} style={cardStyle}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>Piatto {i+1}</span>
            <button onClick={() => removeItem('items', i)} style={{ background:'transparent', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A', padding:'6px 12px', cursor:'pointer', fontSize:'12px', borderRadius:'4px' }}>Rimuovi</button>
          </div>
          {[['name','Nome piatto'],['desc','Descrizione'],['price','Prezzo (es. € 12,00)']].map(([f,l]) => (
            <div key={f} style={fieldStyle}>
              <label style={labelStyle}>{l}</label>
              <input style={inputStyle} value={item[f]||''} onChange={e => updateItem('items', i, f, e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => addItem('items', {name:'',desc:'',price:''})}
        style={{ background:'transparent', border:'1px dashed rgba(200,169,106,0.4)', color:'#C8A96A', padding:'12px 24px', cursor:'pointer', fontSize:'13px', width:'100%', borderRadius:'4px' }}>
        + Aggiungi piatto
      </button>
    </div>
  );
}

function ViniForm({ dati, updateItem, addItem, removeItem }: any) {
  const categorie = [['champagne','Champagne'],['franciacorta','Franciacorta'],['bianchi','Vini Bianchi'],['rossi','Vini Rossi']];
  return (
    <div style={{ maxWidth:'700px' }}>
      {categorie.map(([cat,label]) => (
        <div key={cat}>
          <p style={sectionTitle}>{label}</p>
          {(dati?.[cat]||[]).map((vino: any, i: number) => (
            <div key={i} style={cardStyle}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>{label} {i+1}</span>
                <button onClick={() => removeItem(cat, i)} style={{ background:'transparent', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A', padding:'6px 12px', cursor:'pointer', fontSize:'12px', borderRadius:'4px' }}>Rimuovi</button>
              </div>
              {[['name','Nome'],['zona','Zona/Produttore'],['desc','Descrizione'],['calice','Prezzo calice'],['bottiglia','Prezzo bottiglia']].map(([f,l]) => (
                <div key={f} style={fieldStyle}>
                  <label style={labelStyle}>{l}</label>
                  <input style={inputStyle} value={vino[f]||''} onChange={e => updateItem(cat, i, f, e.target.value)} />
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => addItem(cat, {name:'',zona:'',desc:'',calice:'',bottiglia:''})}
            style={{ background:'transparent', border:'1px dashed rgba(200,169,106,0.4)', color:'#C8A96A', padding:'12px 24px', cursor:'pointer', fontSize:'13px', width:'100%', borderRadius:'4px', marginBottom:'24px' }}>
            + Aggiungi {label}
          </button>
        </div>
      ))}
    </div>
  );
}

function RecensioniForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={{ maxWidth:'700px' }}>
      {(dati?.items||[]).map((r: any, i: number) => (
        <div key={i} style={cardStyle}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>Recensione {i+1}</span>
            <button onClick={() => removeItem('items', i)} style={{ background:'transparent', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A', padding:'6px 12px', cursor:'pointer', fontSize:'12px', borderRadius:'4px' }}>Rimuovi</button>
          </div>
          {[['nome','Nome cliente'],['testo','Testo recensione'],['stelle','Stelle (1-5)'],['data','Periodo (es. Marzo 2025)']].map(([f,l]) => (
            <div key={f} style={fieldStyle}>
              <label style={labelStyle}>{l}</label>
              <input style={inputStyle} value={r[f]||''} onChange={e => updateItem('items', i, f, e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => addItem('items', {nome:'',testo:'',stelle:5,data:''})}
        style={{ background:'transparent', border:'1px dashed rgba(200,169,106,0.4)', color:'#C8A96A', padding:'12px 24px', cursor:'pointer', fontSize:'13px', width:'100%', borderRadius:'4px' }}>
        + Aggiungi recensione
      </button>
    </div>
  );
}

function EventiForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={{ maxWidth:'700px' }}>
      {(dati?.items||[]).map((ev: any, i: number) => (
        <div key={i} style={cardStyle}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>Evento {i+1}</span>
            <button onClick={() => removeItem('items', i)} style={{ background:'transparent', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A', padding:'6px 12px', cursor:'pointer', fontSize:'12px', borderRadius:'4px' }}>Rimuovi</button>
          </div>
          {[['titolo','Titolo evento'],['data','Data (es. 25 Aprile 2025)'],['desc','Descrizione breve'],['prezzo','Prezzo (es. € 35 a persona)']].map(([f,l]) => (
            <div key={f} style={fieldStyle}>
              <label style={labelStyle}>{l}</label>
              <input style={inputStyle} value={ev[f]||''} onChange={e => updateItem('items', i, f, e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => addItem('items', {titolo:'',data:'',desc:'',prezzo:''})}
        style={{ background:'transparent', border:'1px dashed rgba(200,169,106,0.4)', color:'#C8A96A', padding:'12px 24px', cursor:'pointer', fontSize:'13px', width:'100%', borderRadius:'4px' }}>
        + Aggiungi evento
      </button>
    </div>
  );
}

function getDefault(sezione: string) {
  if (sezione === 'info') return { nome:'', telefono:'', email:'', indirizzo:'', facebook:'', instagram:'', maps_url:'', orari:{ lunedi:'18:00 - 00:00', martedi:'18:00 - 00:00', mercoledi:'Chiuso', giovedi:'18:00 - 00:00', venerdi:'18:00 - 00:00', sabato:'18:00 - 00:00', domenica:'19:00 - 00:00' }};
  if (sezione.startsWith('menu_')) return { items: [] };
  if (sezione === 'vini') return { champagne:[], franciacorta:[], bianchi:[], rossi:[] };
  if (sezione === 'recensioni') return { items: [] };
  if (sezione === 'eventi') return { items: [] };
  return {};
}
