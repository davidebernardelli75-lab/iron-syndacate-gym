// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — data layer reale (area cliente)
// ─────────────────────────────────────────────────────────────

// ── DATI STATICI (invariati) ──────────────────────────────────

const TRAINERS = [
  { id: 'mf', name: 'Matteo Ferraro', short: 'M. Ferraro', role: 'Head Coach · Forza',            specialty: 'Powerlifting, forza massimale, alzate fondamentali', rating: 4.9 },
  { id: 'sv', name: 'Sara Vinco',     short: 'S. Vinco',    role: 'Coach · Mobility & Functional', specialty: 'Mobilità, ibrido, prevenzione infortuni',            rating: 4.8 },
  { id: 'lb', name: 'Luca Bertoldi',  short: 'L. Bertoldi', role: 'Coach · Bodybuilding',          specialty: 'Ipertrofia, ricomposizione, gara',                   rating: 4.9 },
];

const BOOKING_TYPES = [
  { id: 'single', name: 'PT Singolo',    desc: '1:1 con il coach · 60 min',     price: 45, icon: 'user' },
  { id: 'duo',    name: 'PT Coppia',     desc: 'Con un partner · 60 min',       price: 30, icon: 'users' },
  { id: 'group',  name: 'Small Group',   desc: 'Fino a 5 persone · 60 min',     price: 18, icon: 'users' },
  { id: 'check',  name: 'Check tecnico', desc: 'Valutazione e scheda · 45 min', price: 0,  icon: 'doc' },
];

const docClientMap = {
  valid:   { tone: 'ok',   label: 'Valido' },
  review:  { tone: 'info', label: 'In revisione' },
  expired: { tone: 'bad',  label: 'Scaduto' },
  missing: { tone: 'warn', label: 'Mancante' },
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

const DB3 = {

  // Profilo cliente corrente (sostituisce ME statico)
  async getMe() {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return null;
    const { data: profile } = await sb
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();
    if (!profile) return null;
    return {
      name: ((profile.first_name || '') + ' ' + (profile.last_name || '')).trim(),
      first: profile.first_name || 'Atleta',
      nick: profile.nickname || 'Atleta',
      id: profile.member_id || profile.id,
      email: user.user.email,
      phone: profile.phone || '—',
      dob: profile.date_of_birth || '—',
      cf: profile.fiscal_code || '—',
      address: profile.address || '—',
      plan: profile.plan_name || 'Nessun abbonamento',
      planPeriod: profile.plan_period || '—',
      expiry: profile.membership_expiry || '—',
      expiryDays: profile.expiry_days || 0,
      cert: profile.medical_cert_status || 'missing',
      certExp: profile.medical_cert_expiry || '—',
      certDays: profile.cert_days || 0,
      credit: profile.credit_balance || 0,
      access: profile.access_count || 0,
      consents: profile.consents || { chat: false, privacy: true, marketing: false, data: true },
    };
  },

  // Prenotazioni del cliente
  async getMyBookings() {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return [];
    const { data, error } = await sb
      .from('bookings')
      .select('*')
      .eq('user_id', user.user.id)
      .order('date', { ascending: true });
    if (error) { console.error('getMyBookings:', error); return []; }
    return data;
  },

  // Crea prenotazione
  async addBooking(booking) {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return false;
    const { error } = await sb
      .from('bookings')
      .insert({ ...booking, user_id: user.user.id });
    if (error) { console.error('addBooking:', error); return false; }
    return true;
  },

  // Cancella prenotazione
  async cancelBooking(bookingId) {
    const sb = await getSB();
    const { error } = await sb
      .from('bookings')
      .update({ state: 'cancellata' })
      .eq('id', bookingId);
    if (error) { console.error('cancelBooking:', error); return false; }
    return true;
  },

  // Slot disponibili per una data
  async getAvailableSlots(date, coachId) {
    const sb = await getSB();
    const { data, error } = await sb
      .from('booking_slots')
      .select('*')
      .eq('date', date)
      .eq('coach_id', coachId)
      .eq('available', true)
      .order('time', { ascending: true });
    if (error) { console.error('getAvailableSlots:', error); return []; }
    return data;
  },

  // Documenti del cliente
  async getMyDocs() {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return [];
    const { data, error } = await sb
      .from('documents')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });
    if (error) { console.error('getMyDocs:', error); return []; }
    return data;
  },

  // Carica documento
  async uploadDoc(file, type) {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return false;
    const path = `${user.user.id}/${type}-${Date.now()}`;
    const { error: uploadError } = await sb.storage
      .from('documents')
      .upload(path, file);
    if (uploadError) { console.error('uploadDoc storage:', uploadError); return false; }
    const { error: dbError } = await sb
      .from('documents')
      .insert({ user_id: user.user.id, type, storage_path: path, status: 'review' });
    if (dbError) { console.error('uploadDoc db:', dbError); return false; }
    return true;
  },

  // Notifiche del cliente
  async getNotifs() {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return [];
    const { data, error } = await sb
      .from('notifications')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) { console.error('getNotifs:', error); return []; }
    return data;
  },

  // Segna notifica come letta
  async markNotifRead(notifId) {
    const sb = await getSB();
    const { error } = await sb
      .from('notifications')
      .update({ read: true })
      .eq('id', notifId);
    if (error) { console.error('markNotifRead:', error); return false; }
    return true;
  },

  // DM cliente ↔ staff
  async getClientDM() {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return [];
    const { data: room } = await sb
      .from('chat_rooms')
      .select('id')
      .eq('type', 'dm')
      .eq('client_id', user.user.id)
      .single();
    if (!room) return [];
    const { data, error } = await sb
      .from('chat_messages')
      .select('*, profiles(name, nickname)')
      .eq('room_id', room.id)
      .order('created_at', { ascending: true });
    if (error) { console.error('getClientDM:', error); return []; }
    return data;
  },

  // Invia messaggio DM
  async sendClientDM(text) {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return false;
    const { data: room } = await sb
      .from('chat_rooms')
      .select('id')
      .eq('type', 'dm')
      .eq('client_id', user.user.id)
      .single();
    if (!room) return false;
    const { error } = await sb
      .from('chat_messages')
      .insert({ room_id: room.id, user_id: user.user.id, content: text });
    if (error) { console.error('sendClientDM:', error); return false; }
    return true;
  },

  // Realtime: ascolta nuovi messaggi DM
  async subscribeToDM(onMessage) {
    const sb = await getSB();
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return null;
    const { data: room } = await sb
      .from('chat_rooms')
      .select('id')
      .eq('type', 'dm')
      .eq('client_id', user.user.id)
      .single();
    if (!room) return null;
    return sb.channel('dm-' + room.id)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${room.id}`
      }, payload => onMessage(payload.new))
      .subscribe();
  },
};

// ── ESPORTA ────────────────────────────────────────────────────
Object.assign(window, { TRAINERS, BOOKING_TYPES, docClientMap, DB3 });