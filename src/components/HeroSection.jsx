import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const SERVICES = [
  { tag:'AI & ML',  icon:'🧠', color:0xF5302A, hex:'#F5302A', title:'Artificial Intelligence', pts:['Computer Vision','Generative AI Apps','Autonomous Agents'] },
  { tag:'IoT',      icon:'📡', color:0xff6b3d, hex:'#ff6b3d', title:'Smart IoT Systems',        pts:['Smart Device Integration','Industrial Automation','Real-time Monitoring'] },
  { tag:'ERP',      icon:'🔗', color:0xF5302A, hex:'#F5302A', title:'ERPNext Solutions',        pts:['Custom ERP Modules','Workflow Automation','Business Intelligence'] },
  { tag:'Web Dev',  icon:'⚡', color:0xff6b3d, hex:'#ff6b3d', title:'Web Development',          pts:['Modern React Apps','High Performance UI','Custom Platforms'] },
];
const CYCLING = ['Future Needs.','AI Solutions.','IoT Systems.','ERP Platforms.','Smart Products.'];

/* ── canvas card drawing helpers ── */
function rr(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}
function pl(scene,col,inten,dist,x,y,z){
  const l=new THREE.PointLight(col,inten,dist);
  l.position.set(x,y,z);scene.add(l);return l;
}

/* ══ ROBOT ══ */
function buildRobot(scene){
  const root=new THREE.Group();
  const metal=new THREE.MeshStandardMaterial({color:0x1a1a2e,metalness:0.9,roughness:0.2});
  const red=new THREE.MeshStandardMaterial({color:0xF5302A,metalness:0.7,roughness:0.3,emissive:new THREE.Color(0xF5302A),emissiveIntensity:0.4});
  const dark=new THREE.MeshStandardMaterial({color:0x080810,metalness:0.6,roughness:0.5});
  const glass=new THREE.MeshStandardMaterial({color:0x88ccff,transparent:true,opacity:0.8,roughness:0});
  const glow=new THREE.MeshStandardMaterial({color:0xF5302A,emissive:new THREE.Color(0xF5302A),emissiveIntensity:1.5,roughness:1});
  const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;root.add(m);return m;};
  add(new THREE.BoxGeometry(1.1,1.0,1.0),metal,0,2.7);
  add(new THREE.BoxGeometry(0.9,0.12,0.8),red,0,3.26);
  add(new THREE.CylinderGeometry(0.03,0.03,0.5,8),dark,0,3.57);
  add(new THREE.SphereGeometry(0.09,12,12),glow,0,3.85);
  add(new THREE.BoxGeometry(0.9,0.28,0.12),glass,0,2.78,0.52);
  add(new THREE.SphereGeometry(0.09,12,12),glow,-0.25,2.78,0.54);
  add(new THREE.SphereGeometry(0.09,12,12),glow,0.25,2.78,0.54);
  add(new THREE.BoxGeometry(0.5,0.06,0.08),red,0,2.44,0.52);
  [[-0.52,2.72],[0.52,2.72],[-0.52,2.9],[0.52,2.9]].forEach(([bx,by])=>{
    const b=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.1,8),red);
    b.rotation.z=Math.PI/2;b.position.set(bx,by,0);root.add(b);
  });
  add(new THREE.CylinderGeometry(0.18,0.22,0.28,12),dark,0,2.1);
  add(new THREE.BoxGeometry(1.6,1.5,0.9),metal,0,1.1);
  add(new THREE.BoxGeometry(0.9,0.7,0.12),red,0,1.2,0.48);
  add(new THREE.CircleGeometry(0.22,32),glow,0,1.28,0.55);
  [-0.3,0.3].forEach(x=>add(new THREE.BoxGeometry(0.05,0.5,0.06),dark,x,1.15,0.5));
  [-0.82,0.82].forEach(x=>add(new THREE.BoxGeometry(0.18,0.18,0.95),red,x,1.72));
  const arms={};
  [{key:'left',x:-1.1,sz:-1},{key:'right',x:1.1,sz:1}].forEach(({key,x,sz})=>{
    const g=new THREE.Group();
    const upper=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.18,0.75,10),metal);upper.position.y=-0.38;g.add(upper);
    const elbow=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,12),red);elbow.position.y=-0.78;g.add(elbow);
    const lower=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,0.7,10),metal);lower.position.y=-1.2;g.add(lower);
    const hand=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.3,0.28),dark);hand.position.y=-1.65;g.add(hand);
    [-0.08,0,0.08].forEach(kx=>{const k=new THREE.Mesh(new THREE.SphereGeometry(0.04,8,8),glow);k.position.set(kx,-1.52,0.15);g.add(k);});
    g.position.set(x,1.72,0);g.rotation.z=sz*0.15;root.add(g);arms[key]=g;
  });
  add(new THREE.BoxGeometry(1.3,0.32,0.8),dark,0,0.28);
  [-0.42,0.42].forEach(lx=>{
    const g=new THREE.Group();
    const ul=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.2,0.8,10),metal);ul.position.y=-0.4;g.add(ul);
    const kn=new THREE.Mesh(new THREE.SphereGeometry(0.22,12,12),red);kn.position.y=-0.84;g.add(kn);
    const ll=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.22,0.75,10),metal);ll.position.y=-1.28;g.add(ll);
    const ft=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.18,0.62),dark);ft.position.set(0,-1.72,0.1);g.add(ft);
    const toe=new THREE.Mesh(new THREE.BoxGeometry(0.38,0.14,0.18),red);toe.position.set(0,-1.72,0.38);g.add(toe);
    g.position.set(lx,0.26,0);root.add(g);
  });
  root.scale.setScalar(0.62);root.position.set(0,-0.15,0);
  scene.add(root);return{root,arms};
}

/* ══ ROBOT CANVAS — only parallax, no card zones ══ */
function RobotCanvas({ctrlRef}){
  const mountRef=useRef(null);
  useEffect(()=>{
    const mount=mountRef.current;if(!mount)return;
    const W=mount.clientWidth||560,H=mount.clientHeight||560;
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(W,H);renderer.shadowMap.enabled=true;
    mount.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(40,W/H,0.1,100);
    cam.position.set(0,0.2,10);
    scene.add(new THREE.AmbientLight(0xffffff,0.55));
    const key=new THREE.DirectionalLight(0xffffff,1.1);
    key.position.set(4,7,5);key.castShadow=true;scene.add(key);
    const redL=pl(scene,0xF5302A,4.0,16,-2,1,4);
    pl(scene,0x0044ff,1.2,10,4,-1,-2);
    pl(scene,0xF5302A,1.5,8,0,5,2);
    const flL=pl(scene,0xF5302A,1.0,6,0,-2,0);
    const{root:robot,arms}=buildRobot(scene);

    // Bg particles
    const cnt=180,geo=new THREE.BufferGeometry();
    const pos=new Float32Array(cnt*3),col=new Float32Array(cnt*3);
    for(let i=0;i<cnt;i++){
      pos[i*3]=(Math.random()-0.5)*18;pos[i*3+1]=(Math.random()-0.5)*11;pos[i*3+2]=(Math.random()-0.5)*6-2;
      const r=Math.random();col[i*3]=r>0.7?0.96:0.12;col[i*3+1]=r>0.7?0.19:0.06;col[i*3+2]=r>0.7?0.16:0.04;
    }
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.BufferAttribute(col,3));
    const field=new THREE.Points(geo,new THREE.PointsMaterial({vertexColors:true,size:0.055,transparent:true,opacity:0.65,sizeAttenuation:true}));
    scene.add(field);
    const oCnt=160,oGeo=new THREE.BufferGeometry(),oPos=new Float32Array(oCnt*3);
    for(let i=0;i<oCnt;i++){
      const r=1.5+Math.random()*1.8,th=Math.random()*Math.PI*2,ph=(Math.random()-0.5)*Math.PI;
      oPos[i*3]=r*Math.cos(th)*Math.cos(ph);oPos[i*3+1]=r*Math.sin(ph)*1.1;oPos[i*3+2]=r*Math.sin(th)*Math.cos(ph);
    }
    oGeo.setAttribute('position',new THREE.BufferAttribute(oPos,3));
    const orbit=new THREE.Points(oGeo,new THREE.PointsMaterial({color:0xF5302A,size:0.03,transparent:true,opacity:0.4,sizeAttenuation:true}));
    scene.add(orbit);
    const rings=[
      {r:1.6,tube:0.007,col:0xF5302A,tilt:0.35,spd:0.012},
      {r:2.3,tube:0.005,col:0xff6b3d,tilt:-0.5,spd:-0.008},
      {r:3.0,tube:0.003,col:0xF5302A,tilt:0.85,spd:0.005},
    ].map(({r,tube,col,tilt,spd})=>{
      const m=new THREE.Mesh(new THREE.TorusGeometry(r,tube,8,120),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.45}));
      m.rotation.x=tilt;m.userData.spd=spd;scene.add(m);return m;
    });
    const fd=new THREE.Mesh(new THREE.CircleGeometry(1.7,64),new THREE.MeshBasicMaterial({color:0xF5302A,transparent:true,opacity:0.06}));
    fd.rotation.x=-Math.PI/2;fd.position.y=-1.68;scene.add(fd);
    const fr=new THREE.Mesh(new THREE.RingGeometry(1.55,1.7,64),new THREE.MeshBasicMaterial({color:0xF5302A,transparent:true,opacity:0.28,side:THREE.DoubleSide}));
    fr.rotation.x=-Math.PI/2;fr.position.y=-1.67;scene.add(fr);

    // Arm poses for each service
    const ARM_POSES=[
      {armKey:'left', rotZ:0.85,rotX:-0.35},
      {armKey:'right',rotZ:-0.85,rotX:-0.35},
      {armKey:'left', rotZ:0.35,rotX:-1.05},
      {armKey:'right',rotZ:-0.3,rotX:0.32},
    ];
    const DEF={left:0.15,right:-0.15};
    let curArm=-1;

    const raiseArm=(idx)=>{
      if(idx===curArm)return;
      if(curArm>=0){
        const pp=ARM_POSES[curArm];
        gsap.to(arms[pp.armKey].rotation,{z:DEF[pp.armKey],x:0,duration:0.35,ease:'power3.out'});
      }
      curArm=idx;
      const pose=ARM_POSES[idx];
      gsap.to(arms[pose.armKey].rotation,{z:pose.rotZ,x:pose.rotX,duration:0.55,ease:'back.out(1.3)'});
      redL.color.setHex(SERVICES[idx].color);
      gsap.to(robot.rotation,{y:pose.armKey==='right'?0.24:-0.24,duration:0.45,ease:'power2.out'});
    };
    const resetArm=()=>{
      if(curArm<0)return;
      const pp=ARM_POSES[curArm];
      gsap.to(arms[pp.armKey].rotation,{z:DEF[pp.armKey],x:0,duration:0.45,ease:'power3.out'});
      gsap.to(robot.rotation,{y:0,duration:0.55,ease:'power3.out'});
      curArm=-1;redL.color.setHex(0xF5302A);
    };

    let ringsPaused=false;
    if(ctrlRef){
      ctrlRef.current={
        raiseArm,resetArm,
        pauseRings:()=>{ringsPaused=true;},
        resumeRings:()=>{ringsPaused=false;},
      };
    }

    let mn={x:0,y:0};
    const onMove=(e)=>{
      const rect=mount.getBoundingClientRect();
      mn={x:((e.clientX-rect.left)/rect.width-0.5)*2,y:-((e.clientY-rect.top)/rect.height-0.5)*2};
    };
    mount.addEventListener('mousemove',onMove);
    mount.addEventListener('mouseleave',()=>{mn={x:0,y:0};});

    let frame=0,rafId,sX=0,sY=0;
    const loop=()=>{
      rafId=requestAnimationFrame(loop);frame++;
      if(curArm<0){
        sX+=(mn.x*0.24-sX)*0.04;sY+=(mn.y*0.11-sY)*0.04;
        robot.rotation.y+=(sX-robot.rotation.y)*0.07;
        robot.rotation.x+=(sY*0.27-robot.rotation.x)*0.07;
      }
      robot.position.y=-0.15+Math.sin(frame*0.018)*0.07;
      const pulse=Math.sin(frame*0.07)*0.5+0.5;
      scene.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissiveIntensity>0)o.material.emissiveIntensity=0.45+pulse*1.05;});
      if(!ringsPaused)rings.forEach(r=>{r.rotation.z+=r.userData.spd;});
      orbit.rotation.y+=0.005;orbit.rotation.x=Math.sin(frame*0.005)*0.12;
      field.rotation.y+=0.0005;
      flL.intensity=0.8+Math.sin(frame*0.05)*0.22;
      redL.intensity=3.5+Math.sin(frame*0.04)*0.8;
      renderer.render(scene,cam);
    };
    loop();

    const onResize=()=>{const w=mount.clientWidth,h=mount.clientHeight;cam.aspect=w/h;cam.updateProjectionMatrix();renderer.setSize(w,h);};
    window.addEventListener('resize',onResize);
    return()=>{
      cancelAnimationFrame(rafId);
      if(ctrlRef)ctrlRef.current=null;
      mount.removeEventListener('mousemove',onMove);
      window.removeEventListener('resize',onResize);
      renderer.dispose();
      if(mount.contains(renderer.domElement))mount.removeChild(renderer.domElement);
    };
  },[]);
  return <div ref={mountRef} style={{width:'100%',height:'100%',position:'absolute',inset:0}}/>;
}

/* ══ HTML SERVICE CARD — positioned dynamically near label ══ */
function ServiceCard({svc, labelPos, visible, containerRect}){
  if(!visible||!labelPos||!containerRect) return null;

  // Card size
  const CW=340, CH=220;

  // Label position is relative to the orbit container
  // We need to decide: show card to the left or right of label?
  const lx=labelPos.x; // label center x relative to container
  const ly=labelPos.y; // label center y relative to container
  const cW=containerRect.width;
  const cH=containerRect.height;

  // Decide which side to open based on label quadrant
  let cardLeft, cardTop;

  // Horizontal: if label is on right half → card to the left; else → card to the right
  if(lx > cW*0.55){
    cardLeft = lx - CW - 18;
  } else {
    cardLeft = lx + 28;
  }
  // Vertical: if label is in bottom half → card goes up; else → card goes down
  if(ly > cH*0.55){
    cardTop = ly - CH - 10;
  } else {
    cardTop = ly + 10;
  }

  // Clamp so card never goes outside container
  cardLeft = Math.max(8, Math.min(cW - CW - 8, cardLeft));
  cardTop  = Math.max(8, Math.min(cH - CH - 8, cardTop));

  return(
    <div style={{
      position:'absolute',
      left: cardLeft,
      top:  cardTop,
      width: CW,
      zIndex:50,
      pointerEvents:'none',
      animation:'cardIn 0.32s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      <style>{`
        @keyframes cardIn{
          from{opacity:0;transform:scale(0.82) translateY(10px);}
          to{opacity:1;transform:scale(1) translateY(0);}
        }
      `}</style>
      <div style={{
        background:'linear-gradient(135deg,#0e0e1c 0%,#07070f 100%)',
        borderRadius:16,
        overflow:'hidden',
        border:`1.5px solid ${svc.hex}55`,
        boxShadow:`0 0 40px ${svc.hex}30, 0 12px 40px rgba(0,0,0,0.5)`,
        position:'relative',
      }}>
        {/* Left accent bar */}
        <div style={{
          position:'absolute',left:0,top:0,bottom:0,width:5,
          background:`linear-gradient(180deg,${svc.hex},${svc.hex}44)`,
          borderRadius:'16px 0 0 16px',
        }}/>

        {/* Top glow */}
        <div style={{
          position:'absolute',top:0,right:0,width:'60%',height:'60%',
          background:`radial-gradient(circle at top right,${svc.hex}22,transparent 70%)`,
          pointerEvents:'none',
        }}/>

        {/* Content */}
        <div style={{padding:'18px 18px 18px 22px'}}>
          {/* Header row */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div style={{
              width:42,height:42,borderRadius:'50%',flexShrink:0,
              background:`${svc.hex}20`,border:`1.5px solid ${svc.hex}60`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:20,boxShadow:`0 0 12px ${svc.hex}40`,
            }}>
              {svc.icon}
            </div>
            <div>
              <div style={{color:'#fff',fontWeight:700,fontSize:17,lineHeight:1.2,fontFamily:'inherit'}}>{svc.title}</div>
              <div style={{
                display:'inline-block',marginTop:4,
                padding:'2px 10px',borderRadius:100,fontSize:11,fontWeight:700,
                letterSpacing:'0.07em',textTransform:'uppercase',
                background:`${svc.hex}28`,color:svc.hex,fontFamily:'inherit',
              }}>{svc.tag}</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{height:1,background:'rgba(255,255,255,0.07)',margin:'0 0 12px 0'}}/>

          {/* Bullet rows */}
          {svc.pts.map((p,i)=>(
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:10,
              padding:'9px 12px',marginBottom:i<svc.pts.length-1?6:0,
              borderRadius:10,
              background:i===0?`${svc.hex}20`:'rgba(255,255,255,0.04)',
              border:`1px solid ${i===0?svc.hex+'45':'rgba(255,255,255,0.06)'}`,
            }}>
              <div style={{
                width:24,height:24,borderRadius:'50%',flexShrink:0,
                background:`${svc.hex}22`,border:`1.5px solid ${svc.hex}60`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:700,color:svc.hex,fontFamily:'inherit',
              }}>{i+1}</div>
              <span style={{
                color:'rgba(255,255,255,0.9)',
                fontSize:14,fontWeight:i===0?700:400,fontFamily:'inherit',
              }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Corner accents */}
        {[[6,6],[CW-11,6],[6,CH-11],[CW-11,CH-11]].map(([dx,dy],i)=>(
          <div key={i} style={{
            position:'absolute',left:dx,top:dy,
            width:5,height:5,borderRadius:'50%',background:`${svc.hex}88`,
          }}/>
        ))}
      </div>
    </div>
  );
}

/* ══ ORBITING LABELS — tracks its own pixel positions ══ */
const BASE_ANGLES=[Math.PI,0,-Math.PI/2,Math.PI/2];
const LABEL_DATA=[
  {idx:0,icon:'🧠',label:'AI & ML'},
  {idx:1,icon:'📡',label:'IoT'},
  {idx:2,icon:'🔗',label:'ERP'},
  {idx:3,icon:'⚡',label:'Web Dev'},
];

function OrbitLabelsAndCards({activeIdx,onEnter,onLeave}){
  const wrapRef=useRef(null);
  const rafRef=useRef(null);
  const angleRef=useRef(0);
  const pausedRef=useRef(false);
  // label pixel positions (center of each label)
  const [labelPositions,setLabelPositions]=useState([null,null,null,null]);
  const [containerRect,setContainerRect]=useState(null);

  useEffect(()=>{pausedRef.current=activeIdx>=0;},[activeIdx]);

  useEffect(()=>{
    const wrap=wrapRef.current;if(!wrap)return;
    const lblEls=Array.from(wrap.querySelectorAll('.ol'));
    const tick=()=>{
      rafRef.current=requestAnimationFrame(tick);
      if(!pausedRef.current)angleRef.current+=0.007;
      const ang=angleRef.current;
      const W=wrap.offsetWidth,H=wrap.offsetHeight;
      const cx=W/2,cy=H/2,rx=W*0.39,ry=H*0.37;
      const newPositions=[];
      lblEls.forEach((el,i)=>{
        const a=BASE_ANGLES[i]+ang;
        const x=cx+rx*Math.cos(a);
        const y=cy+ry*Math.sin(a);
        el.style.left=(x-el.offsetWidth/2)+'px';
        el.style.top =(y-el.offsetHeight/2)+'px';
        newPositions.push({x,y});
      });
      setLabelPositions([...newPositions]);
      setContainerRect({width:W,height:H});
    };
    tick();
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);

  return(
    <>
      <style>{`
        .ol-wrap{position:absolute;inset:0;z-index:30;pointer-events:none;}
        .ol{
          position:absolute;pointer-events:all;cursor:default;
          display:flex;align-items:center;gap:7px;
          padding:8px 18px 8px 12px;border-radius:100px;
          background:rgba(255,255,255,0.92);
          border:1.5px solid rgba(245,48,42,0.25);
          backdrop-filter:blur(10px);
          transition:background 0.2s,border-color 0.2s,box-shadow 0.2s,transform 0.15s;
          user-select:none;white-space:nowrap;
          box-shadow:0 2px 16px rgba(0,0,0,0.1);
          will-change:left,top;font-family:inherit;
        }
        .ol:hover,.ol.on{
          background:#F5302A !important;border-color:#F5302A !important;
          box-shadow:0 0 28px rgba(245,48,42,0.6),0 4px 20px rgba(0,0,0,0.2) !important;
          transform:scale(1.14) !important;
        }
        .ol-ico{font-size:14px;line-height:1;}
        .ol-dot{width:7px;height:7px;border-radius:50%;background:#F5302A;flex-shrink:0;transition:background 0.2s;}
        .ol:hover .ol-dot,.ol.on .ol-dot{background:#fff !important;}
        .ol-txt{font-size:clamp(11px,0.8vw,14px);font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#111;transition:color 0.2s;}
        .ol:hover .ol-txt,.ol.on .ol-txt{color:#fff !important;}
      `}</style>

      <div className="ol-wrap" ref={wrapRef}>
        {/* Labels */}
        {LABEL_DATA.map(({idx,icon,label})=>(
          <div
            key={idx}
            className={`ol${activeIdx===idx?' on':''}`}
            onMouseEnter={()=>onEnter(idx)}
            onMouseLeave={()=>onLeave()}
          >
            <span className="ol-ico">{icon}</span>
            <span className="ol-dot"/>
            <span className="ol-txt">{label}</span>
          </div>
        ))}

        {/* Cards — rendered inside same container so positions match */}
        {LABEL_DATA.map(({idx})=>(
          <ServiceCard
            key={idx}
            svc={SERVICES[idx]}
            labelPos={labelPositions[idx]}
            containerRect={containerRect}
            visible={activeIdx===idx}
          />
        ))}
      </div>
    </>
  );
}

/* ══ HERO SECTION ══ */
export default function HeroSection(){
  const started=useRef(false);
  const cycleRef=useRef(null);
  const cycleIdx=useRef(0);
  const [activeIdx,setActiveIdx]=useState(-1);
  const ctrlRef=useRef(null);

  const handleEnter=useCallback((idx)=>{
    setActiveIdx(idx);
    ctrlRef.current?.pauseRings();
    ctrlRef.current?.raiseArm(idx);
  },[]);

  const handleLeave=useCallback(()=>{
    setActiveIdx(-1);
    ctrlRef.current?.resumeRings();
    ctrlRef.current?.resetArm();
  },[]);

  useEffect(()=>{
    if(started.current)return;started.current=true;
    const D=4.2;
    gsap.set('.hero-badge',{x:-40,opacity:0});
    gsap.to('.hero-badge',{x:0,opacity:1,duration:0.6,ease:'power3.out',delay:D+0.2});
    const lines=gsap.utils.toArray('.hero-title .line-static span');
    gsap.set(lines,{y:'100%',opacity:0});
    gsap.to(lines,{y:'0%',opacity:1,duration:0.75,stagger:0.15,ease:'power4.out',delay:D+0.3});
    const cyc=cycleRef.current;
    gsap.set(cyc,{y:'100%',opacity:0});
    gsap.to(cyc,{y:'0%',opacity:1,duration:0.75,ease:'power4.out',delay:D+0.6,
      onComplete:()=>{
        setInterval(()=>{
          const next=(cycleIdx.current+1)%CYCLING.length;
          gsap.to(cyc,{y:'-110%',opacity:0,duration:0.5,ease:'power3.in',
            onComplete:()=>{cycleIdx.current=next;cyc.textContent=CYCLING[next];gsap.fromTo(cyc,{y:'110%',opacity:0},{y:'0%',opacity:1,duration:0.55,ease:'power3.out'});}
          });
        },2200);
      }
    });
    gsap.set('.hero-sub',{x:-40,opacity:0});
    gsap.to('.hero-sub',{x:0,opacity:1,duration:0.7,ease:'power3.out',delay:D+1.0});
    gsap.set('.hero-cta > *',{x:-30,opacity:0});
    gsap.to('.hero-cta > *',{x:0,opacity:1,duration:0.55,stagger:0.12,ease:'power3.out',delay:D+1.4});
    document.querySelectorAll('.cta-btn').forEach(btn=>{
      btn.addEventListener('mouseenter',()=>gsap.to(btn,{scale:1.05,duration:0.3,ease:'expo.out'}));
      btn.addEventListener('mouseleave',()=>gsap.to(btn,{scale:1,duration:0.4,ease:'elastic.out(1,0.5)'}));
    });
  },[]);

  return(
    <>
      <div id="center">
        <div id="left">
          <span className="hero-badge"><span className="badge-dot"/>Available for new projects</span>
          <h1 className="hero-title">
            <span className="line-wrap line-static"><span>We Build</span></span>
            <span className="line-wrap line-static"><span>What the</span></span>
            <span className="line-wrap line-cycling">
              <span ref={cycleRef} className="cycle-word" style={{color:'#F5302A',display:'block'}}>{CYCLING[0]}</span>
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

        <div id="right" style={{position:'relative',overflow:'hidden'}}>
          <div className="robo-aura"/>
          <div className="robo-ring robo-ring-1"/>
          <div className="robo-ring robo-ring-2"/>
          <div className="robo-ring robo-ring-3"/>

          <OrbitLabelsAndCards
            activeIdx={activeIdx}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />

          <div style={{position:'absolute',inset:0,zIndex:10}}>
            <RobotCanvas ctrlRef={ctrlRef}/>
          </div>
        </div>
      </div>
      <div id="hero-shape"/>
      <video autoPlay loop muted src="/video.mp4"/>
    </>
  );
}