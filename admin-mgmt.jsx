// ─────────────────────────────────────────────────────────────
// ADMIN MGMT — Documenti (OCR), Eventi, Chat, Impostazioni
// ─────────────────────────────────────────────────────────────

const docStatusMap = {
  review:     { tone: 'info', label: 'Da validare' },
  valid:      { tone: 'ok',   label: 'Valido' },
  expired:    { tone: 'bad',  label: 'Scaduto' },
  unreadable: { tone: 'warn', label: 'Illeggibile' },
};

// ══════════════════════════════════════ DOCUMENTI ════════════
function DocsSection({ toast }) {
  const [docs, setDocs] = React.useState(DOCS_QUEUE);
  const [selId, setSelId] = React.useState(DOCS_QUEUE.length > 0 ? DOCS_QUEUE[0].id : null);
  const sel = docs.find(d => d.id === selId) || docs[0] || null;

  const act = (status, msg) => {
    setDocs(ds => ds.map(d => d.id === selId ? { ...d, status } : d));
    toast(msg);
  };

  if (docs.length === 0) return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <Panel pad={40} style={{ textAlign: 'center' }}>
        <span style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(95,174,87,0.1)', border: '1px solid var(--line-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="check" size={26} color="var(--ok)" stroke={2.5} />
        </span>
        <h2 className="display" style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--text)' }}>Nessun documento da validare</h2>
        <p style={{ color: 'var(--dim)', fontSize: 14, maxWidth: 340, margin: '0 auto', lineHeight: 1.5 }}>La coda è vuota. I documenti caricati dai clienti appariranno qui.</p>
      </Panel>
    </div>
  );

  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* queue */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Coda validazione</h2>
            <Badge tone="fire" size="sm">{docs.filter(d => d.status === 'review').length} da fare</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {docs.map(d => {
              const on = d.id === selId;
              const st = docStatusMap[d.status];
              return (
                <button key={d.id} onClick={() => setSelId(d.id)} style={{
                  textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: 13, borderRadius: 12, cursor: 'pointer',
                  background: on ? 'rgba(238,90,28,0.1)' : 'var(--surface)', border: '1px solid ' + (on ? 'rgba(238,90,28,0.45)' : 'var(--line)'),
                }}>
                  <span style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="doc" size={18} color={on ? 'var(--amber)' : 'var(--dim)'} stroke={1.9} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cond" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)' }}>{d.client}</div>
                    <div style={{ fontSize: 11, color: 'var(--faint)' }}>{d.type} · {d.uploaded}</div>
                  </div>
                  <Badge tone={st.tone} size="sm">{st.label}</Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* detail */}
        <Panel pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--line)', background: 'radial-gradient(120% 90% at 100% 0%, rgba(238,90,28,0.1), transparent 55%)' }}>
            <div>
              <div className="kicker" style={{ marginBottom: 5 }}>{sel.type}</div>
              <h2 className="display" style={{ margin: 0, fontSize: 22, color: 'var(--text)' }}>{sel.client}</h2>
            </div>
            <Badge tone={docStatusMap[sel.status].tone} dot>{docStatusMap[sel.status].label}</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
            {/* scan preview */}
            <div style={{ padding: 22, borderRight: '1px solid var(--line)' }}>
              <div className="ph" style={{ height: 150, borderRadius: 12, marginBottom: 12 }}>
                <span className="ph-label">scansione documento</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'var(--surface)', border: '1px solid var(--line)' }}>
                <Icon name="bolt" size={15} color="var(--amber)" stroke={2} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Confidenza OCR</div>
                  <div className="cond" style={{ fontSize: 15, fontWeight: 700, color: sel.confidence > 80 ? 'var(--ok)' : 'var(--warn)' }}>{sel.confidence}%</div>
                </div>
              </div>
            </div>

            {/* extracted */}
            <div style={{ padding: 22 }}>
              <div className="kicker" style={{ marginBottom: 12 }}>Dati estratti automaticamente</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 14 }}>
                {Object.entries(sel.ocr).map(([k, v], i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'var(--surface)' }}>
                    <div style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                    <div className="cond" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{v}</div>
                  </div>
                ))}
              </div>

              {sel.flags.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  {sel.flags.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 13px', borderRadius: 9, background: 'rgba(224,83,58,0.1)', border: '1px solid rgba(224,83,58,0.35)', marginBottom: 7 }}>
                      <Icon name="shield" size={15} color="var(--bad)" stroke={2} />
                      <span style={{ fontSize: 12.5, color: 'var(--bad)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 9 }}>
                <FireButton size="sm" icon="check" onClick={() => act('valid', `Documento validato · ${sel.client}`)}>Valida</FireButton>
                <GhostButton size="sm" icon="x" onClick={() => act('review', `Documento rifiutato — richiesta nuova scansione`)}>Rifiuta</GhostButton>
                <GhostButton size="sm" icon="chat" onClick={() => toast(`Chat aperta con ${sel.client}`)}>Richiedi al cliente</GhostButton>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ══════════════════════════════════════ EVENTI ═══════════════
function EventsAdminSection({ toast }) {
  const sorted = EVENTS.slice().sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 18 }}>
        <StatCard icon="calendar" label="Eventi in programma" value={EVENTS.length} tone="fire" />
        <StatCard icon="users" label="Iscritti totali" value={EVENTS.reduce((s, e) => s + e.taken, 0)} tone="ok" />
        <StatCard icon="euro" label="Incasso eventi" value={EVENTS.reduce((s, e) => s + e.taken * e.price, 0)} unit="€" tone="info" />
        <StatCard icon="x" label="Sold out" value={EVENTS.filter(e => e.taken >= e.spots).length} tone="warn" />
      </div>

      <OpsToolbar>
        <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)', flex: 1 }}>Calendario eventi</h2>
        <GhostButton size="sm" icon="filter" onClick={() => toast('Esporta lista partecipanti')}>Esporta</GhostButton>
        <FireButton size="sm" icon="plus" onClick={() => toast('Nuovo evento — apertura editor')}>Crea evento</FireButton>
      </OpsToolbar>

      <Panel pad={0} style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 720 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1.8fr 1fr 1.2fr 1fr 0.8fr 130px', padding: '12px 18px', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
          {['Data', 'Evento', 'Categoria', 'Iscritti', 'Coach', 'Costo', ''].map(h => <span key={h} className="cond" style={{ fontSize: 10.5, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</span>)}
        </div>
        {sorted.map((e, i) => {
          const full = e.taken >= e.spots;
          const pct = (e.taken / e.spots) * 100;
          return (
            <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '90px 1.8fr 1fr 1.2fr 1fr 0.8fr 130px', alignItems: 'center', padding: '13px 18px', borderBottom: i < sorted.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div>
                <div className="display" style={{ fontSize: 17, color: 'var(--amber)', lineHeight: 1 }}>{e.date.slice(8)} <span style={{ fontSize: 11, color: 'var(--dim)' }}>Giu</span></div>
                <div className="cond" style={{ fontSize: 11, color: 'var(--faint)', marginTop: 2 }}>{e.time} · {e.dur}</div>
              </div>
              <div className="cond" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', paddingRight: 12 }}>{e.title}</div>
              <span><Badge tone="mute" size="sm">{e.cat}</Badge></span>
              <div style={{ paddingRight: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="cond" style={{ fontSize: 12, fontWeight: 700, color: full ? 'var(--bad)' : 'var(--text)' }}>{e.taken}/{e.spots}</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: 'var(--surface-3)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct + '%', background: full ? 'var(--bad)' : 'var(--fire-grad)', borderRadius: 999 }} />
                </div>
              </div>
              <span className="cond" style={{ fontSize: 12.5, color: 'var(--dim)' }}>{e.coach}</span>
              <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: e.price > 0 ? 'var(--text)' : 'var(--ok)' }}>{e.price > 0 ? e.price + '€' : 'Gratis'}</span>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button onClick={() => toast(`Iscritti · ${e.title}`)} style={miniGhost()}>Iscritti</button>
                <button onClick={() => toast(`Editor · ${e.title}`)} style={miniGhost()}><Icon name="settings" size={14} color="var(--dim)" stroke={2} /></button>
              </div>
            </div>
          );
        })}
        </div>
      </Panel>
    </div>
  );
}
function miniGhost() {
  return { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 11px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--dim)', fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.03em', cursor: 'pointer' };
}

// ══════════════════════════════════════ CHAT ════════════════
function ChatSection({ toast }) {
  const [mode, setMode] = React.useState('community');
  const [chan, setChan] = React.useState(CHAT_CHANNELS.length > 0 ? CHAT_CHANNELS[0].id : 'all');
  const [dm, setDm] = React.useState(DM_THREADS.length > 0 ? DM_THREADS[0].id : null);
  const mobile = useIsMobile(820);
  const msgs = CHAT_MESSAGES[chan] || [];
  const thread = DM_THREADS.find(t => t.id === dm) || null;

  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      {/* mode switch + consent note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 5, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 11, padding: 4 }}>
          {[['community', 'Community', 'users'], ['dm', 'Chat private', 'chat']].map(([k, l, ic]) => {
            const on = mode === k;
            return (
              <button key={k} onClick={() => setMode(k)} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '8px 15px', borderRadius: 8, border: 'none',
                background: on ? 'var(--fire-grad)' : 'transparent', color: on ? '#1a0e06' : 'var(--dim)',
                fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
              }}><Icon name={ic} size={15} color={on ? '#1a0e06' : 'var(--dim)'} stroke={2.1} />{l}</button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 11.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)' }}>
          <Icon name="shield" size={14} color="var(--faint)" stroke={1.9} />
          Solo nickname e testo · numero, email e dati personali mai visibili agli altri clienti
        </div>
      </div>

      {mode === 'community' ? (
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '220px 1fr 250px', gap: 16, height: mobile ? 'auto' : 470 }}>
          {/* channels */}
          <Panel pad={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: mobile ? 260 : undefined, maxHeight: mobile ? 260 : undefined }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>Canali</span>
              <button onClick={() => toast('Nuovo canale')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}><Icon name="plus" size={16} color="var(--amber)" stroke={2.3} /></button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }} className="noscroll">
              {CHAT_CHANNELS.map(c => {
                const on = chan === c.id;
                return (
                  <button key={c.id} onClick={() => setChan(c.id)} style={{
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 9, padding: '11px 16px', border: 'none',
                    background: on ? 'rgba(238,90,28,0.1)' : 'transparent', borderLeft: '2px solid ' + (on ? 'var(--amber)' : 'transparent'), cursor: 'pointer',
                  }}>
                    <span style={{ color: on ? 'var(--amber)' : 'var(--faint)', fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: 13 }}>#</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="cond" style={{ fontSize: 13, fontWeight: 600, color: on ? 'var(--text)' : 'var(--dim)' }}>{c.name}</div>
                    </div>
                    {c.official && <Icon name="shield" size={12} color="var(--amber)" stroke={2} />}
                    {c.unread > 0 && <span style={{ background: 'var(--fire)', color: '#1a0e06', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-cond)', borderRadius: 999, padding: '1px 6px' }}>{c.unread}</span>}
                  </button>
                );
              })}
            </div>
          </Panel>

          {/* messages */}
          <Panel pad={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: mobile ? 440 : undefined }}>
            <div style={{ padding: '13px 18px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="cond" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>#{CHAT_CHANNELS.find(c => c.id === chan)?.name}</span>
                <span style={{ fontSize: 11.5, color: 'var(--faint)', marginLeft: 8 }}>{CHAT_CHANNELS.find(c => c.id === chan)?.count} membri</span>
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                <button onClick={() => toast('Messaggio fissato')} style={miniGhost()}><Icon name="star" size={13} color="var(--dim)" stroke={2} />Fissa</button>
                <button onClick={() => toast('Canale chiuso temporaneamente')} style={miniGhost()}><Icon name="pause" size={13} color="var(--dim)" stroke={2} /></button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }} className="noscroll">
              {msgs.map((m, i) => (
                <div key={i} style={{
                  position: 'relative', padding: m.pinned ? '12px 14px' : '0', borderRadius: 10,
                  background: m.pinned ? 'rgba(245,166,35,0.08)' : 'transparent', border: m.pinned ? '1px solid rgba(245,166,35,0.3)' : 'none',
                }}>
                  {m.pinned && <div className="kicker" style={{ marginBottom: 7, fontSize: 9.5, color: 'var(--amber)' }}>★ Fissato dallo staff</div>}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                    <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: m.official ? 'var(--amber)' : 'var(--text)' }}>@{m.nick}</span>
                    {m.official && <Badge tone="fire" size="sm">Staff</Badge>}
                    <span style={{ fontSize: 10.5, color: 'var(--faint)' }}>{m.time}</span>
                    {m.flagged && <Badge tone="bad" size="sm">Segnalato</Badge>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 13.5, color: m.flagged ? 'var(--bad)' : 'var(--dim)', lineHeight: 1.45, flex: 1 }}>{m.text}</p>
                    {!m.official && (
                      <button onClick={() => toast(m.flagged ? `@${m.nick} sospeso dalla chat` : 'Messaggio eliminato')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', flexShrink: 0 }} title="Modera">
                        <Icon name="x" size={14} color={m.flagged ? 'var(--bad)' : 'var(--faint)'} stroke={2.2} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 12, borderTop: '1px solid var(--line)', display: 'flex', gap: 9, alignItems: 'center' }}>
              <input placeholder="Scrivi come staff ufficiale…" style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
              <FireButton size="sm" icon="arrow" onClick={() => toast('Messaggio ufficiale inviato')}>Invia</FireButton>
            </div>
          </Panel>

          {/* reports */}
          <Panel style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="display" style={{ margin: '0 0 4px', fontSize: 16, color: 'var(--text)' }}>Moderazione</h3>
            <div style={{ fontSize: 11.5, color: 'var(--faint)', marginBottom: 14 }}>Segnalazioni in coda</div>
            {CHAT_REPORTS.map(r => (
              <div key={r.id} style={{ padding: 13, borderRadius: 11, background: 'rgba(224,83,58,0.08)', border: '1px solid rgba(224,83,58,0.3)', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>@{r.nick}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--faint)' }}>{r.when}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--bad)', marginBottom: 4 }}>{r.reason}</div>
                <div style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 11 }}>in #{r.channel}</div>
                <div style={{ display: 'flex', gap: 7 }}>
                  <button onClick={() => toast(`@${r.nick} sospeso`)} style={{ ...miniGhost(), flex: 1, justifyContent: 'center', color: 'var(--bad)', borderColor: 'rgba(224,83,58,0.4)' }}>Sospendi</button>
                  <button onClick={() => toast('Segnalazione archiviata')} style={{ ...miniGhost(), flex: 1, justifyContent: 'center' }}>Ignora</button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--faint)', lineHeight: 1.5 }}>
              La chat non consente immagini, video, audio o file. Solo testo, emoji base e menzioni via nickname.
            </div>
          </Panel>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '290px 1fr', gap: 16, height: mobile ? 'auto' : 470 }}>
          {/* dm list */}
          <Panel pad={0} style={{ overflow: 'hidden', minHeight: mobile ? 240 : undefined, maxHeight: mobile ? 280 : undefined, overflowY: 'auto' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
              <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>Conversazioni</span>
            </div>
            {DM_THREADS.length === 0 && (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--faint)', fontFamily: 'var(--font-cond)', fontSize: 13 }}>Nessuna chat privata</div>
            )}
            {DM_THREADS.map(t => {
              const on = dm === t.id;
              return (
                <button key={t.id} onClick={() => setDm(t.id)} style={{
                  width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px', border: 'none',
                  borderBottom: '1px solid var(--line)', background: on ? 'rgba(238,90,28,0.08)' : 'transparent', cursor: 'pointer',
                }}>
                  <Avatar name={t.client} size={38} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="cond" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.client}</span>
                      <span style={{ fontSize: 10, color: 'var(--faint)' }}>{t.time}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{t.last}</div>
                  </div>
                  {t.unread > 0 && <span style={{ background: 'var(--fire)', color: '#1a0e06', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-cond)', borderRadius: 999, padding: '1px 6px', flexShrink: 0 }}>{t.unread}</span>}
                </button>
              );
            })}
          </Panel>

          {/* dm conversation */}
          <Panel pad={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: mobile ? 440 : undefined }}>
            {!thread ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
                <div>
                  <Icon name="chat" size={40} color="var(--line-2)" stroke={1.4} />
                  <div className="cond" style={{ fontSize: 13, color: 'var(--faint)', marginTop: 12 }}>Seleziona una conversazione</div>
                </div>
              </div>
            ) : (<>
            <div style={{ padding: '13px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={thread.client} size={40} />
              <div style={{ flex: 1 }}>
                <div className="cond" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{thread.client}</div>
                <div style={{ fontSize: 11, color: 'var(--faint)' }}>@{thread.nick} · chat privata amministrativa</div>
              </div>
              <Badge tone={thread.status === 'risolta' ? 'ok' : 'warn'} size="sm" dot>{thread.status}</Badge>
              <button onClick={() => toast('Conversazione segnata come risolta')} style={miniGhost()}><Icon name="check" size={13} color="var(--dim)" stroke={2.4} />Risolvi</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }} className="noscroll">
              {thread.msgs.map((m, i) => {
                const admin = m.from === 'admin';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: admin ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '72%' }}>
                      <div style={{
                        padding: '11px 14px', borderRadius: admin ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                        background: admin ? 'var(--fire-grad)' : 'var(--surface)', border: admin ? 'none' : '1px solid var(--line)',
                        color: admin ? '#1a0e06' : 'var(--dim)', fontSize: 13.5, lineHeight: 1.45,
                      }}>{m.text}</div>
                      <div style={{ fontSize: 10, color: 'var(--faint)', marginTop: 4, textAlign: admin ? 'right' : 'left', fontFamily: 'var(--font-cond)' }}>{admin ? 'Staff ISG' : thread.client} · {m.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: 12, borderTop: '1px solid var(--line)', display: 'flex', gap: 9, alignItems: 'center' }}>
              <input placeholder={`Rispondi a ${thread.client}…`} style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
              <FireButton size="sm" icon="arrow" onClick={() => toast('Risposta inviata')}>Invia</FireButton>
            </div>
            </>)}
          </Panel>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════ IMPOSTAZIONI ════════
function SettingsSection({ toast }) {
  const [quotes, setQuotes] = React.useState(QUOTES);
  const [newQuote, setNewQuote] = React.useState('');
  const g = GYM_INFO;
  const fields = [
    ['Nome palestra', g.name], ['Tagline', g.tagline], ['Indirizzo', g.address],
    ['Telefono', g.phone], ['Email', g.email], ['WhatsApp', g.whatsapp], ['Instagram', g.instagram],
  ];
  const addQuote = () => {
    if (!newQuote.trim()) return;
    setQuotes(q => [newQuote.trim(), ...q]); setNewQuote(''); toast('Citazione aggiunta');
  };
  return (
    <div style={{ padding: 24, animation: 'fadeUp .3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* gym data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Dati palestra</h2>
              <FireButton size="sm" icon="check" onClick={() => toast('Modifiche salvate')}>Salva</FireButton>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {fields.map(([label, val], i) => (
                <div key={i}>
                  <label style={{ fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>{label}</label>
                  <input defaultValue={val} style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 9, padding: '10px 13px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13.5, outline: 'none' }} />
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <h2 className="display" style={{ margin: '0 0 14px', fontSize: 18, color: 'var(--text)' }}>Orari di apertura</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 11, overflow: 'hidden', border: '1px solid var(--line)' }}>
              {g.hours.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: 'var(--surface)' }}>
                  <span className="cond" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{h.d}</span>
                  <span className="cond" style={{ fontSize: 13, color: h.h === 'Chiuso' ? 'var(--bad)' : 'var(--amber)', fontWeight: 600 }}>{h.h}</span>
                </div>
              ))}
            </div>
          </Panel>
          <AdminSecurityPanel toast={toast} />
        </div>

        {/* quotes manager */}
        <Panel style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 14 }}>
            <div className="kicker" style={{ marginBottom: 5 }}>Homepage · citazione del giorno</div>
            <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Citazioni motivazionali</h2>
            <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>Una diversa ogni giorno, in rotazione automatica.</div>
          </div>
          <div style={{ display: 'flex', gap: 9, marginBottom: 14 }}>
            <input value={newQuote} onChange={e => setNewQuote(e.target.value)} onKeyDown={e => e.key === 'Enter' && addQuote()} placeholder="Aggiungi una citazione…" style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 9, padding: '10px 13px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
            <FireButton size="sm" icon="plus" onClick={addQuote}>Aggiungi</FireButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: 420 }} className="noscroll">
            {quotes.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '12px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--line)' }}>
                <Icon name="flame" size={16} color="var(--amber)" stroke={1.8} style={{ marginTop: 2 }} />
                <p className="cond" style={{ margin: 0, flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>{q}</p>
                <button onClick={() => { setQuotes(qs => qs.filter((_, j) => j !== i)); toast('Citazione rimossa'); }} style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer', flexShrink: 0 }}>
                  <Icon name="x" size={15} color="var(--faint)" stroke={2.2} />
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ---------- ACCOUNT STAFF & SICUREZZA ----------
function AdminSecurityPanel({ toast }) {
  const cur = (typeof AUTH !== 'undefined') ? AUTH.getAdminCreds() : { email: 'admin@ironsyndacate.gym', password: '' };
  const [email, setEmail] = React.useState(cur.email);
  const [pwd, setPwd] = React.useState('');
  const [pwd2, setPwd2] = React.useState('');
  const save = () => {
    if (!email.trim()) { toast('Inserisci un\'email valida'); return; }
    if (pwd && pwd !== pwd2) { toast('Le password non coincidono'); return; }
    const next = { email: email.trim(), password: pwd || cur.password };
    if (typeof AUTH !== 'undefined') AUTH.setAdminCreds(next);
    setPwd(''); setPwd2('');
    toast('Credenziali staff aggiornate');
  };
  const fld = { width: '100%', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 9, padding: '10px 13px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13.5, outline: 'none' };
  const lbl = { fontSize: 10.5, color: 'var(--faint)', fontFamily: 'var(--font-cond)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 };
  return (
    <Panel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <h2 className="display" style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Account staff & sicurezza</h2>
        <Icon name="shield" size={18} color="var(--amber)" stroke={1.9} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 16 }}>Credenziali per accedere all'area admin.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={lbl}>Email accesso admin</label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={fld} />
        </div>
        <div>
          <label style={lbl}>Nuova password</label>
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Lascia vuoto per non cambiare" style={fld} />
        </div>
        <div>
          <label style={lbl}>Conferma nuova password</label>
          <input type="password" value={pwd2} onChange={e => setPwd2(e.target.value)} placeholder="Ripeti la nuova password" style={fld} />
        </div>
        <FireButton size="sm" icon="check" onClick={save}>Aggiorna credenziali</FireButton>
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--faint)', lineHeight: 1.4 }}>
        <Icon name="shield" size={14} color="var(--faint)" stroke={1.9} />
        Demo: salvate nel browser. In produzione: hash sicuro + ruoli staff lato server.
      </div>
    </Panel>
  );
}

Object.assign(window, { DocsSection, EventsAdminSection, ChatSection, SettingsSection, AdminSecurityPanel });
