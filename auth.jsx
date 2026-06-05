const SUPABASE_URL='https://inymrzglbhbtqagpyxzb.supabase.co';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlueW1yemdsYmhidHFhZ3B5eHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjQ4OTUsImV4cCI6MjA5NjAwMDg5NX0.pj80krA5zuw8hGdX507TUtvfZWLS2bqJKMc5Dh01OAk';
if(!window.supabase){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.onload=()=>{window._sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);};document.head.appendChild(s);}else{window._sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);}
function getSB(){return new Promise(resolve=>{if(window._sb)return resolve(window._sb);const iv=setInterval(()=>{if(window._sb){clearInterval(iv);resolve(window._sb);}},50);});}
const AUTH={
  ADMIN_DEFAULT:{email:'admin@ironsyndacate.gym',password:'iron2026'},
  getAdminCreds(){
    try{const s=localStorage.getItem('isg_admin_creds');if(s)return JSON.parse(s);}catch(e){}
    return{email:AUTH.ADMIN_DEFAULT.email,password:AUTH.ADMIN_DEFAULT.password};
  },
  setAdminCreds(creds){try{localStorage.setItem('isg_admin_creds',JSON.stringify(creds));}catch(e){}},
  async adminLogin(email,pwd){const sb=await getSB();const{data,error}=await sb.auth.signInWithPassword({email,password:pwd});if(error)return false;localStorage.setItem('isg_admin_session','1');return true;},
  async isAdmin(){const sb=await getSB();const{data}=await sb.auth.getUser();return!!data.user;},
  async adminLogout(){const sb=await getSB();await sb.auth.signOut();localStorage.removeItem('isg_admin_session');},
  async addClient(c){const sb=await getSB();const{error}=await sb.auth.signUp({email:c.email,password:c.password});if(error)return{ok:false,err:error.message};return{ok:true};},
  async clientLogin(email,pwd){const sb=await getSB();const{data,error}=await sb.auth.signInWithPassword({email:email.trim(),password:pwd});if(error)return{ok:false,err:'Credenziali non valide'};localStorage.setItem('isg_client_session',data.user.email);return{ok:true};},
  async currentClient(){
    const sb=await getSB();
    const{data:auth}=await sb.auth.getUser();
    if(!auth.user)return null;
    const email=auth.user.email||'';
    const uid=auth.user.id;
    try{
      const{data:p,error}=await sb.from('profiles')
        .select('*, memberships(*, subscription_plans(*)), medical_certificates(*)')
        .eq('id',uid).maybeSingle();
      if(!error&&p){
        const mem=(p.memberships||[])[0]||null;
        const cert=(p.medical_certificates||[])[0]||null;
        const now=new Date();
        let expiry='—',expiryDays=0,plan='Nessun abbonamento',planPeriod='—';
        if(mem){
          expiry=mem.data_fine||mem.end_date||'—';
          if(expiry!=='—'){const d=new Date(expiry);expiryDays=Math.ceil((d-now)/86400000);}
          const sp=Array.isArray(mem.subscription_plans)?mem.subscription_plans[0]:mem.subscription_plans;
          plan=sp?(sp.nome||sp.name||'Abbonamento'):'Abbonamento attivo';
          planPeriod=sp?(sp.periodo||sp.period||'—'):'—';
        }
        let certStatus='missing',certExp='—',certDays=0;
        if(cert){
          certStatus=cert.stato||cert.status||'missing';
          certExp=cert.data_scadenza||cert.expiry_date||'—';
          if(certExp!=='—'){const d=new Date(certExp);certDays=Math.ceil((d-now)/86400000);}
        }
        const name=[(p.nome||p.first_name||''),(p.cognome||p.last_name||'')].filter(Boolean).join(' ')||email.split('@')[0]||'Atleta';
        return{
          email,name,
          first:p.nome||p.first_name||name,
          nick:p.nickname||p.nick||name,
          id:p.id,
          plan,planPeriod,expiry,expiryDays,
          cert:certStatus,certExp,certDays,
          credit:Number(p.credito_distributori||p.credit||0),
          access:Number(p.accessi_totali||p.total_access||0),
          consents:p.consensi||p.consents||{chat:false,privacy:true,marketing:false,data:true},
          isNew:false
        };
      }
    }catch(e){console.warn('profiles query failed',e);}
    const namePart=email.split('@')[0]||'Atleta';
    return{email,name:namePart,first:namePart,nick:namePart,id:uid,plan:'Nessun abbonamento',planPeriod:'—',expiry:'—',expiryDays:0,cert:'missing',certExp:'—',certDays:0,credit:0,access:0,consents:{chat:false,privacy:true,marketing:false,data:true},isNew:true};
  },
  async clientLogout(){const sb=await getSB();await sb.auth.signOut();localStorage.removeItem('isg_client_session');}
};
window.AUTH=AUTH;