import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #c8a96e; --gold-dark: #a8854a;
    --bg: #0d0d0d; --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08); --text: #f0ece3; --muted: #888;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
  .app { min-height: 100vh; }

  /* HERO FORM */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 60px 24px; overflow: hidden;
  }
  .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg,#1a1206,#0d1a14,#0d0d0d); }
  .hero-bg::after {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 70% 30%,rgba(200,169,110,.08) 0%,transparent 60%),
                radial-gradient(ellipse at 20% 80%,rgba(74,124,111,.08) 0%,transparent 50%);
  }
  .hero-content { position:relative; z-index:2; text-align:center; width:100%; max-width:720px; }
  .eyebrow { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:var(--gold); margin-bottom:20px; opacity:0; animation:fadeUp .8s ease .2s forwards; }
  h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(44px,9vw,80px); font-weight:300; line-height:1.0; margin-bottom:16px; opacity:0; animation:fadeUp .8s ease .4s forwards; }
  h1 em { font-style:italic; color:var(--gold); }
  .subtitle { color:var(--muted); font-size:15px; font-weight:300; margin-bottom:36px; opacity:0; animation:fadeUp .8s ease .6s forwards; }
  .form-wrap { opacity:0; animation:fadeUp .8s ease .8s forwards; width:100%; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  /* FORM */
  .form-card { background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:20px; padding:28px; backdrop-filter:blur(20px); }
  .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
  .field { display:flex; flex-direction:column; gap:7px; }
  .field.full { grid-column:1/-1; }
  .section-divider { grid-column:1/-1; border:none; border-top:1px solid var(--border); margin:4px 0; }
  .optional-label { grid-column:1/-1; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); padding-top:4px; }
  label { font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:var(--gold); font-weight:500; }
  input,select,textarea { background:rgba(255,255,255,.05); border:1px solid var(--border); border-radius:10px; padding:12px 14px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; transition:border-color .2s,background .2s; outline:none; width:100%; }
  input:focus,select:focus,textarea:focus { border-color:var(--gold); background:rgba(200,169,110,.05); }
  .input-prefix { position:relative; }
  .input-prefix span { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--gold); font-size:14px; pointer-events:none; }
  .input-prefix input { padding-left:30px; }
  select option { background:#1a1a1a; }
  textarea { resize:vertical; min-height:68px; }
  .btn { width:100%; padding:15px; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:#0a0a0a; border:none; border-radius:12px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:opacity .2s,transform .15s; }
  .btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
  .btn:disabled { opacity:.4; cursor:not-allowed; }

  /* LOADING */
  .loading-screen { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
  .spinner { width:40px; height:40px; border:2px solid rgba(200,169,110,.15); border-top-color:var(--gold); border-radius:50%; animation:spin .9s linear infinite; }
  @keyframes spin { to{transform:rotate(360deg)} }
  .loading-text { color:var(--muted); font-size:14px; font-weight:300; }

  /* RESULT */
  .result { max-width:940px; margin:0 auto; padding:40px 20px 80px; }

  /* DEST HERO */
  .dest-hero { position:relative; height:440px; border-radius:20px; overflow:hidden; margin-bottom:40px; animation:fadeUp .6s ease forwards; }
  .dest-hero img { width:100%; height:100%; object-fit:cover; filter:brightness(.6); }
  .dest-hero-bg { width:100%; height:100%; background:linear-gradient(135deg,#1a1206,#0d1a14); }
  .dest-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(13,13,13,.93) 0%,transparent 55%); display:flex; flex-direction:column; justify-content:flex-end; padding:36px; }
  .dest-name { font-family:'Cormorant Garamond',serif; font-size:clamp(34px,5vw,56px); font-weight:300; color:#fff; margin-bottom:10px; }
  .tags { display:flex; gap:8px; flex-wrap:wrap; }
  .tag { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.55); background:rgba(255,255,255,.1); border-radius:20px; padding:5px 11px; backdrop-filter:blur(10px); }
  .tag.gold { color:var(--gold); background:rgba(200,169,110,.15); border:1px solid rgba(200,169,110,.3); }
  .dest-ingress { color:rgba(255,255,255,.5); font-size:14px; margin-top:10px; font-style:italic; font-weight:300; }

  /* GALLERY */
  .gallery { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:170px 170px; gap:8px; margin-bottom:40px; border-radius:16px; overflow:hidden; opacity:0; animation:fadeUp .5s ease .1s forwards; }
  .gallery-item { overflow:hidden; }
  .gallery-item:first-child { grid-row:1/3; }
  .gallery-item img { width:100%; height:100%; object-fit:cover; filter:brightness(.8); transition:transform .4s,filter .4s; }
  .gallery-item:hover img { transform:scale(1.05); filter:brightness(1); }

  /* SECTION */
  .section-title { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:300; color:var(--text); margin-bottom:20px; }
  .section-title em { color:var(--gold); font-style:italic; }

  /* BEST MONTHS */
  .months-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .15s forwards; }
  .months-grid { display:grid; grid-template-columns:repeat(12,1fr); gap:6px; }
  .month-cell { background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:10px 6px; text-align:center; transition:all .2s; cursor:default; }
  .month-cell.best { background:rgba(200,169,110,.15); border-color:rgba(200,169,110,.4); }
  .month-cell.ok { background:rgba(74,124,111,.1); border-color:rgba(74,124,111,.3); }
  .month-cell.avoid { background:rgba(180,60,60,.08); border-color:rgba(180,60,60,.2); }
  .month-name { font-size:9px; letter-spacing:1px; text-transform:uppercase; color:var(--muted); margin-bottom:4px; }
  .month-cell.best .month-name { color:var(--gold); }
  .month-price { font-size:10px; color:var(--text); font-weight:500; }
  .months-legend { display:flex; gap:16px; margin-top:12px; flex-wrap:wrap; }
  .legend-item { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--muted); }
  .legend-dot { width:8px; height:8px; border-radius:50%; }

  /* FLIGHTS */
  .flights-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .2s forwards; }
  .flights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .flight-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:20px; display:flex; flex-direction:column; gap:10px; transition:border-color .2s,transform .2s; }
  .flight-card:hover { border-color:rgba(200,169,110,.3); transform:translateY(-2px); }
  .flight-logo { font-size:13px; font-weight:500; color:var(--text); }
  .flight-desc { font-size:12px; color:var(--muted); font-weight:300; line-height:1.5; }
  .flight-btn { display:block; padding:10px; background:rgba(200,169,110,.1); border:1px solid rgba(200,169,110,.25); border-radius:8px; color:var(--gold); font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; text-decoration:none; text-align:center; transition:background .2s; }
  .flight-btn:hover { background:rgba(200,169,110,.2); }

  /* MAP */
  .map-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .25s forwards; }
  .map-wrap { border-radius:16px; overflow:hidden; border:1px solid var(--border); height:320px; }
  .map-wrap iframe { width:100%; height:100%; border:none; filter:invert(.9) hue-rotate(180deg) brightness(.85) saturate(.7); }

  /* HOTELS */
  .hotels-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .3s forwards; }
  .hotels-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .hotel-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; transition:border-color .2s,transform .2s; }
  .hotel-card:hover { border-color:rgba(200,169,110,.3); transform:translateY(-2px); }
  .hotel-img { height:130px; overflow:hidden; }
  .hotel-img img { width:100%; height:100%; object-fit:cover; filter:brightness(.8); transition:transform .4s; }
  .hotel-card:hover .hotel-img img { transform:scale(1.05); }
  .hotel-body { padding:14px; }
  .hotel-platform { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:5px; }
  .hotel-name { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:300; color:var(--text); margin-bottom:5px; line-height:1.2; }
  .hotel-desc { color:var(--muted); font-size:11px; line-height:1.5; margin-bottom:10px; font-weight:300; }
  .hotel-price { font-size:12px; color:var(--text); font-weight:500; margin-bottom:8px; }
  .hotel-price span { color:var(--gold); }
  .hotel-btn { display:block; width:100%; padding:8px; background:rgba(200,169,110,.1); border:1px solid rgba(200,169,110,.25); border-radius:8px; color:var(--gold); font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; text-decoration:none; text-align:center; cursor:pointer; transition:background .2s; }
  .hotel-btn:hover { background:rgba(200,169,110,.2); }

  /* RESTAURANTS */
  .restaurants-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .35s forwards; }
  .restaurants-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
  .restaurant-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px; display:flex; gap:14px; align-items:flex-start; transition:border-color .2s; }
  .restaurant-card:hover { border-color:rgba(200,169,110,.25); }
  .restaurant-rank { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300; color:rgba(200,169,110,.3); min-width:32px; line-height:1; }
  .restaurant-info { flex:1; }
  .restaurant-name { font-size:15px; font-weight:500; color:var(--text); margin-bottom:4px; }
  .restaurant-type { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .restaurant-desc { font-size:12px; color:var(--muted); line-height:1.6; font-weight:300; margin-bottom:8px; }
  .restaurant-meta { display:flex; gap:10px; flex-wrap:wrap; }
  .r-tag { font-size:10px; color:var(--muted); background:rgba(255,255,255,.05); border-radius:20px; padding:3px 9px; }
  .r-tag.stars { color:#f0b429; }

  /* DAYS */
  .days-section { margin-bottom:24px; opacity:0; animation:fadeUp .5s ease .4s forwards; }
  .days-list { display:flex; flex-direction:column; gap:12px; }
  .day-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; }
  .day-header { display:flex; align-items:center; gap:14px; padding:18px 22px; cursor:pointer; user-select:none; transition:background .2s; border-bottom:1px solid transparent; }
  .day-header.open { border-bottom-color:var(--border); }
  .day-header:hover { background:rgba(255,255,255,.02); }
  .day-num { font-size:10px; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:var(--gold); min-width:46px; }
  .day-title { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:300; color:var(--text); flex:1; }
  .day-toggle { color:var(--muted); font-size:16px; transition:transform .3s; }
  .day-toggle.open { transform:rotate(180deg); }
  .day-body { padding:4px 22px 20px; }
  .day-img { height:150px; border-radius:10px; overflow:hidden; margin:14px 0; }
  .day-img img { width:100%; height:100%; object-fit:cover; filter:brightness(.75); }
  .time-block { display:flex; gap:16px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,.04); }
  .time-block:last-child { border-bottom:none; }
  .time-label { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:var(--gold); min-width:82px; padding-top:3px; font-weight:500; }
  .time-content { color:#c0bbb3; font-size:14px; line-height:1.7; font-weight:300; }
  .time-content strong { color:var(--text); font-weight:500; display:block; margin-bottom:3px; font-size:15px; }

  /* PACKING */
  .packing-section { margin-bottom:40px; opacity:0; animation:fadeUp .5s ease .45s forwards; }
  .packing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .packing-cat { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px; }
  .packing-cat-title { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:12px; font-weight:500; }
  .packing-item { display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid rgba(255,255,255,.04); cursor:pointer; user-select:none; }
  .packing-item:last-child { border-bottom:none; }
  .packing-check { width:14px; height:14px; border:1px solid rgba(200,169,110,.4); border-radius:3px; display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0; }
  .packing-check.checked { background:var(--gold); border-color:var(--gold); }
  .packing-check.checked::after { content:'✓'; font-size:9px; color:#0a0a0a; font-weight:700; }
  .packing-text { font-size:13px; color:#c0bbb3; font-weight:300; transition:color .2s; }
  .packing-text.checked { color:var(--muted); text-decoration:line-through; }

  /* TIPS */
  .tips-card { background:rgba(200,169,110,.05); border:1px solid rgba(200,169,110,.18); border-radius:14px; padding:22px; margin-bottom:24px; opacity:0; animation:fadeUp .5s ease .5s forwards; }
  .tips-label { font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
  .tips-text { color:#c0bbb3; font-size:14px; line-height:1.7; font-weight:300; }

  .reset-row { display:flex; justify-content:center; margin-top:40px; }
  .reset-btn { background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:10px; padding:11px 26px; font-family:'DM Sans',sans-serif; font-size:13px; cursor:pointer; transition:all .2s; letter-spacing:1px; }
  .reset-btn:hover { border-color:var(--gold); color:var(--gold); }

  .error { background:rgba(220,80,80,.1); border:1px solid rgba(220,80,80,.3); border-radius:12px; padding:14px 18px; color:#f08080; font-size:13px; margin-top:12px; }

  @media(max-width:700px) {
    .form-grid { grid-template-columns:1fr; }
    .field.full { grid-column:1; }
    .hotels-grid,.flights-grid,.packing-grid { grid-template-columns:1fr; }
    .restaurants-grid { grid-template-columns:1fr; }
    .months-grid { grid-template-columns:repeat(6,1fr); }
    .gallery { grid-template-columns:1fr 1fr; grid-template-rows:130px 130px; }
    .gallery-item:first-child { grid-row:auto; }
    .dest-hero { height:280px; }
    .time-block { flex-direction:column; gap:4px; }
    .time-label { min-width:auto; }
  }
`;

const MONTHS = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"];

const SYSTEM_PROMPT = `Du er en ekspert reiseplanlegger. Svar KUN med gyldig JSON, ingen markdown, ingen ekstra tekst.

Format:
{
  "destinasjon": "Bynavn, Land",
  "destinasjon_engelsk": "City Country in English",
  "wikipedia_query": "City name for Wikipedia lookup",
  "ingress": "Inspirerende setning",
  "estimert_dagskostnad": "Ca. XXX NOK per person",
  "praktiske_tips": "2-3 praktiske tips",
  "beste_maneder": [
    { "maned": 1, "status": "best|ok|avoid", "pris_indeks": "Lav|Middels|Høy", "notat": "kort notat" }
    ... for alle 12 måneder
  ],
  "hoteller": [
    { "navn": "Navn", "type": "Booking.com", "kategori": "Budsjett", "beskrivelse": "1 setning", "pris_per_natt": "Ca. XXX NOK", "bilde_query": "hotel city" }
  ],
  "restauranter": [
    { "navn": "Navn", "type": "Japansk", "beskrivelse": "1-2 setninger om hva som gjør stedet spesielt", "prisnivaa": "$$", "stjerner": "4.5", "adresse": "Gate/område" }
    ... 6 restauranter
  ],
  "pakkeliste": {
    "Klær": ["item1","item2",...],
    "Teknologi": ["item1",...],
    "Dokumenter": ["item1",...],
    "Helse": ["item1",...],
    "Diverse": ["item1",...]
  },
  "dager": [
    {
      "dag": 1,
      "tittel": "Kort tittel",
      "bilde_query": "specific place",
      "morgen": { "tittel": "Aktivitet", "beskrivelse": "Beskrivelse" },
      "ettermiddag": { "tittel": "Aktivitet", "beskrivelse": "Beskrivelse" },
      "kveld": { "tittel": "Restaurant/aktivitet", "beskrivelse": "Beskrivelse" }
    }
  ]
}`;

const strToNum = (s="") => { let h=0; for(let i=0;i<s.length;i++) h=s.charCodeAt(i)+((h<<5)-h); return Math.abs(h); };

const WikiImg = ({ query, seed="" }) => {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(null); setFailed(false);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(d => { if(d.thumbnail?.source) setSrc(d.thumbnail.source); else setFailed(true); })
      .catch(() => setFailed(true));
  }, [query]);

  const fallbackSeed = strToNum(seed + query) % 1000;
  if (failed) return <img src={`https://picsum.photos/seed/${fallbackSeed}/800/500`} alt={query} style={{width:"100%",height:"100%",objectFit:"cover"}} />;
  if (!src) return <div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#1a1206,#0d1a14)"}} />;
  return <img src={src} alt={query} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={() => { setSrc(null); setFailed(true); }} />;
};

const PicsumImg = ({ seed, style: s }) => (
  <img src={`https://picsum.photos/seed/${strToNum(seed)%1000}/800/500`} alt="" style={{width:"100%",height:"100%",objectFit:"cover",...s}} />
);

const PackingItem = ({ text }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="packing-item" onClick={() => setChecked(c => !c)}>
      <div className={`packing-check ${checked?"checked":""}`} />
      <span className={`packing-text ${checked?"checked":""}`}>{text}</span>
    </div>
  );
};

export default function ReiseplanGenerator() {
  const [form, setForm] = useState({
    destinasjon:"", dager:"7", reisende:"2", stil:"eventyr",
    budsjett_nok:"", avreise_fra:"", reisedato:"",
    allergier:"", interesser:"", spesielt:""
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [openDays, setOpenDays] = useState({0:true});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const toggleDay = i => setOpenDays(d => ({...d,[i]:!d[i]}));

  const generer = async () => {
    if (!form.destinasjon.trim()) return;
    setLoading(true); setPlan(null); setError(null);

    const prompt = `Lag komplett reiseplan:
Destinasjon: ${form.destinasjon}
Dager: ${form.dager}
Reisende: ${form.reisende} person(er)
Stil: ${form.stil}
${form.budsjett_nok ? `Totalbudsjett: ${form.budsjett_nok} NOK` : ""}
${form.avreise_fra ? `Avreise fra: ${form.avreise_fra}` : ""}
${form.reisedato ? `Reisemåned: ${form.reisedato}` : ""}
${form.allergier ? `Allergier/kosthold: ${form.allergier}` : ""}
${form.interesser ? `Spesielle interesser: ${form.interesser}` : ""}
${form.spesielt ? `Annet: ${form.spesielt}` : ""}`;

    try {
      const res = await fetch("/api/generate", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:4000,
          system: SYSTEM_PROMPT,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error.message);
      const text = data.content?.map(b=>b.text||"").join("")||"";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setPlan(parsed);
      setOpenDays({0:true});
    } catch(e) {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  const dest = plan?.destinasjon_engelsk || plan?.destinasjon || "";
  const wikiQuery = plan?.wikipedia_query || dest;

  const bookingUrl = () => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}&group_adults=${form.reisende}&no_rooms=1${form.reisedato?`&checkin=${form.reisedato}`:""}`;
  const airbnbUrl = () => `https://www.airbnb.com/s/${encodeURIComponent(dest)}/homes?adults=${form.reisende}`;
  const googleFlightsUrl = () => `https://flights.google.com/search?q=flights+to+${encodeURIComponent(dest)}${form.avreise_fra?`+from+${encodeURIComponent(form.avreise_fra)}`:""}`;
  const skyscannerUrl = () => `https://www.skyscanner.net/flights/${encodeURIComponent(form.avreise_fra||"oslo")}/${encodeURIComponent(dest.split(",")[0].toLowerCase().replace(/\s/g,""))}/`;
  const kayakUrl = () => `https://www.kayak.com/flights/${encodeURIComponent(form.avreise_fra||"OSL")}/${encodeURIComponent(dest.split(",")[0])}`;
  const mapsUrl = () => `https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&query=${encodeURIComponent(dest)}`;
  const osmUrl = () => {
    const q = encodeURIComponent(dest);
    return `https://www.openstreetmap.org/export/embed.html?layer=mapnik&query=${q}`;
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {!plan && !loading && (
          <div className="hero">
            <div className="hero-bg" />
            <div className="hero-content">
              <p className="eyebrow">AI-drevet reiseplanlegger</p>
              <h1>Din neste<br /><em>eventyr</em> venter</h1>
              <p className="subtitle">Få en komplett reiseplan med hoteller, restauranter og pakkeliste</p>
              <div className="form-wrap">
                <div className="form-card">
                  <div className="form-grid">
                    <div className="field full">
                      <label>Destinasjon</label>
                      <input placeholder="f.eks. Tokyo, Barcelona, New York..." value={form.destinasjon} onChange={e=>set("destinasjon",e.target.value)} onKeyDown={e=>e.key==="Enter"&&generer()} />
                    </div>
                    <div className="field">
                      <label>Antall dager</label>
                      <select value={form.dager} onChange={e=>set("dager",e.target.value)}>
                        {[3,5,7,10,14].map(n=><option key={n} value={n}>{n} dager</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Antall reisende</label>
                      <select value={form.reisende} onChange={e=>set("reisende",e.target.value)}>
                        <option value="1">1 person (solo)</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4+ personer</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Totalbudsjett (NOK)</label>
                      <div className="input-prefix"><span>kr</span><input type="number" placeholder="f.eks. 25000" value={form.budsjett_nok} onChange={e=>set("budsjett_nok",e.target.value)} /></div>
                    </div>
                    <div className="field">
                      <label>Reisestil</label>
                      <select value={form.stil} onChange={e=>set("stil",e.target.value)}>
                        <option value="eventyr">Eventyr & aktivitet</option>
                        <option value="kultur">Kultur & historie</option>
                        <option value="avslapning">Avslapning & strand</option>
                        <option value="mat">Mat & opplevelser</option>
                        <option value="urban">Urban utforskning</option>
                      </select>
                    </div>

                    <div className="field full" style={{marginTop:"4px"}}>
                      <button type="button" onClick={()=>setShowAdvanced(v=>!v)} style={{background:"transparent",border:"1px solid var(--border)",color:"var(--muted)",borderRadius:"8px",padding:"9px 16px",fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",transition:"all .2s",textAlign:"left"}}>
                        {showAdvanced ? "▾ Skjul avanserte valg" : "▸ Vis avanserte valg (valgfritt)"}
                      </button>
                    </div>

                    {showAdvanced && <>
                      <div className="field">
                        <label>Avreise fra</label>
                        <input placeholder="f.eks. Oslo, Bergen..." value={form.avreise_fra} onChange={e=>set("avreise_fra",e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Reisemåned</label>
                        <select value={form.reisedato} onChange={e=>set("reisedato",e.target.value)}>
                          <option value="">Ikke spesifisert</option>
                          {MONTHS.map((m,i)=><option key={i} value={String(i+1).padStart(2,"0")}>{m}</option>)}
                        </select>
                      </div>
                      <div className="field full">
                        <label>Allergier / kosthold</label>
                        <input placeholder="f.eks. vegetar, glutenfri, nøtteallergi..." value={form.allergier} onChange={e=>set("allergier",e.target.value)} />
                      </div>
                      <div className="field full">
                        <label>Spesielle interesser</label>
                        <input placeholder="f.eks. street art, fotball, templer, dykking..." value={form.interesser} onChange={e=>set("interesser",e.target.value)} />
                      </div>
                      <div className="field full">
                        <label>Annet du vil ha med</label>
                        <textarea placeholder="f.eks. vi reiser med barn, unngå turistfeller, vil ha mye free time..." value={form.spesielt} onChange={e=>set("spesielt",e.target.value)} />
                      </div>
                    </>}
                  </div>
                  <button className="btn" onClick={generer} disabled={!form.destinasjon.trim()}>Lag komplett reiseplan →</button>
                </div>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-screen">
            <div className="spinner" />
            <p className="loading-text">Lager din komplette reiseplan...</p>
          </div>
        )}

        {plan && (
          <div className="result">

            {/* HERO */}
            <div className="dest-hero">
              <WikiImg query={wikiQuery} seed={dest} />
              <div className="dest-overlay">
                <div className="dest-name">{plan.destinasjon}</div>
                <div className="tags">
                  <span className="tag gold">{form.dager} dager</span>
                  <span className="tag">{form.reisende === "1" ? "Solo" : `${form.reisende} personer`}</span>
                  <span className="tag">{form.stil}</span>
                  {form.budsjett_nok && <span className="tag gold">kr {parseInt(form.budsjett_nok).toLocaleString("no")}</span>}
                  {plan.estimert_dagskostnad && <span className="tag">{plan.estimert_dagskostnad}</span>}
                </div>
                {plan.ingress && <p className="dest-ingress">{plan.ingress}</p>}
              </div>
            </div>

            {/* GALLERY */}
            <div className="gallery">
              {[dest, `${dest} landmark`, `${dest} food`, `${dest} street`, `${dest} night`].map((q,i) => (
                <div key={i} className="gallery-item">
                  <WikiImg query={q} seed={q} />
                </div>
              ))}
            </div>

            {/* BESTE MÅNEDER */}
            {plan.beste_maneder?.length > 0 && (
              <div className="months-section">
                <h2 className="section-title">Beste tid å <em>besøke</em></h2>
                <div className="months-grid">
                  {plan.beste_maneder.map((m,i) => (
                    <div key={i} className={`month-cell ${m.status}`} title={m.notat}>
                      <div className="month-name">{MONTHS[m.maned-1]}</div>
                      <div className="month-price">{m.pris_indeks}</div>
                    </div>
                  ))}
                </div>
                <div className="months-legend">
                  <div className="legend-item"><div className="legend-dot" style={{background:"#c8a96e"}} />Beste tid</div>
                  <div className="legend-item"><div className="legend-dot" style={{background:"#4a7c6f"}} />OK tid</div>
                  <div className="legend-item"><div className="legend-dot" style={{background:"#b43c3c"}} />Unngå</div>
                </div>
              </div>
            )}

            {/* FLYPRISER */}
            <div className="flights-section">
              <h2 className="section-title">Finn <em>flyreiser</em></h2>
              <div className="flights-grid">
                {[
                  { name:"Google Flights", desc:"Sammenlign priser på tvers av flyselskaper. Bruk priskalender for å finne billigste dato.", url:googleFlightsUrl() },
                  { name:"Skyscanner", desc:"Populær blant norske reisende. Søk på hele måneder for å finne de beste prisene.", url:skyscannerUrl() },
                  { name:"Kayak", desc:"Sammenligner hundrevis av reisesider og finner de beste tilbudene automatisk.", url:kayakUrl() }
                ].map((f,i) => (
                  <div key={i} className="flight-card">
                    <div className="flight-logo">{f.name}</div>
                    <div className="flight-desc">{f.desc}</div>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="flight-btn">Søk flyreiser →</a>
                  </div>
                ))}
              </div>
            </div>

            {/* KART */}
            <div className="map-section">
              <h2 className="section-title">Hvor er <em>{plan.destinasjon.split(",")[0]}</em>?</h2>
              <div className="map-wrap">
                <iframe
                  title="kart"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${encodeURIComponent(dest)}`}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* HOTELLER */}
            {plan.hoteller?.length > 0 && (
              <div className="hotels-section">
                <h2 className="section-title">Anbefalte <em>overnattinger</em></h2>
                <div className="hotels-grid">
                  {plan.hoteller.map((h,i) => (
                    <div key={i} className="hotel-card">
                      <div className="hotel-img">
                        <PicsumImg seed={h.navn + dest} />
                      </div>
                      <div className="hotel-body">
                        <div className="hotel-platform">{h.type} · {h.kategori}</div>
                        <div className="hotel-name">{h.navn}</div>
                        <div className="hotel-desc">{h.beskrivelse}</div>
                        <div className="hotel-price">Fra <span>{h.pris_per_natt}</span> / natt</div>
                        <a href={h.type==="Airbnb"?airbnbUrl():bookingUrl()} target="_blank" rel="noopener noreferrer" className="hotel-btn">Se på {h.type} →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESTAURANTER */}
            {plan.restauranter?.length > 0 && (
              <div className="restaurants-section">
                <h2 className="section-title">Anbefalte <em>restauranter</em></h2>
                <div className="restaurants-grid">
                  {plan.restauranter.map((r,i) => (
                    <div key={i} className="restaurant-card">
                      <div className="restaurant-rank">{String(i+1).padStart(2,"0")}</div>
                      <div className="restaurant-info">
                        <div className="restaurant-name">{r.navn}</div>
                        <div className="restaurant-type">{r.type}</div>
                        <div className="restaurant-desc">{r.beskrivelse}</div>
                        <div className="restaurant-meta">
                          {r.stjerner && <span className="r-tag stars">★ {r.stjerner}</span>}
                          {r.prisnivaa && <span className="r-tag">{r.prisnivaa}</span>}
                          {r.adresse && <span className="r-tag">{r.adresse}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAGPLAN */}
            <div className="days-section">
              <h2 className="section-title">Din dag-for-dag <em>plan</em></h2>
              <div className="days-list">
                {plan.dager?.map((dag,i) => (
                  <div key={i} className="day-card">
                    <div className={`day-header ${openDays[i]?"open":""}`} onClick={()=>toggleDay(i)}>
                      <span className="day-num">Dag {dag.dag}</span>
                      <span className="day-title">{dag.tittel}</span>
                      <span className={`day-toggle ${openDays[i]?"open":""}`}>▾</span>
                    </div>
                    {openDays[i] && (
                      <div className="day-body">
                        {dag.bilde_query && (
                          <div className="day-img">
                            <WikiImg query={`${dest} ${dag.bilde_query}`} seed={dag.bilde_query} />
                          </div>
                        )}
                        {[["Morgen",dag.morgen],["Ettermiddag",dag.ettermiddag],["Kveld",dag.kveld]].map(([tid,inn]) =>
                          inn && (
                            <div key={tid} className="time-block">
                              <span className="time-label">{tid}</span>
                              <div className="time-content">
                                <strong>{inn.tittel}</strong>
                                {inn.beskrivelse}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PAKKELISTE */}
            {plan.pakkeliste && (
              <div className="packing-section">
                <h2 className="section-title">Din <em>pakkeliste</em></h2>
                <div className="packing-grid">
                  {Object.entries(plan.pakkeliste).map(([cat, items]) => (
                    <div key={cat} className="packing-cat">
                      <div className="packing-cat-title">{cat}</div>
                      {items.map((item,i) => <PackingItem key={i} text={item} />)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIPS */}
            {plan.praktiske_tips && (
              <div className="tips-card">
                <div className="tips-label">Praktiske tips</div>
                <div className="tips-text">{plan.praktiske_tips}</div>
              </div>
            )}

            <div className="reset-row">
              <button className="reset-btn" onClick={()=>{setPlan(null);setError(null);}}>← Planlegg ny reise</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
