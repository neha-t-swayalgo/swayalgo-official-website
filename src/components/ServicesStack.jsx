import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
{
num:'01',
tag:'AI & ML',
title:['Artificial','Intelligence'],
img:'/AI/ML.jpg',
desc:[
'Computer Vision Systems',
'Generative AI Applications',
'Autonomous AI Agents'
],
text:'Developing intelligent AI systems with offline capability, edge computing and advanced vision-based analytics for real-world automation.'
},

{
num:'02',
tag:'Hardware',
title:['IoT &','Embedded'],
img:'/IOT.jpg',
desc:[
'Smart Device Integration',
'Industrial Automation',
'Real-time Sensor Analytics'
],
text:'Designing smart connected hardware and IoT systems that capture, analyze and transform real-time data into intelligent decisions.'
},

{
num:'03',
tag:'Enterprise',
title:['ERPNext','Solutions'],
img:'/ERP.jpg',
desc:[
'Custom ERP Modules',
'Workflow Automation',
'Business Intelligence'
],
text:'Delivering powerful ERP systems that streamline operations, automate workflows and provide deep business intelligence.'
},

{
num:'04',
tag:'Frontend',
title:['Web','Development'],
img:'/WD.png',
desc:[
'Modern React Websites',
'High Performance UI',
'Custom Business Platforms'
],
text:'Crafting fast, scalable web applications and digital platforms with modern UI architecture and seamless user experiences.'
},

// {
// num:'05',
// tag:'Mobile',
// title:['Mobile App','Development'],
// img:'/Mobile.jpg',
// desc:[
// 'Android & iOS Apps',
// 'Cross Platform Apps',
// 'Scalable Mobile Architecture'
// ],
// text:'Building high-performance mobile apps designed for scalability, seamless UX and long-term product growth.'
// },

// {
// num:'06',
// tag:'Infrastructure',
// title:['Cloud &','DevOps'],
// img:'/Cloud.jpg',
// desc:[
// 'AWS / GCP Infrastructure',
// 'CI/CD Pipelines',
// 'Scalable Cloud Architecture'
// ],
// text:'Designing secure cloud infrastructures and DevOps pipelines that ensure performance, scalability and reliability.'
// },
];

const CARD_HEIGHT = 650;

function ServicesStack({ scrollInstance }) {
  const stackRef    = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!scrollInstance) return;
    if (initialized.current) return;
    initialized.current = true;
const stack = stackRef.current;
if (!stack) return;
const cards = Array.from(stack.querySelectorAll('.service-card'));
if (!cards.length) return;
const count = cards.length;

stack.style.height   = CARD_HEIGHT + 'px';
stack.style.overflow = 'visible';
stack.style.position = 'relative';

// Card 1 at bottom (z:1), Card 6 at top (z:6) — but cards 2-6 start BELOW (y: +100%)
gsap.set(cards[0], {
  position: 'absolute', top: 0, left: 0,
  width: '100%', height: CARD_HEIGHT + 'px',
  y: 0, scale: 1, zIndex: 1,
  transformOrigin: 'top center',
});

// Cards 2–6: start below the stack, each with increasing z-index
for (let i = 1; i < count; i++) {
  gsap.set(cards[i], {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: CARD_HEIGHT + 'px',
y: CARD_HEIGHT,
    scale: 1,
    zIndex: i + 1,          // higher index = higher z (comes on top)
    transformOrigin: 'top center',
  });
}

ScrollTrigger.getAll()
  .filter(t => t.trigger === document.querySelector('#page4'))
  .forEach(t => t.kill());

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#page4',
    scroller: '#main',
    start: 'top top',
 end: `+=${(count - 1) * 40}%`,
scrub: 0.8,
    pin: true,
    anticipatePin: 1,
    onRefresh: () => scrollInstance.update(),
  },
});

// Each step: slide next card UP from below onto the stack
for (let i = 1; i < count; i++) {
  tl.to(cards[i], {
    
    y: 0,
    duration: 1,
    ease: 'none',
  });
}

const t1 = setTimeout(() => scrollInstance.update(), 300);
const t2 = setTimeout(() => { scrollInstance.update(); ScrollTrigger.refresh(); }, 700);

return () => {
  clearTimeout(t1);
  clearTimeout(t2);
  ScrollTrigger.getAll()
    .filter(t => t.trigger === document.querySelector('#page4'))
    .forEach(t => t.kill());
  initialized.current = false;
};
  }, [scrollInstance]);

  return (
    <div id="page4">
      <div className="services-stack" ref={stackRef}>
        {services.map((s, i) => (
          <div className="service-card" key={i}>
        

{i % 2 === 0 && (
<div className="service-card-image">
<img src={s.img} alt={s.tag}/>
</div>
)}

<div className="service-card-left">
<div className="card-number">{s.num}</div>
<h2>{s.title[0]}<br />{s.title[1]}</h2>

<p className="service-main-text">{s.text}</p>

<p>
{s.desc[0]}<br/>
{s.desc[1]}<br/>
{s.desc[2]}
</p>
</div>

{i % 2 !== 0 && (
<div className="service-card-image">
<img src={s.img} alt={s.tag}/>
</div>
)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesStack;