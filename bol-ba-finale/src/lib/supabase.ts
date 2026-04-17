// Form submission senza Supabase — usa WhatsApp e mailto
export const sendReservation = (data: Record<string, string>) => {
  const msg = `Nuova prenotazione Bollicine:%0A` +
    `Nome: ${data.nome} ${data.cognome}%0A` +
    `Email: ${data.email}%0A` +
    `Tel: ${data.telefono}%0A` +
    `Data: ${data.data} alle ${data.orario}%0A` +
    `Persone: ${data.persone}%0A` +
    `Occasione: ${data.occasione || 'nessuna'}%0A` +
    `Note: ${data.note || 'nessuna'}`;
  window.open(`https://wa.me/393341312931?text=${msg}`, '_blank');
};

export const sendContact = (data: Record<string, string>) => {
  const subject = `Messaggio dal sito — ${data.nome}`;
  const body = `Nome: ${data.nome}%0AEmail: ${data.email}%0A%0A${data.messaggio}`;
  window.open(`mailto:info@bollicine.it?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
};

export const supabase = { from: () => ({ insert: async () => ({ error: null }) }) };
