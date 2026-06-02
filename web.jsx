// ─────────────────────────────────────────────────────────────
// WEB — Sito vetrina desktop (single-page, dentro browser window)
// ─────────────────────────────────────────────────────────────

const WEB_MAX = 1140;
function Wrap({ children, style = {} }) {
  return <div style={{ maxWidth: WEB_MAX, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)', ...style }}>{children}</div>;
}
function WebKicker({ children, center }) {
  return <div className="kicker" style={{ marginBottom: 12, textAlign: center ? 'center' : 'left' }}>{children}</div>;
}

// ---------- NAV ----------
function WebNav({ onNav, onLogin }) {
  const links = [['palestra', 'La palestra'], ['servizi', 'Servizi'], ['panatta', 'Attrezzatura'], ['abbonamenti', 'Abbonamenti'], ['eventi', 'Eventi'], ['contatti', 'Contatti']];
  const mobile = useIsMobile(900);
  const [open, setOpen] = React.useState(false);
  const goto = (k) => { setOpen(false); onNav(k); };
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50, height: 68, display: 'flex', alignItems: 'center',
      background: 'rgba(13,12,10,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)',
    }}>
      <Wrap style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 28 }}>
        <button onClick={() => goto('top')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flex: mobile ? 1 : 'unset' }}>
          <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 34, height: 'auto', filter: 'drop-shadow(0 3px 8px rgba(238,90,28,0.4))' }} />
          <span className="display" style={{ fontSize: 17, color: 'var(--text)', letterSpacing: '0.02em' }}>IRON SYNDACATE</span>
        </button>

        {!mobile && (
          <div style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
            {links.map(([k, l]) => (
              <button key={k} onClick={() => onNav(k)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 13px', borderRadius: 8,
                color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, letterSpacing: '0.02em', transition: 'color .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}>{l}</button>
            ))}
          </div>
        )}

        {!mobile ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <GhostButton size="sm" icon="logout" onClick={onLogin}>Accedi</GhostButton>
            <FireButton size="sm" icon="flame" onClick={onLogin}>Iscriviti</FireButton>
          </div>
        ) : (
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{
            width: 44, height: 44, borderRadius: 11, background: 'var(--surface-2)', border: '1px solid var(--line-2)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', flexShrink: 0,
          }}>
            <span style={{ width: 18, height: 2, background: open ? 'var(--amber)' : 'var(--text)', borderRadius: 2, transition: 'transform .2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 18, height: 2, background: 'var(--text)', borderRadius: 2, opacity: open ? 0 : 1, transition: 'opacity .15s' }} />
            <span style={{ width: 18, height: 2, background: open ? 'var(--amber)' : 'var(--text)', borderRadius: 2, transition: 'transform .2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        )}
      </Wrap>

      {/* mobile dropdown */}
      {mobile && open && (
        <div style={{
          position: 'absolute', top: 68, left: 0, right: 0, background: 'rgba(13,12,10,0.97)', backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line-2)', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2, animation: 'fadeUp .2s ease',
        }}>
          {links.map(([k, l]) => (
            <button key={k} onClick={() => goto(k)} style={{
              textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--line)', cursor: 'pointer', padding: '14px 4px',
              color: 'var(--text)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.03em',
            }}>{l}</button>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <GhostButton size="md" full icon="logout" onClick={() => { setOpen(false); onLogin(); }}>Accedi</GhostButton>
            <FireButton size="md" full icon="flame" onClick={() => { setOpen(false); onLogin(); }}>Iscriviti</FireButton>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- HERO ----------
function WebHero({ onLogin, onNav }) {
  const stats = [['248', 'Atleti attivi'], ['40+', 'Macchine Panatta'], ['7/7', 'Aperti'], ['12', 'Eventi/mese']];
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(56px, 9vw, 90px) 0 clamp(48px, 7vw, 70px)' }}>
      <div className="ph" style={{ position: 'absolute', inset: 0, border: 'none', borderRadius: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 70% at 20% 0%, rgba(238,90,28,0.26), transparent 55%), linear-gradient(110deg, var(--ink) 30%, rgba(13,12,10,0.5) 70%), linear-gradient(0deg, var(--ink), transparent 60%)' }} />
        <span className="ph-label" style={{ position: 'absolute', top: 20, right: 24 }}>foto wide — sala Panatta Gold's-style</span>
      </div>
      <Wrap style={{ position: 'relative' }}>
        <div style={{ maxWidth: 660 }}>
          <WebKicker>Valeggio sul Mincio · VR · Palestra pilota Panatta</WebKicker>
          <h1 className="display" style={{ margin: 0, fontSize: 'clamp(46px, 11vw, 88px)', lineHeight: 0.84, color: 'var(--text)' }}>
            FORZA.<br />DISCIPLINA.<br /><span className="fire-text">COSTANZA.</span>
          </h1>
          <p style={{ margin: '26px 0 30px', fontSize: 'clamp(15px, 2.2vw, 18px)', lineHeight: 1.55, color: 'var(--dim)', maxWidth: 520 }}>
            Non sei qui per allenarti. Sei qui per costruirti. Una temple of iron attrezzata con la linea completa <strong style={{ color: 'var(--text)' }}>Panatta</strong>: plate loaded, isotoniche e pesi liberi.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <FireButton size="lg" icon="flame" onClick={onLogin}>Prenota una prova</FireButton>
            <GhostButton size="lg" icon="card" onClick={() => onNav('abbonamenti')}>Scopri gli abbonamenti</GhostButton>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 40px)', marginTop: 'clamp(36px, 6vw, 56px)', flexWrap: 'wrap' }}>
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="display" style={{ fontSize: 'clamp(32px, 6vw, 40px)', color: 'var(--text)', lineHeight: 1 }}>{n}</div>
              <div className="cond" style={{ fontSize: 12.5, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  );
}

// ---------- QUOTE BAR ----------
function WebQuote() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'linear-gradient(90deg, rgba(238,90,28,0.06), transparent 60%)', padding: '26px 0' }}>
      <Wrap style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Icon name="flame" size={30} color="var(--fire)" stroke={1.6} />
        <div>
          <div className="kicker" style={{ marginBottom: 6 }}>Citazione del giorno</div>
          <p className="cond" style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>"{quoteOfTheDay()}"</p>
        </div>
      </Wrap>
    </div>
  );
}

// ---------- SERVICES ----------
function WebServices() {
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0' }}>
      <Wrap>
        <WebKicker>Cosa facciamo</WebKicker>
        <h2 className="display" style={{ margin: '0 0 40px', fontSize: 'clamp(34px, 6vw, 48px)', color: 'var(--text)' }}>I nostri <span className="fire-text">servizi</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ padding: 22, borderRadius: 16, background: 'linear-gradient(180deg, var(--surface-2), var(--surface))', border: '1px solid var(--line)', transition: 'border-color .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(238,90,28,0.45)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span className="cond" style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 600, letterSpacing: '0.1em' }}>{s.tag}</span>
                <Icon name="dumbbell" size={22} color="var(--fire)" stroke={1.8} />
              </div>
              <h3 className="cond" style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', lineHeight: 1.05 }}>{s.it}</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--dim)', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  );
}

// ---------- PANATTA ----------
function WebPanatta() {
  const zones = [
    { n: 'Plate Loaded', d: 'Carico a dischi, biomeccanica pura' },
    { n: 'Isotoniche', d: 'Linea selectorized completa' },
    { n: 'Pesi Liberi', d: 'Rack, bilancieri, manubri fino a 60kg' },
    { n: 'Functional Rig', d: 'Condizionamento ibrido e metcon' },
  ];
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0', background: 'linear-gradient(180deg, var(--surface), var(--ink))', borderTop: '1px solid var(--line)' }}>
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px, 4vw, 48px)', alignItems: 'center' }}>
          <div>
            <WebKicker>Attrezzatura · Palestra pilota Panatta</WebKicker>
            <h2 className="display" style={{ margin: '0 0 20px', fontSize: 'clamp(34px, 6vw, 48px)', color: 'var(--text)', lineHeight: 0.95 }}>Il ferro non<br /><span className="fire-text">mente.</span></h2>
            <p style={{ margin: '0 0 18px', fontSize: 16, lineHeight: 1.6, color: 'var(--dim)' }}>
              Iron Syndacate è la palestra pilota <strong style={{ color: 'var(--text)' }}>Panatta</strong> della zona: oltre 40 macchine in stile Gold's Gym, una sala interamente dedicata al carico reale e alla biomeccanica corretta.
            </p>
            <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: 'var(--dim)' }}>
              Plate loaded, isotoniche, pesi liberi e functional: l'attrezzatura scelta dai professionisti, per chi prende sul serio il proprio percorso.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {zones.map(z => (
                <div key={z.n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(238,90,28,0.12)', border: '1px solid rgba(238,90,28,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="bolt" size={16} color="var(--amber)" stroke={2} />
                  </span>
                  <div>
                    <span className="cond" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{z.n}</span>
                    <span style={{ fontSize: 13.5, color: 'var(--faint)', marginLeft: 10 }}>{z.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px', gap: 12 }}>
            <div className="ph" style={{ gridColumn: '1 / 3', borderRadius: 16 }}><span className="ph-label">foto — fila macchine isotoniche</span></div>
            <div className="ph" style={{ borderRadius: 16 }}><span className="ph-label">plate loaded</span></div>
            <div className="ph" style={{ borderRadius: 16 }}><span className="ph-label">sala pesi liberi</span></div>
          </div>
        </div>
      </Wrap>
    </div>
  );
}

// ---------- PLANS ----------
function WebPlanCard({ plan, onSelect }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 18, padding: 26, display: 'flex', flexDirection: 'column',
      background: plan.highlight ? 'linear-gradient(180deg, rgba(238,90,28,0.14), var(--surface))' : 'linear-gradient(180deg, var(--surface-2), var(--surface))',
      border: `1px solid ${plan.highlight ? 'rgba(238,90,28,0.55)' : 'var(--line)'}`,
      boxShadow: plan.highlight ? '0 24px 60px rgba(0,0,0,0.45)' : '0 14px 36px rgba(0,0,0,0.28)',
      transform: plan.highlight ? 'translateY(-8px)' : 'none',
    }}>
      {plan.badge && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ background: 'var(--fire-grad)', color: '#1a0e06', fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon name="star" size={12} color="#1a0e06" stroke={2} />{plan.badge}
          </span>
        </div>
      )}
      <div className="cond" style={{ fontSize: 11, color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{plan.period}</div>
      <h3 className="display" style={{ margin: 0, fontSize: 28, color: 'var(--text)' }}>{plan.name}</h3>
      <div style={{ fontSize: 13, color: 'var(--dim)', marginTop: 5 }}>{plan.tagline}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '20px 0' }}>
        <span className="display" style={{ fontSize: 52, color: 'var(--text)', lineHeight: 1 }}>{plan.price}</span>
        <span className="cond" style={{ fontSize: 18, color: 'var(--amber)', fontWeight: 700 }}>€</span>
        <span style={{ fontSize: 13, color: 'var(--faint)', fontFamily: 'var(--font-cond)', marginLeft: 2 }}>{plan.unit}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24, flex: 1 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--dim)' }}>
            <span style={{ width: 19, height: 19, borderRadius: 6, background: 'rgba(238,90,28,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="check" size={12} color="var(--amber)" stroke={3} />
            </span>{f}
          </div>
        ))}
      </div>
      {plan.save && <div style={{ marginBottom: 12 }}><Badge tone="fire" size="sm">{plan.save}</Badge></div>}
      {plan.highlight ? <FireButton full onClick={() => onSelect(plan)}>Scegli {plan.name}</FireButton> : <GhostButton full onClick={() => onSelect(plan)}>Scegli {plan.name}</GhostButton>}
    </div>
  );
}

function WebPlans({ toast }) {
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0' }}>
      <Wrap>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <WebKicker center>Listino</WebKicker>
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 48px)', color: 'var(--text)' }}>Scegli il tuo <span className="fire-text">standard</span></h2>
          <p style={{ margin: '14px auto 0', fontSize: 16, color: 'var(--dim)', maxWidth: 520 }}>Allenati con metodo. Cresci con disciplina. Nessun vincolo nascosto.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, alignItems: 'stretch' }}>
          {PLANS.map(p => <WebPlanCard key={p.id} plan={p} onSelect={(pl) => toast(`${pl.name} selezionato — procedi all'iscrizione`)} />)}
        </div>
      </Wrap>
    </div>
  );
}

// ---------- EVENTS ----------
function WebEvents({ toast }) {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    DB.getEvents().then(data => setEvents(data));
  }, []);
  const sorted = events.slice().sort((a, b) => (a.date||'').localeCompare(b.date||'')).slice(0, 4);
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0', background: 'linear-gradient(180deg, var(--surface), var(--ink))', borderTop: '1px solid var(--line)' }}>
      <Wrap>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <WebKicker>Giugno 2026</WebKicker>
            <h2 className="display" style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 48px)', color: 'var(--text)' }}>Calendario <span className="fire-text">eventi</span></h2>
          </div>
          <GhostButton icon="calendar" onClick={() => toast('Apertura calendario completo')}>Tutti gli eventi</GhostButton>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {sorted.map(e => {
            const full = e.taken >= e.spots;
            return (
              <div key={e.id} style={{ display: 'flex', borderRadius: 16, overflow: 'hidden', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div style={{ width: 110, flexShrink: 0, background: 'linear-gradient(180deg, var(--surface-3), var(--surface))', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="display" style={{ fontSize: 40, color: 'var(--amber)', lineHeight: 1 }}>{e.date.slice(8)}</div>
                  <div className="cond" style={{ fontSize: 12, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Giugno</div>
                  <div className="cond" style={{ fontSize: 12, color: 'var(--faint)', marginTop: 8 }}>{e.time}</div>
                </div>
                <div style={{ flex: 1, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Badge tone="mute" size="sm">{e.cat}</Badge>
                    {e.price > 0 ? <span className="cond" style={{ fontSize: 15, fontWeight: 700, color: 'var(--amber)' }}>{e.price}€</span> : <span className="cond" style={{ fontSize: 12, color: 'var(--ok)', fontWeight: 600, textTransform: 'uppercase' }}>Gratis</span>}
                  </div>
                  <h3 className="cond" style={{ margin: '0 0 8px', fontSize: 21, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{e.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: full ? 'var(--bad)' : 'var(--dim)' }}>{full ? 'Sold out · lista d\'attesa' : `${e.spots - e.taken} posti · ${e.coach}`}</span>
                    <GhostButton size="sm" onClick={() => toast(full ? `Lista d'attesa · ${e.title}` : `Iscritto a ${e.title}`)}>{full ? 'Lista attesa' : 'Iscriviti'}</GhostButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </div>
  );
}

// ---------- VENDING ----------
function WebVending() {
  const [vending, setVending] = React.useState([]);
  React.useEffect(() => {
    DB.getVending().then(data => setVending(data));
  }, []);
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0' }}>
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px, 4vw, 48px)', alignItems: 'center' }}>
          <div>
            <WebKicker>Distributori integratori</WebKicker>
            <h2 className="display" style={{ margin: '0 0 18px', fontSize: 'clamp(32px, 5.5vw, 44px)', color: 'var(--text)', lineHeight: 0.96 }}>Recovery a <span className="fire-text">portata di QR</span></h2>
            <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.6, color: 'var(--dim)' }}>
              Acquista whey, EAA, pre-workout e recovery direttamente dai distributori in sala. Ti identifichi con il tuo <strong style={{ color: 'var(--text)' }}>QR personale</strong> e paghi con il credito interno.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
              <div style={{ padding: 7, background: 'var(--text)', borderRadius: 10, flexShrink: 0 }}>
                <QRCode value="ISG-DEMO" size={64} />
              </div>
              <div>
                <div className="cond" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Un QR, tutto collegato</div>
                <div style={{ fontSize: 13, color: 'var(--faint)', marginTop: 3 }}>Ingresso tornello · acquisti distributore · credito interno</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {VENDING.slice(0, 6).map(v => (
              <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 13, background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <span style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(238,90,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="bolt" size={17} color="var(--amber)" stroke={1.9} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--faint)' }}>{v.cat}</div>
                </div>
                <span className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{v.price.toFixed(2)}€</span>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </div>
  );
}

// ---------- CONTACT + FOOTER ----------
function WebContact({ toast, onLogin, onAdmin, adminHref }) {
  return (
    <div style={{ padding: 'clamp(52px, 8vw, 80px) 0 0' }}>
      <Wrap>
        <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--line-2)', background: 'linear-gradient(150deg, var(--surface-3), var(--surface))', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 120% at 100% 0%, rgba(238,90,28,0.16), transparent 55%)' }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0 }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              <WebKicker>Dove siamo</WebKicker>
              <h2 className="display" style={{ margin: '0 0 24px', fontSize: 'clamp(30px, 5vw, 40px)', color: 'var(--text)', lineHeight: 0.95 }}>Il tuo prossimo<br />livello inizia <span className="fire-text">qui</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                {[['pin', 'Via dell\'Industria 12, Valeggio sul Mincio (VR)'], ['clock', 'Lun–Ven 06–23 · Sab 08–20 · Dom 09–13'], ['phone', '+39 045 000 0000'], ['chat', 'info@ironsyndacate.gym']].map(([i, t]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Icon name={i} size={19} color="var(--amber)" stroke={1.9} />
                    <span style={{ fontSize: 14.5, color: 'var(--dim)' }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <FireButton icon="flame" onClick={onLogin}>Prenota una visita</FireButton>
                <GhostButton icon="whatsapp" onClick={() => toast('Apertura WhatsApp…')}>WhatsApp</GhostButton>
              </div>
            </div>
            <div className="ph" style={{ borderRadius: 0, borderTop: 'none', borderRight: 'none', borderBottom: 'none', minHeight: 240 }}>
              <span className="ph-label">mappa — Valeggio sul Mincio</span>
            </div>
          </div>
        </div>
      </Wrap>
      {/* footer */}
      <div style={{ marginTop: 70, borderTop: '1px solid var(--line)', padding: '36px 0' }}>
        <Wrap style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 30, height: 'auto' }} />
            <div>
              <div className="display" style={{ fontSize: 15, color: 'var(--text)' }}>IRON SYNDACATE GYM</div>
              <div style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>© 2026 · Valeggio sul Mincio · P.IVA 0000000000</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
            {adminHref
              ? <a href={adminHref} style={{ fontSize: 12.5, color: 'var(--amber)', fontFamily: 'var(--font-cond)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="grid" size={14} color="var(--amber)" stroke={2} />Area Staff</a>
              : <span onClick={onAdmin} style={{ fontSize: 12.5, color: 'var(--amber)', fontFamily: 'var(--font-cond)', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="grid" size={14} color="var(--amber)" stroke={2} />Area Staff</span>}
            {['Privacy', 'Cookie', 'Termini', 'Instagram'].map(l => (
              <span key={l} style={{ fontSize: 12.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', fontWeight: 600, cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </Wrap>
      </div>
    </div>
  );
}

// ---------- SITE ----------
function WebSite({ onLogin, onAdmin, adminHref }) {
  const scrollRef = React.useRef(null);
  const [toastMsg, setToastMsg] = React.useState('');
  const toast = (m) => setToastMsg(m);
  const refs = {
    top: React.useRef(null), palestra: React.useRef(null), servizi: React.useRef(null),
    panatta: React.useRef(null), abbonamenti: React.useRef(null), eventi: React.useRef(null), contatti: React.useRef(null),
  };
  const nav = (k) => {
    const el = refs[k] && refs[k].current;
    const cont = scrollRef.current;
    if (!cont) return;
    const top = k === 'top' || !el ? 0 : el.offsetTop - 68;
    cont.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <div ref={scrollRef} style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', background: 'var(--ink)', position: 'relative' }} className="noscroll">
      <div ref={refs.top} />
      <WebNav onNav={nav} onLogin={onLogin} />
      <div ref={refs.palestra}><WebHero onLogin={onLogin} onNav={nav} /></div>
      <WebQuote />
      <div ref={refs.servizi}><WebServices /></div>
      <div ref={refs.panatta}><WebPanatta /></div>
      <div ref={refs.abbonamenti}><WebPlans toast={toast} /></div>
      <div ref={refs.eventi}><WebEvents toast={toast} /></div>
      <WebVending />
      <div ref={refs.contatti}><WebContact toast={toast} onLogin={onLogin} onAdmin={onAdmin} adminHref={adminHref} /></div>
      <Toast msg={toastMsg} onDone={() => setToastMsg('')} />
    </div>
  );
}

Object.assign(window, { WebSite });
