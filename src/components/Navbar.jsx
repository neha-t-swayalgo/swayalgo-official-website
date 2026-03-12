import { useEffect } from 'react';
import gsap from 'gsap';

function Navbar() {
  useEffect(() => {
    // Menu open/close — same logic as menuAnimation()
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

    // Nav items animate in after loader exits (~4.2s)
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
