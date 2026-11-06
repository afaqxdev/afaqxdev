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

/* ---------- hero: orbit ---------- */
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const roles = ["build production Flutter apps", "ship AI features that stream", "rescue failing codebases", "profile every frame to 120fps", "launch MVPs in 30 days"];
const roleCss = (T) => roles.map((_, i) => {
  const s = 100 / roles.length, a = i * s, b = a + s;
  return `@keyframes r${i}{0%,${a.toFixed(1)}%{opacity:0;transform:translateY(12px)}${(a + 3).toFixed(1)}%,${(b - 3).toFixed(1)}%{opacity:1;transform:none}${b.toFixed(1)}%,100%{opacity:0;transform:translateY(-12px)}}.r${i}{opacity:0;animation:r${i} ${T}s infinite}`;
}).join("");
const roleText = (x, y, size = 24) => roles.map((r, i) => `<text class="mono r${i}" x="${x}" y="${y}" font-size="${size}" fill="${C.lime}"><tspan fill="${C.ink}">I </tspan>${esc(r)}<tspan class="caret">_</tspan></text>`).join("");
const BLINK = `.caret{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}`;
{
  const card = (w, h) => `<defs><clipPath id="cc"><rect width="${w}" height="${h}" rx="24"/></clipPath></defs><rect width="${w}" height="${h}" rx="24" fill="${C.bg}"/><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="23.5" fill="none" stroke="${C.deep}"/>`;
  const W = 1200, H = 460, cx = 880, cy = 230;
  const stars = Array.from({ length: 70 }, () => `<circle cx="${(rnd() * W).toFixed(0)}" cy="${(rnd() * H).toFixed(0)}" r="${(.6 + rnd() * 1.4).toFixed(1)}" fill="${C.ink}" class="tw" style="animation-delay:-${(rnd() * 4).toFixed(1)}s;animation-duration:${(2 + rnd() * 3).toFixed(1)}s"/>`).join("");
  const rings = [
    { r: 95, dur: 16, dir: 1, items: ["Flutter", "Dart", "Riverpod"], hot: false },
    { r: 155, dur: 26, dir: -1, items: ["Firebase", "Claude", "Gemini", "OpenAI", "Supabase"], hot: false },
    { r: 215, dur: 40, dir: 1, items: ["TourVista", "LQDCNVS", "Nest AI", "GAIA AI", "Fluently", "Penitans"], hot: true },
  ];
  const ringSvg = rings.map(({ r, dur, dir, items, hot }) => {
    const planets = items.map((s, i) => {
      const a = (i / items.length) * Math.PI * 2 + r, px = +(cx + r * Math.cos(a)).toFixed(1), py = +(cy + r * Math.sin(a)).toFixed(1);
      const w = s.length * 7.8 + 22;
      return `<g><animateTransform attributeName="transform" type="rotate" from="0 ${px} ${py}" to="${-360 * dir} ${px} ${py}" dur="${dur}s" repeatCount="indefinite"/>
  <rect x="${px - w / 2}" y="${py - 13}" width="${w}" height="26" rx="13" fill="${hot ? C.lime : C.panel}" stroke="${hot ? C.lime : C.line}"/>
  <text class="mono" x="${px}" y="${py + 4.5}" font-size="13" text-anchor="middle" fill="${hot ? C.bg : C.ink}" font-weight="${hot ? 700 : 400}">${esc(s)}</text></g>`;
    }).join("\n");
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.deep}" stroke-dasharray="3 6"/>
<g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="${360 * dir} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>
${planets}</g>`;
  }).join("\n");
  const css = `.tw{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{from{opacity:.1}to{opacity:.9}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.4s ease-out infinite}@keyframes pulse{from{transform:scale(1);opacity:.6}to{transform:scale(2.6);opacity:0}}
.comet{animation:comet 9s linear infinite}@keyframes comet{0%{transform:translate(-200px,-60px);opacity:0}5%{opacity:1}35%{transform:translate(900px,240px);opacity:0}100%{transform:translate(900px,240px);opacity:0}}
.name{clip-path:inset(0 100% 0 0);animation:wipe 1.1s .2s cubic-bezier(.7,0,.2,1) forwards}@keyframes wipe{to{clip-path:inset(0 0 0 0)}}
${roleCss(15)}${BLINK}
@media (prefers-reduced-motion: reduce){.name{clip-path:none}.r0{opacity:1}}`;
  const body = `${card(W, H)}
<defs><radialGradient id="core"><stop offset="0" stop-color="${C.lime}" stop-opacity=".45"/><stop offset="1" stop-color="${C.lime}" stop-opacity="0"/></radialGradient>
<linearGradient id="tail" x1="0" x2="1"><stop offset="0" stop-color="${C.lime}" stop-opacity="0"/><stop offset="1" stop-color="${C.lime}"/></linearGradient></defs>
<g clip-path="url(#cc)">${stars}
<g class="comet"><line x1="0" y1="0" x2="120" y2="32" stroke="url(#tail)" stroke-width="2"/><circle cx="120" cy="32" r="2.5" fill="${C.lime}"/></g>
<circle cx="${cx}" cy="${cy}" r="150" fill="url(#core)"/>
${ringSvg}
<circle class="pulse" cx="${cx}" cy="${cy}" r="40" fill="none" stroke="${C.lime}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="40" fill="${C.lime}"/>
<text x="${cx}" y="${cy + 11}" font-size="30" font-weight="900" text-anchor="middle" fill="${C.bg}">AZ</text>
</g>
<text class="mono" x="60" y="92" font-size="13" letter-spacing="2" fill="${C.lime}">● EVERYTHING ORBITS ONE RULE: 120FPS</text>
<text class="name" x="56" y="182" font-size="84" font-weight="800" letter-spacing="-3" fill="${C.ink}">Afaq Zahir</text>
<text x="60" y="226" font-size="23" fill="${C.muted}">Flutter · AI · Mobile product engineer</text>
${roleText(60, 290, 22)}
<text class="mono" x="60" y="390" font-size="13" letter-spacing="1.5" fill="${C.muted}">20+ APPS IN ORBIT · 4+ YEARS · AFAQZAHIR.COM</text>`;
  save("hero.svg", svg(W, H, "Afaq Zahir — an orbit of Flutter, AI tools and 20+ shipped apps", body, css));
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

/* ---------- stats: odometer ---------- */
{
  const W = 1200, H = 190, T = 10, RH = 70, DW = 36;
  // each glyph: [char, width]; digits roll, others are static
  const stats = [["20+", "production apps shipped"], ["4+", "years of Flutter"], ["30+", "developers mentored"], ["5.0★", "rating on Fiverr"]];
  const wOf = (ch) => (/\d/.test(ch) ? DW : ch === "." ? 16 : ch === "★" ? 52 : 36);
  const col = W / stats.length, base = 92;
  const css = [`.fill{transform-box:fill-box;transform-origin:left;animation:fill ${T}s cubic-bezier(.2,.8,.2,1) infinite}@keyframes fill{0%{transform:scaleX(0);opacity:1}25%,92%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}`,
    `.digits{font-variant-numeric:tabular-nums}`];
  let n = 0; const parts = [], finals = [];
  stats.forEach(([s, label], i) => {
    let x = i * col + 40;
    const x0 = x;
    for (const ch of s) {
      if (/\d/.test(ch)) {
        const d = +ch, k = `od${n++}`, delay = (i * .2 + n * .05).toFixed(2);
        finals.push(`.${k}{transform:translateY(${-(10 + d) * RH}px)}`);
        css.push(`@keyframes ${k}{0%{transform:translateY(0);opacity:0}4%{opacity:1}${30 + i * 2}%,92%{transform:translateY(${-(10 + d) * RH}px);opacity:1}100%{transform:translateY(${-(10 + d) * RH}px);opacity:0}}.${k}{animation:${k} ${T}s cubic-bezier(.25,.9,.3,1) infinite;animation-delay:${delay}s}`);
        parts.push(`<clipPath id="cl${k}"><rect x="${x - 2}" y="${base - 56}" width="${DW + 4}" height="${RH - 4}"/></clipPath><g clip-path="url(#cl${k})"><g class="${k} digits">${Array.from({ length: 20 }, (_, j) => `<text x="${x}" y="${base + j * RH}" font-size="58" font-weight="800" fill="${C.lime}">${j % 10}</text>`).join("")}</g></g>`);
      } else parts.push(`<text x="${x}" y="${base}" font-size="58" font-weight="800" fill="${C.lime}">${esc(ch)}</text>`);
      x += wOf(ch);
    }
    parts.push(`<text class="mono" x="${x0 + 2}" y="${base + 32}" font-size="13" letter-spacing="1.2" fill="${C.muted}">${esc(label.toUpperCase())}</text>
<rect x="${x0}" y="${base + 56}" width="${col - 80}" height="4" rx="2" fill="${C.deep}"/><rect class="fill" x="${x0}" y="${base + 56}" width="${col - 80}" height="4" rx="2" fill="${C.lime}" style="animation-delay:${i * .2}s"/>
${i ? `<line x1="${i * col}" y1="34" x2="${i * col}" y2="${H - 30}" stroke="${C.deep}"/>` : ""}`);
  });
  css.push(`@media (prefers-reduced-motion: reduce){${finals.join("")}}`);
  // reduced motion: show the final digit row instead of the 0 row
  save("stats.svg", svg(W, H, "20+ production apps shipped, 4+ years of Flutter, 30+ developers mentored, 5.0 star rating on Fiverr", `${card(W, H)}\n${parts.join("\n")}`, css.join("\n")));
}

/* ---------- services ---------- */
{
  const W = 1200, H = 420, T = 9;
  const S = [
    ["Build something new", ["A 30-day MVP that works on launch day —", "iOS and Android from one Flutter codebase."], "rocket"],
    ["Fix what's broken", ["Memory leaks, UI jank, architecture rot.", "I rescue codebases other teams gave up on."], "wrench"],
    ["Add AI to your product", ["ChatGPT, Gemini and Claude with streaming —", "API keys never touch the client."], "spark"],
    ["Turn design into product", ["Pixel-accurate Figma → Flutter, with motion", "that holds 120fps on mid-range phones."], "pen"],
    ["Build the backend", ["Firebase and Cloud Functions that don't", "become a cost nightmare at scale."], "server"],
    ["Take over a project", ["Code audit, migration and a clear plan —", "then I own it like I'll maintain it myself."], "shield"],
  ];
  const icon = {
    rocket: `<g class="bob"><path d="M0-22C9-13 10 4 7 12H-7C-10 4-9-13 0-22Z" fill="${C.lime}"/><circle cy="-6" r="4" fill="${C.bg}"/><path d="M-7 4-14 14-7 12ZM7 4 14 14 7 12Z" fill="${C.lime}"/><path class="flick" d="M-5 13 0 25 5 13Z" fill="#F2C572"/></g>`,
    wrench: `<g class="swing"><rect x="-3.5" y="-6" width="7" height="28" rx="3.5" fill="${C.lime}"/><circle cy="-12" r="10" fill="${C.lime}"/><rect x="-3.5" y="-24" width="7" height="12" fill="${C.panel}"/></g>`,
    spark: `<g class="beat"><path d="M0-20 5-5 20 0 5 5 0 20-5 5-20 0-5-5Z" fill="${C.lime}"/></g><g><animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="2.4s" repeatCount="indefinite"/><circle cx="18" cy="-14" r="3.5" fill="${C.ink}"/></g>`,
    pen: `<path class="draw" d="M-20 12C-12-6-4 18 4 0S16-8 20-14" fill="none" stroke="${C.lime}" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="-14" r="4" fill="${C.ink}"/>`,
    server: [0, 1, 2].map((i) => `<rect x="-20" y="${-18 + i * 13}" width="40" height="10" rx="3" fill="${C.deep}" stroke="${C.lime}" stroke-width="1"/><circle class="led" style="animation-delay:${i * .3}s" cx="12" cy="${-13 + i * 13}" r="2.5" fill="${C.lime}"/>`).join(""),
    shield: `<path d="M0-20 16-13V0C16 11 8 18 0 21-8 18-16 11-16 0V-13Z" fill="none" stroke="${C.lime}" stroke-width="3"/><path class="check" d="M-7 0-1 6 8-5" fill="none" stroke="${C.lime}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const cw = 360, ch = 170, gx = 30, gy = 24, ox = 30, oy = 30;
  const css = [`.bob{animation:bob 1.6s ease-in-out infinite alternate}@keyframes bob{to{transform:translateY(-5px)}}
.flick{transform-box:fill-box;transform-origin:top;animation:fk .15s steps(2) infinite}@keyframes fk{50%{transform:scaleY(.55)}}
.swing{transform-box:fill-box;transform-origin:50% 100%;animation:sw 1.8s ease-in-out infinite alternate}@keyframes sw{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
.beat{transform-box:fill-box;transform-origin:center;animation:bt 1.4s ease-in-out infinite}@keyframes bt{50%{transform:scale(.7) rotate(45deg)}}
.draw{stroke-dasharray:70;animation:dr 2.4s ease-in-out infinite}@keyframes dr{0%{stroke-dashoffset:70}60%,100%{stroke-dashoffset:0}}
.led{animation:led 1.2s steps(1) infinite}@keyframes led{50%{opacity:.15}}
.check{stroke-dasharray:24;animation:ck 2.4s ease-out infinite}@keyframes ck{0%,20%{stroke-dashoffset:24}50%,100%{stroke-dashoffset:0}}`];
  const body = S.map(([title, lines, ic], i) => {
    const x = ox + (i % 3) * (cw + gx), y = oy + Math.floor(i / 3) * (ch + gy), k = `hl${i}`;
    const a = (i / S.length) * 100, b = a + 100 / S.length;
    css.push(`@keyframes ${k}{0%,${a.toFixed(1)}%,${b.toFixed(1)}%,100%{stroke:${C.deep}}${(a + 2).toFixed(1)}%,${(b - 2).toFixed(1)}%{stroke:${C.lime}}}.${k}{animation:${k} ${T}s infinite}`);
    return `<rect class="${k}" x="${x}" y="${y}" width="${cw}" height="${ch}" rx="20" fill="${C.panel}" stroke="${C.deep}" stroke-width="1.5"/>
<rect x="${x + 22}" y="${y + 22}" width="58" height="58" rx="16" fill="${C.bg}" stroke="${C.deep}"/>
<g transform="translate(${x + 51} ${y + 51})">${icon[ic]}</g>
<text class="mono" x="${x + cw - 22}" y="${y + 40}" font-size="12" text-anchor="end" fill="${C.line}">0${i + 1}</text>
<text x="${x + 22}" y="${y + 112}" font-size="20" font-weight="700" fill="${C.ink}">${esc(title)}</text>
${lines.map((l, j) => `<text x="${x + 22}" y="${y + 136 + j * 20}" font-size="14" fill="${C.muted}">${esc(l)}</text>`).join("")}`;
  }).join("\n");
  save("services.svg", svg(W, H, "What I do: " + S.map(([t, l]) => `${t} — ${l.join(" ")}`).join(" "), `${card(W, H)}\n${body}`, css.join("\n")));
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

/* ---------- stack: scrolling rows ---------- */
{
  const W = 1200;
  const groups = [
    ["MOBILE", ["Flutter", "Dart", "Riverpod", "BLoC", "Impeller", "Figma → Flutter", "GoRouter", "Freezed"]],
    ["AI", ["OpenAI", "Gemini", "Claude", "Whisper", "ML Kit", "SSE streaming", "DALL·E"]],
    ["BACKEND", ["Firebase", "Cloud Functions", "Supabase", "WebSockets", "Socket.io", "Google Drive API"]],
    ["MONEY & DATA", ["RevenueCat", "Stripe", "Hive", "SQLite", "SQLCipher", "AES-256"]],
  ];
  const CH = 9.6, top = 34, rowH = 60, H = top + groups.length * rowH + 8, X0 = 200, VIS = W - X0 - 20;
  const css = [];
  const rows = groups.map(([g, items], r) => {
    const y = top + r * rowH;
    const ws = items.map((s) => Math.round([...s].length * CH + 34));
    const setW = ws.reduce((a, w) => a + w + 12, 0);
    const copies = Math.ceil(VIS / setW) + 1;
    let x = 0, pills = "";
    for (let c = 0; c < copies; c++) items.forEach((s, i) => {
      const hot = i === 0;
      pills += `<rect x="${x}" y="${y}" width="${ws[i]}" height="38" rx="19" fill="${hot ? C.lime : C.panel}" stroke="${hot ? C.lime : C.deep}"/><text class="mono" x="${x + ws[i] / 2}" y="${y + 24}" font-size="15" text-anchor="middle" fill="${hot ? C.bg : C.ink}">${esc(s)}</text>`;
      x += ws[i] + 12;
    });
    const dir = r % 2 ? 1 : -1, dur = (setW / 45).toFixed(1);
    css.push(`@keyframes row${r}{from{transform:translateX(${dir < 0 ? 0 : -setW}px)}to{transform:translateX(${dir < 0 ? -setW : 0}px)}}.row${r}{animation:row${r} ${dur}s linear infinite}`);
    return { label: `<text class="mono" x="40" y="${y + 24}" font-size="13" letter-spacing="2" fill="${C.lime}">${esc(g)}</text>`, pills: `<g class="row${r}">${pills}</g>` };
  });
  const body = `${card(W, H)}
<defs><clipPath id="lane"><rect x="${X0}" y="0" width="${VIS}" height="${H}"/></clipPath>
<linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${C.bg}"/><stop offset="1" stop-color="${C.bg}" stop-opacity="0"/></linearGradient>
<linearGradient id="fadeR" x1="1" x2="0"><stop offset="0" stop-color="${C.bg}"/><stop offset="1" stop-color="${C.bg}" stop-opacity="0"/></linearGradient></defs>
${rows.map((r) => r.label).join("")}
<g clip-path="url(#lane)"><g transform="translate(${X0} 0)">${rows.map((r) => r.pills).join("\n")}</g></g>
<rect x="${X0}" y="2" width="50" height="${H - 4}" fill="url(#fadeL)"/><rect x="${W - 20 - 50}" y="2" width="50" height="${H - 4}" fill="url(#fadeR)"/>`;
  save("stack.svg", svg(W, H, "Stack — Mobile: Flutter, Dart, Riverpod, BLoC, Impeller, GoRouter, Freezed. AI: OpenAI, Gemini, Claude, Whisper, ML Kit, SSE streaming, DALL·E. Backend: Firebase, Cloud Functions, Supabase, WebSockets, Socket.io, Google Drive API. Money and data: RevenueCat, Stripe, Hive, SQLite, SQLCipher, AES-256.", body, css.join("\n")));
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

/* ---------- scenes: hot reload, bug blaster, app reel ---------- */
const cardC = (w, h) => `<defs><clipPath id="cc"><rect width="${w}" height="${h}" rx="24"/></clipPath></defs><rect width="${w}" height="${h}" rx="24" fill="${C.bg}"/><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="23.5" fill="none" stroke="${C.deep}"/>`;
const pct = (s, T) => +(s / T * 100).toFixed(2);
const step = (name, T, a, b, from, to = "opacity:1;transform:none", ease = "ease-out") =>
  `@keyframes ${name}{0%,${pct(a, T)}%{${from}}${pct(b, T)}%,94%{${to}}98%,100%{${from}}}.${name}{animation:${name} ${T}s ${ease} infinite}`;
/* ============ 2. HOT RELOAD ============ */
{
  const W = 1200, H = 460, T = 16;
  const K = { kw: "#C8F135", ty: "#7FD1B9", str: "#F2C572", num: "#F29E74", com: "#6F8075", tx: C.ink };
  const code = [
    [["// Afaq Zahir — Flutter · AI · Mobile product engineer", "com"]],
    [["class ", "kw"], ["Afaq ", "ty"], ["extends ", "kw"], ["Engineer ", "ty"], ["{", "tx"]],
    [["  final ", "kw"], ["appsShipped = ", "tx"], ["20", "num"], [";", "tx"]],
    [["  final ", "kw"], ["fps = ", "tx"], ["120", "num"], [";  ", "tx"], ["// profiled, not guessed", "com"]],
    [["  final ", "kw"], ["ai = [", "tx"], ["'Claude'", "str"], [", ", "tx"], ["'Gemini'", "str"], [", ", "tx"], ["'GPT'", "str"], ["];", "tx"]],
    [["", "tx"]],
    [["  ", "tx"], ["@override", "kw"]],
    [["  Widget ", "ty"], ["build(ctx) => ", "tx"], ["Mvp", "ty"], ["(days: ", "tx"], ["30", "num"], [");", "tx"]],
    [["}", "tx"]],
  ];
  let t = .5; const css = [], lines = [];
  code.forEach((parts, i) => {
    const n = parts.map((p) => p[0]).join("").length, d = Math.max(.1, n * .035);
    css.push(`@keyframes c${i}{0%,${pct(t, T)}%{clip-path:inset(0 100% 0 0)}${pct(t + d, T)}%,94%{clip-path:inset(0 0 0 0)}98%,100%{clip-path:inset(0 100% 0 0)}}.c${i}{animation:c${i} ${T}s steps(${Math.max(1, n)}) infinite}`);
    lines.push(`<text class="mono c${i}" x="84" y="${112 + i * 30}" font-size="15.5" xml:space="preserve">${parts.map(([s, k]) => `<tspan fill="${K[k]}">${esc(s)}</tspan>`).join("")}</text><text class="mono" x="52" y="${112 + i * 30}" font-size="13" fill="${C.line}" text-anchor="end">${i + 1}</text>`);
    t += d + .12;
  });
  const R = t + .4; // hot-reload moment
  css.push(step("toast", T, R, R + .25, "opacity:0;transform:translateY(10px)"));
  css.push(`@keyframes flash{0%,${pct(R, T)}%{stroke:${C.line};stroke-width:2}${pct(R + .15, T)}%{stroke:${C.lime};stroke-width:5}${pct(R + 1, T)}%,100%{stroke:${C.lime};stroke-width:2}}.flash{animation:flash ${T}s infinite}`);
  css.push(step("s1", T, R + .2, R + .5, "opacity:0;transform:translateY(-20px)"));
  css.push(step("s2", T, R + .5, R + .8, "opacity:0;transform:scale(.6)"));
  css.push(step("s3", T, R + .65, R + .95, "opacity:0;transform:scale(.6)"));
  css.push(`@keyframes chart{0%,${pct(R + .9, T)}%{stroke-dashoffset:260}${pct(R + 1.8, T)}%,94%{stroke-dashoffset:0}98%,100%{stroke-dashoffset:260}}.chart{stroke-dasharray:260;animation:chart ${T}s ease-in-out infinite}`);
  [0, 1, 2].forEach((i) => css.push(step(`row${i}`, T, R + 1.3 + i * .18, R + 1.6 + i * .18, "opacity:0;transform:translateX(40px)")));
  css.push(step("btn", T, R + 2, R + 2.3, "opacity:0;transform:translateY(16px)"));
  css.push(`@keyframes live{0%,${pct(R + 3.4, T)}%{opacity:0}${pct(R + 3.6, T)}%,94%{opacity:1}98%,100%{opacity:0}}.live{animation:live ${T}s infinite}`);
  ["ios", "and", "web"].forEach((k, i) => css.push(step(k, T, R + 3.7 + i * .25, R + 4 + i * .25, "opacity:0;transform:translateX(-20px)", undefined, "cubic-bezier(.2,1.4,.4,1)")));
  css.push(`.fb{transform-box:fill-box;transform-origin:center}`);
  const px = 800, py = 34, pw = 230, ph = 392;
  const body = `${cardC(W, H)}
<rect x="24" y="24" width="700" height="412" rx="16" fill="${C.panel}" stroke="${C.deep}"/>
<circle cx="48" cy="48" r="6" fill="#FF5F57"/><circle cx="68" cy="48" r="6" fill="#FEBC2E"/><circle cx="88" cy="48" r="6" fill="#28C840"/>
<rect x="110" y="36" width="150" height="26" rx="8" fill="${C.bg}"/><text class="mono" x="124" y="54" font-size="12" fill="${C.ink}">afaq_zahir.dart</text>
<line x1="24" y1="72" x2="724" y2="72" stroke="${C.deep}"/>
${lines.join("\n")}
<g class="toast"><rect x="440" y="378" width="268" height="42" rx="12" fill="${C.lime}"/><text class="mono" x="460" y="404" font-size="14" font-weight="700" fill="${C.bg}">⚡ Hot reload · 38 ms</text></g>
<path d="M738 230 h46" stroke="${C.lime}" stroke-width="2" stroke-dasharray="4 5" class="toast"/>
<rect class="flash" x="${px}" y="${py}" width="${pw}" height="${ph}" rx="34" fill="${C.bg}"/>
<rect x="${px + 80}" y="${py + 12}" width="70" height="16" rx="8" fill="${C.deep}"/>
<g class="s1"><text x="${px + 20}" y="${py + 64}" font-size="20" font-weight="800" fill="${C.ink}">Afaq.app</text><circle cx="${px + 205}" cy="${py + 58}" r="11" fill="${C.lime}"/></g>
<g class="s2 fb"><rect x="${px + 16}" y="${py + 82}" width="94" height="62" rx="14" fill="${C.panel}" stroke="${C.deep}"/><text x="${px + 28}" y="${py + 114}" font-size="22" font-weight="800" fill="${C.lime}">20+</text><text class="mono" x="${px + 28}" y="${py + 132}" font-size="10" fill="${C.muted}">APPS</text></g>
<g class="s3 fb"><rect x="${px + 120}" y="${py + 82}" width="94" height="62" rx="14" fill="${C.panel}" stroke="${C.deep}"/><text x="${px + 132}" y="${py + 114}" font-size="22" font-weight="800" fill="${C.lime}">120</text><text class="mono" x="${px + 132}" y="${py + 132}" font-size="10" fill="${C.muted}">FPS</text></g>
<rect x="${px + 16}" y="${py + 154}" width="198" height="70" rx="14" fill="${C.panel}" stroke="${C.deep}"/>
<polyline class="chart" points="${px + 26},${py + 210} ${px + 56},${py + 196} ${px + 86},${py + 202} ${px + 116},${py + 180} ${px + 146},${py + 186} ${px + 176},${py + 168} ${px + 204},${py + 172}" fill="none" stroke="${C.lime}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
${[0, 1, 2].map((i) => `<g class="row${i}"><rect x="${px + 16}" y="${py + 236 + i * 38}" width="198" height="30" rx="10" fill="${C.panel}"/><circle cx="${px + 32}" cy="${py + 251 + i * 38}" r="7" fill="${i ? C.deep : C.lime}"/><rect x="${px + 46}" y="${py + 247 + i * 38}" width="${[120, 90, 140][i]}" height="8" rx="4" fill="${C.line}"/></g>`).join("")}
<g class="btn"><rect x="${px + 16}" y="${py + 346}" width="198" height="32" rx="16" fill="${C.lime}"/><text x="${px + 115}" y="${py + 367}" font-size="14" font-weight="700" text-anchor="middle" fill="${C.bg}">Ship to stores →</text>
<g class="live"><rect x="${px + 16}" y="${py + 346}" width="198" height="32" rx="16" fill="${C.ink}"/><text x="${px + 115}" y="${py + 367}" font-size="14" font-weight="700" text-anchor="middle" fill="${C.bg}">✓ Live on the stores</text></g></g>
${[["ios", "App Store ✓", 120], ["and", "Google Play ✓", 200], ["web", "Web ✓", 280]].map(([k, s, y]) => `<g class="${k}"><rect x="1050" y="${y}" width="${s.length * 8.6 + 24}" height="34" rx="17" fill="${C.panel}" stroke="${C.lime}"/><text class="mono" x="1062" y="${y + 22}" font-size="13" fill="${C.lime}">${s}</text></g>`).join("")}`;
  save("hot-reload.svg", svg(W, H, "Afaq Zahir's code types itself, hot-reloads, and a Flutter app builds and ships to the App Store, Google Play and web", body, css.join("\n")));
}

/* ============ 3. BUG BLASTER ============ */
{
  const W = 1200, H = 460, T = 10, P = 5; // pixel size
  const BUG = ["..X.....X..", "...X...X...", "...XXXXX...", "X.XX.X.XX.X", ".XXXXXXXXX.", "..XX.X.XX..", "X.XXXXXXX.X", "..X.....X.."];
  const SHIP = ["....X....", "...XXX...", "...XXX...", ".XXXXXXX.", "XXXXXXXXX", "XX.X.X.XX"];
  const pix = (rows, fill) => rows.flatMap((r, y) => [...r].map((c, x) => c === "X" ? `<rect x="${x * P}" y="${y * P}" width="${P}" height="${P}" fill="${fill}"/>` : "")).join("");
  const xs = [190, 395, 600, 805, 1010], by = 150, shipY = 360;
  const labels = ["jank", "memory leak", "ANR", "crash", "rebuild storm"];
  const fixed = ["120fps ✓", "freed ✓", "responsive ✓", "stable ✓", "optimised ✓"];
  const css = [];
  const shipK = [`0%{transform:translateX(${xs[4]}px)}`];
  xs.forEach((x, i) => shipK.push(`${i * 20 + 6}%,${i * 20 + 16}%{transform:translateX(${x}px)}`));
  shipK.push(`100%{transform:translateX(${xs[4]}px)}`);
  css.push(`@keyframes ship{${shipK.join("")}}.ship{animation:ship ${T}s ease-in-out infinite}`);
  xs.forEach((_, i) => {
    const f = i * 20 + 8;
    css.push(`@keyframes lz${i}{0%,${f}%{opacity:0;transform:scaleY(.2)}${f + .5}%{opacity:1;transform:scaleY(1)}${f + 2.5}%,100%{opacity:0;transform:scaleY(1)}}.lz${i}{transform-box:fill-box;transform-origin:bottom;opacity:0;animation:lz${i} ${T}s infinite}`);
    css.push(`@keyframes bg${i}{0%,${f + 2}%{opacity:1;transform:scale(1)}${f + 4}%{opacity:0;transform:scale(1.7)}97%{opacity:0;transform:scale(.2)}100%{opacity:1;transform:scale(1)}}.bg${i}{transform-box:fill-box;transform-origin:center;animation:bg${i} ${T}s infinite}`);
    css.push(`@keyframes bo${i}{0%,${f + 2}%{opacity:0;transform:scale(.2)}${f + 3}%{opacity:1}${f + 7}%,100%{opacity:0;transform:scale(2.4)}}.bo${i}{transform-box:fill-box;transform-origin:center;opacity:0;animation:bo${i} ${T}s ease-out infinite}`);
    css.push(`@keyframes fx${i}{0%,${f + 2}%{opacity:0;transform:translateY(10px)}${f + 4}%,94%{opacity:1;transform:none}98%,100%{opacity:0;transform:translateY(10px)}}.fx${i}{opacity:0;animation:fx${i} ${T}s ease-out infinite}`);
  });
  css.push(`.fall{animation:fall 6s linear infinite}@keyframes fall{to{transform:translateY(${H}px)}}
.flame{animation:fl .12s steps(2) infinite}@keyframes fl{50%{opacity:.3}}
.blinkx{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}`);
  const dots = Array.from({ length: 40 }, () => `<rect x="${(rnd() * W).toFixed(0)}" y="${(rnd() * H).toFixed(0)}" width="2" height="2" fill="${C.ink}" opacity="${(.15 + rnd() * .5).toFixed(2)}"/>`).join("");
  const body = `${cardC(W, H)}
<defs><pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".35"/></pattern></defs>
<g clip-path="url(#cc)">
<g class="fall">${dots}<g transform="translate(0 ${-H})">${dots}</g></g>
<text class="mono" x="32" y="46" font-size="15" font-weight="700" letter-spacing="2" fill="${C.lime}">AFAQ ZAHIR // BUG BLASTER</text>
<text class="mono" x="${W - 32}" y="46" font-size="15" font-weight="700" letter-spacing="2" fill="${C.ink}" text-anchor="end">SCORE <tspan fill="${C.lime}">120 FPS</tspan>   APPS SHIPPED <tspan fill="${C.lime}">20+</tspan></text>
<line x1="32" y1="62" x2="${W - 32}" y2="62" stroke="${C.deep}" stroke-dasharray="6 6"/>
${xs.map((x, i) => `<g class="bg${i}"><g transform="translate(${x - 27} ${by})">${pix(BUG, C.red)}<animateTransform attributeName="transform" type="translate" values="${x - 27} ${by};${x - 27} ${by + 10};${x - 27} ${by}" dur="${1.4 + i * .15}s" repeatCount="indefinite"/></g></g>
<text class="mono bg${i}" x="${x}" y="${by + 72}" font-size="13" text-anchor="middle" fill="${C.muted}">${labels[i]}</text>
<circle class="bo${i}" cx="${x}" cy="${by + 22}" r="22" fill="none" stroke="${C.lime}" stroke-width="3"/>
<text class="mono fx${i}" x="${x}" y="${by + 28}" font-size="16" font-weight="700" text-anchor="middle" fill="${C.lime}">${fixed[i]}</text>
<rect class="lz${i}" x="${x - 2}" y="${by + 50}" width="4" height="${shipY - by - 50}" rx="2" fill="${C.lime}"/>`).join("\n")}
<g class="ship"><g transform="translate(-22 ${shipY})">${pix(SHIP, C.lime)}<rect class="flame" x="17" y="31" width="10" height="9" fill="#F2C572"/></g></g>
<line x1="32" y1="410" x2="${W - 32}" y2="410" stroke="${C.lime}" stroke-opacity=".4"/>
<text class="mono" x="32" y="438" font-size="14" fill="${C.ink}">I hunt the bugs your users would have found<tspan class="blinkx" fill="${C.lime}">_</tspan></text>
<text class="mono" x="${W - 32}" y="438" font-size="14" fill="${C.muted}" text-anchor="end">PRESS START → afaqzahir.com</text>
<rect width="${W}" height="${H}" fill="url(#scan)"/>
</g>`;
  save("bug-blaster.svg", svg(W, H, "Bug Blaster: Afaq Zahir's ship shoots jank, memory leaks, ANRs, crashes and rebuild storms, turning each into a fix", body, css.join("\n")));
}

/* ============ 4. APP REEL ============ */
{
  const W = 1200, H = 500, T = 15, slot = 3;
  const apps = [
    ["TourVista", "AI travel guide", "#0E8A7E", "#103A4F", "T"],
    ["LQDCNVS", "4K art for phones & TV", "#7B3FE4", "#E2457C", "L"],
    ["Nest AI", "Private parenting companion", "#E8845A", "#5B2A4A", "N"],
    ["Fluently AI", "Learn languages with OCR", "#2F6BFF", "#1A2B6B", "F"],
    ["GAIA AI", "AI dream journal", "#3B2A8C", "#0B0F2E", "G"],
  ];
  const pos = { hr: [1130, .55, 0], r: [880, .78, .6], c: [600, 1, 1], l: [320, .78, .6], hl: [70, .55, 0] };
  const tf = ([x, s, o]) => `transform:translate(${x}px,290px) scale(${s});opacity:${o}`;
  const css = [`@keyframes reel{0%,16%{${tf(pos.hr)}}20%,36%{${tf(pos.r)}}40%,56%{${tf(pos.c)}}60%,76%{${tf(pos.l)}}80%,100%{${tf(pos.hl)}}}.reel{animation:reel ${T}s cubic-bezier(.65,0,.35,1) infinite}`,
    `@keyframes cap{0%,41%{opacity:0;transform:translateY(8px)}44%,54%{opacity:1;transform:none}57%,100%{opacity:0;transform:translateY(-8px)}}.cap{opacity:0;animation:cap ${T}s infinite}`,
    `.spark{transform-box:fill-box;transform-origin:center;animation:sp 2.2s ease-in-out infinite}@keyframes sp{0%,100%{transform:scale(.2);opacity:0}50%{transform:scale(1);opacity:1}}`,
    `.shine{animation:shine ${slot}s ease-in-out infinite}@keyframes shine{0%,40%{transform:translateX(-160px)}80%,100%{transform:translateX(160px)}}`];
  const park = [pos.hr, pos.r, pos.c, pos.l, pos.hl];
  css.push(`@media (prefers-reduced-motion: reduce){${park.map((p, k) => `.p${k}{${tf(p)}}`).join("")}}`);
  const phone = ([name, tag, c1, c2, ch], k) => `<g class="reel p${k}" style="animation-delay:-${k * slot}s">
  <defs><linearGradient id="g${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><clipPath id="sc${k}"><rect x="-92" y="-172" width="184" height="344" rx="26"/></clipPath></defs>
  <rect x="-100" y="-180" width="200" height="360" rx="34" fill="${C.bg}" stroke="${C.lime}" stroke-width="2"/>
  <g clip-path="url(#sc${k})"><rect x="-92" y="-172" width="184" height="344" fill="url(#g${k})"/>
    <rect x="-130" y="-172" width="60" height="344" fill="#fff" opacity=".12" class="shine" transform="skewX(-20)"/>
    <rect x="-30" y="-158" width="60" height="14" rx="7" fill="#000" opacity=".5"/>
    <rect x="-70" y="-120" width="64" height="64" rx="18" fill="#fff" opacity=".95"/><text x="-38" y="-75" font-size="36" font-weight="900" text-anchor="middle" fill="${c1}">${ch}</text>
    <text x="-70" y="-14" font-size="25" font-weight="800" fill="#fff">${esc(name)}</text>
    <text x="-70" y="8" font-size="12" fill="#fff" opacity=".8">${esc(tag)}</text>
    ${[0, 1, 2].map((i) => `<rect x="-70" y="${30 + i * 26}" width="${[140, 110, 125][i]}" height="14" rx="7" fill="#fff" opacity="${.28 - i * .06}"/>`).join("")}
    <rect x="-70" y="118" width="140" height="34" rx="17" fill="${C.lime}"/><text x="0" y="140" font-size="13" font-weight="800" text-anchor="middle" fill="${C.bg}">★ Live on stores</text>
  </g></g>`;
  const sparks = Array.from({ length: 14 }, (_, i) => `<path class="spark" style="animation-delay:-${(rnd() * 2.2).toFixed(2)}s" transform="translate(${(380 + rnd() * 440).toFixed(0)} ${(110 + rnd() * 340).toFixed(0)})" d="M0-7L2-2 7 0 2 2 0 7-2 2-7 0-2-2Z" fill="${C.lime}"/>`).join("");
  const body = `${cardC(W, H)}
<defs><radialGradient id="floor"><stop offset="0" stop-color="${C.lime}" stop-opacity=".35"/><stop offset="1" stop-color="${C.lime}" stop-opacity="0"/></radialGradient></defs>
<g clip-path="url(#cc)">
<text class="mono" x="40" y="56" font-size="13" letter-spacing="2" fill="${C.lime}">● AFAQ ZAHIR · FLUTTER · AI · MOBILE</text>
<text x="40" y="96" font-size="34" font-weight="800" letter-spacing="-1" fill="${C.ink}">20+ apps. Shipped, measured, maintained.</text>
<ellipse cx="600" cy="476" rx="260" ry="26" fill="url(#floor)"/>
${sparks}
${apps.map(phone).join("\n")}
${apps.map(([n, tag], k) => `<text class="cap mono" style="animation-delay:-${k * slot}s" x="${W - 40}" y="96" font-size="14" text-anchor="end" fill="${C.muted}">NOW SHOWING · <tspan fill="${C.lime}">${esc(n.toUpperCase())}</tspan></text>`).join("")}
</g>`;
  save("app-reel.svg", svg(W, H, "A rotating carousel of phones showing apps by Afaq Zahir: TourVista, LQDCNVS, Nest AI, Fluently AI and GAIA AI", body, css.join("\n")));
}

/* ---------- call to action ---------- */
{
  const W = 1200, H = 230;
  const css = `.ring{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{transform:scale(1);opacity:.8}to{transform:scale(1.25,1.9);opacity:0}}
.arrow{animation:nudge 1.1s ease-in-out infinite alternate}@keyframes nudge{to{transform:translateX(8px)}}
.glow{animation:glow 6s ease-in-out infinite alternate}@keyframes glow{to{transform:translateX(500px)}}
${roleCss(15)}${BLINK}
@media (prefers-reduced-motion: reduce){.r0{opacity:1}}`;
  const body = `${card(W, H)}
<defs><radialGradient id="cg"><stop offset="0" stop-color="${C.lime}" stop-opacity=".22"/><stop offset="1" stop-color="${C.lime}" stop-opacity="0"/></radialGradient><clipPath id="ctaclip"><rect width="${W}" height="${H}" rx="24"/></clipPath></defs>
<g clip-path="url(#ctaclip)"><circle class="glow" cx="300" cy="115" r="260" fill="url(#cg)"/></g>
<text class="mono" x="60" y="70" font-size="13" letter-spacing="2" fill="${C.lime}">● REPLIES IN 2–4 HOURS · US / UK / EU</text>
<text x="60" y="122" font-size="38" font-weight="800" letter-spacing="-1" fill="${C.ink}">Got an app idea — or one that's falling apart?</text>
${roleText(60, 170, 20)}
<rect class="ring" x="900" y="146" width="240" height="56" rx="28" fill="none" stroke="${C.lime}" stroke-width="2"/>
<rect x="900" y="146" width="240" height="56" rx="28" fill="${C.lime}"/>
<text x="990" y="181" font-size="19" font-weight="800" text-anchor="middle" fill="${C.bg}">Book a call</text>
<g class="arrow"><path d="M1086 174h22m-8-8 8 8-8 8" fill="none" stroke="${C.bg}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
<text class="mono" x="1140" y="70" font-size="13" text-anchor="end" fill="${C.muted}">calendly.com/afaqxdev</text>`;
  save("cta.svg", svg(W, H, "Got an app idea, or one that's falling apart? Book a call with Afaq Zahir at calendly.com/afaqxdev — replies in 2 to 4 hours.", body, css));
}
