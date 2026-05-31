// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — demo data (bilingue IT/EN dove utile)
// ─────────────────────────────────────────────────────────────

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

// citazione del giorno — deterministica sul giorno dell'anno
function quoteOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return QUOTES[day % QUOTES.length];
}

const SERVICES = [
  { id: 'bb',   tag: '01', it: 'Bodybuilding',        en: 'Hypertrophy',     desc: 'Ipertrofia e composizione corporea con schede dedicate.' },
  { id: 'str',  tag: '02', it: 'Allenamento Forza',   en: 'Strength',        desc: 'Powerlifting, alzate fondamentali, lavoro a percentuali.' },
  { id: 'plate',tag: '03', it: 'Plate Loaded Area',   en: 'Plate Loaded',    desc: 'Linea completa Panatta a dischi. Carico reale, biomeccanica pura.' },
  { id: 'pt',   tag: '04', it: 'Personal Training',   en: '1:1 Coaching',    desc: 'Coaching individuale con trainer certificati.' },
  { id: 'duo',  tag: '05', it: 'Allenamento Coppia',  en: 'Duo Training',    desc: 'Allenati con un partner, doppia motivazione.' },
  { id: 'sgt',  tag: '06', it: 'Small Group',         en: 'Small Group',     desc: 'Gruppi ridotti, attenzione tecnica massima.' },
  { id: 'fun',  tag: '07', it: 'Hybrid / Functional', en: 'Functional',      desc: 'Condizionamento ibrido, metcon, mobilità.' },
  { id: 'evt',  tag: '08', it: 'Eventi & Challenge',  en: 'Events',          desc: 'Test day, gare interne, workshop tecnici.' },
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
  { id: 'duo', name: 'PT Duo',            en: 'Duo',    price: 30, unit: 'a testa',   desc: 'Sessione di coppia, 60 min.' },
  { id: 'sgt', name: 'Small Group',       en: 'Group',  price: 18, unit: 'a testa',   desc: 'Fino a 5 persone, 60 min.' },
];

const EVENTS = [
  { id: 'e1', title: 'Strength Test Day',          date: '2026-06-06', time: '10:00', dur: '2h', spots: 18, taken: 14, price: 0,  cat: 'Test',      coach: 'M. Ferraro' },
  { id: 'e2', title: 'Deadlift Challenge',         date: '2026-06-13', time: '17:30', dur: '3h', spots: 24, taken: 24, price: 15, cat: 'Challenge', coach: 'L. Bertoldi' },
  { id: 'e3', title: 'Iron Mobility Class',        date: '2026-06-09', time: '19:00', dur: '1h', spots: 16, taken: 7,  price: 0,  cat: 'Class',     coach: 'S. Vinco' },
  { id: 'e4', title: 'Nutrition Talk',             date: '2026-06-11', time: '20:30', dur: '1h', spots: 40, taken: 22, price: 0,  cat: 'Workshop',  coach: 'Dr. Conti' },
  { id: 'e5', title: 'Hyrox Conditioning',         date: '2026-06-16', time: '18:00', dur: '90m',spots: 20, taken: 11, price: 8,  cat: 'Hybrid',    coach: 'M. Ferraro' },
  { id: 'e6', title: 'Open Gym Night',             date: '2026-06-20', time: '21:00', dur: '3h', spots: 60, taken: 38, price: 0,  cat: 'Open',      coach: 'Staff' },
];

const VENDING = [
  { id: 'v1', name: 'Whey Protein Shake', price: 3.50, stock: 24, cat: 'Recovery' },
  { id: 'v2', name: 'EAA Drink',          price: 2.80, stock: 31, cat: 'Intra' },
  { id: 'v3', name: 'BCAA',               price: 2.50, stock: 12, cat: 'Intra' },
  { id: 'v4', name: 'Electrolytes',       price: 2.00, stock: 40, cat: 'Hydration' },
  { id: 'v5', name: 'Protein Bar',        price: 2.20, stock: 6,  cat: 'Snack' },
  { id: 'v6', name: 'Pre Workout Shot',   price: 3.90, stock: 18, cat: 'Pre' },
  { id: 'v7', name: 'Recovery Drink',     price: 3.20, stock: 9,  cat: 'Recovery' },
];

// stati cliente: active | expiring | suspended | cert_missing | cert_expired | doc_review | unpaid
const STATUS = {
  active:       { it: 'Attivo',                en: 'Active',          tone: 'ok'   },
  expiring:     { it: 'In scadenza',           en: 'Expiring',        tone: 'warn' },
  suspended:    { it: 'Sospeso',               en: 'Suspended',       tone: 'mute' },
  cert_missing: { it: 'Certificato mancante',  en: 'Cert missing',    tone: 'bad'  },
  cert_expired: { it: 'Certificato scaduto',   en: 'Cert expired',    tone: 'bad'  },
  doc_review:   { it: 'Documento da validare', en: 'Doc review',      tone: 'info' },
  unpaid:       { it: 'Pagamento insoluto',    en: 'Unpaid',          tone: 'bad'  },
};

const CLIENTS = [
  { id: 'c01', name: 'Marco Bellini',    nick: 'Iron_Marco',   plan: 'Iron Legacy',     status: 'active',       expiry: '2027-01-14', cert: 'valid',   certExp: '2026-11-02', credit: 18.50, lastAccess: 'Oggi · 07:42', access: 412, sex: 'M' },
  { id: 'c02', name: 'Giulia Tonon',     nick: 'GiuStrong',    plan: 'Iron Discipline', status: 'expiring',     expiry: '2026-06-09', cert: 'valid',   certExp: '2026-08-20', credit: 4.20,  lastAccess: 'Ieri · 19:10', access: 188, sex: 'F' },
  { id: 'c03', name: 'Davide Rossi',     nick: 'DaveLift',     plan: 'Iron Progress',   status: 'cert_expired', expiry: '2026-08-30', cert: 'expired', certExp: '2026-05-01', credit: 0,     lastAccess: '3 giorni fa',  access: 96,  sex: 'M' },
  { id: 'c04', name: 'Sara Vinco',       nick: 'SaraV',        plan: 'Iron Discipline', status: 'doc_review',   expiry: '2026-10-12', cert: 'review',  certExp: '—',          credit: 9.00,  lastAccess: 'Oggi · 08:05', access: 240, sex: 'F' },
  { id: 'c05', name: 'Luca Bertoldi',    nick: 'BigLuca',      plan: 'Iron Legacy',     status: 'active',       expiry: '2026-12-01', cert: 'valid',   certExp: '2027-02-15', credit: 33.10, lastAccess: 'Oggi · 06:58', access: 521, sex: 'M' },
  { id: 'c06', name: 'Elena Conti',      nick: 'EleC',         plan: 'Iron Start',      status: 'unpaid',       expiry: '2026-06-02', cert: 'valid',   certExp: '2026-09-30', credit: 0,     lastAccess: '6 giorni fa',  access: 41,  sex: 'F' },
  { id: 'c07', name: 'Matteo Ferraro',   nick: 'CoachMatt',    plan: 'Staff',           status: 'active',       expiry: '—',          cert: 'valid',   certExp: '2027-04-10', credit: 0,     lastAccess: 'Oggi · 06:30', access: 980, sex: 'M' },
  { id: 'c08', name: 'Anna Galli',       nick: 'AnnaG',        plan: 'Iron Progress',   status: 'cert_missing', expiry: '2026-09-18', cert: 'missing', certExp: '—',          credit: 2.00,  lastAccess: '2 giorni fa',  access: 58,  sex: 'F' },
  { id: 'c09', name: 'Paolo Mazzi',      nick: 'PaoloM',       plan: 'Iron Discipline', status: 'active',       expiry: '2026-11-22', cert: 'valid',   certExp: '2026-12-05', credit: 12.40, lastAccess: 'Ieri · 18:22', access: 305, sex: 'M' },
  { id: 'c10', name: 'Chiara Ferri',     nick: 'ChiaraF',      plan: 'Iron Start',      status: 'expiring',     expiry: '2026-06-07', cert: 'valid',   certExp: '2026-07-19', credit: 6.80,  lastAccess: 'Oggi · 12:15', access: 77,  sex: 'F' },
  { id: 'c11', name: 'Riccardo Negri',   nick: 'RickN',        plan: 'Iron Legacy',     status: 'suspended',    expiry: '2026-12-30', cert: 'valid',   certExp: '2026-10-11', credit: 0,     lastAccess: '21 giorni fa', access: 156, sex: 'M' },
  { id: 'c12', name: 'Federica Lai',     nick: 'FedeFit',      plan: 'Iron Progress',   status: 'active',       expiry: '2026-08-14', cert: 'valid',   certExp: '2026-09-01', credit: 21.00, lastAccess: 'Oggi · 09:48', access: 134, sex: 'F' },
];

// dashboard KPI + serie
const KPI = {
  activeMembers: 248,
  newSignups: 17,
  expiringSubs: 9,
  certMissing: 6,
  docsToReview: 4,
  todayBookings: 12,
  revenueToday: 640,
  revenueMonth: 18420,
  accessToday: 94,
  vendingMonth: 1280,
};

// entrate ultimi 8 mesi (€)
const REVENUE_SERIES = [
  { m: 'Ott', v: 12400 }, { m: 'Nov', v: 13950 }, { m: 'Dic', v: 11800 },
  { m: 'Gen', v: 16100 }, { m: 'Feb', v: 15400 }, { m: 'Mar', v: 17250 },
  { m: 'Apr', v: 16880 }, { m: 'Mag', v: 18420 },
];

// accessi per fascia oraria (oggi)
const ACCESS_SERIES = [
  { h: '06', v: 22 }, { h: '08', v: 31 }, { h: '10', v: 14 }, { h: '12', v: 9 },
  { h: '14', v: 7 },  { h: '16', v: 12 }, { h: '18', v: 38 }, { h: '20', v: 28 }, { h: '22', v: 6 },
];

const TODAY_BOOKINGS = [
  { time: '07:00', client: 'Marco Bellini', type: 'PT Single', coach: 'M. Ferraro', state: 'confermata' },
  { time: '09:30', client: 'Federica Lai',  type: 'Check tecnico', coach: 'S. Vinco', state: 'confermata' },
  { time: '12:00', client: 'Chiara Ferri',  type: 'PT Duo',    coach: 'L. Bertoldi', state: 'in attesa' },
  { time: '18:00', client: 'Small Group',   type: 'Small Group', coach: 'M. Ferraro', state: 'confermata' },
  { time: '19:30', client: 'Paolo Mazzi',   type: 'PT Single', coach: 'S. Vinco', state: 'confermata' },
];

const TODO_ITEMS = [
  { id: 't1', kind: 'doc',  label: 'Documento identità da validare', who: 'Sara Vinco',   when: '08:05' },
  { id: 't2', kind: 'cert', label: 'Certificato scaduto',            who: 'Davide Rossi',  when: '01 Mag' },
  { id: 't3', kind: 'cert', label: 'Certificato mancante',           who: 'Anna Galli',    when: '—' },
  { id: 't4', kind: 'pay',  label: 'Pagamento insoluto · 49€',       who: 'Elena Conti',   when: '02 Giu' },
  { id: 't5', kind: 'sub',  label: 'Abbonamento in scadenza',        who: 'Giulia Tonon',  when: '09 Giu' },
];

const RECENT_ACCESS = [
  { name: 'Luca Bertoldi',  time: '06:58', ok: true },
  { name: 'Marco Bellini',  time: '07:42', ok: true },
  { name: 'Sara Vinco',     time: '08:05', ok: true },
  { name: 'Federica Lai',   time: '09:48', ok: true },
  { name: 'Davide Rossi',   time: '10:12', ok: false, reason: 'Certificato scaduto' },
  { name: 'Chiara Ferri',   time: '12:15', ok: true },
];

Object.assign(window, {
  QUOTES, quoteOfTheDay, SERVICES, PLANS, PT_PACKS, EVENTS, VENDING,
  STATUS, CLIENTS, KPI, REVENUE_SERIES, ACCESS_SERIES, TODAY_BOOKINGS,
  TODO_ITEMS, RECENT_ACCESS,
});
