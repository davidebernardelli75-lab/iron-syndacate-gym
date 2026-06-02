// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — data layer reale (Supabase)
// Dati statici mantenuti, dati dinamici letti da DB
// ─────────────────────────────────────────────────────────────

// ── DATI STATICI (invariati) ──────────────────────────────────

const QUOTES = [
  "La disciplina pesa meno del rimpianto.",
  "Non devi essere motivato ogni giorno. Devi essere costante.",
  "Il ferro non mente: restituisce esattamente ciò che gli dai.",
  "Ogni ripetizione è un voto per la persona che vuoi diventare.",
  "La forza si costruisce quando nessuno guarda.",
  "Oggi non si salta. Oggi si costruisce.",
  "Non sei qui per allenarti. Sei qui per costruirti.",
  "Il ferro seleziona. La costanza costruisce.",
];

function quoteOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return QUOTES[day % QUOTES.length];
}

const SERVICES = [
  { id: 'bb',    tag: '01', it: 'Bodybuilding',       en: 'Hypertrophy',  desc: 'Ipertrofia e composizione corporea con schede dedicate.' },
  { id: 'str',   tag: '02', it: 'Allenamento Forza',  en: 'Strength',     desc: 'Powerlifting, alzate fondamentali, lavoro a percentuali.' },
  { id: 'plate', tag: '03', it: 'Plate Loaded Area',  en: 'Plate Loaded', desc: 'Linea completa Panatta a dischi. Carico reale, biomeccanica pura.' },
  { id: 'pt',    tag: '04', it: 'Personal Training',  en: '1:1 Coaching', desc: 'Coaching individuale con trainer certificati.' },
  { id: 'duo',   tag: '05', it: 'Allenamento Coppia', en: 'Duo Training', desc: 'Allenati con un partner, doppia motivazione.' },
  { id: 'sgt',   tag: '06', it: 'Small Group',        en: 'Small Group',  desc: 'Gruppi ridotti, attenzione tecnica massima.' },
  { id: 'fun',   tag: '07', it: 'Hybrid / Functional',en: 'Functional',   desc: 'Condizionamento ibrido, metcon, mobilità.' },
  { id: 'evt',   tag: '08', it: 'Eventi & Challenge', en: 'Events',       desc: 'Test day, gare interne, workshop tecnici.' },
];

const PLANS = [
  {
    id: 'start', name: 'Iron Start', period: 'Mensile', en: 'Monthly',
    price: 49, unit: '/mese', tagline: 'Inizia il percorso.',
    features: ['Accesso illimitato sala pesi', 'Linea Panatta completa', 'App e tessera QR', 'Citazione del giorno'],
    highlight: false,
  },
  {
    id: 'progress', name: 'Iron Progress', period: 'Trimestrale', en: 'Quarterly',
    price: 129, unit: '/3 mesi', tagline: 'Costruisci slancio.', save: 'Risparmi 18€',
    features: ['Tutto di Iron Start', '1 check tecnico incluso', 'Sospensione 7 giorni', 'Accesso eventi base'],
    highlight: false,
  },
  {
    id: 'discipline', name: 'Iron Discipline', period: 'Semestrale', en: '6 months',
    price: 229, unit: '/6 mesi', tagline: 'La scelta della costanza.', save: 'Risparmi 65€',
    features: ['Tutto di Iron Progress', '1 scheda personalizzata', '2 ingressi ospite', 'Sconto 10% distributori'],
    highlight: true, badge: 'Più scelto',
  },
  {
    id: 'legacy', name: 'Iron Legacy', period: 'Annuale', en: 'Annual',
    price: 399, unit: '/anno', tagline: 'Per chi non si ferma.', save: 'Risparmi 189€',
    features: ['Tutto di Iron Discipline', '3 sessioni PT incluse', 'Accesso prioritario eventi', 'Sospensione 30 giorni'],
    highlight: false,
  },
];

const PT_PACKS = [
  { id: 'pt1', name: 'PT Single Session', en: 'Single', price: 45, unit: 'sessione', desc: 'Lezione individuale 60 min.' },
  { id: 'duo', name: 'PT Duo',            en: 'Duo',    price: 30, unit: 'a testa',  desc: 'Sessione di coppia, 60 min.' },
  { id: 'sgt', name: 'Small Group',       en: 'Group',  price: 18, unit: 'a testa',  desc: 'Fino a 5 persone, 60 min.' },
];

const STATUS = {
  active:       { it: 'Attivo',                en: 'Active',       tone: 'ok'   },
  expiring:     { it: 'In scadenza',           en: 'Expiring',     tone: 'warn' },
  suspended:    { it: 'Sospeso',               en: 'Suspended',    tone: 'mute' },
  cert_missing: { it: 'Certificato mancante',  en: 'Cert missing', tone: 'bad'  },
  cert_expired: { it: 'Certificato scaduto',   en: 'Cert expired', tone: 'bad'  },
  doc_review:   { it: 'Documento da validare', en: 'Doc review',   tone: 'info' },
  unpaid:       { it: 'Pagamento insoluto',    en: 'Unpaid',       tone: 'bad'  },
};

// ── DATI DINAMICI (Supabase) ───────────────────────────────────

// Helper: aspetta il client Supabase
function getSB() {
  return new Promise((resolve) => {
    if (window._sb) return resolve(window._sb);
    const iv = setInterval(() => {
      if (window._sb) { clearInterval(iv); resolve(window._sb); }
    }, 50);
  });
}

const DB = {

  // Lista clienti (admin)
  async getClients() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('role', 'cliente')
      .order('created_at', { ascending: false });
    if (error) { console.error('getClients:', error); return []; }
    return data;
  },

  // KPI dashboard
  async getKPI() {
    const sb = await getSB();
    const today = new Date().toISOString().split('T')[0];

    const [
      { count: activeMembers },
      { count: expiringSubs },
      { count: certMissing },
      { count: docsToReview },
    ] = await Promise.all([
      sb.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      sb.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'expiring'),
      sb.from('profiles').select('*', { count: 'exact', head: true }).eq('medical_cert_status', 'missing'),
      sb.from('documents').select('*', { count: 'exact', head: true }).eq('status', 'review'),
    ]);

    const { data: revenueData } = await sb
      .from('payments')
      .select('amount')
      .gte('created_at', today);

    const revenueToday = (revenueData || []).reduce((s, r) => s + (r.amount || 0), 0);

    return {
      activeMembers: activeMembers || 0,
      expiringSubs: expiringSubs || 0,
      certMissing: certMissing || 0,
      docsToReview: docsToReview || 0,
      revenueToday,
    };
  },

  // Eventi
  async getEvents() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (error) { console.error('getEvents:', error); return []; }
    return data;
  },

  // Vending
  async getVending() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('vending_products')
      .select('*')
      .order('category', { ascending: true });
    if (error) { console.error('getVending:', error); return []; }
    return data;
  },

  // Prenotazioni oggi
  async getTodayBookings() {
    const sb = await getSB();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await sb
      .from('bookings')
      .select('*, profiles(name)')
      .eq('date', today)
      .order('time', { ascending: true });
    if (error) { console.error('getTodayBookings:', error); return []; }
    return data;
  },

  // Todo items admin
  async getTodoItems() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('todo_items')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (error) { console.error('getTodoItems:', error); return []; }
    return data;
  },

  // Accessi recenti
  async getRecentAccess() {
    const sb = await getSB();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await sb
      .from('access_log')
      .select('*, profiles(name)')
      .gte('created_at', today)
      .order('created_at', { ascending: false })
      .limit(10);
    if (error) { console.error('getRecentAccess:', error); return []; }
    return data;
  },

  // Serie entrate ultimi 8 mesi
  async getRevenueSeries() {
    const sb = await getSB();
    const { data, error } = await sb
      .from('revenue_monthly')
      .select('*')
      .order('month', { ascending: true })
      .limit(8);
    if (error) { console.error('getRevenueSeries:', error); return []; }
    return data;
  },
};

// ── ESPORTA ────────────────────────────────────────────────────
Object.assign(window, {
  QUOTES, quoteOfTheDay, SERVICES, PLANS, PT_PACKS, STATUS, DB,
});