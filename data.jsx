const QUOTES=["La disciplina pesa meno del rimpianto.","Non devi essere motivato ogni giorno. Devi essere costante.","Il ferro non mente: restituisce esattamente ciò che gli dai.","Ogni ripetizione è un voto per la persona che vuoi diventare.","La forza si costruisce quando nessuno guarda.","Oggi non si salta. Oggi si costruisce.","Non sei qui per allenarti. Sei qui per costruirti.","Il ferro seleziona. La costanza costruisce."];
function quoteOfTheDay(){const now=new Date();const start=new Date(now.getFullYear(),0,0);const day=Math.floor((now-start)/86400000);return QUOTES[day%QUOTES.length];}
const SERVICES=[{id:'bb',tag:'01',it:'Bodybuilding',en:'Hypertrophy',desc:'Ipertrofia e composizione corporea.'},{id:'str',tag:'02',it:'Allenamento Forza',en:'Strength',desc:'Powerlifting, alzate fondamentali.'},{id:'plate',tag:'03',it:'Plate Loaded Area',en:'Plate Loaded',desc:'Linea completa Panatta a dischi.'},{id:'pt',tag:'04',it:'Personal Training',en:'1:1 Coaching',desc:'Coaching individuale con trainer certificati.'},{id:'duo',tag:'05',it:'Allenamento Coppia',en:'Duo Training',desc:'Allenati con un partner.'},{id:'sgt',tag:'06',it:'Small Group',en:'Small Group',desc:'Gruppi ridotti.'},{id:'fun',tag:'07',it:'Hybrid / Functional',en:'Functional',desc:'Condizionamento ibrido.'},{id:'evt',tag:'08',it:'Eventi & Challenge',en:'Events',desc:'Test day, gare interne.'}];
const PLANS=[{id:'start',name:'Iron Start',period:'Mensile',en:'Monthly',price:49,unit:'/mese',tagline:'Inizia il percorso.',features:['Accesso illimitato sala pesi','Linea Panatta completa','App e tessera QR','Citazione del giorno'],highlight:false},{id:'progress',name:'Iron Progress',period:'Trimestrale',en:'Quarterly',price:129,unit:'/3 mesi',tagline:'Costruisci slancio.',save:'Risparmi 18€',features:['Tutto di Iron Start','1 check tecnico incluso','Sospensione 7 giorni','Accesso eventi base'],highlight:false},{id:'discipline',name:'Iron Discipline',period:'Semestrale',en:'6 months',price:229,unit:'/6 mesi',tagline:'La scelta della costanza.',save:'Risparmi 65€',features:['Tutto di Iron Progress','1 scheda personalizzata','2 ingressi ospite','Sconto 10% distributori'],highlight:true,badge:'Più scelto'},{id:'legacy',name:'Iron Legacy',period:'Annuale',en:'Annual',price:399,unit:'/anno',tagline:'Per chi non si ferma.',save:'Risparmi 189€',features:['Tutto di Iron Discipline','3 sessioni PT incluse','Accesso prioritario eventi','Sospensione 30 giorni'],highlight:false}];
const PT_PACKS=[{id:'pt1',name:'PT Single Session',price:45,unit:'sessione',desc:'Lezione individuale 60 min.'},{id:'duo',name:'PT Duo',price:30,unit:'a testa',desc:'Sessione di coppia, 60 min.'},{id:'sgt',name:'Small Group',price:18,unit:'a testa',desc:'Fino a 5 persone, 60 min.'}];
const EVENTS=[];
const VENDING=[];
const STATUS={active:{it:'Attivo',tone:'ok'},expiring:{it:'In scadenza',tone:'warn'},suspended:{it:'Sospeso',tone:'mute'},cert_missing:{it:'Certificato mancante',tone:'bad'},cert_expired:{it:'Certificato scaduto',tone:'bad'},doc_review:{it:'Documento da validare',tone:'info'},unpaid:{it:'Pagamento insoluto',tone:'bad'}};
const CLIENTS=[];
const KPI={activeMembers:0,newSignups:0,expiringSubs:0,certMissing:0,docsToReview:0,todayBookings:0,revenueToday:0,revenueMonth:0,accessToday:0,vendingMonth:0};
const REVENUE_SERIES=[];
const ACCESS_SERIES=[];
const TODAY_BOOKINGS=[];
const TODO_ITEMS=[];
const RECENT_ACCESS=[];
Object.assign(window,{QUOTES,quoteOfTheDay,SERVICES,PLANS,PT_PACKS,EVENTS,VENDING,STATUS,CLIENTS,KPI,REVENUE_SERIES,ACCESS_SERIES,TODAY_BOOKINGS,TODO_ITEMS,RECENT_ACCESS});
const DB={
  async getEvents(){return[];},
  async getVending(){return[];},
  async getClients(){
    try{
      const sb=await getSB();
      const{data,error}=await sb.from('profiles')
        .select('*, memberships(*, subscription_plans(*)), medical_certificates(*)')
        .eq('ruolo','cliente')
        .order('created_at',{ascending:false});
      if(error||!data)return[];
      const now=new Date();
      return data.map(p=>{
        const mem=(p.memberships||[])[0]||null;
        const cert=(p.medical_certificates||[])[0]||null;
        let expiry='—',status='active',plan='—';
        if(mem){
          expiry=mem.data_fine||mem.end_date||'—';
          status=mem.stato||mem.status||'active';
          if(expiry!=='—'&&status==='active'){const d=new Date(expiry);if(Math.ceil((d-now)/86400000)<=30)status='expiring';}
          const sp=Array.isArray(mem.subscription_plans)?mem.subscription_plans[0]:mem.subscription_plans;
          plan=sp?(sp.nome||sp.name||'Abbonamento'):'Abbonamento';
        }
        let certStatus='missing',certExp='—';
        if(cert){certStatus=cert.stato||cert.status||'missing';certExp=cert.data_scadenza||cert.expiry_date||'—';}
        const name=[(p.nome||p.first_name||''),(p.cognome||p.last_name||'')].filter(Boolean).join(' ')||(p.email||'').split('@')[0]||'Atleta';
        return{
          id:p.id,email:p.email||'',
          name,nick:p.nickname||name,
          plan,expiry,status,
          cert:certStatus,certExp,
          credit:Number(p.credito_distributori||p.credit||0),
          access:Number(p.accessi_totali||p.total_access||0),
          lastAccess:p.ultimo_accesso||p.last_access||'—',
        };
      });
    }catch(e){console.warn('getClients failed',e);return[];}
  },
  async getKPI(){
    try{
      const sb=await getSB();
      const today=new Date().toISOString().slice(0,10);
      const in30=new Date(Date.now()+30*86400000).toISOString().slice(0,10);
      const[r1,r2,r3,r4]=await Promise.all([
        sb.from('profiles').select('*',{count:'exact',head:true}).eq('ruolo','cliente'),
        sb.from('memberships').select('*',{count:'exact',head:true}).gte('data_fine',today).lte('data_fine',in30),
        sb.from('profiles').select('*',{count:'exact',head:true}).eq('ruolo','cliente').in('stato',['cert_missing','cert_expired']),
        sb.from('documents').select('*',{count:'exact',head:true}).eq('stato','da_validare'),
      ]);
      return{...KPI,
        activeMembers:r1.count||0,
        expiringSubs:r2.count||0,
        certMissing:r3.count||0,
        docsToReview:r4.count||0,
      };
    }catch(e){console.warn('getKPI failed',e);return KPI;}
  },
  async getTodayBookings(){return[];},
  async getTodoItems(){return[];},
  async getRecentAccess(){return[];},
  async getRevenueSeries(){return[];}
};
window.DB=DB;