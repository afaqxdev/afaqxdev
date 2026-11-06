// Builds the animated SVGs in assets/. Run: node generate-svgs.mjs assets
import { writeFileSync, mkdirSync } from "node:fs";
const out = process.argv[2]; mkdirSync(out, { recursive: true });

const C = { bg: "#0C100D", lime: "#C8F135", lime2: "#B2D92A", ink: "#ECF2E8", deep: "#1F3D2C", line: "#34403A", muted: "#93A398" };
const MONO = `ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace`;
const SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Final state is the resting style; with reduced motion every animation is dropped and everything shows.
const REDUCE = `@media (prefers-reduced-motion: reduce){*{animation:none!important}.rm-hide{display:none}}`;
const svg = (w, h, title, body, css = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t"><title id="t">${esc(title)}</title>
<style>text{font-family:${SANS}}.mono{font-family:${MONO}}${css}${REDUCE}</style>
${body}
</svg>
`;
const card = (w, h) => `<rect width="${w}" height="${h}" rx="24" fill="${C.bg}"/><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="23.5" fill="none" stroke="${C.deep}"/>`;
const save = (name, s) => { writeFileSync(`${out}/${name}`, s); console.log(name, s.length, "bytes"); };

/* ---------- hero ---------- */
{
  const W = 1200, H = 440;
  const roles = ["build production Flutter apps", "ship AI features that stream", "rescue failing codebases", "profile every frame to 120fps", "launch MVPs in 30 days"];
  const T = roles.length * 3; // seconds per full cycle
  const slice = 100 / roles.length;
  const roleCss = roles.map((_, i) => {
    const a = i * slice, b = a + slice;
    return `@keyframes r${i}{0%,${(a).toFixed(2)}%{opacity:0;transform:translateY(14px)}${(a + 3).toFixed(2)}%,${(b - 3).toFixed(2)}%{opacity:1;transform:none}${(b).toFixed(2)}%,100%{opacity:0;transform:translateY(-14px)}}.r${i}{opacity:0;animation:r${i} ${T}s infinite}`;
  }).join("");
  // fps graph: a jittery line near the 120 ceiling, drawn twice for a seamless scroll
  const pts = []; for (let i = 0; i <= 40; i++) { const y = 18 + ((i * 37) % 7) - (i % 5 === 0 ? 4 : 0); pts.push(`${i * 6},${y}`); }
  const graph = pts.join(" ");
  const css = `
.name{clip-path:inset(0 100% 0 0);animation:wipe 1.1s .2s cubic-bezier(.7,0,.2,1) forwards}
@keyframes wipe{to{clip-path:inset(0 0 0 0)}}
.fade{opacity:0;animation:fade .8s forwards}@keyframes fade{to{opacity:1}}
.pulse{transform-origin:72px 86px;animation:pulse 1.8s ease-out infinite}@keyframes pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3);opacity:0}}
.glow{animation:drift 14s ease-in-out infinite alternate}@keyframes drift{to{transform:translate(-260px,60px)}}
.phone{stroke-dasharray:1100;stroke-dashoffset:1100;animation:draw 1.6s .4s ease-out forwards}@keyframes draw{to{stroke-dashoffset:0}}
.scroll{animation:scroll 3s linear infinite}@keyframes scroll{to{transform:translateX(-240px)}}
.bar{transform-box:fill-box;transform-origin:left;animation:bar 2.4s ease-in-out infinite alternate}@keyframes bar{from{transform:scaleX(.35)}to{transform:scaleX(1)}}
.caret{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}
${roleCss}
@media (prefers-reduced-motion: reduce){.name{clip-path:none}.fade{opacity:1}.phone{stroke-dashoffset:0}.r0{opacity:1}}`;
  const body = `${card(W, H)}
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.deep}" stroke-width="1" opacity=".45"/></pattern>
  <radialGradient id="g"><stop offset="0" stop-color="${C.lime}" stop-opacity=".28"/><stop offset="1" stop-color="${C.lime}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fadeGrid" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity=".6"/></linearGradient>
  <mask id="gm"><rect width="${W}" height="${H}" fill="url(#fadeGrid)"/></mask>
  <clipPath id="cardclip"><rect width="${W}" height="${H}" rx="24"/></clipPath>
  <clipPath id="screen"><rect x="915" y="96" width="186" height="80" rx="10"/></clipPath>
</defs>
<g clip-path="url(#cardclip)">
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gm)"/>
  <circle class="glow" cx="1000" cy="120" r="320" fill="url(#g)"/>
</g>

<circle class="pulse" cx="72" cy="86" r="6" fill="${C.lime}"/><circle cx="72" cy="86" r="6" fill="${C.lime}"/>
<text class="mono fade" x="90" y="91" font-size="14" letter-spacing="2" fill="${C.lime}" style="animation-delay:.1s">AVAILABLE FOR REMOTE WORK · US / UK / EU</text>

<text class="name" x="62" y="196" font-size="96" font-weight="800" letter-spacing="-3" fill="${C.ink}">Afaq Zahir</text>
<text class="fade" x="66" y="244" font-size="26" fill="${C.muted}" style="animation-delay:.9s">Flutter · AI · Mobile product engineer</text>

<g class="mono" font-size="28">
  ${roles.map((r, i) => `<text class="r${i}" x="66" y="314" fill="${C.lime}" style="animation-delay:1.2s"><tspan fill="${C.ink}">I </tspan>${esc(r)}<tspan class="caret">_</tspan></text>`).join("\n  ")}
</g>

<text class="mono fade" x="66" y="384" font-size="14" letter-spacing="1.5" fill="${C.muted}" style="animation-delay:1.4s">PROOF, NOT PROMISES  ·  PESHAWAR, PK (UTC+5)  ·  AFAQZAHIR.COM</text>

<!-- phone -->
<rect class="phone" x="900" y="48" width="216" height="352" rx="34" fill="${C.bg}" stroke="${C.lime}" stroke-width="2"/>
<rect x="976" y="62" width="64" height="16" rx="8" fill="${C.deep}"/>
<g class="fade" style="animation-delay:1.3s">
  <rect x="915" y="96" width="186" height="80" rx="10" fill="#111812" stroke="${C.deep}"/>
  <g clip-path="url(#screen)"><g transform="translate(915 118)"><g class="scroll">
    <polyline points="${graph}" fill="none" stroke="${C.lime}" stroke-width="2" stroke-linejoin="round"/>
    <polyline points="${graph}" transform="translate(240 0)" fill="none" stroke="${C.lime}" stroke-width="2" stroke-linejoin="round"/>
  </g></g></g>
  <text class="mono" x="925" y="168" font-size="11" fill="${C.muted}">frame budget 8.3ms</text>
  <text x="915" y="232" font-size="54" font-weight="800" letter-spacing="-2" fill="${C.ink}">120</text>
  <text class="mono" x="1030" y="232" font-size="15" fill="${C.lime}">FPS</text>
  <text class="mono" x="917" y="254" font-size="11" fill="${C.muted}">profiled, not guessed</text>
  ${[0, 1, 2].map((i) => `<rect class="bar" x="917" y="${278 + i * 26}" width="${[180, 140, 160][i]}" height="12" rx="6" fill="${i === 0 ? C.lime : C.deep}" style="animation-delay:${i * .4}s"/>`).join("\n  ")}
  <rect x="968" y="378" width="80" height="5" rx="2.5" fill="${C.line}"/>
</g>`;
  save("hero.svg", svg(W, H, "Afaq Zahir — Flutter, AI and mobile product engineer. Available for remote work.", body, css));
}

/* ---------- marquee of shipped apps ---------- */
{
  const W = 1200, H = 64;
  const apps = ["TourVista", "LQDCNVS", "Nest AI", "Fluently AI", "Penitans", "Omni Connect", "GAIA AI", "Smart Silent", "Zemen", "HerCycle", "ZenPeace", "AI Humanizer"];
  const SET = 1800; // width of one copy; textLength pins it so the loop is seamless on any font
  const line = apps.map((a) => `${esc(a)}  <tspan fill="${C.lime}">✦</tspan>  `).join("");
  const css = `.m{animation:m 30s linear infinite}@keyframes m{to{transform:translateX(-${SET}px)}}`;
  const body = `${card(W, H)}
<defs><clipPath id="c"><rect width="${W}" height="${H}" rx="24"/></clipPath>
<linearGradient id="edge"><stop offset="0" stop-color="${C.bg}"/><stop offset=".08" stop-color="${C.bg}" stop-opacity="0"/><stop offset=".92" stop-color="${C.bg}" stop-opacity="0"/><stop offset="1" stop-color="${C.bg}"/></linearGradient></defs>
<g clip-path="url(#c)"><g class="m mono" font-size="18" font-weight="600" fill="${C.ink}">
${[0, 1].map((k) => `<text x="${24 + k * SET}" y="39" textLength="${SET}" lengthAdjust="spacing" xml:space="preserve">${line}</text>`).join("\n")}
</g><rect width="${W}" height="${H}" fill="url(#edge)"/></g>`;
  save("apps-marquee.svg", svg(W, H, "Apps shipped: " + apps.join(", "), body, css));
}

/* ---------- stats ---------- */
{
  const W = 1200, H = 180;
  const stats = [["20+", "production apps shipped", 1], ["4+", "years of Flutter", 1], ["30+", "developers mentored", 1], ["5.0★", "rating on Fiverr", 1]];
  const css = `.up{opacity:0;animation:up .7s cubic-bezier(.2,.8,.2,1) forwards}@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.fill{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:fill 1.4s cubic-bezier(.2,.8,.2,1) forwards}@keyframes fill{to{transform:scaleX(1)}}
@media (prefers-reduced-motion: reduce){.up{opacity:1}.fill{transform:none}}`;
  const col = W / stats.length;
  const body = `${card(W, H)}
${stats.map(([n, l, f], i) => {
    const x = i * col + 40, d = `${.15 + i * .15}s`;
    return `<g class="up" style="animation-delay:${d}">
  <text x="${x}" y="88" font-size="58" font-weight="800" letter-spacing="-2" fill="${C.lime}">${esc(n)}</text>
  <text class="mono" x="${x + 2}" y="118" font-size="13" letter-spacing="1.2" fill="${C.muted}">${esc(l.toUpperCase())}</text>
</g>
<rect x="${x}" y="140" width="${col - 80}" height="4" rx="2" fill="${C.deep}"/>
<rect class="fill" x="${x}" y="140" width="${(col - 80) * f}" height="4" rx="2" fill="${C.lime}" style="animation-delay:${d}"/>
${i ? `<line x1="${i * col}" y1="36" x2="${i * col}" y2="150" stroke="${C.deep}"/>` : ""}`;
  }).join("\n")}`;
  save("stats.svg", svg(W, H, "20+ production apps shipped, 4+ years of Flutter, 30+ developers mentored, 5.0 star rating on Fiverr", body, css));
}

/* ---------- terminal ---------- */
{
  const W = 1200;
  // [text, colour, isCommand]
  const L = [
    ["$ afaq --whoami", C.ink, 1],
    ["  Flutter · AI · Mobile product engineer — one engineer, from first call to release.", C.muted, 0],
    ["$ afaq ship --mvp --days 30", C.ink, 1],
    ["  ✓ Discover   ✓ Build   ✓ Validate   ✓ Launch", C.lime, 0],
    ["$ flutter run --profile --impeller", C.ink, 1],
    ["  ✓ rebuilds measured   ✓ shaders warmed   ✓ images precached", C.lime, 0],
    ["  ▸ 120 fps on mid-range Android — profiled, not guessed.", C.ink, 0],
    ["$ afaq add-ai --models openai,gemini,claude --stream", C.ink, 1],
    ["  ✓ API keys stay server-side   ✓ SSE streaming   ✓ cost limits", C.lime, 0],
    ["$ afaq hire", C.ink, 1],
    ["  → calendly.com/afaqxdev   ·   afaqxdev@gmail.com   ·   replies in 2–4 hours", C.lime, 0],
  ];
  const top = 92, lh = 30, H = top + L.length * lh + 40;
  const CYCLE = 22; // seconds
  let t = .4; const pct = (s) => (s / CYCLE * 100).toFixed(2);
  const rows = L.map(([s, col, cmd], i) => {
    const n = [...s].length, dur = cmd ? n * .055 : .25; // commands type out, output appears at once
    const a = t, b = t + dur; t = b + (cmd ? .35 : .25);
    const k = `@keyframes l${i}{0%,${pct(a)}%{clip-path:inset(0 100% 0 0)}${pct(b)}%,94%{clip-path:inset(0 0 0 0);opacity:1}97%,100%{clip-path:inset(0 0 0 0);opacity:0}}.l${i}{clip-path:inset(0 100% 0 0);animation:l${i} ${CYCLE}s ${cmd ? `steps(${n})` : "steps(1)"} infinite}`;
    const txt = s.startsWith("$")
      ? `<tspan fill="${C.lime}">$</tspan>${esc(s.slice(1))}`
      : esc(s);
    return { k, el: `<text class="mono l${i}" x="36" y="${top + i * lh}" font-size="17" fill="${col}" xml:space="preserve">${txt}</text>` };
  });
  const css = rows.map((r) => r.k).join("") + `.caret{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}
@media (prefers-reduced-motion: reduce){${rows.map((_, i) => `.l${i}`).join(",")}{clip-path:none}}`;
  const body = `${card(W, H)}
<rect x="1" y="1" width="${W - 2}" height="52" rx="23" fill="#111812"/><rect x="1" y="30" width="${W - 2}" height="24" fill="#111812"/><line x1="0" y1="54" x2="${W}" y2="54" stroke="${C.deep}"/>
<circle cx="32" cy="27" r="7" fill="#FF5F57"/><circle cx="56" cy="27" r="7" fill="#FEBC2E"/><circle cx="80" cy="27" r="7" fill="#28C840"/>
<text class="mono" x="${W / 2}" y="32" font-size="13" text-anchor="middle" fill="${C.muted}">afaq@peshawar — ~/ship-it — zsh</text>
${rows.map((r) => r.el).join("\n")}
<rect class="caret" x="36" y="${top + L.length * lh - 16}" width="10" height="20" fill="${C.lime}"/>`;
  save("terminal.svg", svg(W, H, "Terminal: Afaq ships MVPs in 30 days (Discover, Build, Validate, Launch), profiles Flutter apps to 120fps, adds AI with OpenAI, Gemini and Claude streaming, and can be hired at calendly.com/afaqxdev.", body, css));
}

/* ---------- stack ---------- */
{
  const W = 1200;
  const groups = [
    ["MOBILE", ["Flutter", "Dart", "Riverpod", "BLoC", "Impeller", "Figma → Flutter"]],
    ["AI", ["OpenAI", "Gemini", "Claude", "Whisper", "ML Kit", "SSE streaming"]],
    ["BACKEND", ["Firebase", "Cloud Functions", "Supabase", "WebSockets", "Socket.io", "Google Drive API"]],
    ["MONEY & DATA", ["RevenueCat", "Stripe", "Hive", "SQLite", "SQLCipher", "AES-256"]],
  ];
  const CH = 9.6, top = 40, rowH = 60, H = top + groups.length * rowH + 10;
  let n = 0;
  const css = `.pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:pop .45s cubic-bezier(.2,1.4,.4,1) forwards}@keyframes pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
.pill:hover rect{fill:${C.lime}}
@media (prefers-reduced-motion: reduce){.pop{opacity:1}}`;
  const body = `${card(W, H)}
${groups.map(([g, items], r) => {
    const y = top + r * rowH;
    let x = 220;
    const pills = items.map((s) => {
      const w = Math.round([...s].length * CH + 34), first = n === 0;
      const el = `<g class="pop" style="animation-delay:${(.1 + n++ * .06).toFixed(2)}s"><rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="${first ? C.lime : "#111812"}" stroke="${first ? C.lime : C.deep}"/><text class="mono" x="${x + w / 2}" y="${y + 24}" font-size="15" text-anchor="middle" fill="${first ? C.bg : C.ink}">${esc(s)}</text></g>`;
      x += w + 12; return el;
    }).join("");
    return `<text class="mono" x="40" y="${y + 24}" font-size="13" letter-spacing="2" fill="${C.lime}">${esc(g)}</text>${pills}`;
  }).join("\n")}`;
  save("stack.svg", svg(W, H, "Stack — Mobile: Flutter, Dart, Riverpod, BLoC. AI: OpenAI, Gemini, Claude, Whisper, ML Kit. Backend: Firebase, Cloud Functions, Supabase, WebSockets. Payments and data: RevenueCat, Stripe, Hive, SQLite, SQLCipher, AES-256.", body, css));
}

/* ---------- testimonials ---------- */
{
  const W = 1200, H = 230;
  const Q = [
    ["Communication was top-notch, and the app was delivered exactly as envisioned.", "Nate Jacob", "Client, United Kingdom"],
    ["Prompt delivery with attention to detail. Very supportive and professional.", "Colton Miller", "Client, United States"],
    ["His problem-solving skills, eagerness to learn, and strong work ethic are impressive.", "Syed Ismail Shah", "CEO, Versatile Soft"],
    ["Quick and excellent in Flutter development and team leading.", "Ameer Kakar", "CEO, Apptex Software Solutions"],
    ["Excellent work! Good communicator and very professional.", "Abdullah Hoolif", "Client, Somalia"],
  ];
  const S = 5, T = Q.length * S, sl = 100 / Q.length;
  const css = Q.map((_, i) => {
    const a = i * sl, b = a + sl;
    return `@keyframes q${i}{0%,${a.toFixed(2)}%{opacity:0;transform:translateX(24px)}${(a + 3).toFixed(2)}%,${(b - 3).toFixed(2)}%{opacity:1;transform:none}${b.toFixed(2)}%,100%{opacity:0;transform:translateX(-24px)}}.q${i}{opacity:0;animation:q${i} ${T}s infinite}
@keyframes d${i}{0%,${a.toFixed(2)}%,${b.toFixed(2)}%,100%{fill:${C.deep}}${(a + .1).toFixed(2)}%,${(b - .1).toFixed(2)}%{fill:${C.lime}}}.d${i}{animation:d${i} ${T}s infinite}`;
  }).join("") + `@media (prefers-reduced-motion: reduce){.q0{opacity:1}}`;
  const body = `${card(W, H)}
<text x="34" y="150" font-size="150" style="font-family:Georgia,'Times New Roman',serif" font-weight="700" fill="${C.lime}">“</text>
${Q.map(([q, who, role], i) => `<g class="q${i}">
  <text x="140" y="96" font-size="27" font-weight="600" fill="${C.ink}">${esc(q)}</text>
  <text class="mono" x="140" y="146" font-size="14" letter-spacing="1.5" fill="${C.lime}">${esc(who.toUpperCase())}</text>
  <text class="mono" x="140" y="170" font-size="13" fill="${C.muted}">${esc(role)}</text>
</g>`).join("\n")}
${Q.map((_, i) => `<circle class="d${i}" cx="${W - 40 - (Q.length - 1 - i) * 20}" cy="${H - 34}" r="5" fill="${C.deep}"/>`).join("")}`;
  save("testimonials.svg", svg(W, H, "Client testimonials: " + Q.map(([q, w]) => `“${q}” — ${w}`).join(" "), body, css));
}

/* ---------- section header ---------- */
// Small animated header used between sections: numbered label + a lime line that sweeps in.
const headers = [["01", "WHAT I DO"], ["02", "HOW I SHIP"], ["03", "SHIPPED TO THE STORES"], ["04", "STACK"], ["05", "WHAT CLIENTS SAY"], ["06", "WRITING & OPEN SOURCE"], ["07", "CONTRIBUTIONS"]];
for (const [n, label] of headers) {
  const W = 1200, H = 64;
  const css = `.sweep{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:sw 1.2s .2s cubic-bezier(.7,0,.2,1) forwards}@keyframes sw{to{transform:scaleX(1)}}
.dot{animation:run 3.5s 1.4s ease-in-out infinite}@keyframes run{from{transform:translateX(0)}to{transform:translateX(${W - 480}px)}}
@media (prefers-reduced-motion: reduce){.sweep{transform:none}.dot{display:none}}`;
  const body = `${card(W, H)}<rect x="16" y="16" width="46" height="32" rx="16" fill="${C.lime}"/><text class="mono" x="39" y="37" font-size="14" font-weight="700" text-anchor="middle" fill="${C.bg}">${n}</text>
<text class="mono lbl" x="78" y="38" font-size="17" font-weight="700" letter-spacing="3" fill="${C.ink}">${esc(label)}</text>
<line class="track" x1="440" y1="32" x2="${W - 32}" y2="32" stroke="${C.line}" stroke-width="2"/>
<line class="sweep" x1="440" y1="32" x2="${W - 32}" y2="32" stroke="${C.lime}" stroke-width="2"/>
<circle class="dot rm-hide" cx="444" cy="32" r="5" fill="${C.lime}"/>`;
  save(`h${n}.svg`, svg(W, H, `${n} ${label}`, body, css));
}
