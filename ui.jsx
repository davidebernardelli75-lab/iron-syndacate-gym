// ─────────────────────────────────────────────────────────────
// UI primitives — icons, badges, buttons, QR, charts
// ─────────────────────────────────────────────────────────────

// ---- Icons (simple line set) ----
function Icon({ name, size = 22, color = 'currentColor', stroke = 2 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home:   <path d="M3 11l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
    card:   <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    qr:     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h3M21 18v3"/></>,
    dumbbell: <><path d="M6.5 6.5l11 11M4 8l-1.5 1.5a1.5 1.5 0 000 2L4 13M8 4l-1.5 1.5M20 16l1.5-1.5a1.5 1.5 0 000-2L20 11M16 20l1.5-1.5"/></>,
    bolt:   <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
    user:   <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>,
    users:  <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.3 3-5 6.5-5s6.5 1.7 6.5 5"/><path d="M16 5.2a3.5 3.5 0 010 5.6M18 20c0-2.4-.9-4-2.4-5"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>,
    bell:   <><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></>,
    chevron:<path d="M9 6l6 6-6 6"/>,
    chevronDown:<path d="M6 9l6 6 6-6"/>,
    arrow:  <path d="M5 12h14M13 6l6 6-6 6"/>,
    check:  <path d="M20 6L9 17l-5-5"/>,
    x:      <path d="M18 6L6 18M6 6l12 12"/>,
    grid:   <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></>,
    chart:  <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    doc:    <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/></>,
    shield: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 11-4 0v-.1A1.6 1.6 0 005 19.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 003 13.6H3a2 2 0 110-4h.1A1.6 1.6 0 004.6 7l-.1-.1a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 0010 4.6V4a2 2 0 114 0v.1a1.6 1.6 0 002.7 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 001.1 2.7H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/></>,
    chat:   <path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z" />,
    flame:  <path d="M12 2c1 4 4 5 4 9a4 4 0 01-8 0c0-1 .5-2 1-2.5C8 11 7 13 7 15a5 5 0 0010 0c0-5-4-8-5-13z" />,
    clock:  <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    pin:    <><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></>,
    phone:  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
    plus:   <path d="M12 5v14M5 12h14"/>,
    filter: <path d="M3 5h18l-7 8v6l-4 2v-8z"/>,
    pause:  <><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></>,
    refresh:<><path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 3v5h-5"/></>,
    euro:   <path d="M17 6a6 6 0 100 12M5 10h8M5 14h8"/>,
    trend:  <path d="M3 17l6-6 4 4 8-8M21 7v5h-5"/>,
    star:   <path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z"/>,
    whatsapp: <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3z"/>,
  };
  return <svg {...p} style={{ flexShrink: 0 }}>{paths[name] || null}</svg>;
}

// ---- Badge ----
function Badge({ tone = 'mute', children, dot = false, size = 'md' }) {
  const map = {
    ok:   { c: 'var(--ok)',   bg: 'rgba(95,174,87,0.14)',  bd: 'rgba(95,174,87,0.4)' },
    warn: { c: 'var(--warn)', bg: 'rgba(245,166,35,0.13)', bd: 'rgba(245,166,35,0.4)' },
    bad:  { c: 'var(--bad)',  bg: 'rgba(224,83,58,0.14)',  bd: 'rgba(224,83,58,0.42)' },
    info: { c: 'var(--info)', bg: 'rgba(91,155,213,0.14)', bd: 'rgba(91,155,213,0.4)' },
    fire: { c: 'var(--amber)',bg: 'rgba(238,90,28,0.14)',  bd: 'rgba(238,90,28,0.45)' },
    mute: { c: 'var(--dim)',  bg: 'rgba(255,255,255,0.05)',bd: 'var(--line-2)' },
  };
  const s = map[tone] || map.mute;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: size === 'sm' ? '2px 7px' : '3px 9px',
      borderRadius: 999, background: s.bg, border: `1px solid ${s.bd}`,
      color: s.c, fontFamily: 'var(--font-cond)', fontWeight: 600,
      fontSize: size === 'sm' ? 10 : 11, letterSpacing: '0.04em',
      textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1.3,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: s.c }} />}
      {children}
    </span>
  );
}

// ---- Buttons ----
function FireButton({ children, onClick, full, size = 'md', icon, style = {} }) {
  const pad = size === 'lg' ? '15px 24px' : size === 'sm' ? '8px 14px' : '12px 20px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 12.5 : 14;
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: full ? '100%' : undefined, border: 'none', borderRadius: 12, padding: pad,
        background: 'var(--fire-grad)', color: '#1a0e06', fontFamily: 'var(--font-cond)',
        fontWeight: 700, fontSize: fs, letterSpacing: '0.06em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        boxShadow: h ? '0 10px 30px rgba(238,90,28,0.45)' : '0 4px 16px rgba(238,90,28,0.28)',
        transform: h ? 'translateY(-1px)' : 'none', transition: 'all .18s ease', ...style,
      }}>
      {icon && <Icon name={icon} size={fs + 4} color="#1a0e06" stroke={2.6} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, full, size = 'md', icon, active, style = {} }) {
  const pad = size === 'lg' ? '15px 24px' : size === 'sm' ? '8px 13px' : '12px 18px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 12.5 : 14;
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: full ? '100%' : undefined, borderRadius: 12, padding: pad,
        background: active ? 'rgba(238,90,28,0.12)' : (h ? 'rgba(255,255,255,0.05)' : 'transparent'),
        color: active ? 'var(--amber)' : 'var(--text)',
        border: `1px solid ${active ? 'rgba(238,90,28,0.5)' : 'var(--line-2)'}`,
        fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: fs, letterSpacing: '0.06em',
        textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', gap: 9, transition: 'all .18s ease', ...style,
      }}>
      {icon && <Icon name={icon} size={fs + 3} stroke={2.2} />}
      {children}
    </button>
  );
}

// ---- Card ----
function Panel({ children, style = {}, pad = 18, glow = false }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
      border: '1px solid var(--line)', borderRadius: 16, padding: pad,
      boxShadow: glow ? '0 0 0 1px rgba(238,90,28,0.15), 0 20px 50px rgba(0,0,0,0.4)' : '0 12px 30px rgba(0,0,0,0.28)',
      ...style,
    }}>{children}</div>
  );
}

// ---- Deterministic pseudo-QR (pattern, not illustration) ----
function QRCode({ value = 'ISG', size = 150, fg = '#0d0c0a', bg = '#efe7d8' }) {
  const N = 25;
  const cells = React.useMemo(() => {
    // simple deterministic hash fill
    let seed = 0; for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const g = Array.from({ length: N }, () => Array.from({ length: N }, () => rnd() > 0.52));
    const finder = (r, c) => {
      for (let i = -1; i <= 7; i++) for (let j = -1; j <= 7; j++) {
        const rr = r + i, cc = c + j; if (rr < 0 || cc < 0 || rr >= N || cc >= N) continue;
        const border = i === 0 || i === 6 || j === 0 || j === 6;
        const inner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        const ring = i >= 1 && i <= 5 && j >= 1 && j <= 5;
        g[rr][cc] = (i >= 0 && i <= 6 && j >= 0 && j <= 6) ? (border || inner) && !(ring && !inner) : false;
      }
    };
    finder(0, 0); finder(0, N - 7); finder(N - 7, 0);
    return g;
  }, [value]);
  const cs = size / N;
  return (
    <div style={{ width: size, height: size, background: bg, borderRadius: 10, padding: cs, boxSizing: 'content-box' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((row, r) => row.map((on, c) => on ? (
          <rect key={r + '-' + c} x={c * cs} y={r * cs} width={cs + 0.5} height={cs + 0.5} fill={fg} rx={cs * 0.18} />
        ) : null))}
      </svg>
    </div>
  );
}

// ---- Bar chart ----
function BarChart({ data, accessor = 'v', label = 'm', height = 120, format = (v) => v }) {
  const max = Math.max(...data.map(d => d[accessor]));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height }}>
      {data.map((d, i) => {
        const h = (d[accessor] / max) * (height - 22);
        const isLast = i === data.length - 1;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: 10, color: isLast ? 'var(--amber)' : 'var(--faint)', fontWeight: 600 }}>{format(d[accessor])}</div>
            <div style={{
              width: '100%', maxWidth: 30, height: h, borderRadius: '5px 5px 2px 2px',
              background: isLast ? 'var(--fire-grad)' : 'linear-gradient(180deg, var(--line-2), var(--surface-3))',
              border: isLast ? 'none' : '1px solid var(--line-2)',
              boxShadow: isLast ? '0 0 14px rgba(238,90,28,0.4)' : 'none',
              transition: 'height .4s ease',
            }} />
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: 10, color: 'var(--faint)', textTransform: 'uppercase' }}>{d[label]}</div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Sparkline (area) ----
function Sparkline({ data, accessor = 'v', width = 240, height = 56 }) {
  const max = Math.max(...data.map(d => d[accessor]));
  const min = Math.min(...data.map(d => d[accessor]));
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d[accessor] - min) / (max - min || 1)) * (height - 8) - 4;
    return [x, y];
  });
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${width} ${height} L0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', width: '100%' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(238,90,28,0.4)" />
          <stop offset="1" stopColor="rgba(238,90,28,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path d={line} fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---- Avatar (monogram) ----
function Avatar({ name, size = 38, sex }) {
  const initials = (name || 'Atleta').split(' ').map(w => w[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, flexShrink: 0,
      background: 'linear-gradient(135deg, var(--surface-3), var(--surface))',
      border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-cond)', fontWeight: 700, fontSize: size * 0.36, color: 'var(--amber)',
      letterSpacing: '0.02em',
    }}>{initials}</div>
  );
}

// ---- Toast ----
function Toast({ msg, onDone }) {
  React.useEffect(() => { if (!msg) return; const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [msg]);
  if (!msg) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 96, left: '50%', transform: 'translateX(-50%)',
      zIndex: 200, background: 'rgba(15,12,10,0.96)', border: '1px solid rgba(238,90,28,0.5)',
      borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)', animation: 'fadeUp .25s ease', maxWidth: '88%',
    }}>
      <Icon name="check" size={18} color="var(--amber)" stroke={3} />
      <span style={{ fontFamily: 'var(--font-cond)', fontWeight: 600, fontSize: 13.5, color: 'var(--text)', letterSpacing: '0.02em' }}>{msg}</span>
    </div>
  );
}

// responsive hook — true quando la larghezza è <= bp
function useIsMobile(bp = 760) {
  const [m, setM] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  React.useEffect(() => {
    const onR = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, [bp]);
  return m;
}

// logo watermark di sfondo (faint, centrato)
function LogoWatermark({ size = 460, opacity = 0.05, top = '50%' }) {
  const src = (window.__resources && window.__resources.logoBadge) ? window.__resources.logoBadge : 'assets/logo-badge.png';
  return (
    <img src={src} alt="" aria-hidden="true" style={{
      position: 'absolute', top, left: '50%', transform: 'translate(-50%, -50%)',
      width: size, maxWidth: '130%', height: 'auto', opacity, pointerEvents: 'none', zIndex: 0,
      filter: 'grayscale(0.2)', userSelect: 'none',
    }} />
  );
}

Object.assign(window, {
  Icon, Badge, FireButton, GhostButton, Panel, QRCode, BarChart, Sparkline, Avatar, Toast, useIsMobile, LogoWatermark,
});
