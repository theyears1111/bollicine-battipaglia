import { navigate } from '../App';

export default function MobileBookingBtn() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-nero/90 backdrop-blur-sm border-t border-white/5">
      <button
        onClick={() => navigate('prenotazioni')}
        className="w-full btn-primary text-center"
      >
        Prenota il tuo tavolo
      </button>
    </div>
  );
}
