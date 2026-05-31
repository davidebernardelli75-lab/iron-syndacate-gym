// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — demo data (area cliente + sito desktop)
// ─────────────────────────────────────────────────────────────

const ME = {
  name: 'Marco Bellini', first: 'Marco', nick: 'Iron_Marco', id: 'ISG-2026-0412',
  email: 'marco.bellini@email.it', phone: '+39 333 12 45 678', dob: '12/07/1992',
  cf: 'BLLMRC92L12L781K', address: 'Via Roma 8, Valeggio sul Mincio (VR)',
  plan: 'Iron Legacy', planPeriod: 'Annuale', expiry: '14 Gen 2027', expiryDays: 228,
  cert: 'valid', certExp: '02 Nov 2026', certDays: 155,
  credit: 18.50, access: 412,
  consents: { chat: true, privacy: true, marketing: false, data: true },
};

const TRAINERS = [
  { id: 'mf', name: 'Matteo Ferraro', short: 'M. Ferraro', role: 'Head Coach · Forza',        specialty: 'Powerlifting, forza massimale, alzate fondamentali', rating: 4.9 },
  { id: 'sv', name: 'Sara Vinco',     short: 'S. Vinco',    role: 'Coach · Mobility & Functional', specialty: 'Mobilità, ibrido, prevenzione infortuni',          rating: 4.8 },
  { id: 'lb', name: 'Luca Bertoldi',  short: 'L. Bertoldi', role: 'Coach · Bodybuilding',       specialty: 'Ipertrofia, ricomposizione, gara',                  rating: 4.9 },
];

const BOOKING_TYPES = [
  { id: 'single', name: 'PT Singolo',   desc: '1:1 con il coach · 60 min',     price: 45, icon: 'user' },
  { id: 'duo',    name: 'PT Coppia',    desc: 'Con un partner · 60 min',       price: 30, icon: 'users' },
  { id: 'group',  name: 'Small Group',  desc: 'Fino a 5 persone · 60 min',     price: 18, icon: 'users' },
  { id: 'check',  name: 'Check tecnico',desc: 'Valutazione e scheda · 45 min', price: 0,  icon: 'doc' },
];

// fasce orarie con disponibilità
const BOOK_DAYS = [
  { d: 'Lun', n: '02', full: false }, { d: 'Mar', n: '03', full: false }, { d: 'Mer', n: '04', full: false },
  { d: 'Gio', n: '05', full: false }, { d: 'Ven', n: '06', full: false }, { d: 'Sab', n: '07', full: true },
];
const BOOK_SLOTS = [
  { t: '07:00', free: true }, { t: '08:30', free: true }, { t: '10:00', free: false },
  { t: '12:00', free: true }, { t: '17:30', free: false }, { t: '19:00', free: true }, { t: '20:30', free: true },
];

const MY_BOOKINGS = [
  { date: '02 Giu', time: '07:00', type: 'PT Singolo',  coach: 'M. Ferraro', state: 'confermata' },
  { date: '05 Giu', time: '19:00', type: 'Small Group', coach: 'S. Vinco',   state: 'confermata' },
  { date: '11 Giu', time: '18:00', type: 'Check tecnico',coach: 'L. Bertoldi',state: 'in attesa' },
];

const MY_DOCS = [
  { id: 'id',   name: "Carta d'identità", icon: 'card',  status: 'valid',   exp: '02 Giu 2031', sub: 'Validato dall\'amministrazione' },
  { id: 'cert', name: 'Certificato medico', icon: 'shield', status: 'valid', exp: '02 Nov 2026', sub: 'Tipo: non agonistico' },
  { id: 'mod',  name: 'Modulo iscrizione', icon: 'doc',  status: 'valid',   exp: null,          sub: 'Firmato il 14 Gen 2026' },
  { id: 'lib',  name: 'Liberatoria immagine', icon: 'doc', status: 'missing', exp: null,         sub: 'Non ancora caricato' },
];
const docClientMap = {
  valid:   { tone: 'ok',   label: 'Valido' },
  review:  { tone: 'info', label: 'In revisione' },
  expired: { tone: 'bad',  label: 'Scaduto' },
  missing: { tone: 'warn', label: 'Mancante' },
};

const NOTIFS = [
  { id: 'n1', icon: 'shield',   tone: 'warn', title: 'Certificato in scadenza',  body: 'Il tuo certificato medico scade tra 155 giorni. Pianifica la visita.', time: '2 giorni fa', read: false },
  { id: 'n2', icon: 'check',    tone: 'ok',   title: 'Prenotazione confermata',  body: 'PT Singolo con M. Ferraro · 02 Giu, 07:00.', time: '3 giorni fa', read: false },
  { id: 'n3', icon: 'bolt',     tone: 'fire', title: 'Credito ricaricato',        body: 'Hai aggiunto 20€ di credito per i distributori.', time: '1 settimana fa', read: true },
  { id: 'n4', icon: 'calendar', tone: 'info', title: 'Nuovo evento disponibile',  body: 'Strength Test Day · 06 Giu. Posti limitati.', time: '1 settimana fa', read: true },
];

// chat cliente ↔ staff (vista cliente)
const CLIENT_DM = [
  { from: 'admin',  time: '14 Gen · 10:02', text: 'Benvenuto in Iron Syndacate, Marco! La tua tessera è attiva. Per qualsiasi cosa scrivici qui.' },
  { from: 'client', time: '14 Gen · 10:20', text: 'Grazie! Volevo prenotare una prima valutazione con un coach.' },
  { from: 'admin',  time: '14 Gen · 10:24', text: 'Perfetto, usa la sezione "Prenota" e scegli "Check tecnico". Ti consiglio Matteo per la forza.' },
];

Object.assign(window, {
  ME, TRAINERS, BOOKING_TYPES, BOOK_DAYS, BOOK_SLOTS, MY_BOOKINGS,
  MY_DOCS, docClientMap, NOTIFS, CLIENT_DM,
});
