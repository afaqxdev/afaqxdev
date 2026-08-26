<!-- Afaq Zahir — Flutter Mobile Product Engineer -->
<!-- I build production Flutter apps, not portfolio repos -->

<div align="center">

<img src="https://www.afaqzahir.com/assets/afaq-avatar.webp" alt="Afaq Zahir" width="120" height="120" style="border-radius: 50%; border: 3px solid #02569B;" />

### Flutter Mobile Product Engineer
[📧 Email](mailto:afaqxdev@gmail.com) · [🌐 Website](https://www.afaqzahir.com) · [💬 WhatsApp](https://wa.me/923319791631)

*Peshawar, Pakistan · Available for remote work with US/UK/EU startups*

</div>

---

## What I Actually Do

I take ownership of mobile products — not just tickets.

I've shipped **10+ production apps** to the Apple App Store and Google Play. I don't work through agencies or project managers. Founders hire me directly when they need:

- A **20-30 day MVP** that actually works at launch
- Someone to **rescue a failing Flutter codebase** (memory leaks, UI jank, architecture rot)
- **AI features** (ChatGPT, Gemini, Claude) integrated into real apps with sub-200ms response latency
- **Firebase backends** that don't become a cost nightmare at scale

I write clean MVVM architecture, profile GPU rendering to 120fps, and treat your codebase like I'll maintain it myself.

---

## Open Source

| Package | Downloads | Stars | Purpose |
|---------|----------|-------|---------|
| [`tag_field`](https://pub.dev/packages/tag_field) | ![Downloads](https://img.shields.io/pub/package-tag_field?style=flat-square) | — | Declarative tag input widget for Flutter |


I also contribute to the Flutter ecosystem through [technical guides](https://www.afaqzahir.com/blog) that get cited by engineers solving real problems.

---

## What "Clean Architecture" Actually Looks Like

I've seen enough `lib/services/` folders with 47 files and zero separation of concerns. Here's the structure I enforce on every project:



Every feature is a self-contained module. You can delete any feature folder without breaking the app. That's not theory — it's how every project I ship is structured.

---

## The 120fps Standard

Most Flutter developers don't profile their apps. I do.

Every project I ship gets benchmarked against a 120fps rendering target on mid-range Android hardware:

- **Impeller rendering** enabled and tested
- **Rebuild frequency** measured — no unnecessary widget rebuilds
- **Shader compilation** verified — no interpreted Painter ops in hot paths
- **Image decoding** profiled — cached and precached, not loaded on-demand

When I say "120fps," I mean I've actually measured it — not assumed it.

---

## Real Apps, Not Screenshots

These aren't side projects. They're production applications built for real users and real businesses.

<div align="center">

| App | Platform | Role | Status |
|-----|----------|------|--------|
| [TourVista](https://apps.apple.com/us/app/tourvista/id6747093104) | iOS, Android | Lead Engineer | 🟢 Live |
| [LQDCNVS](https://apps.apple.com/us/app/lqdcnvs/id6478953093) | iOS, Android | Lead Engineer | 🟢 Live |
| [GAIA AI](https://apps.apple.com/us/app/gaia-ai-dream-interpretor/id6450891063) | iOS, Android | Lead Engineer | 🟢 Live |
| [Nest](https://play.google.com/store/apps/details?id=com.nest.app.pk) | Android | Lead Engineer | 🟢 Live |
| [Fluently](https://play.google.com/store/apps/details?id=com.fluently.app) | Android | Lead Engineer | 🟢 Live |
| [Penitans](https://play.google.com/store/apps/details?id=com.penitans.app) | Android | Lead Engineer | 🟢 Live |
| [Omni](https://play.google.com/store/apps/details?id=com.omni.care.app) | Android | Lead Engineer | 🟢 Live |
| [Expense](https://play.google.com/store/apps/details?id=com.expense.tracker.app) | Android | Lead Engineer | 🟢 Live |
| [PrayPal](https://play.google.com/store/apps/details?id=com.praypal.app) | Android | Lead Engineer | 🟢 Live |

</div>

---

## AI in Production — Not Demos

Everyone has a ChatGPT wrapper. I've built AI features that actually ship to production:

**GAIA AI** — Dream interpretation app with multi-model LLM routing (ChatGPT / Gemini / Claude), secure API key proxying, and real-time SSE streaming. Zero API keys in the client bundle.

I've written about the architecture [here](https://www.afaqzahir.com/blog/how-to-integrate-llm-models-chatgpt-gemini-flutter-mobile) — it's one of the most detailed guides on LLM integration in Flutter.

Key principle: **API keys never touch the client.** Everything routes through a serverless proxy with rate limiting and cost monitoring.

---

## My Engineering Process

Not "agile" rituals. A practical 4-phase system:

