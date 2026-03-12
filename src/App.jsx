import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import Loader        from './components/Loader';
import Navbar        from './components/Navbar';
import HeroSection   from './components/HeroSection';
import Page2         from './components/Page2';
import ServicesStack from './components/ServicesStack';
import Footer        from './components/Footer';
import AboutUs       from './components/AboutUs';   // ← new

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrollInstance, setScrollInstance] = useState(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,
    });
    window._loco = scroll;

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

    setTimeout(() => {
      scroll.update();
      ScrollTrigger.refresh();
      setScrollInstance(scroll);
    }, 800);

    return () => {
      scroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div id="fixed-image"></div>
      <Loader />

      {/* ⬇️ ABOUT US — sits fixed behind #main as a curtain */}
      <div id="footer">
        <AboutUs />
      </div>

      {/* #main scrolls UP revealing AboutUs underneath = curtain effect */}
      <div id="main">
        <div id="page1">
          <Navbar />
          <HeroSection />
        </div>
       
        <ServicesStack scrollInstance={scrollInstance} />
         <Page2 />
        <Footer />
      </div>
    </>
  );
}

export default App;