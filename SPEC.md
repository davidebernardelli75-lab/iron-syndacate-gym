# SPEC.md — Specifica funzionale per la versione operativa

Questo documento descrive **cosa deve fare la piattaforma una volta collegata a un backend reale**.
Serve a uno sviluppatore o a uno strumento come **Base44** per trasformare il prototipo di questo repository in un prodotto funzionante con utenti reali.

Il front-end (le schermate) è già pronto in questo repo. Qui sotto trovi **il "motore" da costruire**: database, login, ruoli, logiche e integrazioni.

---

## 1. Ruoli e permessi

| Ruolo | Può fare |
|---|---|
| **Super Admin** | Tutto, inclusi ruoli/permessi e impostazioni palestra |
| **Admin** | Gestione clienti, abbonamenti, documenti, eventi, accessi |
| **Reception** | Check-in accessi, ingressi manuali, nuovi clienti |
| **Personal Trainer** | Proprio calendario, prenotazioni assegnate |
| **Moderatore Chat** | Moderazione community, segnalazioni |
| **Contabilità** | Pagamenti, report, scadenze |
| **Cliente** | Solo la propria area personale |

Login separato per **clienti** e **staff**. Password criptate. 2FA opzionale per i clienti, consigliato per lo staff. Recupero password via email.

---

## 2. Modello dati (entità principali)

> Ogni entità qui sotto corrisponde a dati oggi "finti" nei file `data*.jsx`. Vanno spostati in un database reale.

### Cliente (`Member`)
`id, nome, cognome, nickname, email, telefono, data_nascita, codice_fiscale, indirizzo, password_hash, stato (attivo/in_scadenza/sospeso/insoluto), data_iscrizione, qr_code_id, credito_distributori, consensi { chat, privacy, dati, marketing }, note_admin`
> ⚠️ Il telefono **non deve mai** essere visibile agli altri clienti.

### Abbonamento (`Subscription`)
`id, nome, periodo, prezzo, durata_giorni, descrizione, benefici[], n_ingressi, illimitato (bool), rinnovo_auto (bool), sospensione_consentita (bool), attivo (bool)`

### Iscrizione cliente (`MemberSubscription`)
`id, member_id, subscription_id, data_inizio, data_scadenza, stato, storico_pagamenti[], sospensioni[]`

### Documento (`Document`)
`id, member_id, tipo (id/certificato/modulo/liberatoria), file_url, stato (da_validare/valido/scaduto/illeggibile), dati_ocr {…}, confidenza_ocr, data_scadenza, validato_da, data_validazione`

### Personal Trainer (`Trainer`)
`id, nome, ruolo, specialità, disponibilità[], rating`

### Prenotazione PT (`Booking`)
`id, member_id, trainer_id, tipo (singolo/coppia/gruppo/check), data, ora, durata, prezzo, stato (confermata/in_attesa/annullata), lista_attesa[]`

### Evento (`Event`)
`id, titolo, categoria, data, ora, durata, posti, iscritti[], prezzo, coach_id, stato, ricorrente (bool)`

### Prodotto distributore (`VendingProduct`)
`id, nome, categoria, prezzo, scorta`

### Vendita distributore (`VendingSale`)
`id, member_id (via QR), product_id, prezzo, timestamp`

### Accesso (`AccessLog`)
`id, member_id, timestamp, metodo (qr/badge/manuale), esito (ok/negato), motivo, autorizzato_da`

### Messaggi chat (`ChatMessage`, `DirectMessage`)
Community: `id, canale, member_id, nickname, testo, fissato, segnalato, timestamp`
DM admin↔cliente: `id, member_id, mittente (admin/cliente), testo, stato (aperta/risolta), timestamp`
> Solo testo. **Vietati** immagini, video, audio, file.

### Impostazioni palestra (`GymSettings`)
`nome, tagline, indirizzo, telefono, email, whatsapp, social, orari[], chiusure[], citazioni[], colori, logo`

### Notifica (`Notification`)
`id, member_id, tipo, titolo, corpo, letta, timestamp`

### Registro consensi / Audit log
`id, attore, azione, entità, timestamp` — per GDPR e tracciabilità azioni admin.

---

## 3. Funzioni — Area cliente

- Registrazione e login (email + password, 2FA opzionale, recupero password)
- Dashboard: stato abbonamento, scadenza, certificato, credito, prossime prenotazioni, QR personale, notifiche
- **Iscrizione e rinnovo abbonamento** (con pagamento)
- Modifica abbonamento (se consentito da admin)
- **Caricamento documenti** → lettura automatica **OCR** → validazione admin
- **Prenotazione PT** (singolo/coppia/gruppo/check) con disponibilità reale e lista d'attesa
- Iscrizione eventi dal calendario
- **QR personale** per ingressi e distributori automatici
- Ricarica credito distributori
- Chat privata con lo staff (solo testo)
- Chat community (solo testo, solo nickname, previo consenso esplicito)
- Gestione profilo e **consensi GDPR** (attiva/revoca in qualsiasi momento)

---

## 4. Funzioni — Area admin

- Dashboard con KPI reali (clienti attivi, entrate, accessi, scadenze, vendite…)
- **Gestione clienti**: crea, modifica, sospendi, riattiva, elimina (GDPR), note interne
- Gestione abbonamenti e pagamenti (manuali e automatici), sconti, codici promo
- **Gestione accessi**: check-in QR, ingressi manuali, blocco per abbonamento/certificato scaduto, **autorizzazione manuale tracciata nel log**
- **Validazione documenti** con dati estratti da OCR (valida/rifiuta, segnala scadenze)
- Gestione eventi e partecipanti, esportazioni
- Gestione distributori: prodotti, scorte, vendite, credito clienti
- Moderazione chat: elimina messaggi, sospendi utenti, fissa annunci, gestisci segnalazioni e DM
- **Impostazioni palestra modificabili**: dati, orari, festività, listino, citazioni, logo, colori
- Report e statistiche, esportazione CSV/PDF
- Ruoli e permessi, audit log

---

## 5. Integrazioni esterne da collegare

| Funzione | Servizio suggerito |
|---|---|
| Autenticazione | Auth integrata Base44 / Supabase Auth / Auth0 |
| Database | Postgres (Supabase) o database integrato Base44 |
| Pagamenti | **Stripe** o Nexi (abbonamenti, ricariche, eventi) |
| Storage documenti | Storage cloud privato e protetto |
| **OCR documenti** | Google Document AI / AWS Textract / Mindee |
| QR code | Generazione lato server, legato a `member_id` |
| Notifiche | Email (Resend/SendGrid) + opzionale WhatsApp/SMS |

---

## 6. Requisiti GDPR / sicurezza (obbligatori)

- Consenso esplicito per: trattamento dati, caricamento documenti, chat, comunicazioni commerciali
- Registro consensi + possibilità di revoca
- Documenti accessibili solo ad admin autorizzati
- Telefono/email/dati anagrafici **mai** visibili nella chat community
- Password criptate, upload protetti, backup, audit log delle azioni admin
- Eliminazione / anonimizzazione dati cliente su richiesta

---

## 7. Ordine di costruzione consigliato (MVP → completo)

**Fase 1 — MVP operativo**
1. Database + login clienti/admin
2. Gestione clienti + abbonamenti (CRUD reale dal pannello admin)
3. Impostazioni palestra editabili (orari, contatti, citazioni)
4. Pulizia dati demo + caricamento clienti reali

**Fase 2 — Operatività quotidiana**
5. QR personale + check-in accessi
6. Caricamento documenti + OCR + validazione
7. Prenotazioni PT + eventi
8. Pagamenti (Stripe)

**Fase 3 — Engagement**
9. Notifiche
10. Chat community + DM con moderazione
11. Distributori automatici + credito
12. Report, ruoli avanzati, audit log

> Alla fine della Fase 1 la palestra può già **cancellare i dati demo e iniziare a inserire clienti reali** dal pannello admin.

---

## 8. Pulizia dati demo prima del lancio

I dati finti sono nei file `data.jsx`, `data2.jsx`, `data3.jsx` (array `CLIENTS`, `EVENTS`, `VENDING`, ecc.).
Quando il database è collegato:
1. Svuota le tabelle (nessun cliente/evento/documento demo)
2. Imposta i dati reali della palestra in **Impostazioni**
3. Crea il primo account Super Admin
4. Inizia a caricare clienti reali (da admin o tramite auto-registrazione dal sito)
