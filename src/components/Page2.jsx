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
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();

    gsap.to('.why-eyebrow, .why-heading, .why-sub', {
      y: 0, opacity: 1,
      duration: 0.75, stagger: 0.14, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-header',
        start: 'top 88%',
        once: true,
      },
    });

    gsap.to('.why-stat-box', {
      y: 0, opacity: 1,
      duration: 0.55, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-stats-row',
        start: 'top 88%',
        once: true,
      },
    });

    gsap.to('.pillar-card', {
      y: 0, opacity: 1,
      duration: 0.65, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pillars-grid',
        start: 'top 88%',
        once: true,
      },
    });

  }, 120);

  return () => {
    clearTimeout(timer);
    ScrollTrigger.getAll().forEach(t => t.kill());
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
            <div className="pillar-card" key={p.number}>
              <span className="pillar-num" style={{ color: i % 2 === 0 ? '#F5302A' : '#111' }}>
                {p.number}
              </span>
              <h4 className="pillar-title">{p.title}</h4>
              <p className="pillar-body">{p.body}</p>
              <div className="pillar-line" style={{ background: i % 2 === 0 ? '#F5302A' : '#111' }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Page2;