import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AdminPanel from './AdminPanel';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Email o password errati');
    }
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#0B0B0B', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#C8A96A', fontFamily:'Georgia,serif', fontSize:'18px' }}>Caricamento...</p>
    </div>
  );

  if (user) return <AdminPanel user={user} onLogout={() => signOut(auth)} />;

  return (
    <div style={{ minHeight:'100vh', background:'#0B0B0B', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:'400px' }}>
        <h1 style={{ fontFamily:'Georgia,serif', color:'#C8A96A', textAlign:'center', fontSize:'28px', marginBottom:'8px' }}>Pannello Admin</h1>
        <p style={{ color:'rgba(255,255,255,0.4)', textAlign:'center', fontSize:'13px', marginBottom:'40px', fontFamily:'system-ui' }}>Accedi per modificare il sito</p>
        <form onSubmit={login} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div>
            <label style={{ display:'block', color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px', fontFamily:'system-ui' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width:'100%', background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', padding:'12px 16px', fontSize:'14px', outline:'none', boxSizing:'border-box', fontFamily:'system-ui' }}
              placeholder="la-tua@email.it" />
          </div>
          <div>
            <label style={{ display:'block', color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px', fontFamily:'system-ui' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width:'100%', background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', padding:'12px 16px', fontSize:'14px', outline:'none', boxSizing:'border-box', fontFamily:'system-ui' }}
              placeholder="••••••••" />
          </div>
          {error && <p style={{ color:'#E24B4A', fontSize:'13px', textAlign:'center', fontFamily:'system-ui' }}>{error}</p>}
          <button type="submit"
            style={{ background:'#C8A96A', color:'#0B0B0B', border:'none', padding:'14px', fontSize:'12px', letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontFamily:'system-ui', fontWeight:'500', marginTop:'8px' }}>
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
