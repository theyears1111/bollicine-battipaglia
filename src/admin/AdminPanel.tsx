import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getDati, setDati } from '../lib/ristorante';

interface Props { user: User; onLogout: () => void; }

const sezioni = [
  { id:'info', label:'Info & Orari', icon:'📋' },
  { id:'home', label:'Home', icon:'🏠' },
  { id:'chi_siamo', label:'Chi Siamo', icon:'👨‍🍳' },
  { id:'menu_antipasti', label:'Antipasti', icon:'🍽️' },
  { id:'menu_primi', label:'Primi Piatti', icon:'🍝' },
  { id:'menu_secondi', label:'Secondi', icon:'🥩' },
  { id:'vini', label:'Carta Vini', icon:'🍷' },
  { id:'degustazioni', label:'Degustazioni', icon:'🥂' },
  { id:'galleria', label:'Galleria', icon:'📸' },
  { id:'eventi', label:'Eventi', icon:'🗓️' },
  { id:'recensioni', label:'Recensioni', icon:'⭐' },
];

export default function AdminPanel({ user, onLogout }: Props) {
  const [sezione, setSezione] = useState('info');
  const [dati, setDatiState] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setLoading(true); setSaved(false);
    getDati(sezione).then(d => { setDatiState(d || getDefault(sezione)); setLoading(false); });
  }, [sezione]);

  const save = async () => {
    setSaving(true);
    await setDati(sezione, dati);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const changeSezione = (id: string) => { setSezione(id); setMobileMenu(false); };

  const sezLabel = sezioni.find(s => s.id === sezione);

  return (
    <div style={{ minHeight:'100vh', background:'#0B0B0B', display:'flex', flexDirection:'column', fontFamily:'system-ui' }}>

      {/* TOP BAR MOBILE */}
      <div style={{ background:'#111', borderBottom:'1px solid rgba(200,169,106,0.15)', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <button onClick={() => setMobileMenu(!mobileMenu)}
            style={{ background:'transparent', border:'1px solid rgba(200,169,106,0.3)', color:'#C8A96A', padding:'6px 10px', cursor:'pointer', fontSize:'16px', borderRadius:'4px' }}>
            ☰
          </button>
          <h1 style={{ color:'#C8A96A', fontFamily:'Georgia,serif', fontSize:'18px', margin:0 }}>
            {sezLabel?.icon} {sezLabel?.label}
          </h1>
        </div>
        <button onClick={save} disabled={saving || loading}
          style={{ background: saved ? '#3B6D11' : '#C8A96A', color: saved ? '#EAF3DE' : '#0B0B0B', border:'none', padding:'8px 16px', fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', fontWeight:'500', opacity:(saving||loading)?0.6:1, borderRadius:'4px', transition:'background 0.3s', whiteSpace:'nowrap' }}>
          {saved ? '✓ Salvato' : saving ? '...' : 'Salva'}
        </button>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden', position:'relative' }}>

        {/* SIDEBAR */}
        <div style={{
          width:'220px', background:'#111', borderRight:'1px solid rgba(200,169,106,0.15)',
          display:'flex', flexDirection:'column', flexShrink:0,
          position: mobileMenu ? 'absolute' : 'relative',
          top:0, left:0, bottom:0, zIndex:50,
          transform: mobileMenu ? 'translateX(0)' : undefined,
          transition:'transform 0.2s',
        }}>
          <div style={{ padding:'16px 12px', borderBottom:'1px solid rgba(200,169,106,0.1)' }}>
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'10px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', margin:0 }}>{user.email}</p>
          </div>
          <nav style={{ flex:1, padding:'8px 0', overflowY:'auto' }}>
            {sezioni.map(sec => (
              <button key={sec.id} onClick={() => changeSezione(sec.id)}
                style={{ width:'100%', background: sezione===sec.id ? 'rgba(200,169,106,0.15)' : 'transparent', border:'none', borderLeft: sezione===sec.id ? '3px solid #C8A96A' : '3px solid transparent', color: sezione===sec.id ? '#C8A96A' : 'rgba(255,255,255,0.5)', padding:'10px 14px', textAlign:'left', cursor:'pointer', fontSize:'13px', display:'flex', alignItems:'center', gap:'8px', transition:'all 0.15s' }}>
                <span style={{ fontSize:'14px' }}>{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </nav>
          <div style={{ padding:'12px' }}>
            <button onClick={onLogout} style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', padding:'8px', cursor:'pointer', fontSize:'12px', borderRadius:'4px' }}>Esci</button>
          </div>
        </div>

        {/* OVERLAY mobile */}
        {mobileMenu && <div onClick={() => setMobileMenu(false)} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:40 }} />}

        {/* CONTENUTO */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 16px' }}>
          {loading
            ? <p style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', marginTop:'60px' }}>Caricamento...</p>
            : <FormEditor sezione={sezione} dati={dati} onChange={setDatiState} />
          }
        </div>
      </div>
    </div>
  );
}

function FormEditor({ sezione, dati, onChange }: { sezione:string; dati:any; onChange:(d:any)=>void }) {
  const update = (path: string, value: any) => {
    const keys = path.split('.');
    const nd = JSON.parse(JSON.stringify(dati || {}));
    let obj = nd;
    for (let i = 0; i < keys.length-1; i++) { if (!obj[keys[i]]) obj[keys[i]]= {}; obj = obj[keys[i]]; }
    obj[keys[keys.length-1]] = value;
    onChange(nd);
  };
  const updateItem = (arr: string, i: number, f: string, v: string) => {
    const nd = JSON.parse(JSON.stringify(dati||{}));
    if (!nd[arr]) nd[arr]=[];
    if (!nd[arr][i]) nd[arr][i]={};
    nd[arr][i][f]=v; onChange(nd);
  };
  const addItem = (arr: string, tpl: object) => {
    const nd = JSON.parse(JSON.stringify(dati||{}));
    if (!nd[arr]) nd[arr]=[];
    nd[arr].push({...tpl}); onChange(nd);
  };
  const removeItem = (arr: string, i: number) => {
    const nd = JSON.parse(JSON.stringify(dati||{}));
    nd[arr].splice(i,1); onChange(nd);
  };

  if (sezione==='info') return <InfoForm dati={dati} update={update} />;
  if (sezione==='home') return <HomeForm dati={dati} update={update} />;
  if (sezione==='chi_siamo') return <ChiSiamoForm dati={dati} update={update} />;
  if (sezione.startsWith('menu_')) return <MenuForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione==='vini') return <ViniForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione==='degustazioni') return <DegustazioniForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione==='galleria') return <GalleriaForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione==='eventi') return <EventiForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  if (sezione==='recensioni') return <RecensioniForm dati={dati} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />;
  return null;
}

const inp: React.CSSProperties = { width:'100%', background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', padding:'10px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'4px', fontFamily:'system-ui' };
const lbl: React.CSSProperties = { display:'block', color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'6px' };
const fld: React.CSSProperties = { marginBottom:'16px' };
const crd: React.CSSProperties = { background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'16px', marginBottom:'12px' };
const stl: React.CSSProperties = { color:'#C8A96A', fontSize:'12px', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'12px', marginTop:0 };
const mxw: React.CSSProperties = { maxWidth:'600px' };
const rmv: React.CSSProperties = { background:'transparent', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A', padding:'5px 10px', cursor:'pointer', fontSize:'11px', borderRadius:'4px' };
const add: React.CSSProperties = { background:'transparent', border:'1px dashed rgba(200,169,106,0.4)', color:'#C8A96A', padding:'10px 20px', cursor:'pointer', fontSize:'13px', width:'100%', borderRadius:'4px', marginBottom:'16px' };

function Field({ label, value, onChange, multiline }: { label:string; value:string; onChange:(v:string)=>void; multiline?:boolean }) {
  return (
    <div style={fld}>
      <label style={lbl}>{label}</label>
      {multiline
        ? <textarea value={value||''} onChange={e=>onChange(e.target.value)} rows={3} style={{...inp, resize:'vertical'}} />
        : <input style={inp} value={value||''} onChange={e=>onChange(e.target.value)} />
      }
    </div>
  );
}

function InfoForm({ dati, update }: any) {
  const giorni = ['lunedi','martedi','mercoledi','giovedi','venerdi','sabato','domenica'];
  const labels: any = {lunedi:'Lunedì',martedi:'Martedì',mercoledi:'Mercoledì',giovedi:'Giovedì',venerdi:'Venerdì',sabato:'Sabato',domenica:'Domenica'};
  return (
    <div style={mxw}>
      <div style={crd}>
        <p style={stl}>Contatti</p>
        {[['nome','Nome ristorante'],['telefono','Telefono'],['email','Email'],['indirizzo','Indirizzo'],['facebook','Facebook URL'],['instagram','Instagram URL'],['maps_url','Google Maps URL']].map(([k,l]) => (
          <Field key={k} label={l} value={dati?.[k]} onChange={v=>update(k,v)} />
        ))}
      </div>
      <div style={crd}>
        <p style={stl}>Orari di apertura</p>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginBottom:'12px' }}>Scrivi "Chiuso" per i giorni di chiusura</p>
        {giorni.map(g => (
          <div key={g} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px', flexWrap:'wrap' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px', width:'70px', flexShrink:0 }}>{labels[g]}</span>
            <input style={{...inp, flex:1, minWidth:'150px'}} value={dati?.orari?.[g]||''} onChange={e=>update(`orari.${g}`,e.target.value)} placeholder="es. 18:00 - 00:00" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeForm({ dati, update }: any) {
  return (
    <div style={mxw}>
      <div style={crd}>
        <p style={stl}>Testi Home</p>
        <Field label="Titolo principale" value={dati?.titolo} onChange={v=>update('titolo',v)} />
        <Field label="Sottotitolo" value={dati?.sottotitolo} onChange={v=>update('sottotitolo',v)} />
        <Field label="Testo descrittivo" value={dati?.testo} onChange={v=>update('testo',v)} multiline />
        <Field label="Slogan (es. un'esperienza di vino e cucina)" value={dati?.slogan} onChange={v=>update('slogan',v)} />
      </div>
    </div>
  );
}

function ChiSiamoForm({ dati, update }: any) {
  return (
    <div style={mxw}>
      <div style={crd}>
        <p style={stl}>Il Locale</p>
        <Field label="Titolo sezione" value={dati?.titolo} onChange={v=>update('titolo',v)} />
        <Field label="Testo principale" value={dati?.testo} onChange={v=>update('testo',v)} multiline />
      </div>
      <div style={crd}>
        <p style={stl}>Il Proprietario</p>
        <Field label="Nome" value={dati?.proprietario_nome} onChange={v=>update('proprietario_nome',v)} />
        <Field label="Bio" value={dati?.proprietario_bio} onChange={v=>update('proprietario_bio',v)} multiline />
        <Field label="Citazione" value={dati?.citazione} onChange={v=>update('citazione',v)} />
        <Field label="URL foto proprietario" value={dati?.proprietario_foto} onChange={v=>update('proprietario_foto',v)} />
      </div>
      <div style={crd}>
        <p style={stl}>Statistiche</p>
        {[['stat1_num','Numero 1 (es. 600+)'],['stat1_label','Label 1 (es. Etichette in cantina)'],['stat2_num','Numero 2'],['stat2_label','Label 2'],['stat3_num','Numero 3'],['stat3_label','Label 3']].map(([k,l]) => (
          <Field key={k} label={l} value={dati?.[k]} onChange={v=>update(k,v)} />
        ))}
      </div>
    </div>
  );
}

function MenuForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={mxw}>
      {(dati?.items||[]).map((item: any, i: number) => (
        <div key={i} style={crd}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>Piatto {i+1}</span>
            <button onClick={() => removeItem('items',i)} style={rmv}>Rimuovi</button>
          </div>
          <Field label="Nome piatto" value={item.name} onChange={v=>updateItem('items',i,'name',v)} />
          <Field label="Descrizione" value={item.desc} onChange={v=>updateItem('items',i,'desc',v)} multiline />
          <Field label="Prezzo (es. € 12,00)" value={item.price} onChange={v=>updateItem('items',i,'price',v)} />
        </div>
      ))}
      <button onClick={() => addItem('items',{name:'',desc:'',price:''})} style={add}>+ Aggiungi piatto</button>
    </div>
  );
}

function ViniForm({ dati, updateItem, addItem, removeItem }: any) {
  const cats = [['champagne','Champagne'],['franciacorta','Franciacorta'],['bianchi','Vini Bianchi'],['rossi','Vini Rossi']];
  return (
    <div style={mxw}>
      {cats.map(([cat,label]) => (
        <div key={cat}>
          <p style={stl}>{label}</p>
          {(dati?.[cat]||[]).map((v: any, i: number) => (
            <div key={i} style={crd}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>{label} {i+1}</span>
                <button onClick={() => removeItem(cat,i)} style={rmv}>Rimuovi</button>
              </div>
              <Field label="Nome" value={v.name} onChange={val=>updateItem(cat,i,'name',val)} />
              <Field label="Zona/Produttore" value={v.zona} onChange={val=>updateItem(cat,i,'zona',val)} />
              <Field label="Descrizione" value={v.desc} onChange={val=>updateItem(cat,i,'desc',val)} multiline />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <Field label="Prezzo calice" value={v.calice} onChange={val=>updateItem(cat,i,'calice',val)} />
                <Field label="Prezzo bottiglia" value={v.bottiglia} onChange={val=>updateItem(cat,i,'bottiglia',val)} />
              </div>
            </div>
          ))}
          <button onClick={() => addItem(cat,{name:'',zona:'',desc:'',calice:'',bottiglia:''})} style={add}>+ Aggiungi {label}</button>
        </div>
      ))}
    </div>
  );
}

function DegustazioniForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={mxw}>
      <div style={crd}>
        <p style={stl}>Testo introduttivo</p>
        <Field label="Titolo sezione" value={dati?.titolo} onChange={v=>{ const nd={...dati,titolo:v}; }} />
        <Field label="Descrizione" value={dati?.desc} onChange={v=>{ const nd={...dati,desc:v}; }} multiline />
      </div>
      <p style={stl}>Percorsi degustazione</p>
      {(dati?.items||[]).map((d: any, i: number) => (
        <div key={i} style={crd}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>Percorso {i+1}</span>
            <button onClick={() => removeItem('items',i)} style={rmv}>Rimuovi</button>
          </div>
          <Field label="Nome percorso" value={d.name} onChange={v=>updateItem('items',i,'name',v)} />
          <Field label="Sottotitolo" value={d.sub} onChange={v=>updateItem('items',i,'sub',v)} />
          <Field label="Descrizione" value={d.desc} onChange={v=>updateItem('items',i,'desc',v)} multiline />
          <Field label="Prezzo (es. € 35)" value={d.price} onChange={v=>updateItem('items',i,'price',v)} />
          <Field label="Durata (es. 90 minuti)" value={d.durata} onChange={v=>updateItem('items',i,'durata',v)} />
          <Field label="Max posti (es. Max 8 persone)" value={d.posti} onChange={v=>updateItem('items',i,'posti',v)} />
        </div>
      ))}
      <button onClick={() => addItem('items',{name:'',sub:'',desc:'',price:'',durata:'',posti:''})} style={add}>+ Aggiungi percorso</button>
    </div>
  );
}

function GalleriaForm({ dati, updateItem, addItem, removeItem }: any) {
  const items = dati?.items || [];
  return (
    <div style={mxw}>
      <div style={{ background:'rgba(200,169,106,0.08)', border:'1px solid rgba(200,169,106,0.2)', borderRadius:'8px', padding:'12px 16px', marginBottom:'20px' }}>
        <p style={{ color:'#C8A96A', fontSize:'12px', margin:0 }}>Inserisci URL delle foto (da Facebook, Google Drive, Unsplash, ecc.) · {items.length} foto totali</p>
      </div>
      {items.map((foto: any, i: number) => (
        <div key={i} style={crd}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>Foto {i+1}</span>
            <button onClick={() => removeItem('items',i)} style={rmv}>Rimuovi</button>
          </div>
          <Field label="URL immagine" value={foto.url} onChange={v=>updateItem('items',i,'url',v)} />
          <Field label="Titolo/Descrizione" value={foto.titolo} onChange={v=>updateItem('items',i,'titolo',v)} />
          <div style={fld}>
            <label style={lbl}>Categoria</label>
            <select value={foto.categoria||'Cibo'} onChange={e=>updateItem('items',i,'categoria',e.target.value)}
              style={{...inp}}>
              {['Cibo','Vini','Atmosfera','Cantina','Esterno','Eventi'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {foto.url && <img src={foto.url} alt="" style={{ width:'100%', height:'120px', objectFit:'cover', borderRadius:'4px', marginTop:'8px' }} onError={e=>(e.currentTarget.style.display='none')} />}
        </div>
      ))}
      <button onClick={() => addItem('items',{url:'',titolo:'',categoria:'Cibo'})} style={add}>+ Aggiungi foto</button>
    </div>
  );
}

function EventiForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={mxw}>
      {(dati?.items||[]).map((ev: any, i: number) => (
        <div key={i} style={crd}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>Evento {i+1}</span>
            <button onClick={() => removeItem('items',i)} style={rmv}>Rimuovi</button>
          </div>
          <Field label="Titolo evento" value={ev.titolo} onChange={v=>updateItem('items',i,'titolo',v)} />
          <Field label="Data (es. 25 Aprile 2025)" value={ev.data} onChange={v=>updateItem('items',i,'data',v)} />
          <Field label="Descrizione" value={ev.desc} onChange={v=>updateItem('items',i,'desc',v)} multiline />
          <Field label="Prezzo (es. € 35 a persona)" value={ev.prezzo} onChange={v=>updateItem('items',i,'prezzo',v)} />
          <Field label="URL immagine (opzionale)" value={ev.immagine} onChange={v=>updateItem('items',i,'immagine',v)} />
        </div>
      ))}
      <button onClick={() => addItem('items',{titolo:'',data:'',desc:'',prezzo:'',immagine:''})} style={add}>+ Aggiungi evento</button>
    </div>
  );
}

function RecensioniForm({ dati, updateItem, addItem, removeItem }: any) {
  return (
    <div style={mxw}>
      {(dati?.items||[]).map((r: any, i: number) => (
        <div key={i} style={crd}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>Recensione {i+1}</span>
            <button onClick={() => removeItem('items',i)} style={rmv}>Rimuovi</button>
          </div>
          <Field label="Nome cliente" value={r.nome} onChange={v=>updateItem('items',i,'nome',v)} />
          <Field label="Testo recensione" value={r.testo} onChange={v=>updateItem('items',i,'testo',v)} multiline />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            <Field label="Stelle (1-5)" value={String(r.stelle)} onChange={v=>updateItem('items',i,'stelle',Number(v))} />
            <Field label="Periodo (es. Marzo 2025)" value={r.data} onChange={v=>updateItem('items',i,'data',v)} />
          </div>
        </div>
      ))}
      <button onClick={() => addItem('items',{nome:'',testo:'',stelle:5,data:''})} style={add}>+ Aggiungi recensione</button>
    </div>
  );
}

function getDefault(sezione: string) {
  if (sezione==='info') return {nome:'',telefono:'',email:'',indirizzo:'',facebook:'',instagram:'',maps_url:'',orari:{lunedi:'18:00 - 00:00',martedi:'18:00 - 00:00',mercoledi:'Chiuso',giovedi:'18:00 - 00:00',venerdi:'18:00 - 00:00',sabato:'18:00 - 00:00',domenica:'19:00 - 00:00'}};
  if (sezione==='home') return {titolo:'',sottotitolo:'',testo:'',slogan:''};
  if (sezione==='chi_siamo') return {titolo:'',testo:'',proprietario_nome:'',proprietario_bio:'',citazione:'',proprietario_foto:'',stat1_num:'',stat1_label:'',stat2_num:'',stat2_label:'',stat3_num:'',stat3_label:''};
  if (sezione.startsWith('menu_')) return {items:[]};
  if (sezione==='vini') return {champagne:[],franciacorta:[],bianchi:[],rossi:[]};
  if (sezione==='degustazioni') return {titolo:'',desc:'',items:[]};
  if (sezione==='galleria') return {items:[]};
  if (sezione==='eventi') return {items:[]};
  if (sezione==='recensioni') return {items:[]};
  return {};
}