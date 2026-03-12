import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Loader() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const loader  = document.getElementById('loader');
    const screen1 = document.getElementById('ls-1');
    const screen2 = document.getElementById('ls-2');
    const screen3 = document.getElementById('ls-3');
    const word1   = document.getElementById('ls-word1');
    const word2   = document.getElementById('ls-word2');
    const typed3  = document.getElementById('ls-typed');
    const cursor3 = document.getElementById('ls-cursor');

    // ── SCREEN 1: BUILD — black bg, white text ───────────────
    // Word slams in from below + scale
    gsap.fromTo(word1,
      { y: 120, opacity: 0, scale: 0.7, rotateX: 40 },
      { y: 0, opacity: 1, scale: 1, rotateX: 0,
        duration: 0.7, ease: 'expo.out', delay: 0.15 }
    );

    // After 1s — wipe screen1 up with clip-path
    setTimeout(() => {
      gsap.to(screen1, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.75,
        ease: 'expo.inOut',
        onComplete: () => { screen1.style.display = 'none'; }
      });
      // screen2 wipes in from bottom simultaneously
      gsap.fromTo(screen2,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.75, ease: 'expo.inOut' }
      );
    }, 1000);

    // ── SCREEN 2: WITH — cream bg, red text ──────────────────
    setTimeout(() => {
      gsap.fromTo(word2,
        { y: 80, opacity: 0, scale: 0.75 },
        { y: 0, opacity: 1, scale: 1,
          duration: 0.6, ease: 'expo.out' }
      );

      // Add a red underline that draws itself
      const underline = document.getElementById('ls-underline');
      gsap.fromTo(underline,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'expo.out', delay: 0.3,
          transformOrigin: 'left center' }
      );
    }, 1200);

    // After another 900ms — wipe to screen3
    setTimeout(() => {
      gsap.to(screen2, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.75,
        ease: 'expo.inOut',
        onComplete: () => { screen2.style.display = 'none'; }
      });
      gsap.fromTo(screen3,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.75, ease: 'expo.inOut' }
      );
    }, 2000);

    // ── SCREEN 3: SwayAlgo typed ──────────────────────────────
    const text       = 'SwayAlgo';
    const highlights = [0, 1, 2, 3]; // Sway = red

    setTimeout(() => {
      // Cursor blink already via CSS, just start typing
      let i = 0;
      function typeChar() {
        if (i >= text.length) {
          // Typing done — scale up entire word slightly then exit
          setTimeout(() => {
            gsap.to('#ls-typed-wrap', {
              scale: 1.08,
              duration: 0.35,
              ease: 'expo.out',
              yoyo: true,
              repeat: 1,
            });
            cursor3.style.animationPlayState = 'paused';
            gsap.to(cursor3, { opacity: 0, duration: 0.3, delay: 0.4 });

            // Wipe loader away upward
            setTimeout(() => {
              gsap.to(loader, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 0.9,
                ease: 'expo.inOut',
                onComplete: () => {
                  loader.style.display = 'none';
                }
              });
            }, 700);
          }, 500);
          return;
        }
        const span = document.createElement('span');
        span.style.color = highlights.includes(i) ? '#F5302A' : '#ffffff';
        span.textContent = text[i];
        // Each char pops in
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        typed3.appendChild(span);
        gsap.to(span, { opacity: 1, y: 0, duration: 0.25, ease: 'expo.out' });
        i++;
        setTimeout(typeChar, 90 + Math.random() * 55);
      }
      typeChar();
    }, 2750);

  }, []);

  return (
    <div id="loader">

      {/* SCREEN 1 — BUILD: black bg, white text */}
      <div id="ls-1" className="loader-screen ls-dark"
           style={{ clipPath: 'inset(0 0 0% 0)' }}>
        <div className="ls-word-wrap">
          <span id="ls-word1" className="ls-word"
                style={{ color: '#ffffff', opacity: 0 }}>BUILD</span>
        </div>
      </div>

      {/* SCREEN 2 — WITH: cream bg, red text */}
      <div id="ls-2" className="loader-screen ls-light"
           style={{ clipPath: 'inset(100% 0 0 0)' }}>
        <div className="ls-word-wrap">
          <span id="ls-word2" className="ls-word"
                style={{ color: '#F5302A', opacity: 0 }}>WITH</span>
          <div id="ls-underline"></div>
        </div>
      </div>

      {/* SCREEN 3 — SwayAlgo typed: black bg */}
      <div id="ls-3" className="loader-screen ls-dark"
           style={{ clipPath: 'inset(100% 0 0 0)' }}>
        <div id="ls-typed-wrap" className="ls-typed-wrap">
          <span className="ls-typed" id="ls-typed"></span>
          <span className="ls-cur" id="ls-cursor">|</span>
        </div>
      </div>

    </div>
  );
}

export default Loader;