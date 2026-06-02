// ─────────────────────────────────────────────────────────────
// CLIENT — Area cliente mobile (login, dashboard, prenota, profilo)
// ─────────────────────────────────────────────────────────────

// ---- small toggle ----
function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 999, border: '1px solid ' + (on ? 'rgba(238,90,28,0.5)' : 'var(--line-2)'),
      background: on ? 'var(--fire-grad)' : 'var(--surface-3)', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'all .2s',
    }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: 999, background: on ? '#1a0e06' : 'var(--dim)', transition: 'all .2s' }} />
    </button>
  );
}

// ════════════════════════════════ LOGIN ══════════════════════
function LoginScreen({ onSuccess, goRegister, siteHref }) {
  const [email, setEmail] = React.useState('marco.bellini@email.it');
  const [pwd, setPwd] = React.useState('demo1234');
  const [err, setErr] = React.useState('');
  const submit = () => {
    const r = (typeof AUTH !== 'undefined') ? AUTH.clientLogin(email, pwd) : { ok: true };
    if (r.ok) onSuccess(AUTH.currentClient ? AUTH.currentClient() : ME);
    else setErr(r.err || 'Accesso non riuscito');
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 60% at 50% -5%, rgba(238,90,28,0.22), transparent 60%)' }} />
      <LogoWatermark opacity={0.06} top="54%" />
      <div className="ph" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, border: 'none', borderRadius: 0, opacity: 0.5 }}>
        <span className="ph-label" style={{ position: 'absolute', top: 60, right: 16 }}>foto sala</span>
      </div>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 26px' }}>
        <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 96, height: 'auto', margin: '0 auto 18px', display: 'block', filter: 'drop-shadow(0 10px 28px rgba(238,90,28,0.4))' }} />
        <div className="kicker" style={{ textAlign: 'center', letterSpacing: '0.3em', marginBottom: 8 }}>Area riservata</div>
        <h1 className="display" style={{ margin: '0 0 26px', fontSize: 38, color: 'var(--text)', textAlign: 'center', lineHeight: 0.9 }}>ACCEDI</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={loginLbl}>Email</label>
            <input value={email} onChange={e => { setEmail(e.target.value); setErr(''); }} style={loginInput} />
          </div>
          <div>
            <label style={loginLbl}>Password</label>
            <input type="password" value={pwd} onChange={e => { setPwd(e.target.value); setErr(''); }} onKeyDown={e => e.key === 'Enter' && submit()} style={loginInput} />
          </div>
          {err && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(224,83,58,0.1)', border: '1px solid rgba(224,83,58,0.4)' }}>
              <Icon name="shield" size={15} color="var(--bad)" stroke={2} />
              <span style={{ fontSize: 12, color: 'var(--bad)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{err}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, marginTop: 2 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--dim)', fontFamily: 'var(--font-cond)' }}>
              <span style={{ width: 16, height: 16, borderRadius: 5, background: 'rgba(238,90,28,0.15)', border: '1px solid rgba(238,90,28,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={11} color="var(--amber)" stroke={3} />
              </span>Ricordami
            </label>
            <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>Password dimenticata?</span>
          </div>
          <div style={{ marginTop: 10 }}><FireButton size="lg" full icon="logout" onClick={submit}>Entra</FireButton></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>oppure</span>
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <GhostButton size="md" full onClick={goRegister}>Crea un account · Iscriviti</GhostButton>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--faint)', marginTop: 22, lineHeight: 1.5 }}>
          Autenticazione protetta · 2FA opzionale<br />La forza si costruisce quando nessuno guarda.
        </p>
        {siteHref && (
          <a href={siteHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14, color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
            <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><Icon name="chevron" size={15} color="var(--dim)" stroke={2.2} /></span>Torna al sito
          </a>
        )}
      </div>
    </div>
  );
}
const loginLbl = { fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 };
const loginInput = { width: '100%', background: 'rgba(20,18,16,0.85)', border: '1px solid var(--line-2)', borderRadius: 11, padding: '13px 15px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14.5, outline: 'none' };

// ════════════════════════════════ REGISTRAZIONE ══════════════
function RegisterScreen({ onSuccess, goLogin, siteHref }) {
  const [f, setF] = React.useState({ first: '', last: '', nick: '', email: '', pwd: '', pwd2: '' });
  const [consent, setConsent] = React.useState(false);
  const [err, setErr] = React.useState('');
  const set = (k) => (e) => { setF(s => ({ ...s, [k]: e.target.value })); setErr(''); };
  const submit = () => {
    if (!f.first.trim() || !f.last.trim()) return setErr('Inserisci nome e cognome');
    if (!f.email.trim() || !/.+@.+\..+/.test(f.email)) return setErr('Email non valida');
    if (!f.nick.trim()) return setErr('Scegli un nickname');
    if (f.pwd.length < 6) return setErr('Password troppo corta (min 6 caratteri)');
    if (f.pwd !== f.pwd2) return setErr('Le password non coincidono');
    if (!consent) return setErr('Accetta privacy e trattamento dati');
    const client = {
      first: f.first.trim(), last: f.last.trim(), name: f.first.trim() + ' ' + f.last.trim(),
      nick: f.nick.trim(), email: f.email.trim(), password: f.pwd,
      id: 'ISG-2026-' + String(Math.floor(1000 + Math.random() * 8999)),
      consents: { chat: false, privacy: true, marketing: false, data: true },
    };
    const r = (typeof AUTH !== 'undefined') ? AUTH.addClient(client) : { ok: true };
    if (!r.ok) return setErr(r.err || 'Registrazione non riuscita');
    AUTH.clientLogin(f.email.trim(), f.pwd);
    onSuccess(AUTH.currentClient());
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--ink)', position: 'relative', overflowY: 'auto' }} className="noscroll">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'radial-gradient(120% 100% at 50% -10%, rgba(238,90,28,0.2), transparent 60%)' }} />
      <LogoWatermark opacity={0.05} top="52%" />
      <div style={{ position: 'relative', padding: '48px 26px 28px' }}>
        <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 72, height: 'auto', margin: '0 auto 14px', display: 'block', filter: 'drop-shadow(0 10px 28px rgba(238,90,28,0.4))' }} />
        <div className="kicker" style={{ textAlign: 'center', marginBottom: 8 }}>Unisciti al Syndacate</div>
        <h1 className="display" style={{ margin: '0 0 22px', fontSize: 32, color: 'var(--text)', textAlign: 'center', lineHeight: 0.9 }}>CREA<br /><span className="fire-text">ACCOUNT</span></h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}><label style={loginLbl}>Nome</label><input value={f.first} onChange={set('first')} style={loginInput} /></div>
            <div style={{ flex: 1 }}><label style={loginLbl}>Cognome</label><input value={f.last} onChange={set('last')} style={loginInput} /></div>
          </div>
          <div><label style={loginLbl}>Nickname pubblico</label><input value={f.nick} onChange={set('nick')} placeholder="Es. Iron_Marco" style={loginInput} /></div>
          <div><label style={loginLbl}>Email</label><input value={f.email} onChange={set('email')} style={loginInput} /></div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}><label style={loginLbl}>Password</label><input type="password" value={f.pwd} onChange={set('pwd')} style={loginInput} /></div>
            <div style={{ flex: 1 }}><label style={loginLbl}>Conferma</label><input type="password" value={f.pwd2} onChange={set('pwd2')} onKeyDown={e => e.key === 'Enter' && submit()} style={loginInput} /></div>
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer', marginTop: 2 }} onClick={() => setConsent(c => !c)}>
            <span style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, background: consent ? 'var(--fire-grad)' : 'var(--surface)', border: '1px solid ' + (consent ? 'transparent' : 'var(--line-2)'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {consent && <Icon name="check" size={12} color="#1a0e06" stroke={3} />}
            </span>
            <span style={{ fontSize: 11.5, color: 'var(--dim)', lineHeight: 1.4 }}>Accetto l'informativa privacy e il trattamento dei dati (GDPR). I consensi su chat e comunicazioni sono gestibili dal profilo.</span>
          </label>
          {err && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(224,83,58,0.1)', border: '1px solid rgba(224,83,58,0.4)' }}>
              <Icon name="shield" size={15} color="var(--bad)" stroke={2} />
              <span style={{ fontSize: 12, color: 'var(--bad)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{err}</span>
            </div>
          )}
          <div style={{ marginTop: 6 }}><FireButton size="lg" full icon="flame" onClick={submit}>Crea account ed entra</FireButton></div>
          <button onClick={goLogin} style={{ background: 'none', border: 'none', color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13, cursor: 'pointer', padding: 8 }}>Hai già un account? <span style={{ color: 'var(--amber)' }}>Accedi</span></button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════ DASHBOARD ══════════════════
function ProgressRing({ pct, size = 54, label }) {
  const r = (size - 6) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--amber)" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
    </svg>
  );
}

function ClientDashboard({ me, go, toast }) {
  const noPlan = me.isNew || me.expiryDays === 0;
  const myBookings = me.isNew ? [] : MY_BOOKINGS;
  const planPct = noPlan ? 0 : 1 - me.expiryDays / 365;
  const quick = [
    { i: 'dumbbell', l: 'Prenota PT', go: 'book' },
    { i: 'qr', l: 'Tessera', go: 'card' },
    { i: 'doc', l: 'Documenti', act: () => go('profile', 'docs') },
    { i: 'refresh', l: 'Rinnova', go: 'plans' },
  ];
  return (
    <div style={{ animation: 'fadeUp .3s ease' }}>
      {/* greeting header */}
      <div style={{ position: 'relative', padding: '56px 20px 22px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(110% 90% at 0% 0%, rgba(238,90,28,0.16), transparent 55%)' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="kicker" style={{ marginBottom: 6 }}>{new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            <h1 className="display" style={{ margin: 0, fontSize: 32, color: 'var(--text)', lineHeight: 0.92 }}>CIAO,<br /><span className="fire-text">{me.first.toUpperCase()}</span></h1>
          </div>
          <button onClick={() => go('profile', 'notifs')} style={{ background: 'rgba(13,12,10,0.5)', border: '1px solid var(--line)', borderRadius: 999, padding: 9, position: 'relative', marginTop: 4 }}>
            <Icon name="bell" size={20} color="var(--text)" stroke={1.9} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: 'var(--fire)', border: '1.5px solid var(--ink)' }} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* membership card */}
        <div style={{ borderRadius: 18, padding: 18, background: 'linear-gradient(150deg, var(--surface-3), var(--surface) 75%)', border: '1px solid var(--line-2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 100% 0%, rgba(238,90,28,0.14), transparent 55%)' }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Il tuo abbonamento</div>
              <div className="display" style={{ fontSize: 24, color: 'var(--text)', marginTop: 3 }}>{me.plan}</div>
              <div style={{ marginTop: 6 }}><Badge tone={noPlan ? 'warn' : 'ok'} dot size="sm">{noPlan ? 'Da attivare' : 'Attivo'}</Badge></div>
            </div>
            {noPlan ? (
              <button onClick={() => go('plans')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'rgba(238,90,28,0.12)', border: '1px solid rgba(238,90,28,0.45)', borderRadius: 12, padding: '12px 14px', cursor: 'pointer' }}>
                <Icon name="flame" size={22} color="var(--amber)" stroke={1.9} />
                <span className="cond" style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase' }}>Attiva</span>
              </button>
            ) : (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ProgressRing pct={planPct} />
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1 }}>{me.expiryDays}</div>
                  <div style={{ fontSize: 8, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase' }}>giorni</div>
                </div>
              </div>
            )}
          </div>
          <div style={{ position: 'relative', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: 10, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scade</div>
              <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>{me.expiry}</div>
            </div>
            <div style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: 10, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Credito</div>
              <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--amber)', marginTop: 2 }}>{(me.credit || 0).toFixed(2)} €</div>
            </div>
          </div>
        </div>

        {/* quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9 }}>
          {quick.map((q, i) => (
            <button key={i} onClick={() => q.act ? q.act() : go(q.go)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, padding: '14px 4px', borderRadius: 13,
              background: 'var(--surface-2)', border: '1px solid var(--line)', cursor: 'pointer',
            }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(238,90,28,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={q.i} size={19} color="var(--amber)" stroke={2} />
              </span>
              <span className="cond" style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.02em', textAlign: 'center', lineHeight: 1.1 }}>{q.l}</span>
            </button>
          ))}
        </div>

        {/* cert alert */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 13, background: me.cert === 'valid' ? 'rgba(245,166,35,0.08)' : 'rgba(224,83,58,0.1)', border: '1px solid ' + (me.cert === 'valid' ? 'rgba(245,166,35,0.3)' : 'rgba(224,83,58,0.4)') }}>
          <Icon name="shield" size={20} color={me.cert === 'valid' ? 'var(--warn)' : 'var(--bad)'} stroke={1.9} />
          <div style={{ flex: 1 }}>
            <div className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{me.cert === 'valid' ? 'Certificato medico valido' : 'Certificato medico mancante'}</div>
            <div style={{ fontSize: 11.5, color: 'var(--dim)' }}>{me.cert === 'valid' ? `Scade il ${me.certExp} · tra ${me.certDays} giorni` : 'Carica il certificato per accedere in sala'}</div>
          </div>
          <GhostButton size="sm" onClick={() => go('profile', 'docs')}>{me.cert === 'valid' ? 'Gestisci' : 'Carica'}</GhostButton>
        </div>

        {/* next bookings */}
        <div>
          <SectionTitle kicker="In agenda" title="Prossime sessioni" action="Prenota" onAction={() => go('book')} />
          {myBookings.length === 0 ? (
            <div style={{ padding: '22px 16px', borderRadius: 13, background: 'var(--surface)', border: '1px dashed var(--line-2)', textAlign: 'center' }}>
              <div className="cond" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dim)' }}>Nessuna sessione prenotata</div>
              <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 3 }}>Prenota il tuo primo allenamento con un coach.</div>
            </div>
          ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {myBookings.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: 13, borderRadius: 13, background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ textAlign: 'center', width: 44, flexShrink: 0 }}>
                  <div className="display" style={{ fontSize: 17, color: 'var(--amber)', lineHeight: 1 }}>{b.date.split(' ')[0]}</div>
                  <div className="cond" style={{ fontSize: 10, color: 'var(--faint)', textTransform: 'uppercase' }}>{b.date.split(' ')[1]}</div>
                </div>
                <div style={{ width: 1, height: 32, background: 'var(--line)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{b.type}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>{b.time} · {b.coach}</div>
                </div>
                <Badge tone={b.state === 'confermata' ? 'ok' : 'warn'} size="sm">{b.state}</Badge>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* quote */}
        <QuoteCard />
      </div>
      <div style={{ height: 18 }} />
    </div>
  );
}

// ════════════════════════════════ PRENOTA PT ═════════════════
function BookingScreen({ toast }) {
  const [type, setType] = React.useState('single');
  const [coach, setCoach] = React.useState('mf');
  const [day, setDay] = React.useState('02');
  const [slot, setSlot] = React.useState('07:00');
  const t = BOOKING_TYPES.find(x => x.id === type);
  const c = TRAINERS.find(x => x.id === coach);
  return (
    <div style={{ padding: '8px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ marginBottom: 18 }}>
        <div className="kicker" style={{ marginBottom: 6 }}>Personal training</div>
        <h1 className="display" style={{ margin: 0, fontSize: 32, color: 'var(--text)' }}>PRENOTA</h1>
      </div>

      <div className="cond" style={bookStep}>1 · Tipo di sessione</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 22 }}>
        {BOOKING_TYPES.map(b => {
          const on = type === b.id;
          return (
            <button key={b.id} onClick={() => setType(b.id)} style={{
              textAlign: 'left', padding: 13, borderRadius: 13, cursor: 'pointer',
              background: on ? 'rgba(238,90,28,0.1)' : 'var(--surface-2)', border: '1px solid ' + (on ? 'rgba(238,90,28,0.5)' : 'var(--line)'),
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Icon name={b.icon} size={20} color={on ? 'var(--amber)' : 'var(--dim)'} stroke={1.9} />
                <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: b.price ? 'var(--text)' : 'var(--ok)' }}>{b.price ? b.price + '€' : 'Gratis'}</span>
              </div>
              <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{b.name}</div>
              <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 2 }}>{b.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="cond" style={bookStep}>2 · Scegli il coach</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
        {TRAINERS.map(tr => {
          const on = coach === tr.id;
          return (
            <button key={tr.id} onClick={() => setCoach(tr.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 13, textAlign: 'left', cursor: 'pointer',
              background: on ? 'rgba(238,90,28,0.1)' : 'var(--surface-2)', border: '1px solid ' + (on ? 'rgba(238,90,28,0.5)' : 'var(--line)'),
            }}>
              <Avatar name={tr.name} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{tr.name}</div>
                <div style={{ fontSize: 11, color: 'var(--faint)' }}>{tr.role}</div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Icon name="star" size={13} color="var(--amber)" stroke={2} />
                <span className="cond" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)' }}>{tr.rating}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="cond" style={bookStep}>3 · Giorno & ora</div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 14px', padding: '0 20px' }} className="noscroll">
        {BOOK_DAYS.map(d => {
          const on = day === d.n;
          return (
            <button key={d.n} disabled={d.full} onClick={() => setDay(d.n)} style={{
              flexShrink: 0, width: 54, padding: '10px 0', borderRadius: 12, cursor: d.full ? 'not-allowed' : 'pointer', opacity: d.full ? 0.4 : 1,
              background: on ? 'var(--fire-grad)' : 'var(--surface-2)', border: '1px solid ' + (on ? 'transparent' : 'var(--line)'), textAlign: 'center',
            }}>
              <div className="cond" style={{ fontSize: 10.5, color: on ? '#1a0e06' : 'var(--faint)', textTransform: 'uppercase', fontWeight: 600 }}>{d.d}</div>
              <div className="display" style={{ fontSize: 18, color: on ? '#1a0e06' : 'var(--text)' }}>{d.n}</div>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
        {BOOK_SLOTS.map(s => {
          const on = slot === s.t;
          return (
            <button key={s.t} disabled={!s.free} onClick={() => setSlot(s.t)} style={{
              padding: '11px 0', borderRadius: 10, cursor: s.free ? 'pointer' : 'not-allowed', opacity: s.free ? 1 : 0.35,
              background: on ? 'rgba(238,90,28,0.13)' : 'var(--surface-2)', border: '1px solid ' + (on ? 'rgba(238,90,28,0.5)' : 'var(--line)'),
              color: on ? 'var(--amber)' : 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13,
            }}>{s.t}</button>
          );
        })}
      </div>

      {/* summary */}
      <Panel glow style={{ borderColor: 'rgba(238,90,28,0.3)' }}>
        <div className="kicker" style={{ marginBottom: 12 }}>Riepilogo</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['Sessione', t.name], ['Coach', c.short], ['Quando', `${day} Giu · ${slot}`], ['Costo', t.price ? t.price + '€' : 'Incluso']].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{r[0]}</span>
              <span className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)' }}>{r[1]}</span>
            </div>
          ))}
        </div>
        <FireButton full icon="check" onClick={() => toast(`Prenotato · ${t.name} con ${c.short}, ${day} Giu ${slot}`)}>Conferma prenotazione</FireButton>
      </Panel>
    </div>
  );
}
const bookStep = { fontSize: 12, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 };

// ════════════════════════════════ DOCUMENTI (cliente) ════════
function DocumentsScreen({ toast }) {
  return (
    <div style={{ padding: '4px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 13, background: 'rgba(91,155,213,0.08)', border: '1px solid rgba(91,155,213,0.3)', marginBottom: 16 }}>
        <Icon name="bolt" size={18} color="var(--info)" stroke={2} />
        <span style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.4 }}>I documenti caricati vengono letti automaticamente: i dati principali sono estratti e validati dall'amministrazione.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MY_DOCS.map(d => {
          const st = docClientMap[d.status];
          return (
            <Panel key={d.id} pad={15}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <span style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(238,90,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={d.icon} size={20} color="var(--amber)" stroke={1.8} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{d.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>{d.exp ? 'Scade ' + d.exp + ' · ' : ''}{d.sub}</div>
                </div>
                <Badge tone={st.tone} size="sm" dot>{st.label}</Badge>
              </div>
              <div style={{ marginTop: 12 }}>
                {d.status === 'missing'
                  ? <FireButton size="sm" full icon="plus" onClick={() => toast(`Carica ${d.name}`)}>Carica documento</FireButton>
                  : <GhostButton size="sm" full icon="refresh" onClick={() => toast(`Aggiorna ${d.name}`)}>Sostituisci / aggiorna</GhostButton>}
              </div>
            </Panel>
          );
        })}
      </div>
      {/* upload dropzone */}
      <div onClick={() => toast('Apertura selezione file…')} style={{ marginTop: 14, padding: '26px 20px', borderRadius: 14, border: '1.5px dashed var(--line-2)', background: 'var(--surface)', textAlign: 'center', cursor: 'pointer' }}>
        <Icon name="plus" size={26} color="var(--amber)" stroke={2} />
        <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginTop: 8, textTransform: 'uppercase' }}>Carica nuovo documento</div>
        <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 3 }}>PDF, JPG o PNG · max 10MB</div>
      </div>
    </div>
  );
}

// ════════════════════════════════ NOTIFICHE ══════════════════
function NotificationsScreen() {
  const toneC = { ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)', info: 'var(--info)', fire: 'var(--amber)' };
  return (
    <div style={{ padding: '4px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NOTIFS.map(n => (
          <div key={n.id} style={{ display: 'flex', gap: 13, padding: 15, borderRadius: 13, background: n.read ? 'var(--surface)' : 'var(--surface-2)', border: '1px solid ' + (n.read ? 'var(--line)' : 'var(--line-2)') }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={n.icon} size={19} color={toneC[n.tone]} stroke={1.9} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{n.title}</span>
                {!n.read && <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--fire)' }} />}
              </div>
              <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.4 }}>{n.body}</p>
              <div style={{ fontSize: 10.5, color: 'var(--faint)', marginTop: 6, fontFamily: 'var(--font-cond)' }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════ CHAT STAFF (cliente) ═══════
function ClientChatScreen({ toast }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }} className="noscroll">
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '4px 0' }}>Chat privata con lo staff</div>
        {CLIENT_DM.map((m, i) => {
          const mine = m.from === 'client';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '78%' }}>
                <div style={{
                  padding: '11px 14px', borderRadius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: mine ? 'var(--fire-grad)' : 'var(--surface-2)', border: mine ? 'none' : '1px solid var(--line)',
                  color: mine ? '#1a0e06' : 'var(--text)', fontSize: 13.5, lineHeight: 1.45,
                }}>{m.text}</div>
                <div style={{ fontSize: 10, color: 'var(--faint)', marginTop: 4, textAlign: mine ? 'right' : 'left', fontFamily: 'var(--font-cond)' }}>{mine ? 'Tu' : 'Staff ISG'} · {m.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: 14, borderTop: '1px solid var(--line)', display: 'flex', gap: 9, alignItems: 'center', background: 'var(--ink)' }}>
        <input placeholder="Scrivi allo staff…" style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 11, padding: '11px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13.5, outline: 'none' }} />
        <button onClick={() => toast('Messaggio inviato allo staff')} style={{ width: 44, height: 44, borderRadius: 11, border: 'none', background: 'var(--fire-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <Icon name="arrow" size={20} color="#1a0e06" stroke={2.6} />
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════ PROFILO ════════════════════
function ProfileScreen({ me, sub, setSub, onLogout, toast }) {
  if (sub === 'docs') return <DocumentsScreen toast={toast} />;
  if (sub === 'notifs') return <NotificationsScreen />;
  if (sub === 'chat') return <ClientChatScreen toast={toast} />;
  if (sub === 'data') return <PersonalDataScreen me={me} toast={toast} />;
  if (sub === 'consents') return <ConsentsScreen me={me} toast={toast} />;

  const menu = [
    { k: 'data', i: 'user', l: 'Dati personali', s: 'Nome, contatti, codice fiscale' },
    { k: 'docs', i: 'doc', l: 'Documenti & certificato', s: '1 documento mancante', badge: 'warn' },
    { k: 'chat', i: 'chat', l: 'Chat con lo staff', s: 'Supporto e comunicazioni' },
    { k: 'notifs', i: 'bell', l: 'Notifiche', s: '2 non lette' },
    { k: 'consents', i: 'shield', l: 'Privacy & consensi', s: 'GDPR, chat, comunicazioni' },
  ];
  return (
    <div style={{ padding: '4px 20px 20px', animation: 'fadeUp .3s ease' }}>
      {/* header card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 15, padding: 16, borderRadius: 16, background: 'linear-gradient(150deg, var(--surface-3), var(--surface))', border: '1px solid var(--line-2)', marginBottom: 18 }}>
        <Avatar name={me.name} size={58} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontSize: 21, color: 'var(--text)' }}>{me.name}</div>
          <div className="cond" style={{ fontSize: 13, color: 'var(--amber)', marginTop: 2 }}>@{me.nick}</div>
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 2 }}>{me.id}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {menu.map(m => (
          <button key={m.k} onClick={() => setSub(m.k)} style={{
            display: 'flex', alignItems: 'center', gap: 13, padding: 14, borderRadius: 13, textAlign: 'left', cursor: 'pointer',
            background: 'var(--surface-2)', border: '1px solid var(--line)',
          }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(238,90,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={m.i} size={19} color="var(--amber)" stroke={1.9} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cond" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{m.l}</div>
              <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>{m.s}</div>
            </div>
            {m.badge && <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--warn)' }} />}
            <Icon name="chevron" size={16} color="var(--faint)" />
          </button>
        ))}
      </div>
      <button onClick={onLogout} style={{
        marginTop: 18, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 14,
        borderRadius: 13, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--bad)',
        fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 13.5, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
      }}>
        <Icon name="logout" size={17} color="var(--bad)" stroke={2.1} />Esci
      </button>
    </div>
  );
}

function PersonalDataScreen({ me, toast }) {
  const fields = [['Nome', me.first], ['Cognome', me.name.split(' ')[1]], ['Nickname pubblico', me.nick], ['Email', me.email], ['Telefono', me.phone], ['Data di nascita', me.dob], ['Codice fiscale', me.cf], ['Indirizzo', me.address]];
  return (
    <div style={{ padding: '4px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {fields.map((f, i) => (
          <div key={i}>
            <label style={loginLbl}>{f[0]}</label>
            <input defaultValue={f[1]} style={{ ...loginInput, background: 'var(--surface)', fontSize: 13.5, padding: '12px 14px' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 11, color: 'var(--faint)', lineHeight: 1.4 }}>
        <Icon name="shield" size={14} color="var(--faint)" stroke={1.9} />
        Il tuo numero di telefono non è mai visibile agli altri clienti.
      </div>
      <div style={{ marginTop: 16 }}><FireButton full icon="check" onClick={() => toast('Dati aggiornati')}>Salva modifiche</FireButton></div>
    </div>
  );
}

function ConsentsScreen({ me, toast }) {
  const [c, setC] = React.useState(me.consents);
  const items = [
    { k: 'chat', l: 'Chat interna', s: 'Il nickname sarà visibile agli altri utenti. Dati personali mai visibili.' },
    { k: 'privacy', l: 'Trattamento dati (privacy)', s: 'Necessario per l\'iscrizione. Conforme GDPR.' },
    { k: 'data', l: 'Caricamento documenti', s: 'Acconsenti all\'estrazione e validazione dei dati.' },
    { k: 'marketing', l: 'Comunicazioni commerciali', s: 'Promozioni ed eventi via email. Revocabile.' },
  ];
  return (
    <div style={{ padding: '4px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(it => (
          <div key={it.k} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: 15, borderRadius: 13, background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <div style={{ flex: 1 }}>
              <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{it.l}</div>
              <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 3, lineHeight: 1.4 }}>{it.s}</div>
            </div>
            <Toggle on={c[it.k]} onChange={(v) => { setC(s => ({ ...s, [it.k]: v })); toast(v ? 'Consenso attivato' : 'Consenso revocato'); }} />
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--faint)', marginTop: 16, lineHeight: 1.5 }}>
        Puoi revocare i consensi in qualsiasi momento. Le modifiche vengono registrate nel registro consensi.
      </p>
    </div>
  );
}

Object.assign(window, {
  Toggle, LoginScreen, RegisterScreen, ClientDashboard, BookingScreen, DocumentsScreen,
  NotificationsScreen, ClientChatScreen, ProfileScreen, PersonalDataScreen, ConsentsScreen,
});
