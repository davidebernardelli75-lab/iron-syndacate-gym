// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — data layer reale (sezioni admin estese)
// ─────────────────────────────────────────────────────────────

// ── DATI STATICI (invariati) ──────────────────────────────────

const GYM_INFO = {
  name: 'Iron Syndacate Gym',
  tagline: 'Forza. Disciplina. Costanza.',
  address: 'Via dell\'Industria 12, Valeggio sul Mincio (VR)',
  phone: '+39 045 000 0000',
  email: 'info@ironsyndacate.gym',
  whatsapp: '+39 333 000 0000',
  instagram: '@ironsyndacate.gym',
  hours: [
    { d: 'Lun – Ven', h: '06:00 – 23:00' },
    { d: 'Sabato',    h: '08:00 – 20:00' },
    { d: 'Domenica',  h: '09:00 – 13:00' },
    { d: 'Festivi',   h: 'Chiuso' },
  ],
};

// ── DATI DINAMICI (Supabase) ───────────────────────────────────

function getSB() {
  return new Promise((resolve) => {
    if (window._sb) return resolve(window._sb);
    const iv = setInterval(() => {
      if (window._sb) { clearInterval(iv); resolve(window._sb); }
    }, 50);
  });
}

const DB2 = {

  // Log accessi di oggi
  async getAccessLog() {
    const sb = await getSB();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await sb
      .from('access_log')
      .select('*, profiles(name, nickname)')
      .gte('created_at', today)
      .order('created_at', { ascending: false });
    if (error) { console.error('getAccessLog:', error); return []; }
    return data;
  },

  // Documenti in coda validazione
  async getDocsQueue() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('documents')
      .select('*, profiles(name, nickname)')
      .in('status', ['review', 'expired', 'unreadable'])
      .order('created_at', { ascending: false });
    if (error) { console.error('getDocsQueue:', error); return []; }
    return data;
  },

  // Approva documento
  async approveDoc(docId) {
    const sb = await getSB();
    const { error } = await sb
      .from('documents')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', docId);
    if (error) { console.error('approveDoc:', error); return false; }
    return true;
  },

  // Rifiuta documento
  async rejectDoc(docId, reason) {
    const sb = await getSB();
    const { error } = await sb
      .from('documents')
      .update({ status: 'rejected', reject_reason: reason, reviewed_at: new Date().toISOString() })
      .eq('id', docId);
    if (error) { console.error('rejectDoc:', error); return false; }
    return true;
  },

  // Canali chat
  async getChatChannels() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('chat_rooms')
      .select('*')
      .order('name', { ascending: true });
    if (error) { console.error('getChatChannels:', error); return []; }
    return data;
  },

  // Messaggi di un canale
  async getChatMessages(channelId) {
    const sb = await getSB();
    const { data, error } = await sb
      .from('chat_messages')
      .select('*, profiles(name, nickname)')
      .eq('room_id', channelId)
      .order('created_at', { ascending: true })
      .limit(50);
    if (error) { console.error('getChatMessages:', error); return []; }
    return data;
  },

  // Invia messaggio in un canale
  async sendMessage(channelId, text) {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return false;
    const { error } = await sb
      .from('chat_messages')
      .insert({ room_id: channelId, user_id: user.user.id, content: text });
    if (error) { console.error('sendMessage:', error); return false; }
    return true;
  },

  // Realtime: ascolta nuovi messaggi in un canale
  subscribeToChannel(channelId, onMessage) {
    if (!window._sb) return null;
    return window._sb
      .channel('room-' + channelId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${channelId}`
      }, payload => onMessage(payload.new))
      .subscribe();
  },

  // DM admin ↔ cliente
  async getDMThreads() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('chat_rooms')
      .select('*, profiles(name, nickname)')
      .eq('type', 'dm')
      .order('updated_at', { ascending: false });
    if (error) { console.error('getDMThreads:', error); return []; }
    return data;
  },

  // Messaggi di un DM
  async getDMMessages(threadId) {
    const sb = await getSB();
    const { data, error } = await sb
      .from('chat_messages')
      .select('*, profiles(name, nickname)')
      .eq('room_id', threadId)
      .order('created_at', { ascending: true });
    if (error) { console.error('getDMMessages:', error); return []; }
    return data;
  },

  // Segnalazioni chat
  async getChatReports() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('chat_reports')
      .select('*, profiles(name, nickname)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) { console.error('getChatReports:', error); return []; }
    return data;
  },

  // Vendite distributori di oggi
  async getVendingSales() {
    const sb = await getSB();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await sb
      .from('vending_sales')
      .select('*, profiles(name, nickname)')
      .gte('created_at', today)
      .order('created_at', { ascending: false });
    if (error) { console.error('getVendingSales:', error); return []; }
    return data;
  },

  // Promo codes
  async getPromoCodes() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('getPromoCodes:', error); return []; }
    return data;
  },

  // Aggiungi promo code
  async addPromoCode(code) {
    const sb = await getSB();
    const { error } = await sb.from('promo_codes').insert(code);
    if (error) { console.error('addPromoCode:', error); return false; }
    return true;
  },
};

// ── ESPORTA ────────────────────────────────────────────────────
Object.assign(window, { GYM_INFO, DB2 });