import{r as s,j as e}from"./index-CYsF4TiW.js";import{p as r}from"./styled-components.browser.esm-UVZUwTai.js";const de=r.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
`,pe=r.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,xe=r.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
`,he=r.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,ge=r.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`,Z=r.div`
  pointer-events: none;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  backdrop-filter: blur(8px);
`,ue=r.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
`,_=r.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,O=r.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${o=>o.primary?"linear-gradient(180deg, #fbac61, #e98c2f)":"rgba(255, 255, 255, 0.06)"};
  color: ${o=>o.primary?"#111827":"rgba(255, 255, 255, 0.9)"};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`,W=r.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,j=r.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.9rem;
  margin-bottom: 6px;
`,v=r.span`
  color: rgba(255, 255, 255, 0.68);
  font-variant-numeric: tabular-nums;
`,M=r.input`
  width: 100%;
`;function ee(o,h,d){return Math.max(h,Math.min(d,o))}function me(o,h,d){const T=d(o),z=o.map((g,a)=>g+h/2*T[a]),y=d(z),B=o.map((g,a)=>g+h/2*y[a]),S=d(B),q=o.map((g,a)=>g+h*S[a]),l=d(q);return o.map((g,a)=>g+h/6*(T[a]+2*y[a]+2*S[a]+l[a]))}function fe(){const o=s.useRef(null),h=s.useRef(null),d=s.useRef(0),T=s.useRef(0),z=s.useRef([]),[y,B]=s.useState(!0),[S,q]=s.useState(!0),[l,g]=s.useState(1),[a,te]=s.useState(1),[p,ne]=s.useState(1.2),[x,ae]=s.useState(1),[R,se]=s.useState(9.81),[I,re]=s.useState(.01),[G,oe]=s.useState(1),[L,ie]=s.useState(600),A=s.useRef({state:[Math.PI/2,0,Math.PI/2+.2,0]}),J=s.useMemo(()=>n=>{const t=n[0],c=n[1],u=n[2],i=n[3],f=t-u,k=2*l+a-a*Math.cos(2*f),E=c,w=i,b=(-R*(2*l+a)*Math.sin(t)-a*R*Math.sin(t-2*u)-2*Math.sin(f)*a*(i*i*x+c*c*p*Math.cos(f)))/(p*k),D=2*Math.sin(f)*(c*c*p*(l+a)+R*(l+a)*Math.cos(t)+i*i*x*a*Math.cos(f))/(x*k);return[E,b-I*c,w,D-I*i]},[l,a,p,x,R,I]);s.useEffect(()=>{const n=h.current,t=o.current;if(!n||!t)return;const c=new ResizeObserver(()=>{const u=n.getBoundingClientRect(),i=ee(window.devicePixelRatio||1,1,2);t.width=Math.max(1,Math.floor(u.width*i)),t.height=Math.max(1,Math.floor(u.height*i)),t.getContext("2d").setTransform(i,0,0,i,0,0)});return c.observe(n),()=>c.disconnect()},[]);const K=(n=!1)=>{A.current.state=n?[(Math.random()*1.4+.2)*Math.PI,0,(Math.random()*1.4+.2)*Math.PI,0]:[Math.PI/2,0,Math.PI/2+.2,0],z.current=[]};return s.useEffect(()=>{const n=o.current;if(!n)return;const t=n.getContext("2d"),c=u=>{d.current=requestAnimationFrame(c);const i=T.current||u;T.current=u;const f=u-i,k=ee(f/1e3,0,.033)*G,E=n.getBoundingClientRect(),w=E.width,b=E.height;t.clearRect(0,0,w,b);const D=t.createLinearGradient(0,0,0,b);if(D.addColorStop(0,"#020617"),D.addColorStop(1,"#000000"),t.fillStyle=D,t.fillRect(0,0,w,b),y){const m=k>0?Math.ceil(k/.008):1,F=k/m;for(let C=0;C<m;C++)A.current.state=me(A.current.state,F,J)}const[Q,,X]=A.current.state,P={x:w/2,y:b*.18},U=Math.min(w,b)*.38/(p+x),H=P.x+p*U*Math.sin(Q),Y=P.y+p*U*Math.cos(Q),$=H+x*U*Math.sin(X),V=Y+x*U*Math.cos(X);if(S){const m=z.current;m.push({x:$,y:V}),m.length>L&&m.splice(0,m.length-L),t.save(),t.globalCompositeOperation="lighter",t.lineWidth=2,t.beginPath();for(let C=0;C<m.length;C++){const N=m[C];C===0?t.moveTo(N.x,N.y):t.lineTo(N.x,N.y)}const F=t.createLinearGradient(0,0,w,b);F.addColorStop(0,"rgba(59,130,246,0.0)"),F.addColorStop(.5,"rgba(59,130,246,0.35)"),F.addColorStop(1,"rgba(251,172,97,0.55)"),t.strokeStyle=F,t.stroke(),t.restore()}t.lineWidth=3,t.strokeStyle="rgba(255,255,255,0.75)",t.beginPath(),t.moveTo(P.x,P.y),t.lineTo(H,Y),t.lineTo($,V),t.stroke();const ce=8+l*4,le=8+a*4;t.fillStyle="#60a5fa",t.beginPath(),t.arc(H,Y,ce,0,Math.PI*2),t.fill(),t.fillStyle="#fbac61",t.beginPath(),t.arc($,V,le,0,Math.PI*2),t.fill(),t.fillStyle="rgba(255,255,255,0.85)",t.beginPath(),t.arc(P.x,P.y,4,0,Math.PI*2),t.fill()};return d.current=requestAnimationFrame(c),()=>cancelAnimationFrame(d.current)},[J,p,x,l,a,y,S,G,L]),e.jsxs(de,{children:[e.jsx(pe,{children:e.jsxs(xe,{ref:h,children:[e.jsx(he,{ref:o}),e.jsxs(ge,{children:[e.jsx(Z,{children:y?"RUNNING":"PAUSED"}),e.jsx(Z,{children:"Drag not enabled • Use controls"})]})]})}),e.jsxs(ue,{children:[e.jsxs(_,{children:[e.jsx(O,{primary:!0,onClick:()=>B(n=>!n),children:y?"Pause":"Play"}),e.jsx(O,{onClick:()=>K(!1),children:"Reset"}),e.jsx(O,{onClick:()=>K(!0),children:"Randomize"})]}),e.jsxs(W,{children:[e.jsxs(j,{children:["Mass 1 ",e.jsx(v,{children:l.toFixed(2)})]}),e.jsx(M,{type:"range",min:"0.4",max:"3.0",step:"0.05",value:l,onChange:n=>g(parseFloat(n.target.value))}),e.jsxs(j,{children:["Mass 2 ",e.jsx(v,{children:a.toFixed(2)})]}),e.jsx(M,{type:"range",min:"0.4",max:"3.0",step:"0.05",value:a,onChange:n=>te(parseFloat(n.target.value))})]}),e.jsxs(W,{children:[e.jsxs(j,{children:["Length 1 ",e.jsxs(v,{children:[p.toFixed(2)," m"]})]}),e.jsx(M,{type:"range",min:"0.5",max:"2.2",step:"0.05",value:p,onChange:n=>ne(parseFloat(n.target.value))}),e.jsxs(j,{children:["Length 2 ",e.jsxs(v,{children:[x.toFixed(2)," m"]})]}),e.jsx(M,{type:"range",min:"0.5",max:"2.2",step:"0.05",value:x,onChange:n=>ae(parseFloat(n.target.value))})]}),e.jsxs(W,{children:[e.jsxs(j,{children:["Gravity ",e.jsxs(v,{children:[R.toFixed(2)," m/s²"]})]}),e.jsx(M,{type:"range",min:"0.0",max:"20.0",step:"0.1",value:R,onChange:n=>se(parseFloat(n.target.value))}),e.jsxs(j,{children:["Damping ",e.jsx(v,{children:I.toFixed(3)})]}),e.jsx(M,{type:"range",min:"0.0",max:"0.08",step:"0.001",value:I,onChange:n=>re(parseFloat(n.target.value))}),e.jsxs(j,{children:["Speed ",e.jsxs(v,{children:[G.toFixed(2),"×"]})]}),e.jsx(M,{type:"range",min:"0.2",max:"3.0",step:"0.05",value:G,onChange:n=>oe(parseFloat(n.target.value))})]}),e.jsxs(W,{children:[e.jsx(_,{children:e.jsxs(O,{onClick:()=>q(n=>!n),style:{minWidth:140},children:["Trail: ",S?"On":"Off"]})}),e.jsxs(j,{children:["Trail length ",e.jsx(v,{children:L})]}),e.jsx(M,{type:"range",min:"50",max:"1400",step:"10",value:L,onChange:n=>ie(parseInt(n.target.value,10))})]})]})]})}const be=r.div`
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
`,je=r.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #fbac61;
  margin: 0 0 14px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(251, 172, 97, 0.35);
`,ve=r.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;function we(){return e.jsxs(be,{children:[e.jsx(je,{children:"Double Pendulum"}),e.jsx(ve,{children:"A chaotic system: tiny changes in initial conditions can lead to wildly different motion. Use the controls to tweak parameters and reset."}),e.jsx(fe,{})]})}export{we as default};
