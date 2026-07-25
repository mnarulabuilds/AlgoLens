import{r as s,j as t}from"./index-CYsF4TiW.js";import{p as o}from"./styled-components.browser.esm-UVZUwTai.js";const P=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
`,T=o.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: #1e293b;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid #334155;
`,R=o.canvas`
  width: 100%;
  height: 100%;
`,W=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  background: #1e293b;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #334155;
`,m=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,v=o.label`
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`,y=o.input`
  width: 100%;
  cursor: pointer;
`,M=o.select`
  padding: 10px;
  background: #0f172a;
  color: white;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
`,F=()=>{const f=s.useRef(null),[x,S]=s.useState(5),[p,k]=s.useState(.02),[u,C]=s.useState("square"),g=s.useRef({time:0,wave:[]}),w=s.useCallback(()=>{const i=f.current;if(!i)return;const e=i.getContext("2d"),{time:a,wave:n}=g.current;e.clearRect(0,0,i.width,i.height);let c=200,d=i.height/2;e.strokeStyle="rgba(148, 163, 184, 0.4)",e.lineWidth=1;for(let r=0;r<x;r++){let b=c,j=d,l,h;u==="square"?(l=r*2+1,h=100*(4/(l*Math.PI))):u==="sawtooth"&&(l=r+1,h=100*(2/(l*Math.PI))*(r%2===0?1:-1)),c+=h*Math.cos(l*a),d+=h*Math.sin(l*a),e.beginPath(),e.arc(b,j,Math.abs(h),0,Math.PI*2),e.stroke(),e.strokeStyle="rgba(59, 130, 246, 0.8)",e.lineWidth=2,e.beginPath(),e.moveTo(b,j),e.lineTo(c,d),e.stroke(),e.strokeStyle="rgba(148, 163, 184, 0.4)",e.lineWidth=1}n.unshift(d),n.length>500&&n.pop(),e.strokeStyle="#facc15",e.beginPath(),e.moveTo(c,d),e.lineTo(400,n[0]),e.stroke(),e.strokeStyle="#3b82f6",e.lineWidth=3,e.beginPath(),e.moveTo(400,n[0]);for(let r=1;r<n.length;r++)e.lineTo(400+r,n[r]);e.stroke(),g.current.time+=p},[x,u,p]);return s.useEffect(()=>{const i=f.current,e=()=>{i.width=i.offsetWidth*window.devicePixelRatio,i.height=i.offsetHeight*window.devicePixelRatio,i.getContext("2d").scale(window.devicePixelRatio,window.devicePixelRatio)};e(),window.addEventListener("resize",e);let a;const n=()=>{w(),a=requestAnimationFrame(n)};return a=requestAnimationFrame(n),()=>{cancelAnimationFrame(a),window.removeEventListener("resize",e)}},[w]),t.jsxs(P,{children:[t.jsx(T,{children:t.jsx(R,{ref:f})}),t.jsxs(W,{children:[t.jsxs(m,{children:[t.jsxs(v,{children:["Number of Terms: ",t.jsx("span",{children:x})]}),t.jsx(y,{type:"range",min:"1",max:"50",value:x,onChange:i=>S(parseInt(i.target.value))})]}),t.jsxs(m,{children:[t.jsxs(v,{children:["Speed: ",t.jsxs("span",{children:[(p*100).toFixed(1),"%"]})]}),t.jsx(y,{type:"range",min:"0.005",max:"0.1",step:"0.005",value:p,onChange:i=>k(parseFloat(i.target.value))})]}),t.jsxs(m,{children:[t.jsx(v,{children:"Wave Target"}),t.jsxs(M,{value:u,onChange:i=>{C(i.target.value),g.current.wave=[]},children:[t.jsx("option",{value:"square",children:"Square Wave"}),t.jsx("option",{value:"sawtooth",children:"Sawtooth Wave"})]})]})]})]})},q=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
`,z=o.h1`
  font-size: 2.5rem;
  color: #f8fafc;
  margin-bottom: 20px;
`;function A(){return t.jsxs(q,{children:[t.jsx(z,{children:"Fourier Series Visualizer"}),t.jsx(F,{})]})}export{A as default};
