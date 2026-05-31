// ─────────────────────────────────────────────────────────────
// AUTH — autenticazione demo lato browser (localStorage)
// In produzione va sostituita con login reale + database (vedi SPEC.md).
// ─────────────────────────────────────────────────────────────

const AUTH = {
  ADMIN_DEFAULT: { email: 'admin@ironsyndacate.gym', password: 'iron2026' },

  // ---- ADMIN / STAFF ----
  getAdminCreds() {
    try { return JSON.parse(localStorage.getItem('isg_admin_creds')) || this.ADMIN_DEFAULT; }
    catch (e) { return this.ADMIN_DEFAULT; }
  },
  setAdminCreds(c) { localStorage.setItem('isg_admin_creds', JSON.stringify(c)); },
  adminLogin(email, pwd) {
    const c = this.getAdminCreds();
    if (email.trim().toLowerCase() === c.email.toLowerCase() && pwd === c.password) {
      localStorage.setItem('isg_admin_session', '1');
      return true;
    }
    return false;
  },
  isAdmin() { return localStorage.getItem('isg_admin_session') === '1'; },
  adminLogout() { localStorage.removeItem('isg_admin_session'); },

  // ---- CLIENTI ----
  getClients() {
    try { return JSON.parse(localStorage.getItem('isg_clients')) || []; }
    catch (e) { return []; }
  },
  addClient(c) {
    const list = this.getClients();
    if (list.some(x => x.email.toLowerCase() === c.email.toLowerCase())) return { ok: false, err: 'Email già registrata' };
    if (typeof ME !== 'undefined' && c.email.toLowerCase() === ME.email.toLowerCase()) return { ok: false, err: 'Email già registrata' };
    list.push(c);
    localStorage.setItem('isg_clients', JSON.stringify(list));
    return { ok: true };
  },
  findClient(email) { return this.getClients().find(c => c.email.toLowerCase() === email.toLowerCase()); },
  demoOn() { return (typeof window !== 'undefined' && window.ISG_DEMO === false) ? false : true; },
  clientLogin(email, pwd) {
    const e = email.trim();
    // account demo (prefill) — solo se la modalità demo è attiva (non in produzione)
    if (this.demoOn() && typeof ME !== 'undefined' && e.toLowerCase() === ME.email.toLowerCase()) {
      localStorage.setItem('isg_client_session', ME.email); return { ok: true, demo: true };
    }
    const c = this.findClient(e);
    if (c && c.password === pwd) { localStorage.setItem('isg_client_session', c.email); return { ok: true }; }
    if (!c) return { ok: false, err: 'Nessun account con questa email' };
    return { ok: false, err: 'Password errata' };
  },
  currentClient() {
    const e = localStorage.getItem('isg_client_session');
    if (!e) return null;
    if (this.demoOn() && typeof ME !== 'undefined' && e.toLowerCase() === ME.email.toLowerCase()) return ME;
    const c = this.findClient(e);
    return c ? this.buildMe(c) : null;
  },
  clientLogout() { localStorage.removeItem('isg_client_session'); },

  // costruisce un profilo "me" per un cliente registrato (nuovo account)
  buildMe(c) {
    const n = (c.first || c.name || 'Atleta');
    return {
      name: ((c.first || '') + ' ' + (c.last || '')).trim() || c.name || 'Nuovo Atleta',
      first: c.first || (c.name || 'Atleta').split(' ')[0],
      nick: c.nick || 'Atleta',
      id: c.id || ('ISG-2026-' + String(Math.floor(1000 + Math.random() * 8999))),
      email: c.email, phone: c.phone || '—', dob: c.dob || '—', cf: c.cf || '—', address: c.address || '—',
      plan: 'Nessun abbonamento', planPeriod: '—', expiry: '—', expiryDays: 0,
      cert: 'missing', certExp: '—', certDays: 0,
      credit: 0, access: 0,
      consents: c.consents || { chat: false, privacy: true, marketing: false, data: true },
      isNew: true,
    };
  },
};

window.AUTH = AUTH;
