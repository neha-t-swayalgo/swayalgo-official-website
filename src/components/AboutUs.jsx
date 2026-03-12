import { useEffect, useRef } from 'react';

export default function AboutUs() {
  const brandRef = useRef(null);
  const wrapRef  = useRef(null);

  useEffect(() => {
    const container = brandRef.current;
    const wrap      = wrapRef.current;
    if (!container || !wrap) return;

    container.innerHTML = '';

    [...'Sway'].forEach(char => {
      const span = document.createElement('span');
      span.className = 'brand-letter brand-sway';
      span.textContent = char;
      container.appendChild(span);
    });

    [...'Algo'].forEach(char => {
      const span = document.createElement('span');
      span.className = 'brand-letter brand-algo';
      span.textContent = char;
      container.appendChild(span);
    });

    const reset = () => {
      container.querySelectorAll('.brand-letter').forEach(l => {
        l.style.color = 'transparent';
        l.style.webkitTextStroke = '1.5px #555';
        l.style.opacity = '1';
      });
    };

const handleMouseMove = (e) => {
  const letters = container.querySelectorAll('.brand-letter');
  
  // Use the CONTAINER (where letters actually are), not the wrap
  const rect = container.getBoundingClientRect();
  
  // If mouse is outside the actual text area, reset
  if (e.clientX < rect.left || e.clientX > rect.right) {
    reset();
    return;
  }
  
  const x = e.clientX - rect.left;
  const letterWidth = rect.width / letters.length;
  const idx = Math.min(letters.length - 1, Math.max(0, Math.floor(x / letterWidth)));

  letters.forEach((l, i) => {
    const dist = Math.abs(i - idx);
    const isSway = l.classList.contains('brand-sway');
    const fillColor = isSway ? '#F5302A' : '#f4f0eb';

    if (dist === 0) {
      l.style.color = fillColor;
      l.style.webkitTextStroke = '0px transparent';
      l.style.opacity = '1';
    } else if (dist === 1) {
      l.style.color = fillColor;
      l.style.webkitTextStroke = '0px transparent';
      l.style.opacity = '0.6';
    } else if (dist === 2) {
      l.style.color = fillColor;
      l.style.webkitTextStroke = '0px transparent';
      l.style.opacity = '0.3';
    } else {
      l.style.color = 'transparent';
      l.style.webkitTextStroke = '1.5px #555';
      l.style.opacity = '1';
    }
  });
};

    // Attach to the container div itself (where the letters are)
wrap.addEventListener('mousemove', handleMouseMove);
wrap.addEventListener('mouseleave', reset);

 

return () => {
  wrap.removeEventListener('mousemove', handleMouseMove);  
  wrap.removeEventListener('mouseleave', reset);
};
  }, []);

  return (
    <div id="aboutus-root">

      <section className="au-section">
        <p className="au-label">About Us</p>
        <div className="au-grid">
          <div className="au-left">
            <h2 className="au-heading">
              Building Tech<br />That <span>Matters.</span>
            </h2>
            <p className="au-body">
              We build intelligent AI/ML systems, ERP platforms, IoT solutions,
              and high-performance applications — choosing the right technology,
              never forcing it.
            </p>
          </div>
          <div className="au-right-col">
            <div className="au-info-row">
              <span className="au-info-key">CIN</span>
              <span className="au-info-val">U62013PN2025PTC239744</span>
            </div>
            <div className="au-info-row">
              <span className="au-info-key">GSTIN</span>
              <span className="au-info-val">27ABPCS6784A2ZV</span>
            </div>
            <div className="au-info-row">
              <span className="au-info-key">Email</span>
              <span className="au-info-val">
                <a href="mailto:contact@swayalgo.com">contact@swayalgo.com</a>
              </span>
            </div>
            <div className="au-info-row">
              <span className="au-info-key">Phone</span>
              <span className="au-info-val">
                <a href="tel:+917620511463">+91 76205 11463</a>
              </span>
            </div>
            <div className="au-info-row">
              <span className="au-info-key">LinkedIn</span>
              <span className="au-info-val">
                <a href="https://www.linkedin.com/company/swayalgo-technologies-pvt-ltd" target="_blank" rel="noreferrer">SwayAlgo Technologies ↗</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="au-footer-top">
        <p className="au-tagline">
          AI · IoT · ERP · Web &amp; App<br />for scalable business growth.
        </p>
        <div className="au-footer-links">
          <div className="au-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Case Studies</a></li>
            </ul>
          </div>
          <div className="au-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#">AI / ML</a></li>
              <li><a href="#">IoT</a></li>
              <li><a href="#">ERP</a></li>
              <li><a href="#">Web &amp; App</a></li>
            </ul>
          </div>
          <div className="au-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BIG BRAND NAME ── */}
      <div className="au-brand-wrap" ref={wrapRef}>
        <div className="au-brand" ref={brandRef} />
      </div>

      <div className="au-copy">
        <span>© 2025 SwayAlgo Technologies Pvt Ltd</span>
        <span>contact@swayalgo.com · +91 76205 11463</span>
      </div>

    </div>
  );
}