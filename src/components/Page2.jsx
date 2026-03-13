import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'Vklik',            logo: '/vklik_6.png' },
  { name: 'Vidya Bharti',     logo: '/vidyabharati.webp' },
  { name: 'Hybrowlabs',       logo: '/logos/hybrowlabs.png' },
  { name: 'Techacademy',      logo: '/techacademy.png' },
  { name: 'Shantilal Muttha', logo: '/shantilal.png' },
  { name: 'Size Control',     logo: '/sizecontrol.png' },
  { name: 'Health Plus',      logo: '/healthplus.jpg' },
];

const repeatedClients = [...clients, ...clients, ...clients];

const PILLARS = [
  { number: '01', title: 'Scalable from Day 1',  body: 'No rebuilds when your business grows. Built to scale from the start.' },
  { number: '02', title: 'Engineering Mindset',  body: 'We solve root causes, not symptoms. Deep thinking before any line of code.' },
  { number: '03', title: 'Clear Communication',  body: 'No buzzwords. We talk business impact — what it costs, what it earns.' },
  { number: '04', title: 'Built Around People',  body: 'Systems that make work easier, not harder. Technology that serves your team.' },
  { number: '05', title: 'Independent Pillars',  body: 'AI · IoT · ERP used only where suitable. We never force a tool.' },
  { number: '06', title: 'Right Technology',     body: "We don't force technology. We choose the one that genuinely fits." },
];

const TickerRow = ({ onMouseEnter, onMouseLeave }) => (
  <>
    {repeatedClients.map((client, j) => (
      <div className="client-item" key={j} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={client.logo} alt={client.name} className="client-logo" />
        <span className="client-tooltip">{client.name}</span>
      </div>
    ))}
  </>
);

function Page2() {
  const tickerRef  = useRef(null);
  const sectionRef = useRef(null);

  const pauseTicker = () => {
    tickerRef.current?.querySelectorAll('.con').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  };
  const resumeTicker = () => {
    tickerRef.current?.querySelectorAll('.con').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  };

  useEffect(() => {
    // ── KEY FIX: set initial state via gsap.set so GSAP owns the property,
    // not the CSS. This prevents the "stuck invisible" bug when ScrollTrigger
    // miscalculates positions on first paint (happens on zoom / font-delay).
    gsap.set('.why-eyebrow, .why-heading, .why-sub', { y: 30, opacity: 0 });
    gsap.set('.pillar-card', { y: 40, opacity: 0, scale: 0.97 });

    const ctx = gsap.context(() => {

      // Header text animation
      gsap.to('.why-eyebrow, .why-heading, .why-sub', {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-header',
          start: 'top 90%',
          once: true,
          onEnter: (self) => {
            if (self.progress === 1) {
              gsap.set('.why-eyebrow, .why-heading, .why-sub', { y: 0, opacity: 1 });
            }
          },
        },
      });

      // Pillar cards entrance animation — slightly more dramatic with scale
      gsap.to('.pillar-card', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pillars-grid',
          start: 'top 90%',
          once: true,
          onEnter: (self) => {
            if (self.progress === 1) {
              gsap.set('.pillar-card', { y: 0, opacity: 1, scale: 1 });
            }
          },
        },
      });

      // ── MAGNETIC 3D TILT on each pillar card
      document.querySelectorAll('.pillar-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
          const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
          gsap.to(card, {
            rotateX: -y,
            rotateY:  x,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
      });

    }, sectionRef);

    // ── KEY FIX: Refresh ScrollTrigger after a short delay to account for
    // fonts, images, and layout shifts that happen after first paint.
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // ── SAFETY NET: If elements are still invisible after 1.5s
    // (e.g. page loaded already scrolled past them), force-show them.
    const safetyTimer = setTimeout(() => {
      const pillars = document.querySelectorAll('.pillar-card');
      const headers = document.querySelectorAll('.why-eyebrow, .why-heading, .why-sub');

      pillars.forEach(el => {
        const computed = window.getComputedStyle(el);
        if (parseFloat(computed.opacity) < 0.1) {
          gsap.set(el, { y: 0, opacity: 1, scale: 1 });
        }
      });

      headers.forEach(el => {
        const computed = window.getComputedStyle(el);
        if (parseFloat(computed.opacity) < 0.1) {
          gsap.set(el, { y: 0, opacity: 1 });
        }
      });
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div id="page2" ref={sectionRef}>

      {/* ── CLIENTS HEADER ── */}
      <div id="clients-header">
        <p className="clients-eyebrow">Trusted by industry leaders</p>
        <h2 className="clients-heading">Our Clients</h2>
        <p className="clients-subtext">Companies that trust SwayAlgo to power their technology</p>
      </div>

      {/* ── TICKER ── */}
      <div id="moving-text" ref={tickerRef}>
        <div className="con">
          <TickerRow onMouseEnter={pauseTicker} onMouseLeave={resumeTicker} />
        </div>
        <div className="con" aria-hidden="true">
          <TickerRow onMouseEnter={pauseTicker} onMouseLeave={resumeTicker} />
        </div>
      </div>

      {/* ── WHY SWAYALGO ── */}
      <div className="why-section">

        <div className="why-header">
          <span className="why-eyebrow">
            <span className="why-eyebrow-dot" />
            Why SwayAlgo
          </span>
          <h2 className="why-heading">
            We don't force technology.
            <br />
            <span className="why-accent">We choose the right one.</span>
          </h2>
          <p className="why-sub">
            Research. Innovate. Execute. Evolve. — not just a strategy, it is our way of thinking.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div className="pillar-card" key={p.number} style={{ transformStyle: 'preserve-3d' }}>
              {/* Ghost background number */}
              <span className="pillar-card-bg-num">{p.number}</span>

              <span className="pillar-num" style={{ color: i % 2 === 0 ? '#F5302A' : '#111' }}>
                {p.number}
              </span>
              <h4 className="pillar-title">{p.title}</h4>
              <p className="pillar-body">{p.body}</p>

              {/* Arrow indicator */}
              <span className="pillar-arrow">→</span>

              <div className="pillar-line" style={{ background: i % 2 === 0 ? '#F5302A' : '#111' }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Page2;