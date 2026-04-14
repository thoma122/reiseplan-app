import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c8a96e;
    --gold-dark: #a8854a;
    --bg: #0d0d0d;
    --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --text: #f0ece3;
    --muted: #888;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
  .app { min-height: 100vh; background: var(--bg); }

  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 60px 24px;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #1a1206, #0d1a14, #0d0d0d);
  }

  .hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 30%, rgba(200,169,110,0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(74,124,111,0.08) 0%, transparent 50%);
  }

  .hero-content {
    position: relative; z-index: 2;
    text-align: center;
    width: 100%;
    max-width: 700px;
  }

  .eyebrow {
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 22px;
    opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(46px, 9vw, 82px);
    font-weight: 300; line-height: 1.0;
    color: var(--text); margin-bottom: 18px;
    opacity: 0; animation: fadeUp 0.8s ease 0.4s forwards;
  }

  h1 em { font-style: italic; color: var(--gold); }

  .subtitle {
    color: var(--muted); font-size: 15px; font-weight: 300; margin-bottom: 40px;
    opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards;
  }

  .form-wrap { opacity: 0; animation: fadeUp 0.8s ease 0.8s forwards; width: 100%; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* FORM */
  .form-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 28px;
    backdrop-filter: blur(20px);
  }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field.full { grid-column: 1 / -1; }
  .field.third { grid-column: span 1; }

  label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); font-weight: 500; }

  input, select, textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px;
    color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 14px; transition: border-color 0.2s, background 0.2s;
    outline: none; width: 100%;
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--gold);
    background: rgba(200,169,110,0.05);
  }

  .input-prefix {
    position: relative;
  }

  .input-prefix span {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--gold); font-size: 14px; pointer-events: none;
  }

  .input-prefix input { padding-left: 28px; }

  select option { background: #1a1a1a; }
  textarea { resize: vertical; min-height: 68px; }

  .btn {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: #0a0a0a; border: none; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; transition: opacity 0.2s, transform 0.15s;
  }

  .btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* LOADING */
  .loading-screen {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
  }

  .spinner {
    width: 40px; height: 40px;
    border: 2px solid rgba(200,169,110,0.15);
    border-top-color: var(--gold); border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: var(--muted); font-size: 14px; font-weight: 300; }

  /* RESULT */
  .result-section { max-width: 900px; margin: 0 auto; padding: 40px 20px 80px; }

  /* DEST HERO */
  .dest-hero {
    position: relative; height: 420px;
    border-radius: 20px; overflow: hidden;
    margin-bottom: 40px;
    animation: fadeUp 0.6s ease forwards;
  }

  .dest-hero img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
  .dest-hero-bg { width: 100%; height: 100%; background: linear-gradient(135deg, #1a1206, #0d1a14); }

  .dest-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,13,13,0.92) 0%, transparent 55%);
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 36px;
  }

  .dest-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 58px);
    font-weight: 300; color: #fff; margin-bottom: 10px;
  }

  .dest-meta { display: flex; gap: 10px; flex-wrap: wrap; }

  .dest-tag {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.1);
    border-radius: 20px; padding: 5px 11px; backdrop-filter: blur(10px);
  }

  .dest-tag.gold {
    color: var(--gold); background: rgba(200,169,110,0.15);
    border: 1px solid rgba(200,169,110,0.3);
  }

  .dest-ingress { color: rgba(255,255,255,0.55); font-size: 14px; margin-top: 10px; font-style: italic; font-weight: 300; }

  /* SECTION HEADING */
  .section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300;
    color: var(--text); margin-bottom: 20px;
  }

  .section-heading span { color: var(--gold); font-style: italic; }

  /* IMAGE GALLERY */
  .img-gallery {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 180px 180px;
    gap: 10px;
    margin-bottom: 40px;
    border-radius: 16px;
    overflow: hidden;
    animation: fadeUp 0.5s ease 0.1s forwards;
    opacity: 0;
  }

  .gallery-img { overflow: hidden; position: relative; }
  .gallery-img:first-child { grid-row: 1 / 3; }

  .gallery-img img {
    width: 100%; height: 100%;
    object-fit: cover; filter: brightness(0.85);
    transition: transform 0.4s, filter 0.4s;
  }

  .gallery-img:hover img { transform: scale(1.05); filter: brightness(1); }

  /* HOTELS */
  .hotels-section { margin-bottom: 40px; animation: fadeUp 0.5s ease 0.2s forwards; opacity: 0; }

  .hotels-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  .hotel-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }

  .hotel-card:hover { border-color: rgba(200,169,110,0.3); transform: translateY(-2px); }

  .hotel-img { height: 140px; overflow: hidden; position: relative; }
  .hotel-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); transition: transform 0.4s; }
  .hotel-card:hover .hotel-img img { transform: scale(1.05); }

  .hotel-body { padding: 16px; }

  .hotel-platform {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 6px; font-weight: 500;
  }

  .hotel-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 300; color: var(--text);
    margin-bottom: 6px; line-height: 1.2;
  }

  .hotel-desc { color: var(--muted); font-size: 12px; line-height: 1.6; margin-bottom: 12px; font-weight: 300; }

  .hotel-price {
    font-size: 13px; color: var(--text); font-weight: 500; margin-bottom: 10px;
  }

  .hotel-price span { color: var(--gold); }

  .hotel-btn {
    display: block; width: 100%; padding: 9px;
    background: rgba(200,169,110,0.1);
    border: 1px solid rgba(200,169,110,0.25);
    border-radius: 8px; color: var(--gold);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none; text-align: center;
    cursor: pointer; transition: background 0.2s;
  }

  .hotel-btn:hover { background: rgba(200,169,110,0.2); }

  /* DAYS */
  .days-section { margin-bottom: 24px; animation: fadeUp 0.5s ease 0.3s forwards; opacity: 0; }
  .days-grid { display: flex; flex-direction: column; gap: 14px; }

  .day-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
  }

  .day-header {
    display: flex; align-items: center; gap: 14px;
    padding: 18px 22px;
    border-bottom: 1px solid transparent;
    cursor: pointer; user-select: none;
    transition: background 0.2s;
  }

  .day-header.open { border-bottom-color: var(--border); }
  .day-header:hover { background: rgba(255,255,255,0.02); }

  .day-number { font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); min-width: 46px; }
  .day-title { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 300; color: var(--text); flex: 1; }
  .day-toggle { color: var(--muted); font-size: 16px; transition: transform 0.3s; }
  .day-toggle.open { transform: rotate(180deg); }

  .day-body { padding: 4px 22px 20px; }

  .day-img {
    height: 160px; border-radius: 10px; overflow: hidden;
    margin: 14px 0; position: relative;
  }

  .day-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75); }

  .time-block {
    display: flex; gap: 16px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  .time-block:last-child { border-bottom: none; }

  .time-label {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); min-width: 82px; padding-top: 3px; font-weight: 500;
  }

  .time-content { color: #c0bbb3; font-size: 14px; line-height: 1.7; font-weight: 300; }
  .time-content strong { color: var(--text); font-weight: 500; display: block; margin-bottom: 3px; font-size: 15px; }

  /* TIPS */
  .tips-card {
    background: rgba(200,169,110,0.05);
    border: 1px solid rgba(200,169,110,0.18);
    border-radius: 14px; padding: 22px;
    margin-bottom: 24px;
    animation: fadeUp 0.5s ease 0.4s forwards; opacity: 0;
  }

  .tips-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
  .tips-text { color: #c0bbb3; font-size: 14px; line-height: 1.7; font-weight: 300; }

  .reset-row { display: flex; justify-content: center; margin-top: 40px; }

  .reset-btn {
    background: transparent; border: 1px solid var(--border);
    color: var(--muted); border-radius: 10px; padding: 11px 26px;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    cursor: pointer; transition: all 0.2s; letter-spacing: 1px;
  }

  .reset-btn:hover { border-color: var(--gold); color: var(--gold); }

  .error {
    background: rgba(220,80,80,0.1); border: 1px solid rgba(220,80,80,0.3);
    border-radius: 12px; padding: 14px 18px; color: #f08080;
    font-size: 13px; margin-top: 12px;
  }

  @media (max-width: 700px) {
    .form-grid { grid-template-columns: 1fr; }
    .field.full { grid-column: 1; }
    .hotels-grid { grid-template-columns: 1fr; }
    .img-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: 140px 140px; }
    .gallery-img:first-child { grid-row: auto; }
    .dest-hero { height: 260px; }
    .time-block { flex-direction: column; gap: 4px; }
    .time-label { min-width: auto; }
  }
`;

const SYSTEM_PROMPT = `Du er en ekspert reiseplanlegger og hotellekspert. Svar KUN med gyldig JSON, ingen markdown, ingen ekstra tekst.

Format:
{
  "destinasjon": "Bynavn, Land",
  "destinasjon_engelsk": "City name in English for image search",
  "ingress": "Kort inspirerende setning",
  "estimert_dagskostnad": "Ca. XXX NOK per person",
  "praktiske_tips": "2-3 konkrete praktiske tips",
  "bilder_sokeord": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "hoteller": [
    {
      "navn": "Hotellnavn",
      "type": "Booking.com",
      "kategori": "Budsjett",
      "beskrivelse": "Kort beskrivelse, maks 1 setning",
      "pris_per_natt": "Ca. XXX NOK",
      "bilde_sokeord": "hotel city neighborhood"
    },
    {
      "navn": "Hotellnavn",
      "type": "Airbnb",
      "kategori": "Midtpris",
      "beskrivelse": "Kort beskrivelse",
      "pris_per_natt": "Ca. XXX NOK",
      "bilde_sokeord": "apartment city cozy"
    },
    {
      "navn": "Hotellnavn",
      "type": "Booking.com",
      "kategori": "Luksus",
      "beskrivelse": "Kort beskrivelse",
      "pris_per_natt": "Ca. XXX NOK",
      "bilde_sokeord": "luxury hotel city"
    }
  ],
  "dager": [
    {
      "dag": 1,
      "tittel": "Kort tittel",
      "bilde_sokeord": "specific place activity",
      "morgen": { "tittel": "Aktivitet", "beskrivelse": "Beskrivelse" },
      "ettermiddag": { "tittel": "Aktivitet", "beskrivelse": "Beskrivelse" },
      "kveld": { "tittel": "Restaurant/aktivitet", "beskrivelse": "Beskrivelse" }
    }
  ]
}`;

const GRAD_COLORS = [
  ["#1a3a2a","#2d5a3d"],["#1a2a3a","#2d4a6a"],["#3a1a1a","#6a2d2d"],
  ["#2a1a3a","#4a2d6a"],["#1a3a3a","#2d6a5a"],["#3a2a1a","#6a4a2d"],
];
const gradFor = (str="") => {
  let h=0; for(let i=0;i<str.length;i++) h=str.charCodeAt(i)+((h<<5)-h);
  const [c1,c2]=GRAD_COLORS[Math.abs(h)%GRAD_COLORS.length];
  return `linear-gradient(135deg,${c1},${c2})`;
};

const strToNum = (str="") => {
  let h=0; for(let i=0;i<str.length;i++) h=str.charCodeAt(i)+((h<<5)-h);
  return Math.abs(h);
};

const TravelImg = ({ query, dest="" }) => {
  const seed = strToNum(dest + query) % 1000;
  return (
    <img
      src={`https://picsum.photos/seed/${seed}/800/500`}
      alt={query}
      style={{width:"100%",height:"100%",objectFit:"cover"}}
    />
  );
};

export default function ReiseplanGenerator() {
  const [form, setForm] = useState({
    destinasjon: "", dager: "7", reisende: "2",
    stil: "eventyr", budsjett_nok: "", ønsker: ""
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [openDays, setOpenDays] = useState({ 0: true });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDay = i => setOpenDays(d => ({ ...d, [i]: !d[i] }));

  const generer = async () => {
    if (!form.destinasjon.trim()) return;
    setLoading(true); setPlan(null); setError(null);

    const budsjettInfo = form.budsjett_nok
      ? `Totalbudsjett: ${form.budsjett_nok} NOK for hele turen`
      : "Budsjett: middels";

    const prompt = `Lag reiseplan: Destinasjon: ${form.destinasjon}, Dager: ${form.dager}, Reisende: ${form.reisende} personer, Stil: ${form.stil}, ${budsjettInfo}${form.ønsker ? `, Ønsker: ${form.ønsker}` : ""}. Tilpass hotellprisene til budsjettet.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setPlan(parsed);
      setOpenDays({ 0: true });
    } catch (e) {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  const bookingUrl = dest => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}&group_adults=${form.reisende}&no_rooms=1`;
  const airbnbUrl = dest => `https://www.airbnb.com/s/${encodeURIComponent(dest)}/homes?adults=${form.reisende}`;

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
              <p className="subtitle">Få en komplett reiseplan med hoteller og aktiviteter</p>
              <div className="form-wrap">
                <div className="form-card">
                  <div className="form-grid">
                    <div className="field full">
                      <label>Destinasjon</label>
                      <input placeholder="f.eks. Tokyo, Barcelona, New York..." value={form.destinasjon} onChange={e => set("destinasjon", e.target.value)} onKeyDown={e => e.key === "Enter" && generer()} />
                    </div>
                    <div className="field">
                      <label>Antall dager</label>
                      <select value={form.dager} onChange={e => set("dager", e.target.value)}>
                        {[3,5,7,10,14].map(n => <option key={n} value={n}>{n} dager</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Antall reisende</label>
                      <select value={form.reisende} onChange={e => set("reisende", e.target.value)}>
                        <option value="1">1 person (solo)</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4+ personer</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Totalbudsjett (NOK)</label>
                      <div className="input-prefix">
                        <span>kr</span>
                        <input type="number" placeholder="f.eks. 20000" value={form.budsjett_nok} onChange={e => set("budsjett_nok", e.target.value)} />
                      </div>
                    </div>
                    <div className="field">
                      <label>Reisestil</label>
                      <select value={form.stil} onChange={e => set("stil", e.target.value)}>
                        <option value="eventyr">Eventyr & aktivitet</option>
                        <option value="kultur">Kultur & historie</option>
                        <option value="avslapning">Avslapning & strand</option>
                        <option value="mat">Mat & opplevelser</option>
                        <option value="urban">Urban utforskning</option>
                      </select>
                    </div>
                    <div className="field full">
                      <label>Spesielle ønsker (valgfritt)</label>
                      <textarea placeholder="f.eks. allergier, must-see steder, unngå turistfeller..." value={form.ønsker} onChange={e => set("ønsker", e.target.value)} />
                    </div>
                  </div>
                  <button className="btn" onClick={generer} disabled={!form.destinasjon.trim()}>Lag reiseplan →</button>
                </div>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-screen">
            <div className="spinner" />
            <p className="loading-text">Lager din perfekte reiseplan...</p>
          </div>
        )}

        {plan && (
          <div className="result-section">

            {/* HERO */}
            <div className="dest-hero">
              <TravelImg query={`${plan.destinasjon_engelsk || plan.destinasjon} city landmark`} dest={plan.destinasjon_engelsk || plan.destinasjon} />
              <div className="dest-hero-overlay">
                <div className="dest-title">{plan.destinasjon}</div>
                <div className="dest-meta">
                  <span className="dest-tag gold">{form.dager} dager</span>
                  <span className="dest-tag">{form.reisende === "1" ? "Solo" : `${form.reisende} personer`}</span>
                  <span className="dest-tag">{form.stil}</span>
                  {form.budsjett_nok && <span className="dest-tag gold">kr {parseInt(form.budsjett_nok).toLocaleString("no")}</span>}
                  {plan.estimert_dagskostnad && <span className="dest-tag">{plan.estimert_dagskostnad}</span>}
                </div>
                {plan.ingress && <p className="dest-ingress">{plan.ingress}</p>}
              </div>
            </div>

            {/* BILDEGALLERI */}
            {plan.bilder_sokeord?.length >= 4 && (
              <div className="img-gallery">
                {plan.bilder_sokeord.slice(0, 5).map((kw, i) => (
                  <div key={i} className="gallery-img">
                    <TravelImg query={`${plan.destinasjon_engelsk || plan.destinasjon} ${kw}`} dest={plan.destinasjon_engelsk || plan.destinasjon} />
                  </div>
                ))}
              </div>
            )}

            {/* HOTELLER */}
            {plan.hoteller?.length > 0 && (
              <div className="hotels-section">
                <h2 className="section-heading">Anbefalte <span>overnattinger</span></h2>
                <div className="hotels-grid">
                  {plan.hoteller.map((h, i) => (
                    <div key={i} className="hotel-card">
                      <div className="hotel-img">
                        <TravelImg query={h.bilde_sokeord || `hotel ${plan.destinasjon_engelsk || plan.destinasjon}`} dest={plan.destinasjon_engelsk || plan.destinasjon} />
                      </div>
                      <div className="hotel-body">
                        <div className="hotel-platform">{h.type} · {h.kategori}</div>
                        <div className="hotel-name">{h.navn}</div>
                        <div className="hotel-desc">{h.beskrivelse}</div>
                        <div className="hotel-price">Fra <span>{h.pris_per_natt}</span> / natt</div>
                        <a
                          href={h.type === "Airbnb" ? airbnbUrl(plan.destinasjon) : bookingUrl(plan.destinasjon)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hotel-btn"
                        >
                          Se på {h.type} →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAGER */}
            <div className="days-section">
              <h2 className="section-heading">Din <span>reiseplan</span></h2>
              <div className="days-grid">
                {plan.dager?.map((dag, i) => (
                  <div key={i} className="day-card">
                    <div className={`day-header ${openDays[i] ? "open" : ""}`} onClick={() => toggleDay(i)}>
                      <span className="day-number">Dag {dag.dag}</span>
                      <span className="day-title">{dag.tittel}</span>
                      <span className={`day-toggle ${openDays[i] ? "open" : ""}`}>▾</span>
                    </div>
                    {openDays[i] && (
                      <div className="day-body">
                        {dag.bilde_sokeord && (
                          <div className="day-img">
                            <TravelImg query={`${plan.destinasjon_engelsk || plan.destinasjon} ${dag.bilde_sokeord}`} dest={plan.destinasjon_engelsk || plan.destinasjon} />
                          </div>
                        )}
                        {[["Morgen", dag.morgen], ["Ettermiddag", dag.ettermiddag], ["Kveld", dag.kveld]].map(([tid, innhold]) =>
                          innhold && (
                            <div key={tid} className="time-block">
                              <span className="time-label">{tid}</span>
                              <div className="time-content">
                                <strong>{innhold.tittel}</strong>
                                {innhold.beskrivelse}
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

            {/* TIPS */}
            {plan.praktiske_tips && (
              <div className="tips-card">
                <div className="tips-label">Praktiske tips</div>
                <div className="tips-text">{plan.praktiske_tips}</div>
              </div>
            )}

            <div className="reset-row">
              <button className="reset-btn" onClick={() => { setPlan(null); setError(null); }}>← Planlegg ny reise</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
