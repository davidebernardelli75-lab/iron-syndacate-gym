// ─────────────────────────────────────────────────────────────
// IRON SYNDACATE GYM — demo data (sezioni admin estese)
// ─────────────────────────────────────────────────────────────

// ---- Accessi: log ingressi di oggi ----
const ACCESS_LOG = [
  { time: '12:48', name: 'Federica Lai',   nick: 'FedeFit',   method: 'QR',      ok: true },
  { time: '12:15', name: 'Chiara Ferri',   nick: 'ChiaraF',   method: 'QR',      ok: true },
  { time: '11:30', name: 'Ospite · Prova', nick: '—',         method: 'Manuale', ok: true,  note: 'Prova gratuita · autorizzata reception' },
  { time: '10:12', name: 'Davide Rossi',   nick: 'DaveLift',  method: 'QR',      ok: false, reason: 'Certificato medico scaduto' },
  { time: '09:48', name: 'Federica Lai',   nick: 'FedeFit',   method: 'Badge',   ok: true },
  { time: '08:31', name: 'Elena Conti',    nick: 'EleC',      method: 'QR',      ok: false, reason: 'Pagamento insoluto · 49€' },
  { time: '08:05', name: 'Sara Vinco',     nick: 'SaraV',     method: 'QR',      ok: true },
  { time: '07:42', name: 'Marco Bellini',  nick: 'Iron_Marco',method: 'QR',      ok: true },
  { time: '06:58', name: 'Luca Bertoldi',  nick: 'BigLuca',   method: 'Badge',   ok: true },
  { time: '06:30', name: 'Matteo Ferraro', nick: 'CoachMatt', method: 'QR',      ok: true,  note: 'Staff' },
];

// coda check-in da simulare (lo scanner "scansiona" questi a rotazione)
const CHECKIN_QUEUE = [
  { name: 'Paolo Mazzi',   nick: 'PaoloM',   id: 'ISG-2026-0309', ok: true,  plan: 'Iron Discipline', cert: 'Valido' },
  { name: 'Anna Galli',    nick: 'AnnaG',    id: 'ISG-2026-0058', ok: false, plan: 'Iron Progress',   cert: 'Mancante', reason: 'Certificato medico mancante' },
  { name: 'Giulia Tonon',  nick: 'GiuStrong',id: 'ISG-2026-0188', ok: true,  plan: 'Iron Discipline', cert: 'Valido' },
  { name: 'Riccardo Negri',nick: 'RickN',    id: 'ISG-2026-0156', ok: false, plan: 'Iron Legacy',     cert: 'Valido',  reason: 'Abbonamento sospeso' },
];

// ---- Documenti: coda validazione con dati OCR estratti ----
const DOCS_QUEUE = [
  {
    id: 'd1', client: 'Sara Vinco', nick: 'SaraV', type: "Carta d'identità", uploaded: 'Oggi · 08:05',
    status: 'review', confidence: 96,
    ocr: { Nome: 'Sara', Cognome: 'Vinco', 'Data di nascita': '14/03/1995', 'Codice fiscale': 'VNCSRA95C54L781H',
      'Numero documento': 'CA84210ZX', 'Data rilascio': '02/06/2021', 'Data scadenza': '02/06/2031', Comune: 'Valeggio s/M' },
    flags: [],
  },
  {
    id: 'd2', client: 'Davide Rossi', nick: 'DaveLift', type: 'Certificato medico', uploaded: 'Oggi · 09:40',
    status: 'expired', confidence: 91,
    ocr: { Nome: 'Davide', Cognome: 'Rossi', 'Tipo attività': 'Agonistica', 'Data emissione': '01/05/2025',
      'Data scadenza': '01/05/2026', 'Ente certificatore': 'Centro Medico Sportivo VR', Medico: 'Dr. A. Bianchi' },
    flags: ['Certificato scaduto il 01/05/2026'],
  },
  {
    id: 'd3', client: 'Marco Bellini', nick: 'Iron_Marco', type: 'Certificato medico', uploaded: 'Ieri · 18:22',
    status: 'review', confidence: 88,
    ocr: { Nome: 'Marco', Cognome: 'Bellini', 'Tipo attività': 'Non agonistica', 'Data emissione': '02/11/2025',
      'Data scadenza': '02/11/2026', 'Ente certificatore': 'Poliambulatorio Mincio', Medico: 'Dr.ssa L. Conti' },
    flags: [],
  },
  {
    id: 'd4', client: 'Anna Galli', nick: 'AnnaG', type: 'Modulo iscrizione', uploaded: 'Ieri · 11:10',
    status: 'unreadable', confidence: 42,
    ocr: { Nome: 'Anna', Cognome: 'Galli', Firma: 'rilevata', Note: 'Scansione parzialmente illeggibile' },
    flags: ['Qualità immagine bassa', 'Codice fiscale non leggibile'],
  },
];

// ---- Chat community: canali ----
const CHAT_CHANNELS = [
  { id: 'gen',  name: 'Generale',           count: 248, unread: 0 },
  { id: 'all',  name: 'Allenamento',        count: 186, unread: 3 },
  { id: 'evt',  name: 'Eventi',             count: 142, unread: 0 },
  { id: 'cha',  name: 'Challenge',          count: 97,  unread: 0 },
  { id: 'com',  name: 'Comunicazioni',      count: 248, unread: 0, official: true },
  { id: 'nut',  name: 'Nutrizione',         count: 121, unread: 1 },
  { id: 'partner', name: 'Cerco compagno',  count: 64,  unread: 0 },
];

const CHAT_MESSAGES = {
  all: [
    { nick: 'ISG · Staff', time: '08:00', text: 'Ricordate: lunedì manutenzione sulla pressa orizzontale Panatta. Usate la verticale 💪', pinned: true, official: true },
    { nick: 'BigLuca',    time: '09:12', text: 'Qualcuno per uno stacco pesante stasera alle 19? Cerco spotter serio.' },
    { nick: 'GiuStrong',  time: '09:20', text: 'Ci sono! Io scaldo dalle 18:45.' },
    { nick: 'DaveLift',   time: '09:34', text: 'Nuovo PR panca 110kg, finalmente 🔥', flagged: false },
    { nick: 'Iron_Marco', time: '09:41', text: 'Grande Dave. La costanza paga.' },
    { nick: 'AnnaG',      time: '10:02', text: 'Compra integratori a sconto dal link ►► spam-site.ru/deal', flagged: true },
    { nick: 'FedeFit',    time: '10:15', text: 'Domanda tecnica: meglio rest-pause o drop set sulle isotoniche?' },
  ],
  nut: [
    { nick: 'EleC',       time: '07:50', text: 'Qualcuno usa la whey dei distributori dopo il WO? Si trova bene?' },
    { nick: 'PaoloM',     time: '08:10', text: 'Sì, ottima. Io abbino EAA intra-workout.' },
    { nick: 'CoachMatt',  time: '08:30', text: 'Ragazzi, ricordate che gli integratori non sostituiscono i pasti. Base solida prima di tutto.', official: true },
  ],
};

// ---- DM admin ↔ cliente ----
const DM_THREADS = [
  { id: 'dm1', client: 'Davide Rossi',  nick: 'DaveLift', unread: 1, time: '10:14', status: 'aperta',
    last: 'Il tuo certificato medico risulta scaduto…',
    msgs: [
      { from: 'admin', time: '10:14', text: 'Ciao Davide, il tuo certificato medico risulta scaduto dal 01/05. Puoi caricarne uno aggiornato per riattivare l\'accesso.' },
      { from: 'client', time: '10:31', text: 'Ok grazie, faccio la visita venerdì e lo carico.' },
    ] },
  { id: 'dm2', client: 'Elena Conti',   nick: 'EleC', unread: 2, time: '09:02', status: 'aperta',
    last: 'Pagamento insoluto · rinnovo mensile',
    msgs: [
      { from: 'admin', time: '09:02', text: 'Ciao Elena, risulta un pagamento insoluto sul rinnovo mensile (49€). Vuoi saldare in sede o con bonifico?' },
    ] },
  { id: 'dm3', client: 'Giulia Tonon',  nick: 'GiuStrong', unread: 0, time: 'Ieri', status: 'risolta',
    last: 'Perfetto, ci vediamo al Test Day!',
    msgs: [
      { from: 'client', time: 'Ieri · 17:40', text: 'Confermo iscrizione allo Strength Test Day.' },
      { from: 'admin', time: 'Ieri · 17:52', text: 'Registrata! Perfetto, ci vediamo al Test Day 💪' },
    ] },
];

// segnalazioni chat in coda moderazione
const CHAT_REPORTS = [
  { id: 'r1', nick: 'AnnaG', channel: 'Allenamento', reason: 'Link sospetto / spam', when: '10:02' },
];

// ---- Distributori: vendite recenti + codici ----
const VENDING_SALES = [
  { time: '12:40', client: 'Federica Lai', nick: 'FedeFit',  product: 'Whey Protein Shake', price: 3.50 },
  { time: '12:10', client: 'Chiara Ferri', nick: 'ChiaraF',  product: 'Electrolytes',       price: 2.00 },
  { time: '11:55', client: 'Paolo Mazzi',  nick: 'PaoloM',   product: 'Pre Workout Shot',   price: 3.90 },
  { time: '10:20', client: 'Marco Bellini',nick: 'Iron_Marco',product: 'EAA Drink',         price: 2.80 },
  { time: '09:05', client: 'Luca Bertoldi',nick: 'BigLuca',  product: 'Recovery Drink',     price: 3.20 },
];

// ---- Promo / sconti ----
const PROMO_CODES = [
  { code: 'IRON10',     desc: 'Sconto 10% primo abbonamento', uses: 42, max: 100, status: 'active' },
  { code: 'PORTAUNAMICO',desc: '1 mese gratis su segnalazione', uses: 18, max: 50,  status: 'active' },
  { code: 'SUMMER25',   desc: 'Sconto 25% annuale (scaduto)',  uses: 64, max: 64,  status: 'ended' },
];

// ---- Impostazioni palestra ----
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

Object.assign(window, {
  ACCESS_LOG, CHECKIN_QUEUE, DOCS_QUEUE, CHAT_CHANNELS, CHAT_MESSAGES,
  DM_THREADS, CHAT_REPORTS, VENDING_SALES, PROMO_CODES, GYM_INFO,
});
