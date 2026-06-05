// ─────────────────────────────────────────────────────────────
// MOBILE — App cliente (Home vetrina, Abbonamenti, Eventi, Tessera)
// ─────────────────────────────────────────────────────────────

const ISG_ORANGE = 'var(--fire)';

function SectionTitle({ kicker, title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
      <div>
        {kicker && <div className="kicker" style={{ marginBottom: 6 }}>{kicker}</div>}
        <h2 className="display" style={{ margin: 0, fontSize: 26, color: 'var(--text)' }}>{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', color: 'var(--amber)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
          {action}<Icon name="chevron" size={14} color="var(--amber)" />
        </button>
      )}
    </div>
  );
}

// ---------- HERO ----------
function MobileHero({ onPlans, onTrial }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 0 26px' }}>
      {/* backdrop placeholder */}
      <div className="ph" style={{ position: 'absolute', inset: 0, border: 'none', borderRadius: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, rgba(238,90,28,0.22), transparent 60%), linear-gradient(180deg, rgba(13,12,10,0.2), var(--ink) 92%)' }} />
        <span className="ph-label" style={{ position: 'absolute', top: 14, right: 14 }}>foto sala Panatta</span>
      </div>
      <div style={{ position: 'relative', padding: '14px 20px 0', textAlign: 'center' }}>
        <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="Iron Syndacate Gym"
          style={{ width: 168, height: 'auto', filter: 'drop-shadow(0 12px 30px rgba(238,90,28,0.35))', margin: '0 auto 6px', display: 'block' }} />
        <div className="kicker" style={{ letterSpacing: '0.34em', marginBottom: 10 }}>Valeggio sul Mincio · VR</div>
        <h1 className="display" style={{ margin: 0, fontSize: 46, lineHeight: 0.86, color: 'var(--text)' }}>
          FORZA.<br />DISCIPLINA.<br /><span className="fire-text">COSTANZA.</span>
        </h1>
        <p style={{ margin: '14px auto 22px', maxWidth: 290, color: 'var(--dim)', fontSize: 14.5, lineHeight: 1.5 }}>
          Il tuo nuovo standard di allenamento. Palestra pilota <strong style={{ color: 'var(--text)' }}>Panatta</strong>, attrezzata come una vera temple of iron.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FireButton size="lg" full icon="flame" onClick={onTrial}>Prenota una prova</FireButton>
          <GhostButton size="lg" full icon="card" onClick={onPlans}>Scopri gli abbonamenti</GhostButton>
        </div>
      </div>
    </div>
  );
}

// ---------- QUOTE OF DAY ----------
function QuoteCard() {
  return (
    <Panel glow style={{ position: 'relative', overflow: 'hidden', borderColor: 'rgba(238,90,28,0.3)' }} pad={20}>
      <div style={{ position: 'absolute', right: -14, top: -18, opacity: 0.12 }}>
        <Icon name="flame" size={120} color="var(--fire)" stroke={1.2} />
      </div>
      <div className="kicker" style={{ marginBottom: 12 }}>Citazione del giorno</div>
      <p className="cond" style={{ margin: 0, fontSize: 21, lineHeight: 1.25, fontWeight: 600, color: 'var(--text)', position: 'relative' }}>
        “{quoteOfTheDay()}”
      </p>
    </Panel>
  );
}

// ---------- SERVICES ----------
function ServicesRow() {
  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '2px 20px 6px', margin: '0 -20px' }} className="noscroll">
      {SERVICES.map(s => (
        <div key={s.id} style={{
          minWidth: 158, maxWidth: 158, background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
          border: '1px solid var(--line)', borderRadius: 14, padding: 15, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span className="cond" style={{ fontSize: 11, color: 'var(--faint)', fontWeight: 600, letterSpacing: '0.1em' }}>{s.tag}</span>
            <Icon name="dumbbell" size={20} color="var(--fire)" stroke={1.8} />
          </div>
          <div className="cond" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 6 }}>{s.it}</div>
          <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.4 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- PANATTA HIGHLIGHT ----------
function PanattaBlock() {
  const zones = ['Plate Loaded', 'Isotoniche', 'Sala Pesi Liberi', 'Functional Rig'];
  return (
    <div>
      <SectionTitle kicker="Attrezzatura" title="La sala Panatta" />
      <div className="ph" style={{ height: 178, borderRadius: 16, marginBottom: 12 }}>
        <span className="ph-label">foto wide — fila macchine isotoniche Panatta</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {zones.map((z, i) => (
          <div key={z} style={{ position: 'relative', height: 92, borderRadius: 12 }} className="ph">
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 12, background: 'linear-gradient(0deg, rgba(13,12,10,0.85), transparent)' }}>
              <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{z}</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--dim)', fontSize: 13.5, lineHeight: 1.55, marginTop: 14, marginBottom: 0 }}>
        Linea completa <strong style={{ color: 'var(--text)' }}>Panatta</strong>: plate loaded, isotoniche, pesi liberi e functional. Carico reale, biomeccanica pura — l'attrezzatura scelta dai pro.
      </p>
    </div>
  );
}

// ---------- PLAN CARD ----------
function PlanCard({ plan, onSelect, compact }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 16, padding: compact ? 16 : 20,
      background: plan.highlight ? 'linear-gradient(180deg, rgba(238,90,28,0.14), var(--surface))' : 'linear-gradient(180deg, var(--surface-2), var(--surface))',
      border: `1px solid ${plan.highlight ? 'rgba(238,90,28,0.55)' : 'var(--line)'}`,
      boxShadow: plan.highlight ? '0 0 0 1px rgba(238,90,28,0.2), 0 20px 50px rgba(0,0,0,0.4)' : '0 12px 30px rgba(0,0,0,0.25)',
    }}>
      {plan.badge && (
        <div style={{ position: 'absolute', top: -11, right: 16 }}>
          <span style={{ background: 'var(--fire-grad)', color: '#1a0e06', fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="star" size={11} color="#1a0e06" stroke={2} />{plan.badge}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div>
          <div className="cond" style={{ fontSize: 11, color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{plan.period}</div>
          <h3 className="display" style={{ margin: 0, fontSize: 24, color: 'var(--text)' }}>{plan.name}</h3>
          <div style={{ fontSize: 12.5, color: 'var(--dim)', marginTop: 4 }}>{plan.tagline}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'flex-end' }}>
            <span className="display" style={{ fontSize: 32, color: 'var(--text)' }}>{plan.price}</span>
            <span className="cond" style={{ fontSize: 16, color: 'var(--amber)', fontWeight: 700 }}>€</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{plan.unit}</div>
        </div>
      </div>
      {!compact && (
        <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {plan.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: 'var(--dim)' }}>
              <span style={{ width: 18, height: 18, borderRadius: 6, background: 'rgba(238,90,28,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={12} color="var(--amber)" stroke={3} />
              </span>{f}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: compact ? 14 : 4 }}>
        {plan.save ? <span><Badge tone="fire" size="sm">{plan.save}</Badge></span> : <span />}
        {plan.highlight
          ? <FireButton size="sm" onClick={() => onSelect(plan)}>Scegli</FireButton>
          : <GhostButton size="sm" onClick={() => onSelect(plan)}>Scegli</GhostButton>}
      </div>
    </div>
  );
}

// ---------- HOME ----------
function HomeScreen({ go, toast }) {
  const next = EVENTS.slice().sort((a, b) => a.date.localeCompare(b.date))[0] || null;
  return (
    <div style={{ animation: 'fadeUp .3s ease' }}>
      <MobileHero onPlans={() => go('plans')} onTrial={() => toast('Richiesta prova inviata — ti contattiamo a breve')} />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 30 }}>
        <QuoteCard />
        <div>
          <SectionTitle kicker="Cosa facciamo" title="I nostri servizi" />
          <ServicesRow />
        </div>
        <PanattaBlock />
        <div>
          <SectionTitle kicker="Abbonamenti" title="Scegli il tuo" action="Tutti" onAction={() => go('plans')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PLANS.slice(1, 3).map(p => <PlanCard key={p.id} plan={p} compact onSelect={() => go('plans')} />)}
          </div>
        </div>
        {next && (
        <div>
          <SectionTitle kicker="In programma" title="Prossimo evento" action="Calendario" onAction={() => go('events')} />
          <Panel pad={0} style={{ overflow: 'hidden' }}>
            <div className="ph" style={{ height: 120, borderRadius: 0, border: 'none', borderBottom: '1px solid var(--line)' }}>
              <span className="ph-label">foto evento</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Badge tone="fire" size="sm">{next.cat}</Badge>
                <span className="cond" style={{ fontSize: 12, color: 'var(--dim)' }}>{fmtDate(next.date)} · {next.time}</span>
              </div>
              <h3 className="cond" style={{ margin: '0 0 10px', fontSize: 19, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{next.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>{next.spots - next.taken} posti disponibili</span>
                <GhostButton size="sm" onClick={() => go('events')}>Iscriviti</GhostButton>
              </div>
            </div>
          </Panel>
        </div>
        )}
        <VendingTeaser go={go} />
        <ContactBlock toast={toast} />
      </div>
      <div style={{ height: 18 }} />
    </div>
  );
}

function VendingTeaser({ go }) {
  return (
    <Panel style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1), var(--surface))', borderColor: 'rgba(245,166,35,0.25)' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 54, height: 54, borderRadius: 12, background: 'rgba(238,90,28,0.14)', border: '1px solid rgba(238,90,28,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="qr" size={26} color="var(--amber)" stroke={1.8} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="cond" style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>Distributori integratori</h3>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.45 }}>Acquista con il tuo QR personale e credito interno. Whey, EAA, pre-workout e recovery.</p>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <GhostButton size="sm" full icon="card" onClick={() => go('card')}>Apri la mia tessera</GhostButton>
      </div>
    </Panel>
  );
}

function ContactBlock({ toast }) {
  const rows = [
    { i: 'pin', t: 'Via dell\'Industria 12, Valeggio sul Mincio (VR)' },
    { i: 'clock', t: 'Lun–Ven 06:00–23:00 · Sab 08:00–20:00 · Dom 09:00–13:00' },
    { i: 'phone', t: '+39 045 000 0000' },
  ];
  return (
    <div>
      <SectionTitle kicker="Dove siamo" title="Contatti" />
      <div className="ph" style={{ height: 130, borderRadius: 14, marginBottom: 14 }}><span className="ph-label">mappa — Valeggio sul Mincio</span></div>
      <Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Icon name={r.i} size={18} color="var(--amber)" stroke={1.8} />
              <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.4 }}>{r.t}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <FireButton size="sm" full icon="whatsapp" onClick={() => toast('Apertura WhatsApp…')}>WhatsApp</FireButton>
          <GhostButton size="sm" full icon="pin" onClick={() => toast('Apertura mappa…')}>Indicazioni</GhostButton>
        </div>
      </Panel>
    </div>
  );
}

// ---------- PLANS SCREEN ----------
function PlansScreen({ toast }) {
  const [seg, setSeg] = React.useState('abbo');
  const segs = [{ k: 'abbo', l: 'Abbonamenti' }, { k: 'pt', l: 'Personal' }, { k: 'single', l: 'Ingressi' }];
  return (
    <div style={{ padding: '8px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ marginBottom: 18 }}>
        <div className="kicker" style={{ marginBottom: 6 }}>Listino · modificabile da admin</div>
        <h1 className="display" style={{ margin: 0, fontSize: 34, color: 'var(--text)' }}>ABBONAMENTI</h1>
      </div>
      <div style={{ display: 'flex', gap: 6, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 4, marginBottom: 20 }}>
        {segs.map(s => (
          <button key={s.k} onClick={() => setSeg(s.k)} style={{
            flex: 1, border: 'none', borderRadius: 9, padding: '9px 4px', background: seg === s.k ? 'var(--fire-grad)' : 'transparent',
            color: seg === s.k ? '#1a0e06' : 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 12.5,
            textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'all .2s',
          }}>{s.l}</button>
        ))}
      </div>
      {seg === 'abbo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onSelect={(pl) => toast(`${pl.name} selezionato — procedi all'iscrizione`)} />)}
        </div>
      )}
      {seg === 'pt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PT_PACKS.map(p => (
            <Panel key={p.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 className="cond" style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{p.name}</h3>
                  <div style={{ fontSize: 12.5, color: 'var(--dim)' }}>{p.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="display" style={{ fontSize: 26, color: 'var(--text)' }}>{p.price}<span style={{ fontSize: 15, color: 'var(--amber)' }}>€</span></div>
                  <div style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>{p.unit}</div>
                </div>
              </div>
              <div style={{ marginTop: 14 }}><GhostButton size="sm" full onClick={() => toast(`${p.name} — scegli giorno e trainer`)}>Prenota</GhostButton></div>
            </Panel>
          ))}
        </div>
      )}
      {seg === 'single' && (
        <Panel pad={22} style={{ textAlign: 'center' }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Ingresso singolo</div>
          <div className="display" style={{ fontSize: 52, color: 'var(--text)', lineHeight: 1 }}>12<span style={{ fontSize: 26, color: 'var(--amber)' }}>€</span></div>
          <p style={{ color: 'var(--dim)', fontSize: 13.5, margin: '12px auto 18px', maxWidth: 240 }}>Accesso giornaliero completo a tutta la sala Panatta. Certificato medico richiesto.</p>
          <FireButton full onClick={() => toast('Ingresso singolo — paga e accedi')}>Acquista ingresso</FireButton>
        </Panel>
      )}
      <p style={{ textAlign: 'center', color: 'var(--faint)', fontSize: 11.5, marginTop: 22, fontFamily: 'var(--font-cond)', letterSpacing: '0.04em' }}>
        Allenati con metodo. Cresci con disciplina.
      </p>
    </div>
  );
}

// ---------- EVENTS SCREEN ----------
function EventsScreen({ toast }) {
  const [reg, setReg] = React.useState({});
  const sorted = EVENTS.slice().sort((a, b) => a.date.localeCompare(b.date));
  const toggle = (e) => {
    setReg(r => ({ ...r, [e.id]: !r[e.id] }));
    toast(reg[e.id] ? `Iscrizione annullata · ${e.title}` : `Iscritto a ${e.title}`);
  };
  return (
    <div style={{ padding: '8px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ marginBottom: 18 }}>
        <div className="kicker" style={{ marginBottom: 6 }}>Giugno 2026</div>
        <h1 className="display" style={{ margin: 0, fontSize: 34, color: 'var(--text)' }}>CALENDARIO</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sorted.map(e => {
          const full = e.taken >= e.spots && !reg[e.id];
          const isReg = reg[e.id];
          return (
            <Panel key={e.id} pad={0} style={{ overflow: 'hidden', borderColor: isReg ? 'rgba(238,90,28,0.5)' : 'var(--line)' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 70, flexShrink: 0, background: 'linear-gradient(180deg, var(--surface-3), var(--surface))', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 0' }}>
                  <div className="display" style={{ fontSize: 28, color: 'var(--amber)', lineHeight: 1 }}>{e.date.slice(8)}</div>
                  <div className="cond" style={{ fontSize: 11, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Giu</div>
                  <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', marginTop: 6 }}>{e.time}</div>
                </div>
                <div style={{ flex: 1, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Badge tone="mute" size="sm">{e.cat}</Badge>
                    {e.price > 0 ? <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--amber)' }}>{e.price}€</span> : <span className="cond" style={{ fontSize: 11.5, color: 'var(--ok)', fontWeight: 600, textTransform: 'uppercase' }}>Gratis</span>}
                  </div>
                  <h3 className="cond" style={{ margin: '0 0 6px', fontSize: 16.5, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', lineHeight: 1.05 }}>{e.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: full ? 'var(--bad)' : 'var(--dim)' }}>
                      {full ? 'Sold out' : `${e.spots - e.taken - (isReg ? 1 : 0)} posti · ${e.coach}`}
                    </span>
                    {isReg
                      ? <button onClick={() => toggle(e)} style={miniBtn(true)}><Icon name="check" size={13} color="#1a0e06" stroke={3} />Iscritto</button>
                      : <button disabled={full} onClick={() => toggle(e)} style={miniBtn(false, full)}>{full ? 'Lista attesa' : 'Iscriviti'}</button>}
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

function miniBtn(active, disabled) {
  return {
    border: active ? 'none' : `1px solid ${disabled ? 'var(--line)' : 'var(--line-2)'}`,
    background: active ? 'var(--fire-grad)' : 'transparent',
    color: active ? '#1a0e06' : (disabled ? 'var(--faint)' : 'var(--text)'),
    borderRadius: 9, padding: '7px 12px', fontFamily: 'var(--font-cond)', fontWeight: 700,
    fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-flex',
    alignItems: 'center', gap: 5, cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0,
  };
}

// ---------- CARD / TESSERA SCREEN ----------
function CardScreen({ me: meProp }) {
  const me = meProp || { name: 'Marco Bellini', nick: 'Iron_Marco', plan: 'Iron Legacy', expiry: '14 Gen 2027', credit: 18.50, id: 'ISG-2026-0412' };
  return (
    <div style={{ padding: '8px 20px 20px', animation: 'fadeUp .3s ease' }}>
      <div style={{ marginBottom: 18 }}>
        <div className="kicker" style={{ marginBottom: 6 }}>Identità digitale</div>
        <h1 className="display" style={{ margin: 0, fontSize: 34, color: 'var(--text)' }}>LA MIA TESSERA</h1>
      </div>
      {/* QR card */}
      <div style={{ borderRadius: 20, padding: 22, background: 'linear-gradient(150deg, var(--surface-3), var(--surface) 70%)', border: '1px solid var(--line-2)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 100% 0%, rgba(238,90,28,0.16), transparent 55%)' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div className="display" style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1 }}>{me.name}</div>
            <div className="cond" style={{ fontSize: 12.5, color: 'var(--amber)', marginTop: 4 }}>@{me.nick}</div>
          </div>
          <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 50, height: 'auto', filter: 'drop-shadow(0 4px 10px rgba(238,90,28,0.4))' }} />
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ padding: 10, background: 'var(--text)', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            <QRCode value={me.id} size={160} fg="#0d0c0a" bg="#efe7d8" />
          </div>
        </div>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div className="cond" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.1em' }}>{me.id}</div>
          <div style={{ fontSize: 11.5, color: 'var(--dim)', marginTop: 6 }}>Scansiona all'ingresso e ai distributori automatici</div>
        </div>
      </div>
      {/* status rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        <Panel pad={15}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Abbonamento</div>
              <div className="cond" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>{me.plan}</div>
              <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 2 }}>Scade il {me.expiry}</div>
            </div>
            <Badge tone={(me.isNew || me.plan === 'Nessun abbonamento') ? 'warn' : 'ok'} dot>{(me.isNew || me.plan === 'Nessun abbonamento') ? 'Da attivare' : 'Attivo'}</Badge>
          </div>
        </Panel>
        <div style={{ display: 'flex', gap: 10 }}>
          <Panel pad={15} style={{ flex: 1 }}>
            <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Credito</div>
            <div className="display" style={{ fontSize: 26, color: 'var(--text)' }}>{(me.credit || 0).toFixed(2)}<span style={{ fontSize: 15, color: 'var(--amber)' }}>€</span></div>
            <div style={{ marginTop: 10 }}><GhostButton size="sm" full icon="plus">Ricarica</GhostButton></div>
          </Panel>
          <Panel pad={15} style={{ flex: 1 }}>
            <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Certificato</div>
            <Badge tone="ok" dot size="md">Valido</Badge>
            <div style={{ fontSize: 11.5, color: 'var(--dim)', marginTop: 10 }}>Scade 02 Nov 2026</div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ---------- DATE FORMAT ----------
function fmtDate(iso) {
  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

// ---------- BOTTOM NAV ----------
function BottomNav({ tab, setTab }) {
  const items = [
    { k: 'home', i: 'home', l: 'Home' },
    { k: 'book', i: 'dumbbell', l: 'Prenota' },
    { k: 'events', i: 'calendar', l: 'Eventi' },
    { k: 'card', i: 'qr', l: 'Tessera' },
    { k: 'profile', i: 'user', l: 'Profilo' },
  ];
  return (
    <div style={{
      flexShrink: 0, display: 'flex', padding: '10px 12px 30px',
      background: 'rgba(13,12,10,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--line)',
    }}>
      {items.map(it => {
        const on = tab === it.k;
        return (
          <button key={it.k} onClick={() => setTab(it.k)} style={{
            flex: 1, background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, padding: '4px 0', color: on ? 'var(--amber)' : 'var(--faint)',
          }}>
            <Icon name={it.i} size={23} stroke={on ? 2.4 : 1.9} />
            <span className="cond" style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{it.l}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------- APP HEADER ----------
const PSUB_TITLES = { docs: 'Documenti', notifs: 'Notifiche', chat: 'Chat staff', data: 'Dati personali', consents: 'Privacy & consensi' };

function MobileHeader({ tab, psub, onBack, onBell }) {
  if (tab === 'home') return null;
  const showBack = tab === 'profile' && psub;
  const titles = { book: 'Personal training', events: 'Calendario', card: 'Tessera', plans: 'Abbonamenti', profile: 'Profilo' };
  return (
    <div style={{
      flexShrink: 0, paddingTop: 52, paddingBottom: 10, paddingLeft: 16, paddingRight: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      background: 'rgba(13,12,10,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line)',
    }}>
      {showBack ? (
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
          <span style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scaleX(-1)' }}>
            <Icon name="chevron" size={17} color="var(--text)" stroke={2.2} />
          </span>
          <span className="display" style={{ fontSize: 17, color: 'var(--text)' }}>{PSUB_TITLES[psub]}</span>
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 4 }}>
          <img src={window.__resources && window.__resources.logoBadge ? window.__resources.logoBadge : "assets/logo-badge.png"} alt="" style={{ width: 28, height: 'auto' }} />
          <span className="display" style={{ fontSize: 14.5, color: 'var(--text)', letterSpacing: '0.02em' }}>IRON SYNDACATE</span>
        </div>
      )}
      <button onClick={onBell} style={{ background: 'none', border: 'none', position: 'relative', padding: 4 }}>
        <Icon name="bell" size={22} color="var(--dim)" stroke={1.9} />
        <span style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, borderRadius: 999, background: 'var(--fire)', border: '1.5px solid var(--ink)' }} />
      </button>
    </div>
  );
}

// ---------- MOBILE APP ----------
function MobileApp({ siteHref }) {
  const [me, setMe] = React.useState(null);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('login');
  React.useEffect(() => {
    if (typeof AUTH !== 'undefined') {
      AUTH.currentClient().then(u => { setMe(u); setAuthChecked(true); });
    } else {
      setAuthChecked(true);
    }
  }, []);
  const [tab, setTab] = React.useState('home');
  const [psub, setPsub] = React.useState(null);
  const [toastMsg, setToastMsg] = React.useState('');
  const scrollRef = React.useRef(null);
  const toast = (m) => setToastMsg(m);
  const go = (t, sub = null) => { setTab(t); setPsub(t === 'profile' ? sub : null); };
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [tab, psub]);

  if (!authChecked) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="assets/logo-badge.png" alt="" style={{ width: 72, opacity: 0.4, marginBottom: 14 }} />
          <div className="cond" style={{ color: 'var(--faint)', fontSize: 12 }}>Caricamento…</div>
        </div>
      </div>
    );
  }

  if (!me) {
    return authMode === 'register'
      ? <RegisterScreen onSuccess={(m) => { setMe(m); go('home'); }} goLogin={() => setAuthMode('login')} siteHref={siteHref} />
      : <LoginScreen onSuccess={(m) => { setMe(m); go('home'); }} goRegister={() => setAuthMode('register')} siteHref={siteHref} />;
  }

  const logout = async () => { if (typeof AUTH !== 'undefined') await AUTH.clientLogout(); setMe(null); setAuthMode('login'); go('home'); };

  const fullBleed = tab === 'profile' && psub === 'chat';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--ink)' }}>
      <MobileHeader tab={tab} psub={psub} onBack={() => setPsub(null)} onBell={() => go('profile', 'notifs')} />
      <div ref={scrollRef} style={{ flex: 1, overflowY: fullBleed ? 'hidden' : 'auto', overflowX: 'hidden', display: fullBleed ? 'flex' : 'block', flexDirection: 'column', minHeight: 0 }} className="noscroll">
        {tab === 'home' && <ClientDashboard me={me} go={go} toast={toast} />}
        {tab === 'book' && <BookingScreen toast={toast} />}
        {tab === 'events' && <EventsScreen toast={toast} />}
        {tab === 'card' && <CardScreen me={me} />}
        {tab === 'plans' && <PlansScreen toast={toast} />}
        {tab === 'profile' && <ProfileScreen me={me} sub={psub} setSub={setPsub} onLogout={logout} toast={toast} />}
      </div>
      <Toast msg={toastMsg} onDone={() => setToastMsg('')} />
      <BottomNav tab={tab} setTab={(t) => go(t)} />
    </div>
  );
}

Object.assign(window, { MobileApp });
