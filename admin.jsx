// ─────────────────────────────────────────────────────────────
// ADMIN — Pannello desktop (Dashboard, Gestione clienti)
// ─────────────────────────────────────────────────────────────

const NAV = [
  { k: 'dashboard', i: 'grid',     l: 'Dashboard' },
  { k: 'clients',   i: 'users',    l: 'Clienti' },
  { k: 'subs',      i: 'card',     l: 'Abbonamenti' },
  { k: 'access',    i: 'qr',       l: 'Accessi' },
  { k: 'events',    i: 'calendar', l: 'Eventi' },
  { k: 'docs',      i: 'doc',      l: 'Documenti' },
  { k: 'vending',   i: 'bolt',     l: 'Distributori' },
  { k: 'chat',      i: 'chat',     l: 'Chat' },
];

function certBadge(cert) {
  const m = { valid: ['ok', 'Valido'], expired: ['bad', 'Scaduto'], review: ['info', 'Da validare'], missing: ['bad', 'Mancante'] };
  const [tone, label] = m[cert] || ['mute', '—'];
  return <Badge tone={tone} size="sm">{label}</Badge>;
}

// ---------- SIDEBAR ----------
function AdminSidebar({ section, setSection, mobile, open, onClose, siteHref, onExit, appHref, onApp, onLogout }) {
  const pick = (k) => { setSection(k); if (mobile && onClose) onClose(); };
  const exit = () => { if (siteHref) window.location.href = siteHref; else if (onExit) onExit(); };
  const openApp = () => { if (appHref) window.location.href = appHref; else if (onApp) onApp(); };
  const drawer = {
    width: 232, flexShrink: 0, background: 'linear-gradient(180deg, #100e0b, var(--ink))',
    borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', padding: '18px 14px',
  };
  const mobileWrap = mobile ? {
    position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 60, width: 250,
    boxShadow: '20px 0 60px rgba(0,0,0,0.6)', transform: open ? 'none' : 'translateX(-110%)', transition: 'transform .25s ease',
  } : {};
  return (
    <>
      {mobile && open && <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 55, animation: 'fadeUp .2s ease' }} />}
      <div style={{ ...drawer, ...mobileWrap }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 18px', borderBottom: '1px solid var(--line)' }}>
        <button onClick={exit} title="Torna al sito" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 38, height: 'auto', filter: 'drop-shadow(0 3px 8px rgba(238,90,28,0.4))' }} />
          <div>
            <div className="display" style={{ fontSize: 15, color: 'var(--text)', lineHeight: 0.95, textAlign: 'left' }}>IRON<br />SYNDACATE</div>
          </div>
        </button>
      </div>
      <div className="kicker" style={{ padding: '16px 8px 8px', fontSize: 10 }}>Gestione</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(n => {
          const on = section === n.k;
          return (
            <button key={n.k} onClick={() => pick(n.k)} style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10,
              background: on ? 'rgba(238,90,28,0.13)' : 'transparent', border: '1px solid ' + (on ? 'rgba(238,90,28,0.4)' : 'transparent'),
              color: on ? 'var(--amber)' : 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600,
              fontSize: 13.5, letterSpacing: '0.03em', textAlign: 'left', cursor: 'pointer', transition: 'all .15s',
            }}>
              <Icon name={n.i} size={18} stroke={on ? 2.3 : 1.9} />
              {n.l}
              {n.k === 'docs' && <span style={pillCount()}>4</span>}
              {n.k === 'clients' && <span style={pillCount()}>248</span>}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
        <button onClick={() => pick('settings')} style={{
          display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, width: '100%',
          background: section === 'settings' ? 'rgba(238,90,28,0.13)' : 'transparent', border: 'none',
          color: section === 'settings' ? 'var(--amber)' : 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, textAlign: 'left',
        }}>
          <Icon name="settings" size={18} stroke={1.9} />Impostazioni palestra
        </button>
        <button onClick={openApp} style={{
          display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, width: '100%',
          background: 'transparent', border: 'none', color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, textAlign: 'left', cursor: 'pointer',
        }}>
          <Icon name="card" size={18} stroke={1.9} />Apri app cliente
        </button>
        <button onClick={exit} style={{
          display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, width: '100%',
          background: 'transparent', border: 'none', color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, textAlign: 'left', cursor: 'pointer',
        }}>
          <Icon name="home" size={18} stroke={1.9} />Torna al sito
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 8px 2px' }}>
          <Avatar name="Admin ISG" size={34} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Matteo Ferraro</div>
            <div style={{ fontSize: 10.5, color: 'var(--faint)' }}>Super Admin</div>
          </div>
          <button onClick={onLogout} title="Esci dall'area staff" style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}><Icon name="logout" size={17} color="var(--faint)" stroke={1.9} /></button>
        </div>
      </div>
      </div>
    </>
  );
}
function pillCount() {
  return { marginLeft: 'auto', background: 'var(--surface-3)', border: '1px solid var(--line-2)', color: 'var(--dim)', fontSize: 10.5, fontFamily: 'var(--font-cond)', fontWeight: 600, padding: '1px 7px', borderRadius: 999 };
}

// ---------- TOPBAR ----------
function AdminTopbar({ title, sub, toast, mobile, onMenu }) {
  return (
    <div style={{
      flexShrink: 0, height: 64, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center',
      padding: mobile ? '0 14px' : '0 26px', gap: mobile ? 12 : 18, background: 'rgba(13,12,10,0.7)', backdropFilter: 'blur(8px)',
    }}>
      {mobile && (
        <button onClick={onMenu} aria-label="Menu" style={{
          width: 42, height: 42, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--line-2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', flexShrink: 0,
        }}>
          <span style={{ width: 17, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ width: 17, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ width: 17, height: 2, background: 'var(--text)', borderRadius: 2 }} />
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="display" style={{ margin: 0, fontSize: mobile ? 17 : 22, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
        {sub && !mobile && <div style={{ fontSize: 12, color: 'var(--faint)', marginTop: 2 }}>{sub}</div>}
      </div>
      {!mobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '9px 13px', width: 260 }}>
          <Icon name="search" size={16} color="var(--faint)" stroke={2} />
          <input placeholder="Cerca cliente, evento…" style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, width: '100%' }} />
        </div>
      )}
      <button onClick={() => toast('3 nuove notifiche')} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: 9, position: 'relative', flexShrink: 0 }}>
        <Icon name="bell" size={19} color="var(--dim)" stroke={1.9} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 999, background: 'var(--fire)' }} />
      </button>
    </div>
  );
}

// ---------- STAT CARD ----------
function StatCard({ icon, label, value, unit, delta, tone = 'fire', onClick }) {
  const toneC = { fire: 'var(--amber)', ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)', info: 'var(--info)' }[tone];
  return (
    <div onClick={onClick} style={{
      background: 'linear-gradient(180deg, var(--surface-2), var(--surface))', border: '1px solid var(--line)',
      borderRadius: 14, padding: 16, cursor: onClick ? 'pointer' : 'default', transition: 'border-color .15s',
    }}
      onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = 'var(--line-2)')}
      onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = 'var(--line)')}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(238,90,28,0.1)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={18} color={toneC} stroke={2} />
        </span>
        {delta && <span className="cond" style={{ fontSize: 12, fontWeight: 600, color: delta.startsWith('-') ? 'var(--bad)' : 'var(--ok)' }}>{delta}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="display" style={{ fontSize: 30, color: 'var(--text)', lineHeight: 1 }}>{value}</span>
        {unit && <span className="cond" style={{ fontSize: 14, color: 'var(--amber)', fontWeight: 700 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 5, fontFamily: 'var(--font-cond)', letterSpacing: '0.02em' }}>{label}</div>
    </div>
  );
}

// ---------- DASHBOARD ----------
function DashboardSection({ toast, goClients }) {
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 18 }}>
        <StatCard icon="users" label="Clienti attivi" value={KPI.activeMembers} delta="+12" tone="ok" onClick={goClients} />
        <StatCard icon="plus" label="Nuovi iscritti · mese" value={KPI.newSignups} delta="+5" tone="fire" />
        <StatCard icon="clock" label="Abbonam. in scadenza" value={KPI.expiringSubs} tone="warn" onClick={goClients} />
        <StatCard icon="euro" label="Entrate · mese" value="18,4" unit="k€" delta="+9%" tone="ok" />
        <StatCard icon="qr" label="Accessi oggi" value={KPI.accessToday} tone="info" />
        <StatCard icon="bolt" label="Distributori · mese" value="1,28" unit="k€" delta="+6%" tone="fire" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        {/* Revenue */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 6 }}>Andamento</div>
              <h2 className="display" style={{ margin: 0, fontSize: 20, color: 'var(--text)' }}>Entrate mensili</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display" style={{ fontSize: 26, color: 'var(--text)' }}>18.420<span style={{ fontSize: 15, color: 'var(--amber)' }}>€</span></div>
              <Badge tone="ok" size="sm" dot>+9% vs Apr</Badge>
            </div>
          </div>
          <BarChart data={REVENUE_SERIES} height={150} format={(v) => (v / 1000).toFixed(1) + 'k'} />
        </Panel>
        {/* Da gestire */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Da gestire</h2>
            <Badge tone="fire" size="sm">{TODO_ITEMS.length} aperti</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TODO_ITEMS.map(t => {
              const ic = { doc: 'doc', cert: 'shield', pay: 'euro', sub: 'card' }[t.kind];
              const tn = { doc: 'info', cert: 'bad', pay: 'bad', sub: 'warn' }[t.kind];
              const tc = { info: 'var(--info)', bad: 'var(--bad)', warn: 'var(--warn)' }[tn];
              return (
                <div key={t.id} onClick={goClients} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--line)', cursor: 'pointer' }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={ic} size={15} color={tc} stroke={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cond" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--faint)' }}>{t.who}</div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{t.when}</span>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {/* Accessi oggi */}
        <Panel>
          <h2 className="display" style={{ margin: '0 0 4px', fontSize: 17, color: 'var(--text)' }}>Accessi oggi</h2>
          <div style={{ fontSize: 12, color: 'var(--faint)', marginBottom: 16 }}>94 ingressi · picco 18:00</div>
          <BarChart data={ACCESS_SERIES} height={120} label="h" />
        </Panel>
        {/* Prenotazioni oggi */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 17, color: 'var(--text)' }}>Prenotazioni di oggi</h2>
            <Badge tone="mute" size="sm">{TODAY_BOOKINGS.length}</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {TODAY_BOOKINGS.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '7px 0', borderBottom: i < TODAY_BOOKINGS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span className="display" style={{ fontSize: 13, color: 'var(--amber)', width: 42, flexShrink: 0 }}>{b.time}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{b.client}</div>
                  <div style={{ fontSize: 11, color: 'var(--faint)' }}>{b.type} · {b.coach}</div>
                </div>
                <Badge tone={b.state === 'confermata' ? 'ok' : 'warn'} size="sm">{b.state}</Badge>
              </div>
            ))}
          </div>
        </Panel>
        {/* Ultimi accessi */}
        <Panel>
          <h2 className="display" style={{ margin: '0 0 12px', fontSize: 17, color: 'var(--text)' }}>Ultimi accessi</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {RECENT_ACCESS.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: a.ok ? 'var(--ok)' : 'var(--bad)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{a.name}</div>
                  {!a.ok && <div style={{ fontSize: 10.5, color: 'var(--bad)' }}>{a.reason}</div>}
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ---------- CLIENTS ----------
const FILTERS = [
  { k: 'all', l: 'Tutti' },
  { k: 'active', l: 'Attivi' },
  { k: 'expiring', l: 'In scadenza' },
  { k: 'suspended', l: 'Sospesi' },
  { k: 'cert', l: 'Certificato' },
  { k: 'unpaid', l: 'Insoluti' },
];

function ClientsSection({ toast }) {
  const [filter, setFilter] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(null);
  const [showNew, setShowNew] = React.useState(false);

  const filtered = CLIENTS.filter(c => {
    if (q && !(c.name.toLowerCase().includes(q.toLowerCase()) || c.nick.toLowerCase().includes(q.toLowerCase()))) return false;
    if (filter === 'all') return true;
    if (filter === 'active') return c.status === 'active';
    if (filter === 'expiring') return c.status === 'expiring';
    if (filter === 'suspended') return c.status === 'suspended';
    if (filter === 'cert') return c.cert !== 'valid';
    if (filter === 'unpaid') return c.status === 'unpaid';
    return true;
  });

  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease', position: 'relative' }}>
      {/* toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '9px 13px', width: 240 }}>
          <Icon name="search" size={16} color="var(--faint)" stroke={2} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cerca per nome o nickname" style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {FILTERS.map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding: '8px 13px', borderRadius: 9, border: '1px solid ' + (filter === f.k ? 'rgba(238,90,28,0.5)' : 'var(--line)'),
              background: filter === f.k ? 'rgba(238,90,28,0.13)' : 'var(--surface)', color: filter === f.k ? 'var(--amber)' : 'var(--dim)',
              fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.03em', cursor: 'pointer',
            }}>{f.l}</button>
          ))}
        </div>
        <FireButton size="sm" icon="plus" onClick={() => setShowNew(true)}>Nuovo cliente</FireButton>
      </div>

      {/* table */}
      <Panel pad={0} style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 880 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.1fr 1.2fr 1fr 1.1fr 0.8fr 1fr 36px', gap: 0, padding: '12px 18px', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
          {['Cliente', 'Abbonamento', 'Stato', 'Scadenza', 'Certificato', 'Credito', 'Ultimo accesso', ''].map((h, i) => (
            <span key={i} className="cond" style={{ fontSize: 11, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        <div>
          {filtered.map((c, idx) => (
            <div key={c.id} onClick={() => setSel(c)} style={{
              display: 'grid', gridTemplateColumns: '1.7fr 1.1fr 1.2fr 1fr 1.1fr 0.8fr 1fr 36px', gap: 0, padding: '12px 18px',
              borderBottom: idx < filtered.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background .12s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.022)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <Avatar name={c.name} size={36} />
                <div style={{ minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>@{c.nick}</div>
                </div>
              </div>
              <span style={{ fontSize: 12.5, color: 'var(--dim)', fontFamily: 'var(--font-cond)' }}>{c.plan}</span>
              <span><Badge tone={STATUS[c.status].tone} size="sm" dot>{STATUS[c.status].it}</Badge></span>
              <span style={{ fontSize: 12.5, color: 'var(--dim)', fontFamily: 'var(--font-cond)' }}>{c.expiry === '—' ? '—' : fmtDateFull(c.expiry)}</span>
              <span>{certBadge(c.cert)}</span>
              <span className="cond" style={{ fontSize: 12.5, color: c.credit > 0 ? 'var(--text)' : 'var(--faint)', fontWeight: 600 }}>{c.credit > 0 ? c.credit.toFixed(2) + '€' : '—'}</span>
              <span style={{ fontSize: 11.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{c.lastAccess}</span>
              <Icon name="chevron" size={15} color="var(--faint)" />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '50px 0', textAlign: 'center', color: 'var(--faint)' }}>
              <Icon name="search" size={32} color="var(--line-2)" stroke={1.5} />
              <div style={{ fontFamily: 'var(--font-cond)', fontSize: 14, marginTop: 10 }}>Nessun cliente per questo filtro</div>
            </div>
          )}
        </div>
        </div>
      </Panel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 12, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>
        <span>{filtered.length} di {CLIENTS.length} clienti</span>
        <span>248 attivi · 9 in scadenza · 6 certificati da sistemare</span>
      </div>

      {sel && <ClientDrawer client={sel} onClose={() => setSel(null)} toast={toast} />}
      {showNew && <NewClientModal onClose={() => setShowNew(false)} toast={toast} />}
    </div>
  );
}

function fmtDateFull(iso) {
  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
}

// ---------- CLIENT DRAWER ----------
function ClientDrawer({ client, onClose, toast }) {
  const info = [
    ['Abbonamento', client.plan],
    ['Scadenza', client.expiry === '—' ? '—' : fmtDateFull(client.expiry)],
    ['Certificato', client.cert === 'valid' ? 'Valido · scade ' + (client.certExp !== '—' ? fmtDateFull(client.certExp) : '—') : STATUS[client.status] && certLabel(client.cert)],
    ['Credito distributori', client.credit.toFixed(2) + ' €'],
    ['Accessi totali', client.access + ' ingressi'],
    ['Ultimo accesso', client.lastAccess],
  ];
  const actions = [
    { i: 'refresh', l: 'Rinnova abbonamento', t: 'Abbonamento rinnovato' },
    { i: 'pause', l: 'Sospendi temporaneamente', t: 'Cliente sospeso' },
    { i: 'doc', l: 'Valida documenti', t: 'Documenti validati' },
    { i: 'chat', l: 'Apri chat privata', t: 'Chat aperta con ' + client.name },
    { i: 'qr', l: 'Rigenera QR / blocca', t: 'QR rigenerato' },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 40, animation: 'fadeUp .2s ease' }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(380px, 92vw)', zIndex: 50,
        background: 'linear-gradient(180deg, var(--surface-2), var(--surface))', borderLeft: '1px solid var(--line-2)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)', overflowY: 'auto', animation: 'slideIn .25s ease',
      }}>
        <style>{`@keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}`}</style>
        {/* header */}
        <div style={{ padding: 22, borderBottom: '1px solid var(--line)', position: 'relative', background: 'radial-gradient(120% 80% at 100% 0%, rgba(238,90,28,0.14), transparent 55%)' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, padding: 6 }}>
            <Icon name="x" size={16} color="var(--dim)" stroke={2.4} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={client.name} size={56} />
            <div>
              <h2 className="display" style={{ margin: 0, fontSize: 22, color: 'var(--text)' }}>{client.name}</h2>
              <div className="cond" style={{ fontSize: 13, color: 'var(--amber)', marginTop: 2 }}>@{client.nick}</div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <Badge tone={STATUS[client.status].tone} dot>{STATUS[client.status].it}</Badge>
            {certBadge(client.cert)}
          </div>
        </div>
        {/* info grid */}
        <div style={{ padding: 22 }}>
          <div className="kicker" style={{ marginBottom: 12 }}>Anagrafica & stato</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
            {info.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', background: 'var(--surface)', gap: 12 }}>
                <span style={{ fontSize: 12.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{row[0]}</span>
                <span className="cond" style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, textAlign: 'right' }}>{row[1]}</span>
              </div>
            ))}
          </div>

          {/* QR mini */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 18, padding: 14, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12 }}>
            <div style={{ padding: 6, background: 'var(--text)', borderRadius: 8, flexShrink: 0 }}>
              <QRCode value={'ISG-' + client.id} size={72} />
            </div>
            <div>
              <div className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>QR ingresso & distributori</div>
              <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 3 }}>ISG-{client.id.toUpperCase()}</div>
              <div style={{ marginTop: 6 }}><Badge tone="ok" size="sm" dot>Attivo</Badge></div>
            </div>
          </div>

          {/* actions */}
          <div className="kicker" style={{ margin: '20px 0 12px' }}>Azioni</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {actions.map((a, i) => (
              <button key={i} onClick={() => toast(a.t)} style={{
                display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px', borderRadius: 10,
                background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--text)',
                fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, textAlign: 'left', cursor: 'pointer', transition: 'border-color .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line-2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                <Icon name={a.i} size={17} color="var(--amber)" stroke={2} />{a.l}
                <Icon name="chevron" size={14} color="var(--faint)" stroke={2} style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
          <button onClick={() => toast('Accesso autorizzato manualmente — tracciato nel log')} style={{
            marginTop: 12, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '12px',
            borderRadius: 10, background: 'rgba(238,90,28,0.12)', border: '1px solid rgba(238,90,28,0.45)', color: 'var(--amber)',
            fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
          }}>
            <Icon name="shield" size={16} color="var(--amber)" stroke={2} />Autorizza accesso manuale
          </button>
        </div>
      </div>
    </>
  );
}
function certLabel(cert) {
  return { valid: 'Valido', expired: 'Scaduto', review: 'Da validare', missing: 'Mancante' }[cert] || '—';
}

// ---------- GENERIC PLACEHOLDER ----------
function ComingSection({ name }) {
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <Panel pad={40} style={{ textAlign: 'center' }}>
        <span style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(238,90,28,0.1)', border: '1px solid var(--line-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="settings" size={26} color="var(--amber)" stroke={1.8} />
        </span>
        <h2 className="display" style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--text)' }}>{name}</h2>
        <p style={{ color: 'var(--dim)', fontSize: 14, maxWidth: 380, margin: '0 auto', lineHeight: 1.5 }}>
          Modulo predisposto. Dashboard e Gestione clienti sono completamente navigabili in questa demo — questa sezione è pronta per essere collegata al backend.
        </p>
      </Panel>
    </div>
  );
}

// ---------- ADMIN PANEL ----------
function AdminPanel({ siteHref, onExit, appHref, onApp, onLogout }) {
  const [section, setSection] = React.useState('dashboard');
  const [toastMsg, setToastMsg] = React.useState('');
  const [drawer, setDrawer] = React.useState(false);
  const mobile = useIsMobile(900);
  const toast = (m) => setToastMsg(m);
  const titles = {
    dashboard: ['Dashboard', 'Panoramica · ' + new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })],
    clients: ['Gestione clienti', '248 attivi · 17 nuovi questo mese'],
    subs: ['Abbonamenti', 'Listino, pacchetti PT e codici promo'],
    access: ['Accessi & ingressi', 'Check-in QR, log e autorizzazioni manuali'],
    events: ['Eventi', 'Calendario, iscritti e incassi'],
    docs: ['Documenti & certificati', 'Validazione con estrazione dati OCR'],
    vending: ['Distributori integratori', 'Prodotti, scorte e vendite QR'],
    chat: ['Chat & community', 'Moderazione canali e chat private'],
    settings: ['Impostazioni palestra', 'Dati, orari, listino, citazioni'],
  };
  const [title, sub] = titles[section] || [NAV.find(n => n.k === section)?.l || 'Sezione', null];

  return (
    <div style={{ height: '100%', display: 'flex', background: 'var(--ink)', position: 'relative', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      <AdminSidebar section={section} setSection={setSection} mobile={mobile} open={drawer} onClose={() => setDrawer(false)} siteHref={siteHref} onExit={onExit} appHref={appHref} onApp={onApp} onLogout={onLogout} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        <AdminTopbar title={title} sub={sub} toast={toast} mobile={mobile} onMenu={() => setDrawer(true)} />
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {section === 'dashboard' && <DashboardSection toast={toast} goClients={() => setSection('clients')} />}
          {section === 'clients' && <ClientsSection toast={toast} />}
          {section === 'subs' && <SubsSection toast={toast} />}
          {section === 'access' && <AccessSection toast={toast} />}
          {section === 'events' && <EventsAdminSection toast={toast} />}
          {section === 'docs' && <DocsSection toast={toast} />}
          {section === 'vending' && <VendingSection toast={toast} />}
          {section === 'chat' && <ChatSection toast={toast} />}
          {section === 'settings' && <SettingsSection toast={toast} />}
        </div>
        <Toast msg={toastMsg} onDone={() => setToastMsg('')} />
      </div>
    </div>
  );
}

// ---------- NEW CLIENT MODAL ----------
function NewClientModal({ onClose, toast }) {
  const [f, setF] = React.useState({ first: '', last: '', nick: '', email: '', pwd: '' });
  const [ok, setOk] = React.useState(null);
  const [err, setErr] = React.useState('');
  const set = (k) => (e) => { setF(s => ({ ...s, [k]: e.target.value })); setErr(''); };
  const create = async () => {
    if (!f.first.trim() || !f.last.trim()) return setErr('Nome e cognome obbligatori');
    if (!/.+@.+\..+/.test(f.email)) return setErr('Email non valida');
    if (!f.nick.trim()) return setErr('Nickname obbligatorio');
    const pwd = f.pwd.trim() || 'iron' + Math.floor(1000 + Math.random() * 8999);
    const client = {
      first: f.first.trim(), last: f.last.trim(), name: f.first.trim() + ' ' + f.last.trim(),
      nick: f.nick.trim(), email: f.email.trim(), password: pwd,
      id: 'ISG-2026-' + String(Math.floor(1000 + Math.random() * 8999)),
      consents: { chat: false, privacy: true, marketing: false, data: true },
    };
    const r = (typeof AUTH !== 'undefined') ? await AUTH.addClient(client) : { ok: true };
    if (!r.ok) return setErr(r.err || 'Creazione non riuscita');
    setOk({ email: client.email, pwd });
    toast('Account cliente creato · ' + client.name);
  };
  const fld = { width: '100%', background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: 9, padding: '11px 13px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' };
  const lbl = { fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 };
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 60, animation: 'fadeUp .2s ease' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 65, width: 'min(440px, 92vw)', maxHeight: '90%', overflowY: 'auto', background: 'linear-gradient(180deg, var(--surface-2), var(--surface))', border: '1px solid var(--line-2)', borderRadius: 16, boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}>
        <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'radial-gradient(120% 80% at 100% 0%, rgba(238,90,28,0.14), transparent 55%)' }}>
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>Gestione clienti</div>
            <h2 className="display" style={{ margin: 0, fontSize: 22, color: 'var(--text)' }}>Nuovo cliente</h2>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, padding: 6, cursor: 'pointer' }}><Icon name="x" size={16} color="var(--dim)" stroke={2.4} /></button>
        </div>
        <div style={{ padding: 22 }}>
          {ok ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(95,174,87,0.16)', border: '2px solid var(--ok)' }}>
                <Icon name="check" size={28} color="var(--ok)" stroke={3} />
              </div>
              <h3 className="display" style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--text)' }}>Account creato</h3>
              <p style={{ fontSize: 13, color: 'var(--dim)', margin: '0 0 16px' }}>Il cliente può accedere all'app con queste credenziali:</p>
              <div style={{ textAlign: 'left', borderRadius: 11, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 12, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>Email</span>
                  <span className="cond" style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{ok.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', background: 'var(--surface)' }}>
                  <span style={{ fontSize: 12, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>Password</span>
                  <span className="cond" style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 700 }}>{ok.pwd}</span>
                </div>
              </div>
              <FireButton full icon="check" onClick={onClose}>Chiudi</FireButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}><label style={lbl}>Nome</label><input value={f.first} onChange={set('first')} style={fld} /></div>
                <div style={{ flex: 1 }}><label style={lbl}>Cognome</label><input value={f.last} onChange={set('last')} style={fld} /></div>
              </div>
              <div><label style={lbl}>Nickname pubblico</label><input value={f.nick} onChange={set('nick')} style={fld} /></div>
              <div><label style={lbl}>Email</label><input value={f.email} onChange={set('email')} style={fld} /></div>
              <div><label style={lbl}>Password (vuoto = genera automatica)</label><input value={f.pwd} onChange={set('pwd')} placeholder="Generata se vuoto" style={fld} /></div>
              {err && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(224,83,58,0.1)', border: '1px solid rgba(224,83,58,0.4)' }}>
                  <Icon name="shield" size={15} color="var(--bad)" stroke={2} />
                  <span style={{ fontSize: 12, color: 'var(--bad)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{err}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <GhostButton full onClick={onClose}>Annulla</GhostButton>
                <FireButton full icon="plus" onClick={create}>Crea account</FireButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ---------- ADMIN LOGIN GATE ----------
function AdminLogin({ onSuccess, siteHref, onExit }) {
  const cur = AUTH.getAdminCreds();
  const [email, setEmail] = React.useState(cur.email);
  const [pwd, setPwd] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const submit = async () => {
    setLoading(true); setErr('');
    const ok = await AUTH.adminLogin(email, pwd);
    setLoading(false);
    if (ok) onSuccess();
    else setErr('Credenziali non valide. Riprova.');
  };
  const exit = () => { if (siteHref) window.location.href = siteHref; else if (onExit) onExit(); };
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', position: 'relative', overflow: 'hidden', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 55% at 50% 0%, rgba(238,90,28,0.18), transparent 60%)' }} />
      <div className="stage-bg" style={{ position: 'absolute' }} />
      <LogoWatermark opacity={0.05} size={520} />
      <div style={{ position: 'relative', width: 'min(400px, 90vw)', background: 'linear-gradient(180deg, var(--surface-2), var(--surface))', border: '1px solid var(--line-2)', borderRadius: 18, padding: 'clamp(24px, 5vw, 36px)', boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}>
        <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 64, height: 'auto', display: 'block', margin: '0 auto 16px', filter: 'drop-shadow(0 8px 22px rgba(238,90,28,0.4))' }} />
        <div className="kicker" style={{ textAlign: 'center', marginBottom: 6 }}>Area riservata staff</div>
        <h1 className="display" style={{ margin: '0 0 22px', fontSize: 30, color: 'var(--text)', textAlign: 'center' }}>ACCESSO ADMIN</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={admLbl}>Email staff</label>
            <input value={email} onChange={e => { setEmail(e.target.value); setErr(''); }} style={admInput} />
          </div>
          <div>
            <label style={admLbl}>Password</label>
            <input type="password" value={pwd} onChange={e => { setPwd(e.target.value); setErr(''); }}
              onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={admInput} />
          </div>
          {err && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(224,83,58,0.1)', border: '1px solid rgba(224,83,58,0.4)' }}>
              <Icon name="shield" size={15} color="var(--bad)" stroke={2} />
              <span style={{ fontSize: 12.5, color: 'var(--bad)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{err}</span>
            </div>
          )}
          <div style={{ marginTop: 6 }}><FireButton size="lg" full icon="logout" onClick={submit}>{loading ? 'Accesso…' : 'Entra'}</FireButton></div>
        </div>
        <div style={{ marginTop: 16, padding: '11px 13px', borderRadius: 10, background: 'var(--surface)', border: '1px dashed var(--line-2)' }}>
          <div style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Credenziali demo</div>
          <div className="cond" style={{ fontSize: 12.5, color: 'var(--dim)' }}>{AUTH.ADMIN_DEFAULT.email} · {AUTH.ADMIN_DEFAULT.password}</div>
          <div style={{ fontSize: 10.5, color: 'var(--faint)', marginTop: 5, lineHeight: 1.4 }}>Modificabili dopo l'accesso in Impostazioni → Account staff.</div>
        </div>
        <a href={siteHref || '#'} onClick={(e) => { if (!siteHref) { e.preventDefault(); exit(); } }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16, color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
          <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><Icon name="chevron" size={15} color="var(--dim)" stroke={2.2} /></span>Torna al sito
        </a>
      </div>
    </div>
  );
}
const admLbl = { fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 };
const admInput = { width: '100%', background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: 11, padding: '13px 15px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14.5, outline: 'none' };

// ---------- ADMIN APP (gate + panel) ----------
function AdminApp({ siteHref, onExit, appHref, onApp }) {
  const [authed, setAuthed] = React.useState(false);
  const [checking, setChecking] = React.useState(true);
  React.useEffect(() => {
    AUTH.isAdmin().then(v => { setAuthed(v); setChecking(false); });
  }, []);
  if (checking) return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="assets/logo-badge.png" alt="" style={{ width: 56, opacity: 0.5, marginBottom: 16 }} />
        <div className="cond" style={{ color: 'var(--faint)', fontSize: 13 }}>Verifica sessione…</div>
      </div>
    </div>
  );
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} siteHref={siteHref} onExit={onExit} />;
  return <AdminPanel siteHref={siteHref} onExit={onExit} appHref={appHref} onApp={onApp}
    onLogout={async () => { await AUTH.adminLogout(); setAuthed(false); }} />;
}

Object.assign(window, { AdminPanel, AdminApp });
