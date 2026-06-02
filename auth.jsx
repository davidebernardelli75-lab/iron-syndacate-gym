// ─────────────────────────────────────────────────────────────
// AUTH — autenticazione reale con Supabase
// Sostituisce la versione demo basata su localStorage
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://inymrzglbhbtqagpyxzb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlueW1yemdsYmhidHFhZ3B5eHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjQ4OTUsImV4cCI6MjA5NjAwMDg5NX0.pj80krA5zuw8hGdX507TUtvfZWLS2bqJKMc5Dh01OAk';

// Carica Supabase da CDN se non già disponibile
if (!window.supabase) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload = () => {
    window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  };
  document.head.appendChild(script);
} else {
  window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Helper: aspetta che il client sia pronto
function getSB() {
  return new Promise((resolve) => {
    if (window._sb) return resolve(window._sb);
    const iv = setInterval(() => {
      if (window._sb) { clearInterval(iv); resolve(window._sb); }
    }, 50);
  });
}

const AUTH = {

  // ── ADMIN ──────────────────────────────────────────────────
  async adminLogin(email, pwd) {
    const sb = await getSB();
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) return false;
    const { data: profile } = await sb.from('profiles').select('role').eq('id', data.user.id).single();
    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      await sb.auth.signOut();
      return false;
    }
    localStorage.setItem('isg_admin_session', '1');
    return true;
  },

  async isAdmin() {
    const sb = await getSB();
    const { data } = await sb.auth.getUser();
    if (!data.user) return false;
    const { data: profile } = await sb.from('profiles').select('role').eq('id', data.user.id).single();
    return profile && ['admin', 'super_admin'].includes(profile.role);
  },

  async adminLogout() {
    const sb = await getSB();
    await sb.auth.signOut();
    localStorage.removeItem('isg_admin_session');
  },

  // ── CLIENTI ────────────────────────────────────────────────
  async addClient(c) {
    const sb = await getSB();
    const { data, error } = await sb.auth.signUp({
      email: c.email,
      password: c.password,
      options: {
        data: {
          first_name: c.first || '',
          last_name: c.last || '',
          nickname: c.nick || '',
          phone: c.phone || '',
        }
      }
    });
    if (error) {
      if (error.message.includes('already')) return { ok: false, err: 'Email già registrata' };
      return { ok: false, err: error.message };
    }
    return { ok: true };
  },

  async clientLogin(email, pwd) {
    const sb = await getSB();
    const { data, error } = await sb.auth.signInWithPassword({ email: email.trim(), password: pwd });
    if (error) {
      if (error.message.includes('Invalid')) return { ok: false, err: 'Credenziali non valide' };
      return { ok: false, err: error.message };
    }
    localStorage.setItem('isg_client_session', data.user.email);
    return { ok: true };
  },

  async currentClient() {
    const sb = await getSB();
    const { data } = await sb.auth.getUser();
    if (!data.user) return null;
    const { data: profile } = await sb.from('profiles').select('*').eq('id', data.user.id).single();
    if (!profile) return null;
    return this.buildMe(profile, data.user.email);
  },

  async clientLogout() {
    const sb = await getSB();
    await sb.auth.signOut();
    localStorage.removeItem('isg_client_session');
  },

  // ── PROFILO ────────────────────────────────────────────────
  buildMe(profile, email) {
    return {
      name: ((profile.first_name || '') + ' ' + (profile.last_name || '')).trim() || 'Nuovo Atleta',
      first: profile.first_name || 'Atleta',
      nick: profile.nickname || 'Atleta',
      id: profile.member_id || profile.id,
      email: email || profile.email || '—',
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
      role: profile.role || 'cliente',
      isNew: false,
    };
  },
};

window.AUTH = AUTH;