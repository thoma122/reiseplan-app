import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    color: #f0ece3;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.12;
    pointer-events: none;
  }
  .orb1 { width: 600px; height: 600px; background: #c8a96e; top: -200px; right: -100px; }
  .orb2 { width: 400px; height: 400px; background: #4a7c6f; bottom: -100px; left: -100px; }

  .container {
    max-width: 700px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 56px;
  }

  .eyebrow {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 16px;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 6vw, 56px);
    line-height: 1.1;
    color: #f0ece3;
    margin-bottom: 16px;
  }

  h1 em {
    font-style: italic;
    color: #c8a96e;
  }

  .subtitle {
    color: #888;
    font-size: 15px;
    font-weight: 300;
  }

  .form-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 36px;
    margin-bottom: 32px;
    backdrop-filter: blur(10px);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field.full { grid-column: 1 / -1; }

  label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
  }

  input, select, textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 14px 16px;
    color: #f0ece3;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    transition: border-color 0.2s;
    outline: none;
    width: 100%;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #c8a96e;
    background: rgba(200, 169, 110, 0.05);
  }

  select option { background: #1a1a1a; }

  textarea { resize: vertical; min-height: 80px; }

  .btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #c8a96e, #a8854a);
    color: #0a0a0a;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .loading {
    text-align: center;
    padding: 48px 0;
    color: #888;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(200,169,110,0.2);
    border-top-color: #c8a96e;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(200,169,110,0.2);
    border-radius: 20px;
    padding: 36px;
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 24px;
  }

  .result-content {
    color: #d4cfc6;
    font-size: 15px;
    line-height: 1.8;
    white-space: pre-wrap;
  }

  .result-content h2, .result-content h3 {
    font-family: 'Playfair Display', serif;
    color: #f0ece3;
    margin: 24px 0 10px;
    font-size: 20px;
  }

  .error {
    background: rgba(220, 80, 80, 0.1);
    border: 1px solid rgba(220,80,80,0.3);
    border-radius: 12px;
    padding: 16px 20px;
    color: #f08080;
    font-size: 14px;
  }

  .reset-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: #888;
    border-radius: 10px;
    padding: 12px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    margin-top: 24px;
    transition: all 0.2s;
  }

  .reset-btn:hover { border-color: #c8a96e; color: #c8a96e; }

  @media (max-width: 500px) {
    .form-grid { grid-template-columns: 1fr; }
    .field.full { grid-column: 1; }
    .form-card, .result-card { padding: 24px; }
  }
`;

export default function ReiseplanGenerator() {
  const [form, setForm] = useState({
    destinasjon: "",
    dager: "7",
    reisende: "2",
    stil: "eventyr",
    budsjett: "middels",
    ønsker: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const generer = async () => {
    if (!form.destinasjon.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const prompt = `Lag en detaljert reiseplan for følgende tur:
- Destinasjon: ${form.destinasjon}
- Antall dager: ${form.dager}
- Antall reisende: ${form.reisende}
- Reisestil: ${form.stil}
- Budsjett: ${form.budsjett}
${form.ønsker ? `- Spesielle ønsker: ${form.ønsker}` : ""}

Lag en dag-for-dag plan med:
• Morgen, ettermiddag og kveld for hver dag
• Konkrete anbefalinger for steder, aktiviteter og restauranter
• Praktiske tips
• Estimert kostnad per dag

Skriv på norsk. Vær spesifikk og inspirerende.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map((b) => b.text || "").join("") || "";
      setResult(text);
    } catch (e) {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />
        <div className="container">
          <div className="header">
            <p className="eyebrow">AI-drevet reiseplanlegger</p>
            <h1>Din neste<br /><em>eventyr</em> venter</h1>
            <p className="subtitle">Fyll inn destinasjon og få en komplett reiseplan på sekunder</p>
          </div>

          {!result && (
            <div className="form-card">
              <div className="form-grid">
                <div className="field full">
                  <label>Destinasjon</label>
                  <input
                    placeholder="f.eks. Tokyo, Spania, New York..."
                    value={form.destinasjon}
                    onChange={(e) => set("destinasjon", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generer()}
                  />
                </div>
                <div className="field">
                  <label>Antall dager</label>
                  <select value={form.dager} onChange={(e) => set("dager", e.target.value)}>
                    {[3,5,7,10,14].map(n => <option key={n} value={n}>{n} dager</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Reisende</label>
                  <select value={form.reisende} onChange={(e) => set("reisende", e.target.value)}>
                    <option value="1">Solo</option>
                    <option value="2">2 personer</option>
                    <option value="3">3 personer</option>
                    <option value="4">4+ personer</option>
                  </select>
                </div>
                <div className="field">
                  <label>Reisestil</label>
                  <select value={form.stil} onChange={(e) => set("stil", e.target.value)}>
                    <option value="eventyr">Eventyr & aktivitet</option>
                    <option value="kultur">Kultur & historie</option>
                    <option value="avslapning">Avslapning & strand</option>
                    <option value="mat">Mat & opplevelser</option>
                    <option value="urban">Urban utforskning</option>
                  </select>
                </div>
                <div className="field">
                  <label>Budsjett</label>
                  <select value={form.budsjett} onChange={(e) => set("budsjett", e.target.value)}>
                    <option value="lavt">Lavt (backpacker)</option>
                    <option value="middels">Middels</option>
                    <option value="høyt">Høyt (komfort)</option>
                    <option value="luksus">Luksus</option>
                  </select>
                </div>
                <div className="field full">
                  <label>Spesielle ønsker (valgfritt)</label>
                  <textarea
                    placeholder="f.eks. allergier, must-see steder, unngå turistfeller..."
                    value={form.ønsker}
                    onChange={(e) => set("ønsker", e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn"
                onClick={generer}
                disabled={loading || !form.destinasjon.trim()}
              >
                {loading ? "Genererer plan..." : "LAG REISEPLAN →"}
              </button>
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner" />
              <p>Lager din perfekte reiseplan...</p>
            </div>
          )}

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="result-card">
              <p className="result-label">Din reiseplan — {form.destinasjon}</p>
              <div className="result-content">{result}</div>
              <button className="reset-btn" onClick={() => { setResult(null); setError(null); }}>
                ← Lag ny plan
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
