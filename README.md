# Italianish — Website

A clean, modern, mobile-responsive marketing website for **Italianish**, an authentic Italian & Spanish restaurant on Ocean Road, South Shields.

> Built as a sales / pitch demo by **Karthik Digital Services**.

---

## Live preview

Open `index.html` directly in a browser, or run a tiny local server:

```bash
# any one of these works
npx serve .
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## What's inside

| Section | Purpose |
|---|---|
| **Hero** | Sets the tone — full-screen food image, headline, ratings badge (Tripadvisor, Google, #2 in South Shields), CTA to book. |
| **About** | Story of Gio & Ele, key highlights (Travellers' Choice 2025, dietary options, parking). |
| **Menu** | Tabbed category view — Starters, Pasta, Pizza, Mains, Desserts. Real dishes pulled from public reviews & delivery menus. Cards hover and stay coloured when clicked. |
| **Reviews** | Six real guest reviews from Tripadvisor & Google, with hover/click colour change. |
| **Visit** | Opening hours, address, embedded Google map, "Get directions" CTA. |
| **Contact** | Booking form that opens the user's email app pre-filled (`mailto:` to `alelelara@gmail.com`). |
| **Footer** | Address, hours, social links (Facebook, Instagram, Tripadvisor), credit. |

---

## Project structure

```
italianish/
├── index.html        # Single-page site, semantic HTML5
├── css/
│   └── styles.css    # Design system — tokens, layout, components
├── js/
│   └── script.js     # Nav, tabs, reveal, card toggle, form
├── assets/           # (Reserved for future local images)
└── README.md
```

Clean separation — HTML for structure, CSS for design, JS for behaviour. No build step, no dependencies, no framework.

---

## Tech & design choices

- **HTML5 + CSS3 + vanilla JS** — zero build, zero dependencies. Easy to hand off, edit and host anywhere.
- **Fonts** — Playfair Display (display serif) + Manrope (body). Tabular & lining numerals enabled (`font-variant-numeric: tabular-nums lining-nums`) so prices and times stay perfectly aligned with no vertical jitter.
- **Palette** — warm trattoria: cream, terracotta, deep wine, olive, gold accents.
- **Mobile-first** — fluid typography (`clamp()`), CSS Grid, breakpoints at 600 / 720 / 880 / 980 / 1040 px.
- **Accessibility** — semantic landmarks, ARIA on tabs/menu, focus-visible styles, reduced-motion support.
- **Performance** — single CSS file, single JS file, fonts preconnected, lazy iframe map, no tracking scripts.
- **SEO basics** — descriptive title, meta description, theme-color, semantic structure.

---

## Customising for the client

When Italianish accepts the pitch, swap these:

| Where | What to update |
|---|---|
| `index.html` — hero `<img>` / `.hero-bg` | Replace the Unsplash URL with their own restaurant photo. |
| `index.html` — `.visual-1`, `.visual-2` | Swap About-section food images for their own. |
| `index.html` — Menu cards | Get the real menu PDF from Gio and update names + prices. |
| `index.html` — `mailto:alelelara@gmail.com` | Confirm or change the booking inbox. |
| `index.html` — phone numbers | Already real (0191 447 0270). |
| `index.html` — opening hours | Already real (sourced from Tripadvisor). |

---

## Free hosting + custom domain options

You asked specifically about free deployment with a custom domain. Here are the realistic options for a static HTML/CSS/JS site like this one, ranked best to worst for your use case:

### 1. **Cloudflare Pages** ✅ (recommended)
- **Free tier**: unlimited sites, unlimited bandwidth, fast global CDN.
- **Custom domain**: free — just point a domain at it.
- **Deploy**: connect a GitHub repo, push, done. Auto-deploys on every commit.
- **HTTPS**: automatic.
- **Why best**: bandwidth is unlimited (Netlify caps free at 100 GB/month). Cloudflare also sells `.com` domains roughly at cost (~£8/year), so you can buy the domain on the same account.

### 2. **Netlify**
- **Free tier**: 100 GB bandwidth/month — plenty for a single-restaurant site.
- **Custom domain**: free to attach. HTTPS auto.
- **Deploy**: drag-and-drop a folder or connect GitHub.
- **Pro**: dead-simple drag-and-drop UI if you don't want Git involved.

### 3. **Vercel**
- Same idea as Netlify. Excellent if the site grows into something needing serverless functions later.

### 4. **GitHub Pages**
- 100% free. Custom domain supported. HTTPS via Let's Encrypt.
- Limit: 1 GB site, 100 GB bandwidth/month soft limit.
- Deploy: push to a `gh-pages` branch (or main), enable Pages in repo settings.

### Domain registrar (the only thing that costs money)

A `.co.uk` or `.com` domain is around **£8–15 per year**. Genuinely free domains (`.tk`, `.ml`) are unreliable and look unprofessional — **do not use them for a paying client**. Cheapest legitimate options:

- **Cloudflare Registrar** — at-cost pricing, no markup. Best deal.
- **Namecheap** — `.com` ~£8/year, `.co.uk` ~£7/year.
- **GoDaddy** — fine but more expensive on renewal.

For a UK restaurant, `italianish.co.uk` would be ideal (check availability). Build the £8/year into your quote.

### Recommended setup for this project

```
1. Push this folder to a GitHub repo (e.g. github.com/karthik/italianish-website)
2. Sign in to Cloudflare → Pages → Connect to Git → select repo
3. Build settings: framework "None", build command empty, output "/"
4. Deploy. You get a URL like italianish-xxx.pages.dev
5. Buy italianish.co.uk on Cloudflare Registrar (~£8/year)
6. In Pages → Custom Domains → add italianish.co.uk → DNS auto-configured
7. Live with HTTPS in ~5 minutes.
```

---

## Pitching it to the client

A couple of practical notes for the sales conversation:

- They currently use a **Facebook page as their website link** on Tripadvisor. That's a real gap — you can show this on a phone vs your site to make the case.
- They have **1,000+ Tripadvisor reviews at 4.9** — the lack of a proper site is genuinely costing them direct bookings (people search "italianish south shields menu" and end up on Uber Eats / delivery aggregators that take a cut).
- A simple, professional site with a booking form sending to Gio's email = **direct customer relationship, no commission**.
- Sensible price points to consider for a UK small-business site like this:
  - One-off build: **£250–500**
  - Optional monthly maintenance + hosting: **£10–25/month** (you cover the £8/year domain, set up free Cloudflare Pages, charge them for ongoing tweaks, menu updates, photos, SEO).

---

## Future enhancements

- Real photos shoot at the restaurant (replace Unsplash placeholders).
- Online booking via OpenTable / ResDiary embed instead of mailto.
- Menu PDF download.
- Google Business Profile claim & integration.
- Basic SEO: `sitemap.xml`, `robots.txt`, schema.org Restaurant markup.
- Hreflang / Italian language version (Gio & Ele are Italian — could be a nice upsell).

---

© Karthik Digital Services — built for pitch to Italianish, South Shields.
