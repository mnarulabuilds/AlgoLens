import{r as n,j as e}from"./index-CYsF4TiW.js";import{p as a}from"./styled-components.browser.esm-UVZUwTai.js";const ae=a.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
`,oe=a.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,se=a.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
`,ie=a.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,ce=a.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,w=a.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 6px;
`,j=a.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,M=a.input`
  width: 100%;
`,Y=a.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`,B=a.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${o=>o.primary?"linear-gradient(180deg, #7fe7ff, #2dd4ff)":"rgba(255, 255, 255, 0.06)"};
  color: ${o=>o.primary?"#041014":"rgba(255, 255, 255, 0.9)"};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`,le=a.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.35;
`;function $(o,c,i){return Math.max(c,Math.min(i,o))}function de(o){const c=(o+1)/2;if(c<.5){const d=c/.5;return[Math.floor(20+40*d),Math.floor(80+120*d),Math.floor(120+135*d)]}const i=(c-.5)/.5;return[Math.floor(35+220*i),Math.floor(35+140*i),Math.floor(40+60*i)]}function ue(){const o=n.useRef(null),c=n.useRef(null),i=n.useRef(0),d=n.useRef(0),[A,V]=n.useState(!0),[g,G]=n.useState(.45),[y,J]=n.useState(.12),[C,K]=n.useState(1),[E,N]=n.useState(!0),[m,Q]=n.useState(220),[R,U]=n.useState(1.25),s=n.useRef({w:0,h:0,imageData:null,data:null});n.useEffect(()=>{const t=c.current,r=o.current;if(!t||!r)return;const b=new ResizeObserver(()=>{const v=t.getBoundingClientRect(),l=$(window.devicePixelRatio||1,1,2);r.width=Math.max(1,Math.floor(v.width*l)),r.height=Math.max(1,Math.floor(v.height*l));const u=r.getContext("2d");u.setTransform(l,0,0,l,0,0);const S=Math.max(60,Math.floor(m)),p=Math.max(60,Math.floor(m));s.current.w=S,s.current.h=p,s.current.imageData=u.createImageData(S,p),s.current.data=s.current.imageData.data});return b.observe(t),()=>b.disconnect()},[m]);const f=n.useMemo(()=>[{x:.5-g/2,y:.5},{x:.5+g/2,y:.5}],[g]);return n.useEffect(()=>{const t=o.current;if(!t)return;const r=t.getContext("2d"),b=()=>{if(i.current=requestAnimationFrame(b),!s.current.imageData)return;const v=t.getBoundingClientRect(),l=v.width,u=v.height;A&&(d.current+=.016*C);const S=d.current,p=s.current.w,W=s.current.h,k=s.current.data,O=2*Math.PI/Math.max(1e-4,y),X=O*.35;let F=0;for(let h=0;h<W;h++){const z=h/(W-1);for(let x=0;x<p;x++){const I=x/(p-1);let q=0;for(let D=0;D<f.length;D++){const T=I-f[D].x,H=z-f[D].y,L=Math.sqrt(T*T+H*H),te=O*L-X*S,re=Math.sin(te),ne=E?1/(1+12*L):1;q+=re*ne}let P=$(q/1.6,-1,1);P=Math.sign(P)*Math.pow(Math.abs(P),1/R);const[Z,_,ee]=de(P);k[F++]=Z,k[F++]=_,k[F++]=ee,k[F++]=255}}r.save(),r.imageSmoothingEnabled=!0,r.clearRect(0,0,l,u),r.putImageData(s.current.imageData,0,0),r.globalCompositeOperation="source-over",r.drawImage(t,0,0,p,W,0,0,l,u),r.globalCompositeOperation="lighter",f.forEach((h,z)=>{const x=h.x*l,I=h.y*u;r.beginPath(),r.arc(x,I,6,0,Math.PI*2),r.fillStyle=z===0?"rgba(127,231,255,0.85)":"rgba(251,172,97,0.85)",r.fill(),r.beginPath(),r.arc(x,I,12,0,Math.PI*2),r.strokeStyle="rgba(255,255,255,0.35)",r.lineWidth=1,r.stroke()}),r.restore()};return i.current=requestAnimationFrame(b),()=>cancelAnimationFrame(i.current)},[E,R,A,f,C,y]),e.jsxs(ae,{children:[e.jsx(oe,{children:e.jsx(se,{ref:c,children:e.jsx(ie,{ref:o})})}),e.jsxs(ce,{children:[e.jsxs(Y,{children:[e.jsx(B,{primary:!0,onClick:()=>V(t=>!t),children:A?"Pause":"Play"}),e.jsx(B,{onClick:()=>{d.current=0},children:"Reset Time"})]}),e.jsxs(w,{children:["Source separation ",e.jsx(j,{children:g.toFixed(2)})]}),e.jsx(M,{type:"range",min:"0.10",max:"0.80",step:"0.01",value:g,onChange:t=>G(parseFloat(t.target.value))}),e.jsxs(w,{children:["Wavelength ",e.jsx(j,{children:y.toFixed(2)})]}),e.jsx(M,{type:"range",min:"0.05",max:"0.25",step:"0.005",value:y,onChange:t=>J(parseFloat(t.target.value))}),e.jsxs(w,{children:["Speed ",e.jsxs(j,{children:[C.toFixed(2),"×"]})]}),e.jsx(M,{type:"range",min:"0.2",max:"3.0",step:"0.05",value:C,onChange:t=>K(parseFloat(t.target.value))}),e.jsxs(w,{children:["Contrast ",e.jsx(j,{children:R.toFixed(2)})]}),e.jsx(M,{type:"range",min:"0.8",max:"2.0",step:"0.05",value:R,onChange:t=>U(parseFloat(t.target.value))}),e.jsxs(w,{children:["Render resolution ",e.jsxs(j,{children:[m,"px"]})]}),e.jsx(M,{type:"range",min:"120",max:"340",step:"10",value:m,onChange:t=>Q(parseInt(t.target.value,10))}),e.jsx(Y,{style:{marginTop:12},children:e.jsxs(B,{onClick:()=>N(t=>!t),children:["Attenuation: ",E?"On":"Off"]})}),e.jsxs(le,{children:["- Blue/orange regions indicate opposite phase.",e.jsx("br",{}),"- High contrast makes nodes (quiet bands) easier to see.",e.jsx("br",{}),"- Lower resolution improves performance on mobile."]})]})]})}const pe=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #05060b;
  min-height: 100vh;
  color: white;
`,he=a.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #7fe7ff;
  margin-bottom: 14px;
  text-align: center;
  text-shadow: 0 0 14px rgba(127, 231, 255, 0.35);
`,xe=a.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;function fe(){return e.jsxs(pe,{children:[e.jsx(he,{children:"Wave Interference"}),e.jsx(xe,{children:"Two sources emit waves and create an interference pattern. Adjust source separation, wavelength, and speed to see constructive/destructive regions."}),e.jsx(ue,{})]})}export{fe as default};
