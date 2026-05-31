# 🔥 IRON SYNDACATE GYM — Piattaforma

Piattaforma digitale completa per la palestra **Iron Syndacate Gym** (Valeggio sul Mincio, VR) — palestra pilota Panatta.
Include **tre pagine** reali, a tutto schermo, collegate tra loro:

| Pagina | URL | Cosa contiene |
|---|---|---|
| 🖥️ **Sito web** | `/` (index.html) | Vetrina pubblica: hero, servizi, attrezzatura Panatta, abbonamenti, eventi, distributori, contatti |
| 📱 **App cliente** | `/app.html` | Login, dashboard personale, prenotazione PT, tessera QR, documenti, profilo, notifiche, chat staff, consensi GDPR |
| 🛠️ **Pannello admin** | `/admin.html` | Dashboard statistiche, gestione clienti, abbonamenti, accessi (check-in QR), documenti con OCR, eventi, distributori, chat, impostazioni palestra |

> Il sito pubblico è la home (`index.html`). Il pulsante **"Accedi / Iscriviti"** porta all'app cliente. Il pannello admin si raggiunge direttamente da **`tuosito.it/admin.html`**.

---

## ⚠️ Stato attuale: prototipo ad alta fedeltà

Questo repository contiene il **front-end completo e navigabile** della piattaforma.
I dati sono **demo** (definiti nei file `data*.jsx`) e le azioni admin (salva, valida, disattiva…) mostrano una conferma ma **non vengono ancora salvate in un database**.

Per renderla **operativa con utenti reali** serve collegare un backend (database, login, pagamenti, OCR, QR, notifiche).
👉 Vedi **[SPEC.md](SPEC.md)** per la specifica funzionale completa da dare a uno sviluppatore o a Base44.

---

## 🚀 Pubblicare subito online (Netlify)

Il prototipo è un **sito statico** (HTML + JavaScript): non richiede build né server.

### Opzione A — Drag & drop (più veloce)
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina **l'intera cartella** del progetto nella finestra
3. In pochi secondi avrai un URL pubblico (es. `iron-syndacate.netlify.app`)

### Opzione B — Collegato a GitHub (consigliata)
1. Carica questo progetto su GitHub (vedi sotto)
2. Su Netlify: **Add new site → Import an existing project → GitHub**
3. Seleziona il repository. Impostazioni:
   - **Build command:** *(lascia vuoto)*
   - **Publish directory:** `.` (la radice)
4. **Deploy.** Da ora ogni modifica su GitHub si pubblica da sola.

---

## 📦 Caricare il progetto su GitHub

```bash
# dalla cartella del progetto
git init
git add .
git commit -m "Iron Syndacate Gym — prototipo iniziale"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/iron-syndacate-gym.git
git push -u origin main
```

(Crea prima un repository vuoto su github.com con lo stesso nome.)

---

## 🤖 Renderla operativa con Base44 (o sviluppatore)

Base44 e strumenti simili possono costruire il **backend reale** partendo da questo progetto.

1. Collega questo repository GitHub a Base44
2. Usa **[SPEC.md](SPEC.md)** come descrizione di cosa costruire: entità dati, ruoli, funzioni, integrazioni
3. Base44 / lo sviluppatore aggancia i pulsanti dell'admin a un database vero, aggiunge login, pagamenti, ecc.
4. Le interfacce di questo repo restano la **guida visiva** del prodotto finale

> Il design e i flussi sono già definiti: chi costruisce il backend **non parte da zero**.

---

## 💻 Eseguire in locale

Apri semplicemente `index.html` nel browser — funziona tutto.
(Per evitare blocchi del browser su alcuni sistemi, puoi servire la cartella con un mini server: `npx serve` oppure l'estensione *Live Server* di VS Code.)

### Accesso demo
- **Sito:** è la home, `index.html`
- **App cliente:** vai su `/app.html` (o premi "Accedi/Iscriviti" sul sito) → nella schermata di login premi **"Entra"** (credenziali già precompilate)
- **Admin:** vai su `/admin.html`

---

## 🗂️ Struttura dei file

```
index.html          🖥️  Sito vetrina pubblico (home)
app.html            📱  App cliente (login + area personale)
admin.html          🛠️  Pannello admin
styles.css          Stili condivisi (colori fuoco/acciaio, font, helper)
ui.jsx              Componenti base (icone, badge, bottoni, QR, grafici)
data.jsx            Dati demo: citazioni, servizi, piani, eventi, clienti, KPI
data2.jsx           Dati demo: accessi, documenti/OCR, chat, vending, impostazioni
data3.jsx           Dati demo: utente loggato, trainer, prenotazioni, notifiche
web.jsx             Contenuto del sito vetrina
mobile.jsx          App cliente: shell, nav, vetrina, abbonamenti, eventi, tessera
client.jsx          App cliente: login, dashboard, prenota PT, profilo, documenti
admin.jsx           Admin: shell, dashboard, gestione clienti
admin-ops.jsx       Admin: abbonamenti, accessi, distributori
admin-mgmt.jsx      Admin: documenti, eventi, chat, impostazioni
assets/             Logo
```

### Dove modifico i dati demo?
Tutti i contenuti finti (numeri, orari, prezzi, clienti…) sono nei file **`data.jsx`, `data2.jsx`, `data3.jsx`**.
Esempio — gli orari della palestra sono in `data2.jsx` dentro `GYM_INFO.hours`.
Quando il backend sarà collegato, questi valori arriveranno dal database e si modificheranno dal pannello admin.

---

## 🎨 Personalizzazione rapida
- **Colori fuoco/acciaio e font:** variabili CSS in cima a **`styles.css`** (`:root`)
- **Citazioni del giorno:** array `QUOTES` in `data.jsx`
- **Logo:** sostituisci `assets/logo-badge.png`

---

© 2026 Iron Syndacate Gym · Valeggio sul Mincio (VR)
