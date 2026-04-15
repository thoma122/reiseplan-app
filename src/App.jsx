import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --gold:#c8a96e;--gold-d:#a8854a;--gold-l:#e8c98e;
    --bg:#0a0a0a;--s1:rgba(255,255,255,.04);--s2:rgba(255,255,255,.07);
    --br:rgba(255,255,255,.08);--br2:rgba(255,255,255,.14);
    --tx:#f0ece3;--mu:#888;--mu2:#aaa;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--tx);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
  .app{min-height:100vh}

  /* ── HERO ── */
  .hero{
    position:relative;min-height:100vh;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:80px 24px;overflow:hidden;
  }
  .hero-canvas{position:absolute;inset:0;z-index:0}
  .hero-bg{
    position:absolute;inset:0;
    background:radial-gradient(ellipse at 60% 40%,#1f150a 0%,#0a0a0a 60%);
  }
  .orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
  .orb1{width:700px;height:700px;background:rgba(200,169,110,.07);top:-200px;right:-150px;animation:orb1 12s ease-in-out infinite alternate}
  .orb2{width:500px;height:500px;background:rgba(74,124,111,.06);bottom:-100px;left:-100px;animation:orb2 15s ease-in-out infinite alternate}
  .orb3{width:300px;height:300px;background:rgba(200,100,80,.05);top:40%;left:40%;animation:orb2 9s ease-in-out infinite alternate}
  @keyframes orb1{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,30px) scale(1.1)}}
  @keyframes orb2{from{transform:translate(0,0) scale(1)}to{transform:translate(-30px,20px) scale(1.08)}}

  .hero-inner{position:relative;z-index:2;text-align:center;width:100%;max-width:760px}

  .badge{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.25);
    border-radius:30px;padding:7px 18px;margin-bottom:28px;
    font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);
    opacity:0;animation:fadeUp .8s ease .1s forwards;
  }
  .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse 2s ease infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}

  .hero-h1{
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(48px,10vw,92px);font-weight:300;line-height:.95;
    margin-bottom:24px;letter-spacing:-1px;
    opacity:0;animation:fadeUp .8s ease .3s forwards;
  }
  .hero-h1 em{font-style:italic;color:var(--gold);display:block}
  .hero-h1 .line2{font-size:clamp(36px,7vw,64px);color:rgba(240,236,227,.6)}

  .hero-sub{
    color:var(--mu2);font-size:16px;font-weight:300;line-height:1.6;
    max-width:520px;margin:0 auto 48px;
    opacity:0;animation:fadeUp .8s ease .5s forwards;
  }

  /* FEATURE PILLS */
  .features{
    display:flex;flex-wrap:wrap;justify-content:center;gap:10px;
    margin-bottom:48px;
    opacity:0;animation:fadeUp .8s ease .6s forwards;
  }
  .feat{
    display:flex;align-items:center;gap:7px;
    background:var(--s1);border:1px solid var(--br);
    border-radius:20px;padding:8px 16px;
    font-size:12px;color:var(--mu2);font-weight:400;
  }
  .feat-icon{font-size:14px}

  .form-wrap{opacity:0;animation:fadeUp .8s ease .7s forwards;width:100%}

  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

  /* ── FORM ── */
  .form-card{
    background:rgba(255,255,255,.035);
    border:1px solid rgba(255,255,255,.1);
    border-radius:24px;padding:32px;
    backdrop-filter:blur(30px);
    box-shadow:0 40px 80px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06);
  }
  .form-section-label{
    font-size:9px;letter-spacing:3px;text-transform:uppercase;
    color:var(--mu);margin-bottom:14px;margin-top:4px;
    display:flex;align-items:center;gap:10px;
  }
  .form-section-label::after{content:'';flex:1;height:1px;background:var(--br)}

  .form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px}
  .g2{grid-column:span 2}
  .g3{grid-column:span 3}
  .g1{grid-column:span 1}

  .field{display:flex;flex-direction:column;gap:6px}
  label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:500}

  input,select,textarea{
    background:rgba(255,255,255,.06);border:1px solid var(--br);
    border-radius:10px;padding:12px 14px;
    color:var(--tx);font-family:'DM Sans',sans-serif;font-size:14px;
    transition:border-color .2s,background .2s,box-shadow .2s;outline:none;width:100%;
  }
  input:focus,select:focus,textarea:focus{
    border-color:var(--gold);background:rgba(200,169,110,.06);
    box-shadow:0 0 0 3px rgba(200,169,110,.1);
  }
  input[type=date]{color-scheme:dark}
  .pfx{position:relative}
  .pfx-s{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--gold);font-size:13px;pointer-events:none}
  .pfx input{padding-left:28px}
  select option{background:#1a1a1a}
  textarea{resize:vertical;min-height:72px}

  .adv-toggle{
    background:transparent;border:1px solid var(--br);color:var(--mu);
    border-radius:8px;padding:9px 16px;font-family:'DM Sans',sans-serif;
    font-size:11px;letter-spacing:2px;text-transform:uppercase;
    cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:8px;
    width:100%;margin-top:4px;
  }
  .adv-toggle:hover{border-color:var(--gold);color:var(--gold)}

  .btn-main{
    width:100%;padding:17px;margin-top:14px;
    background:linear-gradient(135deg,var(--gold),var(--gold-d));
    color:#0a0a0a;border:none;border-radius:14px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:opacity .2s,transform .15s,box-shadow .2s;
    box-shadow:0 8px 32px rgba(200,169,110,.25);
  }
  .btn-main:hover:not(:disabled){opacity:.9;transform:translateY(-2px);box-shadow:0 12px 40px rgba(200,169,110,.35)}
  .btn-main:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}

  /* ── LOADING ── */
  .loading-screen{
    min-height:100vh;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:20px;
    background:var(--bg);
  }
  .load-ring{
    width:56px;height:56px;
    border:2px solid rgba(200,169,110,.1);
    border-top-color:var(--gold);border-radius:50%;
    animation:spin .9s linear infinite;
  }
  @keyframes spin{to{transform:rotate(360deg)}}
  .load-txt{color:var(--mu);font-size:14px;font-weight:300;letter-spacing:1px}
  .load-steps{display:flex;flex-direction:column;gap:8px;margin-top:8px}
  .load-step{font-size:12px;color:rgba(200,169,110,.5);letter-spacing:1px;text-align:center}
  .load-step.active{color:var(--gold)}

  /* ── RESULT ── */
  .result{max-width:980px;margin:0 auto;padding:48px 20px 100px}

  /* DEST HERO */
  .dest-hero{
    position:relative;height:480px;border-radius:24px;overflow:hidden;
    margin-bottom:48px;box-shadow:0 40px 80px rgba(0,0,0,.5);
  }
  .dest-hero img,.dest-hero-bg{width:100%;height:100%;object-fit:cover;filter:brightness(.55)}
  .dest-hero-bg{background:linear-gradient(135deg,#1a1206,#0d1a14)}
  .dest-overlay{
    position:absolute;inset:0;
    background:linear-gradient(to top,rgba(10,10,10,.95) 0%,rgba(10,10,10,.2) 50%,transparent 100%);
    display:flex;flex-direction:column;justify-content:flex-end;padding:44px;
  }
  .dest-name{
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(40px,6vw,68px);font-weight:300;color:#fff;
    margin-bottom:12px;text-shadow:0 2px 20px rgba(0,0,0,.5);
  }
  .tags{display:flex;gap:8px;flex-wrap:wrap}
  .tag{
    font-size:10px;letter-spacing:2px;text-transform:uppercase;
    color:rgba(255,255,255,.55);background:rgba(255,255,255,.1);
    border-radius:20px;padding:5px 13px;backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,.1);
  }
  .tag.g{color:var(--gold);background:rgba(200,169,110,.15);border-color:rgba(200,169,110,.35)}
  .dest-ingress{color:rgba(255,255,255,.5);font-size:15px;margin-top:12px;font-style:italic;font-weight:300}

  /* GALLERY */
  .gallery{
    display:grid;grid-template-columns:2fr 1fr 1fr;
    grid-template-rows:190px 190px;gap:8px;
    margin-bottom:48px;border-radius:18px;overflow:hidden;
    opacity:0;animation:fadeUp .5s ease .1s forwards;
  }
  .gi{overflow:hidden;position:relative;background:var(--s1)}
  .gi:first-child{grid-row:1/3}
  .gi img{width:100%;height:100%;object-fit:cover;filter:brightness(.8);transition:transform .5s,filter .3s}
  .gi:hover img{transform:scale(1.06);filter:brightness(1)}

  /* SECTION */
  .sec-title{
    font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;
    color:var(--tx);margin-bottom:22px;
  }
  .sec-title em{color:var(--gold);font-style:italic}

  /* MONTHS */
  .months-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .12s forwards}
  .months-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:6px}
  .mc{
    background:var(--s1);border:1px solid var(--br);border-radius:10px;
    padding:11px 5px;text-align:center;cursor:default;transition:all .2s;
    position:relative;
  }
  .mc:hover .mc-tip{opacity:1;transform:translateY(0);pointer-events:auto}
  .mc.best{background:rgba(200,169,110,.12);border-color:rgba(200,169,110,.4)}
  .mc.ok{background:rgba(74,124,111,.1);border-color:rgba(74,124,111,.3)}
  .mc.avoid{background:rgba(180,60,60,.08);border-color:rgba(180,60,60,.2)}
  .mc-name{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:5px}
  .mc.best .mc-name{color:var(--gold)}
  .mc-price{font-size:10px;color:var(--tx);font-weight:500}
  .mc-tip{
    position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px);
    background:#1a1a1a;border:1px solid var(--br2);border-radius:8px;
    padding:8px 12px;font-size:11px;color:var(--mu2);white-space:nowrap;
    opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;z-index:10;
  }
  .legend{display:flex;gap:18px;margin-top:14px;flex-wrap:wrap}
  .leg{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--mu)}
  .leg-d{width:8px;height:8px;border-radius:50%}

  /* FLIGHTS */
  .flights-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .15s forwards}
  .flights-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .fc{
    background:var(--s1);border:1px solid var(--br);border-radius:18px;
    padding:22px;display:flex;flex-direction:column;gap:12px;
    transition:border-color .2s,transform .2s;
  }
  .fc:hover{border-color:rgba(200,169,110,.3);transform:translateY(-3px)}
  .fc-logo{font-size:15px;font-weight:600;color:var(--tx)}
  .fc-desc{font-size:12px;color:var(--mu);font-weight:300;line-height:1.6;flex:1}
  .fc-tip{font-size:11px;color:rgba(200,169,110,.7);font-style:italic}
  .lnk{
    display:block;padding:11px;
    background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.25);
    border-radius:10px;color:var(--gold);font-size:11px;font-weight:600;
    letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;
    text-align:center;transition:background .2s,transform .1s;
  }
  .lnk:hover{background:rgba(200,169,110,.2);transform:translateY(-1px)}

  /* MAP */
  .map-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .18s forwards}
  .map-wrap{border-radius:18px;overflow:hidden;border:1px solid var(--br);height:340px;position:relative}
  .map-wrap iframe{width:100%;height:100%;border:none}
  .map-label{
    position:absolute;bottom:16px;right:16px;
    background:rgba(10,10,10,.8);border:1px solid var(--br);
    border-radius:8px;padding:7px 13px;font-size:11px;color:var(--mu);
    backdrop-filter:blur(10px);
  }

  /* HOTELS */
  .hotels-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .2s forwards}
  .hotels-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .hc{
    background:var(--s1);border:1px solid var(--br);border-radius:18px;
    overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .2s;
  }
  .hc:hover{border-color:rgba(200,169,110,.35);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
  .hc-img{height:150px;overflow:hidden;position:relative;background:var(--s1)}
  .hc-img img{width:100%;height:100%;object-fit:cover;filter:brightness(.8);transition:transform .5s}
  .hc:hover .hc-img img{transform:scale(1.08)}
  .hc-body{padding:18px}
  .hc-plat{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
  .hc-name{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:300;color:var(--tx);margin-bottom:6px;line-height:1.2}
  .hc-desc{color:var(--mu);font-size:12px;line-height:1.5;margin-bottom:12px;font-weight:300}
  .hc-price{font-size:13px;color:var(--tx);font-weight:500;margin-bottom:12px}
  .hc-price span{color:var(--gold);font-size:15px}
  .hc-stars{color:#f0b429;font-size:11px;margin-bottom:10px}

  /* RESTAURANTS */
  .rest-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .25s forwards}
  .rest-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .rc{
    background:var(--s1);border:1px solid var(--br);border-radius:16px;
    padding:20px;display:flex;gap:16px;
    transition:border-color .2s,transform .2s;
  }
  .rc:hover{border-color:rgba(200,169,110,.25);transform:translateY(-2px)}
  .rc-rank{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:rgba(200,169,110,.25);min-width:36px;line-height:1}
  .rc-info{flex:1}
  .rc-name{font-size:15px;font-weight:600;color:var(--tx);margin-bottom:3px}
  .rc-type{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:7px}
  .rc-desc{font-size:12px;color:var(--mu);line-height:1.6;font-weight:300;margin-bottom:9px}
  .rc-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .rc-tag{font-size:10px;color:var(--mu);background:rgba(255,255,255,.05);border-radius:20px;padding:3px 10px}
  .rc-stars{color:#f0b429;font-size:12px;font-weight:600}
  .rc-btn{
    display:inline-flex;align-items:center;gap:5px;
    padding:5px 12px;background:rgba(200,169,110,.08);
    border:1px solid rgba(200,169,110,.2);border-radius:20px;
    color:var(--gold);font-size:10px;font-weight:500;text-decoration:none;
    transition:background .2s;letter-spacing:1px;text-transform:uppercase;
  }
  .rc-btn:hover{background:rgba(200,169,110,.18)}

  /* DAYS */
  .days-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .3s forwards}
  .days-list{display:flex;flex-direction:column;gap:12px}
  .dc{background:var(--s1);border:1px solid var(--br);border-radius:18px;overflow:hidden}
  .dc-hdr{
    display:flex;align-items:center;gap:14px;padding:20px 24px;
    cursor:pointer;user-select:none;transition:background .2s;
    border-bottom:1px solid transparent;
  }
  .dc-hdr.open{border-bottom-color:var(--br)}
  .dc-hdr:hover{background:rgba(255,255,255,.02)}
  .dc-num{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--gold);min-width:46px}
  .dc-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--tx);flex:1}
  .dc-arr{color:var(--mu);font-size:18px;transition:transform .3s}
  .dc-arr.open{transform:rotate(180deg)}
  .dc-body{padding:6px 24px 24px}
  .dc-img{height:180px;border-radius:12px;overflow:hidden;margin:14px 0;background:var(--s1)}
  .dc-img img{width:100%;height:100%;object-fit:cover;filter:brightness(.75)}
  .tb{display:flex;gap:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.04)}
  .tb:last-child{border-bottom:none}
  .tb-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);min-width:88px;padding-top:3px;font-weight:500}
  .tb-txt{color:#c0bbb3;font-size:14px;line-height:1.75;font-weight:300}
  .tb-txt strong{color:var(--tx);font-weight:600;display:block;margin-bottom:4px;font-size:15px}

  /* PACKING */
  .pack-sec{margin-bottom:48px;opacity:0;animation:fadeUp .5s ease .35s forwards}
  .pack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .pc{background:var(--s1);border:1px solid var(--br);border-radius:16px;padding:20px}
  .pc-title{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:14px;font-weight:500}
  .pi{display:flex;align-items:center;gap:9px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;user-select:none}
  .pi:last-child{border-bottom:none}
  .pi-box{width:15px;height:15px;border:1px solid rgba(200,169,110,.4);border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
  .pi-box.chk{background:var(--gold);border-color:var(--gold)}
  .pi-box.chk::after{content:'✓';font-size:9px;color:#0a0a0a;font-weight:800}
  .pi-txt{font-size:13px;color:#c0bbb3;font-weight:300;transition:color .2s}
  .pi-txt.chk{color:var(--mu);text-decoration:line-through}

  /* TIPS */
  .tips-card{
    background:rgba(200,169,110,.05);border:1px solid rgba(200,169,110,.18);
    border-radius:16px;padding:26px;margin-bottom:28px;
    opacity:0;animation:fadeUp .5s ease .4s forwards;
  }
  .tips-lbl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
  .tips-txt{color:#c0bbb3;font-size:14px;line-height:1.8;font-weight:300}

  .reset-row{display:flex;justify-content:center;margin-top:48px}
  .reset-btn{
    background:transparent;border:1px solid var(--br);color:var(--mu);
    border-radius:10px;padding:12px 30px;font-family:'DM Sans',sans-serif;
    font-size:12px;cursor:pointer;transition:all .2s;letter-spacing:2px;text-transform:uppercase;
  }
  .reset-btn:hover{border-color:var(--gold);color:var(--gold)}
  .err{background:rgba(220,80,80,.1);border:1px solid rgba(220,80,80,.3);border-radius:12px;padding:14px 18px;color:#f08080;font-size:13px;margin-top:12px}

  @media(max-width:800px){
    .form-grid{grid-template-columns:1fr 1fr}
    .g2,.g3{grid-column:span 2}
    .g1{grid-column:span 1}
    .hotels-grid,.flights-grid,.pack-grid{grid-template-columns:1fr}
    .rest-grid{grid-template-columns:1fr}
    .months-grid{grid-template-columns:repeat(6,1fr)}
    .gallery{grid-template-columns:1fr 1fr;grid-template-rows:150px 150px}
    .gi:first-child{grid-row:auto}
    .dest-hero{height:300px}
    .tb{flex-direction:column;gap:5px}
    .tb-lbl{min-width:auto}
  }
  @media(max-width:480px){
    .form-grid{grid-template-columns:1fr}
    .g2,.g3,.g1{grid-column:span 1}
    .hero-h1{font-size:40px}
  }
`;

const MONTHS = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"];

const SYSTEM = `Du er verdens beste reiseplanlegger og reiseekspert. Svar KUN med gyldig JSON, ingen markdown, ingen forklaring.

{
  "destinasjon": "Bynavn, Land",
  "destinasjon_engelsk": "City, Country",
  "wiki_query": "City name",
  "ingress": "Inspirerende 1-setning",
  "estimert_dagskostnad": "Ca. XXX NOK/person",
  "praktiske_tips": "3 konkrete tips",
  "beste_maneder": [
    {"maned":1,"status":"best|ok|avoid","pris":"Lav|Middels|Høy","tips":"kort notat"}
    ... alle 12
  ],
  "hoteller": [
    {
      "navn":"Hotellnavn",
      "platform":"Booking.com",
      "kategori":"Budsjett|Midtpris|Luksus",
      "beskrivelse":"1 setning",
      "pris_per_natt":"Ca. XXX NOK",
      "stjerner":"4.2",
      "omraade":"Nabolag/område",
      "booking_query":"Hotel Name City"
    }
  ],
  "restauranter": [
    {
      "navn":"Navn",
      "kjokken":"Japansk",
      "beskrivelse":"Hva gjør den spesiell",
      "google_rating":"4.7",
      "antall_anmeldelser":"2400",
      "prisnivaa":"$|$$|$$$|$$$$",
      "adresse":"Gate, Område",
      "spesialitet":"Signaturretten"
    }
  ] (6 stk),
  "pakkeliste":{
    "Klær":["..."],
    "Teknologi":["..."],
    "Dokumenter":["..."],
    "Helse & Hygiene":["..."],
    "Reisemessig":["..."]
  },
  "dager":[
    {
      "dag":1,
      "tittel":"Kort tittel",
      "wiki_query":"specific place to search",
      "morgen":{"tittel":"Aktivitet","beskrivelse":"Detaljert"},
      "ettermiddag":{"tittel":"Aktivitet","beskrivelse":"Detaljert"},
      "kveld":{"tittel":"Restaurant/aktivitet","beskrivelse":"Detaljert"}
    }
  ]
}`;

// ── Image component using Wikipedia REST API ──
const Img = ({ query, fallbackSeed = 0, style: s = {}, className = "" }) => {
  const [src, setSrc] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!query) return;
    setSrc(null); setDone(false);
    const q = encodeURIComponent(query.trim());
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`)
      .then(r => r.json())
      .then(d => {
        if (d.thumbnail?.source) { setSrc(d.thumbnail.source); setDone(true); }
        else throw new Error("no img");
      })
      .catch(() => {
        setSrc(`https://picsum.photos/seed/${Math.abs(fallbackSeed) % 1000}/900/600`);
        setDone(true);
      });
  }, [query]);

  if (!done) return <div style={{ width:"100%",height:"100%",background:"linear-gradient(135deg,#1a1206,#0d1a14)", ...s }} />;
  return <img src={src} alt={query} style={{ width:"100%",height:"100%",objectFit:"cover", ...s }} className={className} onError={() => setSrc(`https://picsum.photos/seed/${Math.abs(fallbackSeed)%1000}/900/600`)} />;
};

const strHash = s => { let h=0; for(let i=0;i<s.length;i++) h=s.charCodeAt(i)+((h<<5)-h); return Math.abs(h); };

const PI = ({ text }) => {
  const [c, setC] = useState(false);
  return (
    <div className="pi" onClick={() => setC(v => !v)}>
      <div className={`pi-box ${c?"chk":""}`} />
      <span className={`pi-txt ${c?"chk":""}`}>{text}</span>
    </div>
  );
};

export default function App() {
  const [form, setForm] = useState({
    destinasjon:"", fra:"", personer:"2", innsjekk:"", utsjekk:"",
    stil:"eventyr", budsjett:"", rom_type:"standard",
    allergier:"", interesser:"", unngaa:"",
    barnevennlig:"nei", tilgjengelighet:"nei", spesielt:""
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [openDays, setOpenDays] = useState({ 0:true });
  const [adv, setAdv] = useState(false);
  const [loadStep, setLoadStep] = useState(0);

  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const tog = i => setOpenDays(d => ({...d,[i]:!d[i]}));

  const nights = () => {
    if (!form.innsjekk || !form.utsjekk) return null;
    const diff = (new Date(form.utsjekk) - new Date(form.innsjekk)) / 86400000;
    return diff > 0 ? diff : null;
  };

  const generer = async () => {
    if (!form.destinasjon.trim()) return;
    setLoading(true); setPlan(null); setError(null); setLoadStep(0);

    const steps = [0,1,2,3];
    steps.forEach(s => setTimeout(() => setLoadStep(s), s * 1400));

    const n = nights();
    const prompt = `Lag komplett reiseplan:
Destinasjon: ${form.destinasjon}
${form.fra ? `Avreise fra: ${form.fra}` : ""}
Reisende: ${form.personer} person(er)
${form.innsjekk ? `Innsjekk: ${form.innsjekk}` : ""}
${form.utsjekk ? `Utsjekk: ${form.utsjekk}` : ""}
${n ? `Antall netter: ${n}` : ""}
Reisestil: ${form.stil}
${form.budsjett ? `Totalbudsjett: ${form.budsjett} NOK` : ""}
${form.rom_type !== "standard" ? `Romtype: ${form.rom_type}` : ""}
${form.allergier ? `Allergier/kosthold: ${form.allergier}` : ""}
${form.interesser ? `Interesser: ${form.interesser}` : ""}
${form.unngaa ? `Vil unngå: ${form.unngaa}` : ""}
${form.barnevennlig === "ja" ? "Reiser med barn" : ""}
${form.tilgjengelighet === "ja" ? "Trenger tilgjengelighet for bevegelseshemmede" : ""}
${form.spesielt ? `Annet: ${form.spesielt}` : ""}
Lag ${n || 7} dagers plan. Tilpass hotellprisene til budsjettet.`;

    try {
      const r = await fetch("/api/generate", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:4000,
          system: SYSTEM,
          messages:[{role:"user",content:prompt}]
        })
      });
      const d = await r.json();
      if(d.error) throw new Error(d.error.message);
      const txt = d.content?.map(b=>b.text||"").join("")||"";
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
      setPlan(parsed); setOpenDays({0:true});
    } catch(e) {
      setError("Noe gikk galt. Sjekk at alle feltene er riktig utfylt og prøv igjen.");
    } finally { setLoading(false); }
  };

  // URL builders
  const dest = plan?.destinasjon_engelsk || plan?.destinasjon || "";
  const ci = form.innsjekk; const co = form.utsjekk; const pax = form.personer;
  const fra = form.fra || "Oslo";

  const bookingHotelUrl = (h) => {
    const base = "https://www.booking.com/search.html";
    const params = new URLSearchParams({ ss: `${h.booking_query || h.navn}`, group_adults: pax, no_rooms:1 });
    if(ci) params.set("checkin", ci);
    if(co) params.set("checkout", co);
    return `${base}?${params}`;
  };

  const airbnbUrl = () => {
    const params = new URLSearchParams({ adults: pax });
    if(ci) params.set("checkin", ci);
    if(co) params.set("checkout", co);
    return `https://www.airbnb.com/s/${encodeURIComponent(dest)}/homes?${params}`;
  };

  const gFlightsUrl = () => {
    const d2 = ci ? ci.replace(/-/g,"") : "";
    if(d2) return `https://www.google.com/travel/flights?q=Flights+to+${encodeURIComponent(dest)}+from+${encodeURIComponent(fra)}+on+${ci}`;
    return `https://www.google.com/travel/flights?q=Flights+to+${encodeURIComponent(dest)}+from+${encodeURIComponent(fra)}`;
  };

  const skyscannerUrl = () => {
    const from = fra.toLowerCase().replace(/\s/g,"");
    const to = dest.split(",")[0].toLowerCase().replace(/\s/g,"");
    if(ci) {
      const d = ci.replace(/-/g,"").slice(2);
      return `https://www.skyscanner.net/transport/flights/${from}/${to}/${d}/`;
    }
    return `https://www.skyscanner.net/transport/flights/${from}/${to}/`;
  };

  const kayakUrl = () => {
    const to = dest.split(",")[0];
    if(ci && co) return `https://www.kayak.com/flights/${encodeURIComponent(fra)}-${encodeURIComponent(to)}/${ci}/${co}/${pax}adults`;
    return `https://www.kayak.com/flights/${encodeURIComponent(fra)}-${encodeURIComponent(to)}`;
  };

  const mapsEmbedUrl = () =>
    `https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&mlat=&mlon=&zoom=10&query=${encodeURIComponent(dest)}`;

  const osmUrl = () => `https://www.openstreetmap.org/search?query=${encodeURIComponent(dest)}`;

  const googleMapsUrl = (place) => `https://www.google.com/maps/search/${encodeURIComponent(place + " " + dest)}`;

  const tripadvisorUrl = (r) => `https://www.tripadvisor.com/Search?q=${encodeURIComponent(r.navn + " " + dest)}`;

  const wikiQuery = plan?.wiki_query || dest;
  const galleryQueries = [
    dest,
    `${wikiQuery} landmark`,
    `${wikiQuery} food cuisine`,
    `${wikiQuery} street market`,
    `${wikiQuery} nature scenery`
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ──────── HERO FORM ──────── */}
        {!plan && !loading && (
          <div className="hero">
            <div className="hero-bg" />
            <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />

            <div className="hero-inner">
              <div className="badge"><span className="badge-dot" />AI-drevet reiseplanlegger</div>

              <h1 className="hero-h1">
                Din perfekte<em>reise</em>
                <span className="line2">planlagt på sekunder</span>
              </h1>

              <p className="hero-sub">
                Få en komplett reiseplan med hoteller, restauranter, flypriser,
                pakkeliste og dag-for-dag program — tilpasset akkurat deg.
              </p>

              <div className="features">
                {["✈️ Flypriser","🏨 Hoteller","🍽️ Restauranter","🗺️ Kart","🧳 Pakkeliste","📅 Beste måneder"].map(f => (
                  <div key={f} className="feat"><span className="feat-icon">{f.split(" ")[0]}</span>{f.split(" ").slice(1).join(" ")}</div>
                ))}
              </div>

              <div className="form-wrap">
                <div className="form-card">
                  <div className="form-section-label">Destinasjon og reisedatoer</div>
                  <div className="form-grid">
                    <div className="field g2">
                      <label>Hvor vil du reise?</label>
                      <input placeholder="f.eks. Tokyo, Amalfikysten, New York..." value={form.destinasjon} onChange={e=>set("destinasjon",e.target.value)} onKeyDown={e=>e.key==="Enter"&&generer()} />
                    </div>
                    <div className="field g1">
                      <label>Avreise fra</label>
                      <input placeholder="f.eks. Oslo, Bergen..." value={form.fra} onChange={e=>set("fra",e.target.value)} />
                    </div>
                    <div className="field g1">
                      <label>Innsjekk / Avreise</label>
                      <input type="date" value={form.innsjekk} onChange={e=>set("innsjekk",e.target.value)} min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="field g1">
                      <label>Utsjekk / Hjemreise</label>
                      <input type="date" value={form.utsjekk} onChange={e=>set("utsjekk",e.target.value)} min={form.innsjekk||new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="field g1">
                      <label>Antall reisende</label>
                      <input type="number" min="1" max="20" placeholder="2" value={form.personer} onChange={e=>set("personer",e.target.value)} />
                    </div>
                  </div>

                  <div className="form-section-label" style={{marginTop:"8px"}}>Preferanser</div>
                  <div className="form-grid">
                    <div className="field g1">
                      <label>Reisestil</label>
                      <select value={form.stil} onChange={e=>set("stil",e.target.value)}>
                        <option value="eventyr">🧗 Eventyr & aktivitet</option>
                        <option value="kultur">🏛️ Kultur & historie</option>
                        <option value="avslapning">🏖️ Avslapning & strand</option>
                        <option value="mat">🍜 Mat & gastronomi</option>
                        <option value="urban">🌆 Urban utforskning</option>
                        <option value="natur">🌿 Natur & friluft</option>
                        <option value="luksus">💎 Luksus & spa</option>
                        <option value="backpacker">🎒 Backpacker</option>
                      </select>
                    </div>
                    <div className="field g1">
                      <label>Totalbudsjett (NOK)</label>
                      <div className="pfx"><span className="pfx-s">kr</span><input type="number" placeholder="f.eks. 30000" value={form.budsjett} onChange={e=>set("budsjett",e.target.value)} /></div>
                    </div>
                    <div className="field g1">
                      <label>Romtype</label>
                      <select value={form.rom_type} onChange={e=>set("rom_type",e.target.value)}>
                        <option value="standard">Standard rom</option>
                        <option value="suite">Suite</option>
                        <option value="leilighet">Leilighet</option>
                        <option value="villa">Villa / Privat hus</option>
                        <option value="hostel">Hostel / Dorm</option>
                      </select>
                    </div>
                  </div>

                  <button className="adv-toggle" onClick={()=>setAdv(v=>!v)}>
                    <span>{adv?"▾":"▸"}</span>
                    {adv ? "Skjul avanserte innstillinger" : "Vis avanserte innstillinger — allergier, interesser, tilgjengelighet og mer"}
                  </button>

                  {adv && (
                    <div className="form-grid" style={{marginTop:"14px"}}>
                      <div className="field g2">
                        <label>Allergier / Kosthold</label>
                        <input placeholder="f.eks. vegetar, glutenfri, nøtteallergi, halal..." value={form.allergier} onChange={e=>set("allergier",e.target.value)} />
                      </div>
                      <div className="field g1">
                        <label>Reiser med barn?</label>
                        <select value={form.barnevennlig} onChange={e=>set("barnevennlig",e.target.value)}>
                          <option value="nei">Nei</option>
                          <option value="ja">Ja</option>
                        </select>
                      </div>
                      <div className="field g3">
                        <label>Spesielle interesser</label>
                        <input placeholder="f.eks. street art, fotball, templer, dykking, shopping, musikk..." value={form.interesser} onChange={e=>set("interesser",e.target.value)} />
                      </div>
                      <div className="field g2">
                        <label>Vil unngå</label>
                        <input placeholder="f.eks. turistfeller, store folkemasser, lange køer..." value={form.unngaa} onChange={e=>set("unngaa",e.target.value)} />
                      </div>
                      <div className="field g1">
                        <label>Tilgjengelighet</label>
                        <select value={form.tilgjengelighet} onChange={e=>set("tilgjengelighet",e.target.value)}>
                          <option value="nei">Ikke nødvendig</option>
                          <option value="ja">Bevegelseshemmet</option>
                        </select>
                      </div>
                      <div className="field g3">
                        <label>Annet du vil fortelle oss</label>
                        <textarea placeholder="f.eks. det er bursdagsreise, vi vil feire noe spesielt, vi er glad i jazz, vi vil møte lokalbefolkningen..." value={form.spesielt} onChange={e=>set("spesielt",e.target.value)} />
                      </div>
                    </div>
                  )}

                  <button className="btn-main" onClick={generer} disabled={!form.destinasjon.trim()}>
                    {nights() ? `Lag reiseplan for ${nights()} netter →` : "Lag komplett reiseplan →"}
                  </button>
                </div>
                {error && <div className="err">{error}</div>}
              </div>
            </div>
          </div>
        )}

        {/* ──────── LOADING ──────── */}
        {loading && (
          <div className="loading-screen">
            <div className="load-ring" />
            <div className="load-txt">Planlegger din drømmereise...</div>
            <div className="load-steps">
              {["Analyserer destinasjonen","Finner beste hoteller og restauranter","Bygger dag-for-dag program","Ferdigstiller reiseplanen"].map((s,i) => (
                <div key={i} className={`load-step ${loadStep >= i ? "active":""}`}>
                  {loadStep > i ? "✓ " : loadStep === i ? "→ " : "  "}{s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──────── RESULT ──────── */}
        {plan && (
          <div className="result">

            {/* HERO */}
            <div className="dest-hero">
              <Img query={wikiQuery} fallbackSeed={strHash(dest)} />
              <div className="dest-overlay">
                <div className="dest-name">{plan.destinasjon}</div>
                <div className="tags">
                  {nights() && <span className="tag g">{nights()} netter</span>}
                  {ci && <span className="tag g">{new Date(ci).toLocaleDateString("no",{day:"numeric",month:"short"})}</span>}
                  <span className="tag">{form.personer} {form.personer==="1"?"person":"personer"}</span>
                  <span className="tag">{form.stil}</span>
                  {form.budsjett && <span className="tag g">kr {parseInt(form.budsjett).toLocaleString("no")}</span>}
                  {plan.estimert_dagskostnad && <span className="tag">{plan.estimert_dagskostnad}</span>}
                </div>
                {plan.ingress && <p className="dest-ingress">{plan.ingress}</p>}
              </div>
            </div>

            {/* GALLERY */}
            <div className="gallery">
              {galleryQueries.map((q,i) => (
                <div key={i} className="gi">
                  <Img query={q} fallbackSeed={strHash(q)} />
                </div>
              ))}
            </div>

            {/* BESTE MÅNEDER */}
            {plan.beste_maneder?.length > 0 && (
              <div className="months-sec">
                <h2 className="sec-title">Beste tid å <em>besøke</em></h2>
                <div className="months-grid">
                  {plan.beste_maneder.map((m,i) => (
                    <div key={i} className={`mc ${m.status}`}>
                      <div className="mc-name">{MONTHS[m.maned-1]}</div>
                      <div className="mc-price">{m.pris}</div>
                      <div className="mc-tip">{m.tips}</div>
                    </div>
                  ))}
                </div>
                <div className="legend">
                  <div className="leg"><div className="leg-d" style={{background:"#c8a96e"}} />Beste tid</div>
                  <div className="leg"><div className="leg-d" style={{background:"#4a7c6f"}} />OK tid</div>
                  <div className="leg"><div className="leg-d" style={{background:"#b43c3c"}} />Unngå</div>
                </div>
              </div>
            )}

            {/* FLYPRISER */}
            <div className="flights-sec">
              <h2 className="sec-title">Finn <em>flyreiser</em>{ci ? ` — ${new Date(ci).toLocaleDateString("no",{day:"numeric",month:"long"})}` : ""}</h2>
              <div className="flights-grid">
                {[
                  { name:"Google Flights", desc:"Sammenlign alle flyselskaper. Bruk «Priskalender» for å se billigste dato i måneden.", tip:"✓ Beste for prissammenligning", url:gFlightsUrl() },
                  { name:"Skyscanner", desc:"Svært populær blant norske reisende. Søk på «Hele måneden» for å finne beste pris.", tip:"✓ Norsk grensesnitt", url:skyscannerUrl() },
                  { name:"Kayak", desc:"Søker hundrevis av reisesider samtidig. Har varselsfunksjon når priser synker.", tip:"✓ Prisvarsel tilgjengelig", url:kayakUrl() }
                ].map((f,i) => (
                  <div key={i} className="fc">
                    <div className="fc-logo">{f.name}</div>
                    <div className="fc-desc">{f.desc}</div>
                    <div className="fc-tip">{f.tip}</div>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="lnk">
                      Søk fly {form.fra&&dest ? `${form.fra} → ${dest.split(",")[0]}` : "nå"} →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* KART */}
            <div className="map-sec">
              <h2 className="sec-title">Kart over <em>{plan.destinasjon.split(",")[0]}</em></h2>
              <div className="map-wrap">
                <iframe
                  title="kart"
                  src={`https://www.openstreetmap.org/export/embed.html?layer=mapnik&query=${encodeURIComponent(dest)}`}
                  allowFullScreen loading="lazy"
                />
                <div className="map-label">
                  <a href={osmUrl()} target="_blank" rel="noopener noreferrer" style={{color:"var(--mu)",textDecoration:"none"}}>Åpne fullt kart →</a>
                </div>
              </div>
            </div>

            {/* HOTELLER */}
            {plan.hoteller?.length > 0 && (
              <div className="hotels-sec">
                <h2 className="sec-title">Anbefalte <em>overnattinger</em>{ci&&co ? ` — ${nights()} netter` : ""}</h2>
                <div className="hotels-grid">
                  {plan.hoteller.map((h,i) => (
                    <div key={i} className="hc">
                      <div className="hc-img">
                        <Img query={`${h.navn} ${dest.split(",")[0]} hotel`} fallbackSeed={strHash(h.navn)} />
                      </div>
                      <div className="hc-body">
                        <div className="hc-plat">{h.platform} · {h.kategori}</div>
                        <div className="hc-name">{h.navn}</div>
                        {h.stjerner && <div className="hc-stars">{"★".repeat(Math.floor(h.stjerner))} {h.stjerner}</div>}
                        {h.omraade && <div style={{fontSize:"11px",color:"var(--mu)",marginBottom:"6px"}}>📍 {h.omraade}</div>}
                        <div className="hc-desc">{h.beskrivelse}</div>
                        <div className="hc-price">Fra <span>{h.pris_per_natt}</span> / natt</div>
                        <a href={h.platform==="Airbnb"?airbnbUrl():bookingHotelUrl(h)} target="_blank" rel="noopener noreferrer" className="lnk">
                          Se ledige rom{ci ? ` ${new Date(ci).toLocaleDateString("no",{day:"numeric",month:"short"})}` : ""} →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESTAURANTER */}
            {plan.restauranter?.length > 0 && (
              <div className="rest-sec">
                <h2 className="sec-title">Topp <em>restauranter</em></h2>
                <div className="rest-grid">
                  {plan.restauranter.map((r,i) => (
                    <div key={i} className="rc">
                      <div className="rc-rank">{String(i+1).padStart(2,"0")}</div>
                      <div className="rc-info">
                        <div className="rc-name">{r.navn}</div>
                        <div className="rc-type">{r.kjokken}</div>
                        <div className="rc-desc">{r.beskrivelse}</div>
                        {r.spesialitet && <div style={{fontSize:"12px",color:"var(--gold)",marginBottom:"8px",fontStyle:"italic"}}>✦ {r.spesialitet}</div>}
                        <div className="rc-meta">
                          {r.google_rating && <span className="rc-stars">★ {r.google_rating}</span>}
                          {r.antall_anmeldelser && <span className="rc-tag">{parseInt(r.antall_anmeldelser).toLocaleString("no")} anm.</span>}
                          {r.prisnivaa && <span className="rc-tag">{r.prisnivaa}</span>}
                          {r.adresse && <span className="rc-tag">📍 {r.adresse}</span>}
                        </div>
                        <div style={{marginTop:"10px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
                          <a href={googleMapsUrl(r.navn)} target="_blank" rel="noopener noreferrer" className="rc-btn">Google Maps</a>
                          <a href={tripadvisorUrl(r)} target="_blank" rel="noopener noreferrer" className="rc-btn">TripAdvisor</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAGPLAN */}
            <div className="days-sec">
              <h2 className="sec-title">Dag-for-dag <em>program</em></h2>
              <div className="days-list">
                {plan.dager?.map((dag,i) => {
                  const dateLabel = ci ? new Date(new Date(ci).getTime() + i*86400000).toLocaleDateString("no",{weekday:"long",day:"numeric",month:"short"}) : null;
                  return (
                    <div key={i} className="dc">
                      <div className={`dc-hdr ${openDays[i]?"open":""}`} onClick={()=>tog(i)}>
                        <span className="dc-num">Dag {dag.dag}</span>
                        <div style={{flex:1}}>
                          <div className="dc-title">{dag.tittel}</div>
                          {dateLabel && <div style={{fontSize:"11px",color:"var(--mu)",marginTop:"2px"}}>{dateLabel}</div>}
                        </div>
                        <span className={`dc-arr ${openDays[i]?"open":""}`}>▾</span>
                      </div>
                      {openDays[i] && (
                        <div className="dc-body">
                          {dag.wiki_query && (
                            <div className="dc-img">
                              <Img query={`${wikiQuery} ${dag.wiki_query}`} fallbackSeed={strHash(dag.wiki_query||"")} />
                            </div>
                          )}
                          {[["Morgen",dag.morgen],["Ettermiddag",dag.ettermiddag],["Kveld",dag.kveld]].map(([tid,inn]) =>
                            inn && (
                              <div key={tid} className="tb">
                                <span className="tb-lbl">{tid}</span>
                                <div className="tb-txt">
                                  <strong>{inn.tittel}</strong>
                                  {inn.beskrivelse}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PAKKELISTE */}
            {plan.pakkeliste && (
              <div className="pack-sec">
                <h2 className="sec-title">Din <em>pakkeliste</em></h2>
                <div className="pack-grid">
                  {Object.entries(plan.pakkeliste).map(([cat,items]) => (
                    <div key={cat} className="pc">
                      <div className="pc-title">{cat}</div>
                      {items.map((it,j) => <PI key={j} text={it} />)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIPS */}
            {plan.praktiske_tips && (
              <div className="tips-card">
                <div className="tips-lbl">Praktiske tips</div>
                <div className="tips-txt">{plan.praktiske_tips}</div>
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
