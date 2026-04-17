import { useState, useEffect } from 'react';
import { Menu, X, Wine } from 'lucide-react';
import { navigate, type Page } from '../App';

interface NavbarProps { currentPage: Page; }

const navLinks: { label: string; page: Page }[] = [
  { label: 'Chi Siamo', page: 'chi-siamo' },
  { label: 'Menu', page: 'menu' },
  { label: 'Carta dei Vini', page: 'vini' },
  { label: 'Degustazioni', page: 'degustazioni' },
  { label: 'Galleria', page: 'galleria' },
  { label: 'Recensioni', page: 'recensioni' },
  { label: 'Eventi', page: 'eventi' },
  { label: 'Contatti', page: 'contatti' },
];

export default function Navbar({ currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [currentPage]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? 'bg-nero/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <Wine size={22} className="text-oro group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif text-2xl text-white tracking-widest">BOLLICINE</span>
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                  currentPage === link.page ? 'text-oro' : 'text-white/70 hover:text-oro'
                }`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => navigate('prenotazioni')} className="btn-primary ml-4">Prenota</button>
          </div>
          <button className="lg:hidden text-white hover:text-oro transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-nero flex flex-col pt-24 px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)}
                className={`text-left font-serif text-3xl transition-colors duration-200 ${
                  currentPage === link.page ? 'text-oro' : 'text-white hover:text-oro'
                }`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => navigate('prenotazioni')} className="btn-primary mt-6 text-center">Prenota ora</button>
            <a href="tel:+393341312931" className="text-white/50 font-sans text-sm tracking-widest text-center mt-2">334 131 2931</a>
          </div>
        </div>
      )}
    </>
  );
}
