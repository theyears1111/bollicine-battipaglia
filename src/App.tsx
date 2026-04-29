import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBookingBtn from './components/MobileBookingBtn';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Menu from './pages/Menu';
import Vini from './pages/Vini';
import Degustazioni from './pages/Degustazioni';
import Galleria from './pages/Galleria';
import Recensioni from './pages/Recensioni';
import Prenotazioni from './pages/Prenotazioni';
import Eventi from './pages/Eventi';
import Contatti from './pages/Contatti';
import Admin from './admin/Admin';

export type Page = 'home'|'chi-siamo'|'menu'|'vini'|'degustazioni'|'galleria'|'recensioni'|'prenotazioni'|'eventi'|'contatti';

function getPageFromHash(): Page | 'admin' {
  const hash = window.location.hash.replace('#','').replace('/','');
  const valid: (Page|'admin')[] = ['home','chi-siamo','menu','vini','degustazioni','galleria','recensioni','prenotazioni','eventi','contatti','admin'];
  return valid.includes(hash as Page) ? (hash as Page) : 'home';
}

export function navigate(page: Page | 'admin') {
  window.location.hash = `#${page}`;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page|'admin'>(getPageFromHash());

  useEffect(() => {
    const onHash = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top:0, behavior:'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (currentPage === 'admin') return <Admin />;

  const renderPage = () => {
    switch(currentPage) {
      case 'chi-siamo':    return <ChiSiamo />;
      case 'menu':         return <Menu />;
      case 'vini':         return <Vini />;
      case 'degustazioni': return <Degustazioni />;
      case 'galleria':     return <Galleria />;
      case 'recensioni':   return <Recensioni />;
      case 'prenotazioni': return <Prenotazioni />;
      case 'eventi':       return <Eventi />;
      case 'contatti':     return <Contatti />;
      default:             return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-nero">
      <Navbar currentPage={currentPage as Page} />
      <main>{renderPage()}</main>
      <Footer />
      <MobileBookingBtn />
    </div>
  );
}

export default App;
