// ─────────────────────────────────────────────────────────────
// ADMIN OPS — Abbonamenti, Accessi, Distributori
// ─────────────────────────────────────────────────────────────

// small shared row for section toolbars
function OpsToolbar({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>{children}</div>;
}

// ══════════════════════════════════════ ABBONAMENTI ══════════
function SubsSection({ toast }) {
  const [plans, setPlans] = React.useState(() => PLANS.map(p => ({ ...p, active: true, members: { start: 96, progress: 71, discipline: 54, legacy: 27 }[p.id] || 0 })));
  const toggle = (id) => {
    setPlans(ps => ps.map(p => p.id === id ? { ...p, active: !p.active } : p));
    const p = plans.find(x => x.id === id);
    toast(p.active ? `${p.name} disattivato` : `${p.name} riattivato`);
  };
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <OpsToolbar>
        <div style={{ flex: 1 }}>
          <div className="kicker" style={{ marginBottom: 5 }}>Listino · visibile in app cliente</div>
          <div style={{ fontSize: 13, color: 'var(--dim)' }}>4 piani attivi · 248 abbonati totali · ricavo medio 74€/cliente</div>
        </div>
        <GhostButton size="sm" icon="filter" onClick={() => toast('Esporta listino CSV')}>Esporta</GhostButton>
        <FireButton size="sm" icon="plus" onClick={() => toast('Nuovo abbonamento — apertura editor')}>Nuovo abbonamento</FireButton>
      </OpsToolbar>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 18 }}>
        {plans.map(p => (
          <div key={p.id} style={{
            position: 'relative', borderRadius: 14, padding: 18, opacity: p.active ? 1 : 0.55,
            background: p.highlight ? 'linear-gradient(180deg, rgba(238,90,28,0.12), var(--surface))' : 'linear-gradient(180deg, var(--surface-2), var(--surface))',
            border: `1px solid ${p.highlight ? 'rgba(238,90,28,0.45)' : 'var(--line)'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div className="cond" style={{ fontSize: 10.5, color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.period}</div>
                <h3 className="display" style={{ margin: '3px 0 0', fontSize: 19, color: 'var(--text)' }}>{p.name}</h3>
              </div>
              <Badge tone={p.active ? 'ok' : 'mute'} size="sm" dot>{p.active ? 'Attivo' : 'Off'}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 14 }}>
              <span className="display" style={{ fontSize: 32, color: 'var(--text)', lineHeight: 1 }}>{p.price}</span>
              <span className="cond" style={{ fontSize: 15, color: 'var(--amber)', fontWeight: 700 }}>€ {p.unit}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: 12 }}>
              <span style={{ fontSize: 11.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Abbonati</span>
              <span className="cond" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{p.members}</span>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button onClick={() => toast(`Editor · ${p.name}`)} style={opsBtn()}>
                <Icon name="settings" size={14} color="var(--dim)" stroke={2} />Modifica
              </button>
              <button onClick={() => toggle(p.id)} style={opsBtn(p.active)}>
                <Icon name={p.active ? 'pause' : 'check'} size={14} color={p.active ? 'var(--dim)' : 'var(--amber)'} stroke={2} />
                {p.active ? 'Disattiva' : 'Attiva'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {/* PT packs */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Pacchetti PT & gruppo</h2>
            <GhostButton size="sm" icon="plus" onClick={() => toast('Nuovo pacchetto PT')}>Aggiungi</GhostButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PT_PACKS.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--line)' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(238,90,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="dumbbell" size={16} color="var(--amber)" stroke={1.9} />
                </span>
                <div style={{ flex: 1 }}>
                  <div className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>{p.desc}</div>
                </div>
                <div className="cond" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{p.price}€ <span style={{ fontSize: 11, color: 'var(--faint)' }}>/{p.unit}</span></div>
                <Icon name="chevron" size={15} color="var(--faint)" />
              </div>
            ))}
          </div>
        </Panel>
        {/* Promo codes */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Codici promo</h2>
            <GhostButton size="sm" icon="plus" onClick={() => toast('Nuovo codice promo')}>Crea</GhostButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PROMO_CODES.map(c => (
              <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--line)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>{c.code}</div>
                  <div style={{ fontSize: 11, color: 'var(--faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="cond" style={{ fontSize: 12.5, color: 'var(--dim)' }}>{c.uses}/{c.max}</div>
                  <Badge tone={c.status === 'active' ? 'ok' : 'mute'} size="sm">{c.status === 'active' ? 'Attivo' : 'Scaduto'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
function opsBtn(active) {
  return {
    flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
    background: active ? 'rgba(238,90,28,0.1)' : 'var(--surface)',
    border: '1px solid ' + (active ? 'rgba(238,90,28,0.35)' : 'var(--line)'),
    color: active ? 'var(--amber)' : 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600,
    fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.03em',
  };
}

// ══════════════════════════════════════ ACCESSI ══════════════
function AccessSection({ toast }) {
  const [idx, setIdx] = React.useState(0);
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const current = CHECKIN_QUEUE[idx % CHECKIN_QUEUE.length];

  const scan = () => {
    setScanning(true); setResult(null);
    setTimeout(() => {
      setScanning(false); setResult(current);
      toast(current.ok ? `Accesso consentito · ${current.name}` : `Accesso negato · ${current.reason}`);
    }, 1100);
  };
  const next = () => { setIdx(i => i + 1); setResult(null); };

  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 18 }}>
        <StatCard icon="qr" label="Accessi oggi" value={94} delta="+8" tone="info" />
        <StatCard icon="x" label="Ingressi negati" value={2} tone="bad" />
        <StatCard icon="user" label="Ospiti / prove" value={3} tone="fire" />
        <StatCard icon="clock" label="In sala ora" value={41} tone="ok" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {/* Scanner */}
        <Panel style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="kicker" style={{ marginBottom: 4 }}>Check-in tornello</div>
          <h2 className="display" style={{ margin: '0 0 16px', fontSize: 19, color: 'var(--text)' }}>Scanner QR</h2>
          <div style={{
            position: 'relative', aspectRatio: '1', borderRadius: 16, overflow: 'hidden',
            background: 'var(--ink)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* corners */}
            {[['0','0'],['100%','0'],['0','100%'],['100%','100%']].map(([x,y],i)=>(
              <span key={i} style={{ position:'absolute', left:x==='0'?14:'auto', right:x==='0'?'auto':14, top:y==='0'?14:'auto', bottom:y==='0'?'auto':14,
                width:24, height:24, borderTop:y==='0'?'3px solid var(--amber)':'none', borderBottom:y==='0'?'none':'3px solid var(--amber)',
                borderLeft:x==='0'?'3px solid var(--amber)':'none', borderRight:x==='0'?'none':'3px solid var(--amber)', borderRadius:4 }} />
            ))}
            {!result && (
              <div style={{ textAlign: 'center' }}>
                <QRCode value={current.id} size={140} />
                {scanning && <div style={{ position: 'absolute', left: 14, right: 14, top: '50%', height: 2, background: 'var(--amber)', boxShadow: '0 0 14px var(--amber)', animation: 'scanline 1.1s linear infinite' }} />}
                <style>{`@keyframes scanline{0%{transform:translateY(-60px)}50%{transform:translateY(60px)}100%{transform:translateY(-60px)}}`}</style>
              </div>
            )}
            {result && (
              <div style={{ textAlign: 'center', padding: 20, animation: 'fadeUp .3s ease' }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: result.ok ? 'rgba(95,174,87,0.16)' : 'rgba(224,83,58,0.16)', border: `2px solid ${result.ok ? 'var(--ok)' : 'var(--bad)'}` }}>
                  <Icon name={result.ok ? 'check' : 'x'} size={32} color={result.ok ? 'var(--ok)' : 'var(--bad)'} stroke={3} />
                </div>
                <div className="display" style={{ fontSize: 20, color: result.ok ? 'var(--ok)' : 'var(--bad)' }}>{result.ok ? 'CONSENTITO' : 'NEGATO'}</div>
                <div className="cond" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>{result.name}</div>
                <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 2 }}>{result.plan} · Cert. {result.cert}</div>
                {!result.ok && <div style={{ fontSize: 12, color: 'var(--bad)', marginTop: 8 }}>{result.reason}</div>}
              </div>
            )}
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 9 }}>
            {!result
              ? <FireButton size="sm" full icon="qr" onClick={scan}>{scanning ? 'Scansione…' : 'Simula scansione'}</FireButton>
              : <>
                  <GhostButton size="sm" full onClick={next}>Prossimo</GhostButton>
                  {!result.ok && <FireButton size="sm" full icon="shield" onClick={() => { toast('Accesso forzato — tracciato nel log'); next(); }}>Forza accesso</FireButton>}
                </>}
          </div>
        </Panel>

        {/* Log */}
        <Panel pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', borderBottom: '1px solid var(--line)' }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Log accessi · oggi</h2>
            <GhostButton size="sm" icon="filter" onClick={() => toast('Esporta log accessi')}>Esporta</GhostButton>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '54px 1.6fr 1fr 1fr', padding: '10px 18px', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
            {['Ora', 'Cliente', 'Metodo', 'Esito'].map(h => <span key={h} className="cond" style={{ fontSize: 10.5, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</span>)}
          </div>
          <div style={{ maxHeight: 372, overflowY: 'auto' }} className="noscroll">
            {ACCESS_LOG.map((a, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '54px 1.6fr 1fr 1fr', alignItems: 'center', padding: '11px 18px', borderBottom: i < ACCESS_LOG.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span className="cond" style={{ fontSize: 12.5, color: 'var(--amber)', fontWeight: 600 }}>{a.time}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="cond" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{a.name}</div>
                  {a.reason ? <div style={{ fontSize: 10.5, color: 'var(--bad)' }}>{a.reason}</div>
                    : a.note ? <div style={{ fontSize: 10.5, color: 'var(--faint)' }}>{a.note}</div> : null}
                </div>
                <span><Badge tone="mute" size="sm">{a.method}</Badge></span>
                <span><Badge tone={a.ok ? 'ok' : 'bad'} size="sm" dot>{a.ok ? 'OK' : 'Negato'}</Badge></span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ══════════════════════════════════════ DISTRIBUTORI ═════════
function VendingSection({ toast }) {
  const lowStock = VENDING.filter(v => v.stock <= 12).length;
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 18 }}>
        <StatCard icon="euro" label="Vendite oggi" value="64" unit="€" delta="+12%" tone="ok" />
        <StatCard icon="bolt" label="Vendite · mese" value="1,28" unit="k€" delta="+6%" tone="fire" />
        <StatCard icon="card" label="Transazioni QR oggi" value={23} tone="info" />
        <StatCard icon="x" label="Prodotti sotto scorta" value={lowStock} tone="warn" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* products */}
        <div>
          <OpsToolbar>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)', flex: 1 }}>Prodotti in distributore</h2>
            <FireButton size="sm" icon="plus" onClick={() => toast('Nuovo prodotto')}>Aggiungi prodotto</FireButton>
          </OpsToolbar>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {VENDING.map(v => {
              const low = v.stock <= 12;
              const pct = Math.min(100, (v.stock / 40) * 100);
              return (
                <Panel key={v.id} pad={15}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <Badge tone="mute" size="sm">{v.cat}</Badge>
                      <h3 className="cond" style={{ margin: '8px 0 0', fontSize: 15, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{v.name}</h3>
                    </div>
                    <div className="display" style={{ fontSize: 20, color: 'var(--text)' }}>{v.price.toFixed(2)}<span style={{ fontSize: 12, color: 'var(--amber)' }}>€</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scorta</span>
                    <span className="cond" style={{ fontSize: 12.5, fontWeight: 700, color: low ? 'var(--warn)' : 'var(--text)' }}>{v.stock} pz {low && '· basso'}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: 'var(--surface-3)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: pct + '%', borderRadius: 999, background: low ? 'var(--warn)' : 'var(--fire-grad)' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
                    <button onClick={() => toast(`Rifornito · ${v.name}`)} style={opsBtn()}><Icon name="plus" size={13} color="var(--dim)" stroke={2.2} />Rifornisci</button>
                    <button onClick={() => toast(`Editor · ${v.name}`)} style={opsBtn()}><Icon name="settings" size={13} color="var(--dim)" stroke={2} />Modifica</button>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
        {/* sales feed */}
        <Panel pad={0} style={{ overflow: 'hidden', alignSelf: 'start' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--line)' }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Vendite recenti</h2>
            <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 3 }}>Identificazione tramite QR personale</div>
          </div>
          {VENDING_SALES.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < VENDING_SALES.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(238,90,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="qr" size={15} color="var(--amber)" stroke={2} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="cond" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.product}</div>
                <div style={{ fontSize: 11, color: 'var(--faint)' }}>@{s.nick} · {s.time}</div>
              </div>
              <span className="cond" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.price.toFixed(2)}€</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

Object.assign(window, { SubsSection, AccessSection, VendingSection });
