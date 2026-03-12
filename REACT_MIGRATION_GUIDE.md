# SwayAlgo — Complete React.js Migration Guide
## From Vanilla HTML/CSS/JS → React (Vite + GSAP + Locomotive Scroll)

---

## PHASE 1: PROJECT SETUP

### Step 1 — Create the Vite + React Project

Open your terminal and run:

```bash
npm create vite@latest swayalgo-react -- --template react
cd swayalgo-react
npm install
```

### Step 2 — Install All Dependencies

```bash
npm install gsap locomotive-scroll lucide-react swiper
```

### Step 3 — Final Folder Structure

After all steps, your project should look like this:

```
swayalgo-react/
├── public/
│   ├── swayalgo-logo.png        ← copy from original
│   ├── icon.png                 ← copy from original
│   ├── video.mp4                ← copy from original
│   ├── NeueHaasDisplayMediu.ttf ← copy from original
│   ├── NeueHaasDisplayLight.ttf ← copy from original
│   └── NeueHaasDisplayRoman.ttf ← copy from original
├── src/
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Page2.jsx
│   │   ├── ServicesStack.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── main.css             ← your full style.css pasted here
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

### Step 4 — Copy Static Assets

Copy these files from your original project into the `public/` folder:
- `swayalgo-logo.png`
- `icon.png`
- `video.mp4`
- `NeueHaasDisplayMediu.ttf`
- `NeueHaasDisplayLight.ttf`
- `NeueHaasDisplayRoman.ttf`

---

## PHASE 2: CONFIGURE index.html

Replace `index.html` in your project root with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SwayAlgo</title>
    <link rel="icon" href="/icon.png" type="image/x-icon" />
    <!-- Locomotive Scroll CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css"
    />
    <!-- Swiper CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## PHASE 3: CREATE src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## PHASE 4: CREATE src/styles/main.css

Create `src/styles/main.css` and paste your **complete style.css** content inside it.
Then ADD these lines at the very top (for font-face with public/ path):

```css
/* Fonts are served from /public — Vite serves public/ at root */
@font-face {
    font-family: neu;
    src: url('/NeueHaasDisplayMediu.ttf');
}
@font-face {
    font-family: neu;
    font-weight: 100;
    src: url('/NeueHaasDisplayLight.ttf');
}
@font-face {
    font-family: neu;
    font-weight: 200;
    src: url('/NeueHaasDisplayRoman.ttf');
}
/* ... rest of your CSS below ... */
```

⚠️ NOTE: In Vite, files in `public/` are served at the root `/` path.
So font URLs change from `url(./font.ttf)` → `url('/font.ttf')`

---

## PHASE 5: CREATE ALL COMPONENTS

### src/components/Loader.jsx

```jsx
import { useEffect } from 'react';

function Loader() {
  // No changes to this logic — direct port from loaderAnimation()
  useEffect(() => {
    const lines = [
      { el: 'typed1', cur: 'cur1', lineEl: 'line1', text: 'BUILD',    highlights: [] },
      { el: 'typed2', cur: 'cur2', lineEl: 'line2', text: 'WITH',     highlights: [] },
      { el: 'typed3', cur: 'cur3', lineEl: 'line3', text: 'SwayAlgo', highlights: [0,1,2,3] },
    ];

    function typeText(lineIndex, charIndex) {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          document.getElementById('cur3').style.display = 'none';
          setTimeout(() => {
            document.getElementById('loader').style.top = '-100%';
          }, 600);
        }, 500);
        return;
      }

      const { el, cur, lineEl, text, highlights } = lines[lineIndex];
      const typedEl = document.getElementById(el);
      const curEl   = document.getElementById(cur);
      const lineElm = document.getElementById(lineEl);

      lineElm.style.opacity = '1';

      if (charIndex < text.length) {
        const span = document.createElement('span');
        if (highlights.includes(charIndex)) span.className = 'highlight';
        span.textContent = text[charIndex];
        typedEl.appendChild(span);
        setTimeout(() => typeText(lineIndex, charIndex + 1), 60 + Math.random() * 60);
      } else {
        setTimeout(() => {
          curEl.style.animation = 'none';
          curEl.style.opacity   = '0';
          setTimeout(() => typeText(lineIndex + 1, 0), 150);
        }, 300);
      }
    }

    setTimeout(() => typeText(0, 0), 400);
  }, []);

  return (
    <div id="loader">
      <div id="loader-inner">
        <div className="loader-line" id="line1">
          <span className="typed-text" id="typed1"></span>
          <span className="cursor" id="cur1">|</span>
        </div>
        <div className="loader-line" id="line2" style={{ opacity: 0 }}>
          <span className="typed-text" id="typed2"></span>
          <span className="cursor" id="cur2">|</span>
        </div>
        <div className="loader-line" id="line3" style={{ opacity: 0 }}>
          <span className="typed-text" id="typed3"></span>
          <span className="cursor" id="cur3">|</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
```

---

### src/components/Navbar.jsx

```jsx
import { useEffect } from 'react';
import gsap from 'gsap';

function Navbar() {
  useEffect(() => {
    // Menu animation — same logic as menuAnimation()
    const menu   = document.querySelector('nav h3');
    const full   = document.querySelector('#full-scr');
    const navimg = document.querySelector('nav img');
    let flag = 0;

    if (menu) {
      menu.addEventListener('click', () => {
        if (flag === 0) {
          full.style.top       = '0';
          navimg.style.opacity = '0';
          flag = 1;
        } else {
          full.style.top       = '-100%';
          navimg.style.opacity = '1';
          flag = 0;
        }
      });
    }

    // Nav animation — triggered after loader (4.2s)
    const LOADER_DONE = 4.2;
    gsap.set('#nav-part2 h4', { y: -20, opacity: 0 });
    gsap.to('#nav-part2 h4', {
      y: 0, opacity: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.out',
      delay: LOADER_DONE + 0.1,
    });
  }, []);

  return (
    <nav>
      <img src="/swayalgo-logo.png" alt="SwayAlgo Logo" />
      <div id="nav-part2">
        <h4><a href="#">Home</a></h4>
        <h4><a href="#">Services</a></h4>
        <h4><a href="#">Case Studies</a></h4>
        <h4><a href="#">About Us</a></h4>
        <h4 className="nav-cta"><a href="#">Get a Quote →</a></h4>
      </div>
      <h3>Menu</h3>
    </nav>
  );
}

export default Navbar;
```

---

### src/components/HeroSection.jsx

```jsx
import { useEffect } from 'react';
import { createIcons, BrainCircuit, Cpu, Database } from 'lucide';
import gsap from 'gsap';

function HeroSection() {
  useEffect(() => {
    // Lucide icons — same as lucide.createIcons()
    createIcons({ icons: { BrainCircuit, Cpu, Database } });

    const LOADER_DONE = 4.2;

    // ── BADGE ──────────────────────────────────────────
    gsap.set('.hero-badge', { y: 16, opacity: 0 });
    gsap.to('.hero-badge', {
      y: 0, opacity: 1,
      duration: 0.6, ease: 'power3.out',
      delay: LOADER_DONE + 0.2,
    });

    // ── HEADLINE line-by-line reveal ───────────────────
    const titleLines = gsap.utils.toArray('.hero-title .line-wrap span');
    gsap.set(titleLines, { y: '110%', opacity: 0 });
    gsap.to(titleLines, {
      y: '0%', opacity: 1,
      duration: 0.75,
      stagger: 0.18,
      ease: 'power4.out',
      delay: LOADER_DONE + 0.35,
    });

    // ── SUB TEXT ───────────────────────────────────────
    gsap.set('.hero-sub', { y: 18, opacity: 0 });
    gsap.to('.hero-sub', {
      y: 0, opacity: 1,
      duration: 0.7, ease: 'power3.out',
      delay: LOADER_DONE + 1.0,
    });

    // ── STATS ROW ──────────────────────────────────────
    gsap.set('.hero-stats', { y: 14, opacity: 0 });
    gsap.to('.hero-stats', {
      y: 0, opacity: 1,
      duration: 0.6, ease: 'power3.out',
      delay: LOADER_DONE + 1.2,
    });

    // Count-up numbers
    document.querySelectorAll('.stat-number').forEach((el) => {
      const target = el.textContent;
      const num    = parseInt(target);
      const suffix = target.replace(/[0-9]/g, '');
      gsap.fromTo(el,
        { textContent: '0' + suffix },
        {
          textContent: num + suffix,
          duration: 1.5,
          ease: 'power2.out',
          delay: LOADER_DONE + 1.3,
          snap: { textContent: 1 },
          onUpdate() {
            const v = Math.round(parseFloat(this.targets()[0].textContent));
            el.textContent = v + suffix;
          },
        }
      );
    });

    // ── CTA ────────────────────────────────────────────
    gsap.set('.hero-cta > *', { y: 16, opacity: 0 });
    gsap.to('.hero-cta > *', {
      y: 0, opacity: 1,
      duration: 0.55,
      stagger: 0.12,
      ease: 'power3.out',
      delay: LOADER_DONE + 1.4,
    });

    // ── CARDS entrance ─────────────────────────────────
    gsap.set('.card', { x: 70, opacity: 0, scale: 0.94 });
    gsap.to('.card', {
      x: 0, opacity: 1, scale: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      delay: LOADER_DONE + 0.5,
      clearProps: 'scale',
    });

    // ── CARDS floating ─────────────────────────────────
    const floatDelay = LOADER_DONE + 2.5;
    gsap.to('.card1', { y: '-=10', duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: floatDelay });
    gsap.to('.card2', { y: '-=7',  duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: floatDelay + 0.4 });
    gsap.to('.card3', { y: '-=9',  duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: floatDelay + 0.8 });

    // ── MAGNETIC TILT on cards ─────────────────────────
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect  = card.getBoundingClientRect();
        const dx    = (e.clientX - rect.left - rect.width  / 2) / rect.width;
        const dy    = (e.clientY - rect.top  - rect.height / 2) / rect.height;
        gsap.to(card, {
          rotateX: dy * 8, rotateY: -dx * 8,
          transformPerspective: 800,
          ease: 'power1.out', duration: 0.4,
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      });
    });
  }, []);

  return (
    <>
      <div id="center">
        {/* LEFT */}
        <div id="left">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            Available for new projects
          </span>

          <h1 className="hero-title">
            <span className="line-wrap"><span>We Build</span></span>
            <span className="line-wrap"><span>What the</span></span>
            <span className="line-wrap"><span className="accent">Future Needs.</span></span>
          </h1>

          <p className="hero-sub">
            From AI systems to IoT hardware and enterprise ERP —
            we engineer solutions that scale, adapt, and deliver
            measurable results for forward-thinking businesses.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>

          <div className="hero-cta">
            <button className="cta-btn">Start a Project →</button>
            <a href="#" className="cta-secondary">View Our Work</a>
          </div>
        </div>

        {/* RIGHT - Cards */}
        <div id="right">
          <div id="hero-cards">
            <div className="card card1">
              <i data-lucide="brain-circuit" className="card-icon"></i>
              <span className="card-label">Most Popular</span>
              <h3>Artificial Intelligence</h3>
              <p>Computer Vision · Generative AI<br />Autonomous Agents · Offline AI</p>
              <div className="card-footer"><span>Explore →</span></div>
            </div>

            <div className="card card2">
              <i data-lucide="cpu" className="card-icon"></i>
              <span className="card-label">Hardware</span>
              <h3>IoT & Embedded</h3>
              <p>Smart Devices · Industrial Automation<br />Real-time Sensor Analytics</p>
              <div className="card-footer"><span>Explore →</span></div>
            </div>

            <div className="card card3">
              <i data-lucide="database" className="card-icon"></i>
              <span className="card-label">Enterprise</span>
              <h3>ERPNext Solutions</h3>
              <p>Custom Modules · Workflow Automation<br />Business Intelligence</p>
              <div className="card-footer"><span>Explore →</span></div>
            </div>
          </div>
        </div>
      </div>

      <div id="hero-shape"></div>
      <video autoPlay loop muted src="/video.mp4"></video>
    </>
  );
}

export default HeroSection;
```

---

### src/components/Page2.jsx

```jsx
function Page2() {
  return (
    <div id="page2">
      <div id="moving-text">
        {[0, 1, 2].map((i) => (
          <div className="con" key={i}>
            <h1>EXPERIENCES</h1><div id="gola"></div>
            <h1>CONTENT</h1><div id="gola"></div>
            <h1>ENVIRONMENTS</h1><div id="gola"></div>
          </div>
        ))}
      </div>

      <div id="page2-bottom">
        <h1>
          We are a group of design-driven, goal-focused creators, producers,
          and designers who believe that the details make all the difference.
        </h1>
        <div id="bottom-part2">
          <img
            src="https://uploads-ssl.webflow.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d1_Holding_thumb-p-500.jpg"
            alt=""
          />
          <p>
            We love to create, we love to solve, we love to collaborate, and
            we love to turn amazing ideas into reality. We're here to partner
            with you through every step of the process.
          </p>
        </div>
      </div>

      <div id="gooey"></div>
    </div>
  );
}

export default Page2;
```

---

### src/components/ServicesStack.jsx

```jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: '01', title: 'Artificial\nIntelligence', desc: 'Computer Vision Systems\nGenerative AI Applications\nAutonomous AI Agents', tag: 'AI & ML' },
  { num: '02', title: 'IoT &\nEmbedded',          desc: 'Smart Device Integration\nIndustrial Automation\nReal-time Sensor Analytics', tag: 'Hardware' },
  { num: '03', title: 'ERPNext\nSolutions',        desc: 'Custom ERP Modules\nWorkflow Automation\nBusiness Intelligence', tag: 'Enterprise' },
  { num: '04', title: 'Web\nDevelopment',          desc: 'Modern React Websites\nHigh Performance UI\nCustom Business Platforms', tag: 'Frontend' },
  { num: '05', title: 'Mobile App\nDevelopment',   desc: 'Android & iOS Apps\nCross Platform Apps\nScalable Mobile Architecture', tag: 'Mobile' },
  { num: '06', title: 'Cloud &\nDevOps',           desc: 'AWS / GCP Infrastructure\nCI/CD Pipelines\nScalable Cloud Architecture', tag: 'Infrastructure' },
];

function ServicesStack({ scrollInstance }) {
  useEffect(() => {
    if (!scrollInstance) return;

    const stack      = document.querySelector('.services-stack');
    const cards      = stack.querySelectorAll('.service-card');
    const cardCount  = cards.length;
    const cardHeight = 500;
    const peekOffset = 30;

    stack.style.height = cardHeight + 'px';

    gsap.set(cards, {
      y: (i) => i === 0 ? 0 : cardHeight,
      zIndex: (i) => i + 1,
      transformOrigin: 'top center',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#page4',
        scroller: '#main',
        start: 'top top',
        end: `+=${cardCount * 120}%`,
        scrub: 1,
        pin: true,
      },
    });

    for (let i = 1; i < cardCount; i++) {
      tl.to(cards[i], { y: (i - 1) * peekOffset, duration: 1, ease: 'none' });
      tl.to(cards[i - 1], {
        scale: 0.97,
        y: (i - 1) * peekOffset - peekOffset * 0.5,
        duration: 1, ease: 'none',
      }, '<');
    }
  }, [scrollInstance]);

  return (
    <div id="page4">
      <div className="services-stack">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-card-left">
              <div className="card-number">{s.num}</div>
              <h2 dangerouslySetInnerHTML={{ __html: s.title.replace('\n', '<br/>') }} />
              <p dangerouslySetInnerHTML={{ __html: s.desc.replace(/\n/g, '<br/>') }} />
            </div>
            <div className="service-card-right">
              <span className="card-tag">{s.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesStack;
```

---

### src/components/Footer.jsx

```jsx
function Footer() {
  return (
    <>
      <div id="page5"></div>
      <div id="full-scr">
        <div id="full-div1"></div>
      </div>
      <div id="footer">
        <div id="footer-div"></div>
        <h1>ABOUT US</h1>
        <div id="footer-bottom"></div>
      </div>
    </>
  );
}

export default Footer;
```

---

## PHASE 6: CREATE src/App.jsx (THE MAIN FILE)

This is the most important file — it wires everything together including Locomotive Scroll + ScrollTrigger sync (same as your original script.js top section):

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

import Loader    from './components/Loader';
import Navbar    from './components/Navbar';
import HeroSection  from './components/HeroSection';
import Page2     from './components/Page2';
import ServicesStack from './components/ServicesStack';
import Footer    from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrollInstance, setScrollInstance] = useState(null);

  useEffect(() => {
    // Locomotive Scroll init — same as your original script.js
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,
    });

    // Sync with ScrollTrigger — exact same code as original
    scroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('#main', {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();

    setScrollInstance(scroll);

    return () => {
      scroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Fixed image hover element (from original) */}
      <div id="fixed-image"></div>

      {/* Loader overlay */}
      <Loader />

      {/* Main scroll container — MUST keep id="main" for locomotive */}
      <div id="main">
        <div id="page1">
          <Navbar />
          <HeroSection />
        </div>

        <Page2 />
        <ServicesStack scrollInstance={scrollInstance} />
        <Footer />
      </div>
    </>
  );
}

export default App;
```

---

## PHASE 7: FIX KNOWN REACT GOTCHAS

### 1. `class` → `className` (already done in components above)
React uses `className` instead of `class`:
```jsx
// ❌ HTML
<div class="card card1">

// ✅ React
<div className="card card1">
```

### 2. `for` → `htmlFor` on labels
```jsx
// ❌ HTML: <label for="input">
// ✅ React: <label htmlFor="input">
```

### 3. Self-closing tags
```jsx
// ❌ HTML: <video autoplay loop muted>
// ✅ React: <video autoPlay loop muted src="/video.mp4" />
//           Note: autoPlay (camelCase) in React
```

### 4. `style` as object not string
```jsx
// ❌ HTML: style="opacity:0"
// ✅ React: style={{ opacity: 0 }}
```

### 5. Lucide icons — import individually
```jsx
// ❌ Old: <script src="unpkg.com/lucide"> then lucide.createIcons()
// ✅ React: import { BrainCircuit, Cpu, Database } from 'lucide-react'
//   Then use as: <BrainCircuit className="card-icon" />
```

Update HeroSection.jsx cards to use Lucide React components directly:
```jsx
import { BrainCircuit, Cpu, Database } from 'lucide-react';

// Replace <i data-lucide="brain-circuit" className="card-icon"></i>
// With:
<BrainCircuit className="card-icon" />
<Cpu className="card-icon" />
<Database className="card-icon" />
```

---

## PHASE 8: RUN THE PROJECT

```bash
# Make sure you're in the project folder
cd swayalgo-react

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser. ✅

### Build for Production:
```bash
npm run build
# Output goes to /dist folder — deploy this to any hosting
```

---

## QUICK REFERENCE: HTML → React Attribute Changes

| HTML Attribute | React Attribute |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `autoplay` | `autoPlay` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `style="color:red"` | `style={{ color: 'red' }}` |
| `<!-- comment -->` | `{/* comment */}` |

---

## SUMMARY CHECKLIST

- [ ] `npm create vite@latest swayalgo-react -- --template react`
- [ ] `npm install gsap locomotive-scroll lucide-react swiper`
- [ ] Copy assets to `public/` folder (logo, fonts, video, icon)
- [ ] Update `index.html` (add locomotive CSS + swiper CSS links)
- [ ] Create `src/styles/main.css` (paste full style.css, fix font paths to `/`)
- [ ] Create `src/components/Loader.jsx`
- [ ] Create `src/components/Navbar.jsx`
- [ ] Create `src/components/HeroSection.jsx`
- [ ] Create `src/components/Page2.jsx`
- [ ] Create `src/components/ServicesStack.jsx`
- [ ] Create `src/components/Footer.jsx`
- [ ] Create `src/App.jsx`
- [ ] Update `src/main.jsx`
- [ ] `npm run dev` → open localhost:5173
