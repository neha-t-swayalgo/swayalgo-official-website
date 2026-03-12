import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CYCLING_LINES = [
  { text: 'Future Needs.',   color: '#F5302A' },
  { text: 'AI Solutions.',   color: '#F5302A' },
  { text: 'IoT Systems.',    color: '#F5302A' },
  { text: 'ERP Platforms.',  color: '#F5302A' },
  { text: 'Smart Products.', color: '#F5302A' },
];

function HeroSection() {
  const started    = useRef(false);
  const cycleRef   = useRef(null);
  const cycleIndex = useRef(0);
  const roboRef    = useRef(null);
  const auraRef    = useRef(null);
  const rightRef   = useRef(null);
  const particlePool = useRef([]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const LOADER_DONE = 4.2;

    // ── BADGE ──────────────────────────────────────────────
    gsap.set('.hero-badge', { x: -40, opacity: 0 });
    gsap.to('.hero-badge', {
      x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      delay: LOADER_DONE + 0.2,
    });

    // ── HEADLINE static lines ──────────────────────────────
    const staticLines = gsap.utils.toArray('.hero-title .line-static span');
    gsap.set(staticLines, { y: '100%', opacity: 0 });
    gsap.to(staticLines, {
      y: '0%', opacity: 1, duration: 0.75, stagger: 0.15,
      ease: 'power4.out', delay: LOADER_DONE + 0.3,
    });

    // ── CYCLE LINE ─────────────────────────────────────────
    const cycleEl = cycleRef.current;
    gsap.set(cycleEl, { y: '100%', opacity: 0 });
    gsap.to(cycleEl, {
      y: '0%', opacity: 1, duration: 0.75, ease: 'power4.out',
      delay: LOADER_DONE + 0.6,
      onComplete: startCycle,
    });

    function startCycle() {
      const intervalId = setInterval(() => {
        const next = (cycleIndex.current + 1) % CYCLING_LINES.length;
        gsap.to(cycleEl, {
          y: '-110%', opacity: 0, duration: 0.5, ease: 'power3.in',
          onComplete: () => {
            cycleIndex.current = next;
            cycleEl.textContent = CYCLING_LINES[next].text;
            cycleEl.style.color = CYCLING_LINES[next].color;
            gsap.fromTo(cycleEl,
              { y: '110%', opacity: 0 },
              { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' }
            );
          },
        });
      }, 2200);
      return () => clearInterval(intervalId);
    }

    // ── SUB + CTA ──────────────────────────────────────────
    gsap.set('.hero-sub', { x: -40, opacity: 0 });
    gsap.to('.hero-sub', {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      delay: LOADER_DONE + 1.0,
    });

    gsap.set('.hero-cta > *', { x: -30, opacity: 0 });
    gsap.to('.hero-cta > *', {
      x: 0, opacity: 1, duration: 0.55, stagger: 0.12,
      ease: 'power3.out', delay: LOADER_DONE + 1.4,
    });

    document.querySelectorAll('.cta-btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'expo.out' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
    });

    // ══════════════════════════════════════════════════════
    // ROBOT — entrance from right
    // ══════════════════════════════════════════════════════
    const robo = roboRef.current;
    const aura = auraRef.current;
    const rightEl = rightRef.current;
gsap.set('.robo-badge-1', { x: -60, opacity: 0 });
gsap.set('.robo-badge-2', { x:  60, opacity: 0 });
gsap.set('.robo-badge-3', { x: -60, opacity: 0 });
gsap.set('.robo-badge-4', { x:  60, opacity: 0 });
gsap.set('.robo-badge-5', { y:  40, opacity: 0 });


    const entranceTl = gsap.timeline({ delay: LOADER_DONE + 0.5 });
entranceTl.to('.robo-badge-1, .robo-badge-2, .robo-badge-3, .robo-badge-4, .robo-badge-5', {
  x: 0, y: 0, opacity: 1,
  duration: 0.55, stagger: 0.1, ease: 'back.out(1.7)',
}, '-=0.3');

    // Gentle float loop
    gsap.to(robo, {
      y: -16, duration: 2.8, ease: 'sine.inOut',
      yoyo: true, repeat: -1, delay: LOADER_DONE + 1.8,
    });
    gsap.to(robo, {
      rotateZ: 1.2, duration: 3.5, ease: 'sine.inOut',
      yoyo: true, repeat: -1, delay: LOADER_DONE + 1.8,
    });

    // Aura pulse
    gsap.to(aura, {
      scale: 1.1, opacity: 0.5, duration: 2.4, ease: 'sine.inOut',
      yoyo: true, repeat: -1, delay: LOADER_DONE + 1.8,
    });

    // Rings spin
    gsap.to('.robo-ring-1', { rotation: 360,  duration: 14, ease: 'none', repeat: -1 });
    gsap.to('.robo-ring-2', { rotation: -360, duration: 22, ease: 'none', repeat: -1 });
    gsap.to('.robo-ring-3', { rotation: 360,  duration: 32, ease: 'none', repeat: -1 });
// ── BADGE MICRO-FLOAT (each badge bobs independently) ──────
gsap.to('.robo-badge-1', { y: -8,  duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: LOADER_DONE + 2.0 });
gsap.to('.robo-badge-2', { y:  8,  duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: LOADER_DONE + 2.2 });
gsap.to('.robo-badge-3', { y: -6,  duration: 3.0, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: LOADER_DONE + 1.9 });
gsap.to('.robo-badge-4', { y:  7,  duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: LOADER_DONE + 2.4 });
gsap.to('.robo-badge-5', { y: -10, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: LOADER_DONE + 2.1 });

// ── RING GLOW PULSE (alternating) ─────────────────────────
gsap.to('.robo-ring-1', {
  boxShadow: '0 0 20px rgba(245,48,42,0.4), inset 0 0 20px rgba(245,48,42,0.1)',
  duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
});
gsap.to('.robo-ring-3', {
  boxShadow: '0 0 30px rgba(245,48,42,0.2)',
  duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.9,
});

// ── SCANLINE SWEEP (re-triggered every 4s) ─────────────────
const scanEl = document.createElement('div');
scanEl.style.cssText = `
  position:absolute; left:0; width:100%; height:2px;
  background:linear-gradient(90deg,transparent,rgba(245,48,42,0.5),transparent);
  pointer-events:none; z-index:8; top:0;
`;
rightRef.current.appendChild(scanEl);
const runScan = () => {
  gsap.fromTo(scanEl,
    { top: '0%', opacity: 0.8 },
    { top: '100%', opacity: 0, duration: 1.8, ease: 'none',
      onComplete: () => setTimeout(runScan, 2500) }
  );
};
setTimeout(runScan, (LOADER_DONE + 2.2) * 1000);
    // ══════════════════════════════════════════════════════
    // PARALLAX ON MOUSE MOVE
    // ══════════════════════════════════════════════════════
    const onMouseMove = (e) => {
      const rect = rightEl.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2); // -1 → 1
      const dy = (e.clientY - cy) / (rect.height / 2);

      // Robot — strongest layer
      gsap.to(robo, {
        x: dx * 28,
        rotateY: dx * 10,
        rotateX: -dy * 6,
        duration: 0.85, ease: 'power2.out', overwrite: 'auto',
      });

      // Rings — counter-move for depth
      gsap.to('.robo-ring-1', { x: dx * 12, y: dy * 8,   duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.robo-ring-2', { x: dx * -8, y: dy * -6,  duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.robo-ring-3', { x: dx * 5,  y: dy * 4,   duration: 1.4, ease: 'power2.out', overwrite: 'auto' });

      // Aura drifts gently
      gsap.to(aura, { x: dx * 20, y: dy * 14, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });

      // Badges float opposite directions
      gsap.to('.robo-badge-1, .robo-badge-3, .robo-badge-5', { x: dx * -18, y: dy * -12, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
gsap.to('.robo-badge-2, .robo-badge-4',                { x: dx *  18, y: dy *  12, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
    };

    const onMouseLeave = () => {
      gsap.to(robo,  { x: 0, rotateY: 0, rotateX: 0, duration: 1.4, ease: 'elastic.out(1,0.45)' });
      gsap.to('.robo-ring-1, .robo-ring-2, .robo-ring-3', { x: 0, y: 0, duration: 1.1, ease: 'power3.out' });
      gsap.to(aura,  { x: 0, y: 0, duration: 1.1, ease: 'power3.out' });
     gsap.to('.robo-badge-1, .robo-badge-2, .robo-badge-3, .robo-badge-4, .robo-badge-5', { x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
    };

    rightEl.addEventListener('mousemove', onMouseMove);
    rightEl.addEventListener('mouseleave', onMouseLeave);

    // ══════════════════════════════════════════════════════
    // PARTICLE / SPARK TRAIL ON HOVER
    // ══════════════════════════════════════════════════════
    const COLORS = ['#F5302A', '#ff6b3d', '#ffb347', '#fff', '#ff2d55'];
    let spawnInterval = null;

    const spawnParticle = (x, y) => {
      const container = rightEl;
      const rect = container.getBoundingClientRect();

      const el = document.createElement('div');
      el.className = 'robo-spark';

      // Random shape: circle or diamond
      const isDiamond = Math.random() > 0.5;
      const size = 4 + Math.random() * 6;
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        z-index: 20;
        width: ${size}px;
        height: ${size}px;
        border-radius: ${isDiamond ? '2px' : '50%'};
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        left: ${x - rect.left}px;
        top: ${y - rect.top}px;
        transform: rotate(${isDiamond ? 45 : 0}deg);
        box-shadow: 0 0 ${size * 2}px currentColor;
      `;
      container.appendChild(el);

      const angle  = Math.random() * Math.PI * 2;
      const speed  = 40 + Math.random() * 80;
      const vx     = Math.cos(angle) * speed;
      const vy     = Math.sin(angle) * speed - 30; // slight upward bias

      gsap.to(el, {
        x: vx,
        y: vy + 60,  // gravity pull
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    };

    const roboImg = roboRef.current;

    const onRoboMouseEnter = () => {
      // Intensify glow on robot
      gsap.to(roboImg, {
        filter: 'drop-shadow(0 0 30px rgba(245,48,42,0.7)) drop-shadow(0 0 60px rgba(245,48,42,0.35))',
        scale: 1.03,
        duration: 0.4, ease: 'power2.out',
      });
      gsap.to(aura, { opacity: 0.85, scale: 1.15, duration: 0.4, ease: 'power2.out' });
    };

    const onRoboMouseMove = (e) => {
      // Spawn 2 sparks per move event (throttled by browser's mousemove rate)
      spawnParticle(e.clientX, e.clientY);
      if (Math.random() > 0.4) spawnParticle(e.clientX, e.clientY);
    };

    const onRoboMouseLeave = () => {
      gsap.to(roboImg, {
        filter: 'drop-shadow(0 40px 60px rgba(245,48,42,0.20)) drop-shadow(0 0 80px rgba(245,48,42,0.10))',
        scale: 1,
        duration: 0.6, ease: 'power3.out',
      });
      gsap.to(aura, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
    };

    roboImg.addEventListener('mouseenter', onRoboMouseEnter);
    roboImg.addEventListener('mousemove',  onRoboMouseMove);
    roboImg.addEventListener('mouseleave', onRoboMouseLeave);

    return () => {
      rightEl.removeEventListener('mousemove', onMouseMove);
      rightEl.removeEventListener('mouseleave', onMouseLeave);
      roboImg.removeEventListener('mouseenter', onRoboMouseEnter);
      roboImg.removeEventListener('mousemove',  onRoboMouseMove);
      roboImg.removeEventListener('mouseleave', onRoboMouseLeave);
      if (spawnInterval) clearInterval(spawnInterval);
    };
  }, []);

  return (
    <>
      <div id="center">
        <div id="left">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            Available for new projects
          </span>

          <h1 className="hero-title">
            <span className="line-wrap line-static">
              <span>We Build</span>
            </span>
            <span className="line-wrap line-static">
              <span>What the</span>
            </span>
            <span className="line-wrap line-cycling">
              <span
                ref={cycleRef}
                className="cycle-word"
                style={{ color: '#F5302A', display: 'block' }}
              >
                {CYCLING_LINES[0].text}
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            From AI systems to IoT hardware and enterprise ERP —
            we engineer solutions that scale, adapt, and deliver
            measurable results for forward-thinking businesses.
          </p>

          <div className="hero-cta">
            <button className="cta-btn">Start a Project →</button>
          </div>
        </div>

        {/* ── RIGHT: ROBOT ── */}
        {/* ── RIGHT: ROBOT ── */}
<div id="right" ref={rightRef}>

  <div ref={auraRef} className="robo-aura" />

  <div className="robo-ring robo-ring-1" />
  <div className="robo-ring robo-ring-2" />
  <div className="robo-ring robo-ring-3" />

  <img
    ref={roboRef}
    src="/dark_robo.png"
    alt="SwayAlgo AI Robot"
    className="robo-img"
  />

  {/* Badges OUTSIDE the img, positioned relative to #right */}
  <div className="robo-badge robo-badge-1">
    <span className="robo-badge-dot" />
    AI Powered
  </div>

  <div className="robo-badge robo-badge-2">
    <span className="robo-badge-icon">⚡</span>
    Real-time
  </div>

  <div className="robo-badge robo-badge-3">
    <span className="robo-badge-icon">📡</span>
    IoT Ready
  </div>

  <div className="robo-badge robo-badge-4">
    <span className="robo-badge-icon">🔗</span>
    ERP Integrated
  </div>

  <div className="robo-badge robo-badge-5">
    <span className="robo-badge-icon">🧠</span>
    Edge AI
  </div>

</div>
      </div>

      <div id="hero-shape"></div>
      <video autoPlay loop muted src="/video.mp4" />
    </>
  );
}

export default HeroSection;