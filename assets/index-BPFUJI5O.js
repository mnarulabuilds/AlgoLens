import{r as o,j as e}from"./index-CYsF4TiW.js";import{p as r}from"./styled-components.browser.esm-UVZUwTai.js";const K=r.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`,Q=r.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,X=r.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
`,Z=r.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,_=r.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`,W=r.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  backdrop-filter: blur(8px);
`,ee=r.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,te=r.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`,z=r.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${t=>t.primary?"linear-gradient(180deg, #7fe7ff, #2dd4ff)":"rgba(255, 255, 255, 0.06)"};
  color: ${t=>t.primary?"#041014":"rgba(255, 255, 255, 0.9)"};
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
`,P=r.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 10px 0 6px;
`,F=r.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,T=r.input`
  width: 100%;
`,ne=r.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`,S=r.div`
  padding: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`,y=r.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
`,R=r.div`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  font-variant-numeric: tabular-nums;
`;function re(t,p,d){return Math.max(p,Math.min(d,t))}function E(t){return t.toLocaleString(void 0,{maximumFractionDigits:0})}function ie(){const t=o.useRef(null),p=o.useRef(null),d=o.useRef(0),[f,a]=o.useState(!0),[s,h]=o.useState(800),[g,q]=o.useState(1),[b,O]=o.useState(2),[m,U]=o.useState(!0),w=o.useRef({total:0,inside:0}),[j,B]=o.useState({total:0,inside:0}),v=o.useMemo(()=>{const{total:n,inside:i}=j;return n>0?4*i/n:0},[j]);o.useEffect(()=>{const n=p.current,i=t.current;if(!n||!i)return;const c=new ResizeObserver(()=>{const l=n.getBoundingClientRect(),u=re(window.devicePixelRatio||1,1,2);i.width=Math.max(1,Math.floor(l.width*u)),i.height=Math.max(1,Math.floor(l.height*u));const x=i.getContext("2d");x.setTransform(u,0,0,u,0,0),x.clearRect(0,0,l.width,l.height),G(x,l.width,l.height,m)});return c.observe(n),()=>c.disconnect()},[m]);const H=()=>{w.current={total:0,inside:0},B({total:0,inside:0});const n=t.current;if(!n)return;const i=n.getContext("2d"),c=n.getBoundingClientRect();i.clearRect(0,0,c.width,c.height),G(i,c.width,c.height,m)};return o.useEffect(()=>{const n=t.current;if(!n)return;const i=n.getContext("2d");let c=0;const l=()=>{if(d.current=requestAnimationFrame(l),!f)return;const u=n.getBoundingClientRect(),x=u.width,C=u.height;c++,m&&c%90===0&&(i.save(),i.globalAlpha=.12,G(i,x,C,!0),i.restore());const I=Math.floor(s*g),A=Math.min(x,C)*.48,V=x/2,Y=C/2;let D=0;for(let L=0;L<I;L++){const M=Math.random()*2-1,k=Math.random()*2-1,N=M*M+k*k<=1;N&&D++;const $=V+M*A,J=Y+k*A;i.fillStyle=N?"rgba(127,231,255,0.9)":"rgba(251,172,97,0.75)",i.fillRect($,J,b,b)}w.current.total+=I,w.current.inside+=D,c%6===0&&B({...w.current})};return d.current=requestAnimationFrame(l),()=>cancelAnimationFrame(d.current)},[s,b,f,m,g]),e.jsxs(K,{children:[e.jsx(Q,{children:e.jsxs(X,{ref:p,children:[e.jsx(Z,{ref:t}),e.jsxs(_,{children:[e.jsx(W,{children:f?"RUNNING":"PAUSED"}),e.jsxs(W,{children:["π ≈ ",v?v.toFixed(6):"—"]})]})]})}),e.jsxs(ee,{children:[e.jsxs(te,{children:[e.jsx(z,{primary:!0,onClick:()=>a(n=>!n),children:f?"Pause":"Play"}),e.jsx(z,{onClick:H,children:"Reset"}),e.jsxs(z,{onClick:()=>U(n=>!n),children:["Guides: ",m?"On":"Off"]})]}),e.jsxs(P,{children:["Points per frame ",e.jsx(F,{children:E(s)})]}),e.jsx(T,{type:"range",min:"100",max:"5000",step:"50",value:s,onChange:n=>h(parseInt(n.target.value,10))}),e.jsxs(P,{children:["Speed ",e.jsxs(F,{children:[g.toFixed(2),"×"]})]}),e.jsx(T,{type:"range",min:"0.25",max:"3.0",step:"0.05",value:g,onChange:n=>q(parseFloat(n.target.value))}),e.jsxs(P,{children:["Dot size ",e.jsxs(F,{children:[b,"px"]})]}),e.jsx(T,{type:"range",min:"1",max:"6",step:"1",value:b,onChange:n=>O(parseInt(n.target.value,10))}),e.jsxs(ne,{children:[e.jsxs(S,{children:[e.jsx(y,{children:"Total points"}),e.jsx(R,{children:E(j.total)})]}),e.jsxs(S,{children:[e.jsx(y,{children:"Inside circle"}),e.jsx(R,{children:E(j.inside)})]}),e.jsxs(S,{children:[e.jsx(y,{children:"Estimate"}),e.jsx(R,{children:v?v.toFixed(6):"—"})]}),e.jsxs(S,{children:[e.jsx(y,{children:"Error vs π"}),e.jsx(R,{children:j.total>0?Math.abs(Math.PI-v).toFixed(6):"—"})]})]})]})]})}function G(t,p,d,f){if(!f)return;const a=Math.min(p,d)*.48,s=p/2,h=d/2,g=t.createLinearGradient(0,0,0,d);g.addColorStop(0,"rgba(2,6,23,1)"),g.addColorStop(1,"rgba(0,0,0,1)"),t.fillStyle=g,t.fillRect(0,0,p,d),t.strokeStyle="rgba(255,255,255,0.25)",t.lineWidth=1,t.strokeRect(s-a,h-a,2*a,2*a),t.beginPath(),t.arc(s,h,a,0,Math.PI*2),t.strokeStyle="rgba(127,231,255,0.35)",t.lineWidth=2,t.stroke(),t.strokeStyle="rgba(255,255,255,0.10)",t.lineWidth=1,t.beginPath(),t.moveTo(s-a,h),t.lineTo(s+a,h),t.moveTo(s,h-a),t.lineTo(s,h+a),t.stroke()}const oe=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(
    circle at 20% 10%,
    #0b1020 0%,
    #05060b 55%,
    #000 100%
  );
  min-height: 100vh;
  color: #eef2ff;
`,ae=r.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #7fe7ff;
  margin: 0 0 10px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(127, 231, 255, 0.35);
`,se=r.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;function le(){return e.jsxs(oe,{children:[e.jsx(ae,{children:"Monte Carlo Estimation of π"}),e.jsx(se,{children:"Random points are thrown into a square. The ratio that land inside the inscribed circle approaches \\( \\pi/4 \\). Try adjusting batch size and speed for smoother/faster convergence."}),e.jsx(ie,{})]})}export{le as default};
