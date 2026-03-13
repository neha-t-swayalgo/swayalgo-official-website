import { useState, useRef, useEffect } from 'react';

/* ══ BRAND HOVER — unchanged ══ */
const LETTERS = [
  { char: 'S', group: 'sway' },{ char: 'w', group: 'sway' },
  { char: 'a', group: 'sway' },{ char: 'y', group: 'sway' },
  { char: 'A', group: 'algo' },{ char: 'l', group: 'algo' },
  { char: 'g', group: 'algo' },{ char: 'o', group: 'algo' },
];

function BrandHover() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const winMove = (e) => {
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const spans = el.querySelectorAll('[data-idx]');
          let closest = null, minDist = Infinity;
          spans.forEach((span) => {
            const sr = span.getBoundingClientRect();
            const cx = sr.left + sr.width / 2;
            const d = Math.abs(e.clientX - cx);
            if (d < minDist) { minDist = d; closest = parseInt(span.dataset.idx); }
          });
          setHoveredIdx(closest);
        });
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setHoveredIdx(null);
      }
    };
    window.addEventListener('mousemove', winMove);
    return () => { window.removeEventListener('mousemove', winMove); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const getStyle = (i) => {
    const base = { display:'inline-block', fontFamily:'inherit', fontSize:'clamp(64px,17vw,240px)', fontWeight:700, lineHeight:0.88, letterSpacing:'-4px', willChange:'transform,color,opacity', transition:'all 0.3s cubic-bezier(0.23,1,0.32,1)' };
    if (hoveredIdx === null) return { ...base, color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.18)', opacity:1, transform:'translateY(0px)' };
    const dist = Math.abs(i - hoveredIdx);
    const isSway = LETTERS[i].group === 'sway';
    const fillColor = isSway ? '#F5302A' : '#ffffff';
    if (dist === 0) return { ...base, color:fillColor, WebkitTextStroke:'0px transparent', opacity:1, transform:'translateY(-8px)', textShadow: isSway ? '0 0 80px rgba(245,48,42,0.6)' : '0 0 80px rgba(255,255,255,0.25)' };
    if (dist === 1) return { ...base, color:fillColor, WebkitTextStroke:'0px transparent', opacity:0.55, transform:'translateY(-4px)' };
    if (dist === 2) return { ...base, color:fillColor, WebkitTextStroke:'0px transparent', opacity:0.22, transform:'translateY(-1px)' };
    return { ...base, color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.18)', opacity:0.6, transform:'translateY(0px)' };
  };

  return (
    <div ref={containerRef} style={{ display:'flex', alignItems:'baseline', justifyContent:'center', cursor:'default', userSelect:'none', width:'100%', paddingBottom:8 }}>
      {LETTERS.map((l, i) => <span key={i} data-idx={i} style={getStyle(i)}>{l.char}</span>)}
    </div>
  );
}

/* ══ MAIN ══ */
export default function AboutUs() {
  return (
    <>
      <style>{`
        #footer        { overflow: visible !important; }
        #aboutus-root  { overflow: visible !important; }

        .au-link {
          font-size: clamp(14px, 1.15vw, 20px);
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          font-weight: 200;
          transition: color 0.2s, padding-left 0.18s;
          display: inline-block;
          line-height: 1;
        }
        .au-link:hover { color: rgba(255,255,255,0.88); padding-left: 5px; }

        .au-contact {
          font-size: clamp(14px, 1.15vw, 20px);
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          font-weight: 200;
          transition: color 0.2s;
          display: block;
          line-height: 1;
        }
        .au-contact:hover { color: #F5302A; }
      `}</style>

      <div id="aboutus-root" style={{ position:'relative', overflow:'visible', display:'flex', flexDirection:'column', height:'100%' }}>

        {/* ════ MAIN CONTENT — fills available height ════ */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',   /* anchor to bottom like Sheryians */
          padding: '0 3vw 3vw',
          gap: '4vw',
        }}>

          {/* LEFT */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2.2vw', maxWidth:'42vw' }}>

            {/* Headline */}
            <div>
              <h2 style={{
                fontSize: 'clamp(42px→82px)',
                fontWeight: 700, lineHeight: 1.05,
                letterSpacing: '-2.5px', color: '#ffffff',
                marginBottom: '0.9vw',
              }}>
                Building Tech<br />
                That <span style={{ color:'#F5302A' }}>Matters.</span>
              </h2>
              <p style={{
                fontSize: 'clamp(16px→26px)',
                lineHeight: 1.8, color: 'rgba(255,255,255,0.38)',
                fontWeight: 300,
              }}>
                AI / ML · IoT · ERP · Web &amp; App<br />
                for scalable business growth.
              </p>
            </div>

            {/* Contact */}
            <div style={{ display:'flex', flexDirection:'column', gap:'0.65vw' }}>
              <a href="mailto:contact@swayalgo.com" className="au-contact">contact@swayalgo.com</a>
              <a href="tel:+917620511463" className="au-contact">+91 76205 11463</a>
              <a href="https://www.linkedin.com/company/swayalgo-technologies-pvt-ltd" target="_blank" rel="noreferrer" className="au-contact">LinkedIn ↗</a>
            </div>

            {/* Legal tiny */}
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              {[['CIN','U62013PN2025PTC239744'],['GSTIN','27ABPCS6784A2ZV']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', gap:10, alignItems:'baseline' }}>
                  <span style={{ fontSize:'clamp(8px,0.52vw,10px)', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.14)', fontWeight:500, minWidth:40 }}>{k}</span>
                  <span style={{ fontSize:'clamp(10px,0.68vw,12px)', color:'rgba(255,255,255,0.22)', fontWeight:200 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — nav columns */}
          <div style={{ display:'flex', gap:'4.5vw', alignItems:'flex-start', paddingBottom:'0.2vw' }}>
            {[
              { title:'Company',  links:['About','Careers','Case Studies'] },
              { title:'Services', links:['AI / ML','IoT','ERP','Web & App'] },
              { title:'Legal',    links:['Privacy','Terms'] },
            ].map(col => (
              <div key={col.title} style={{ display:'flex', flexDirection:'column', gap:'1.05vw' }}>
                <h4 style={{
                  fontSize: 'clamp(9px, 0.68vw, 12px)',
                  letterSpacing: '0.22em', textTransform:'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                  fontWeight: 500, marginBottom:'0.3vw',
                }}>{col.title}</h4>
                {col.links.map(l => <a key={l} href="#" className="au-link">{l}</a>)}
              </div>
            ))}
          </div>
        </div>

        {/* ════ BRAND HOVER ════ */}
        <div style={{ overflow:'visible', lineHeight:0.85, width:'100%', display:'flex', justifyContent:'center' }}>
          <BrandHover />
        </div>

        {/* ════ COPYRIGHT ════ */}
        <div style={{
          padding: '0.8vw 3vw',
          display: 'flex', justifyContent:'space-between', alignItems:'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          fontSize: 'clamp(9px, 0.62vw, 11px)',
          color: 'rgba(255,255,255,0.18)', fontWeight:200, letterSpacing:'0.03em',
        }}>
          <span>© 2025 SwayAlgo Technologies Pvt Ltd</span>
          <span>contact@swayalgo.com · +91 76205 11463</span>
        </div>

      </div>
    </>
  );
}