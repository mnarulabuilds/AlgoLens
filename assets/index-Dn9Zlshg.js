import{r as d,j as r}from"./index-CYsF4TiW.js";import{p as o}from"./styled-components.browser.esm-UVZUwTai.js";const A=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`,U=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
`,j=o.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,w=o.label`
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
`,y=o.input`
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`,V=o.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`,$=o.canvas`
  width: 100%;
  height: 100%;
`,q=o.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`,P=o.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${a=>a.primary?"#3b82f6":"#e2e8f0"};
  color: ${a=>a.primary?"white":"#475569"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    background: ${a=>a.primary?"#2563eb":"#cbd5e1"};
  }
`,N=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  background: #f1f5f9;
  padding: 15px;
  border-radius: 10px;
`,I=o.div`
  text-align: center;
  p {
    margin: 5px 0;
    color: #334155;
    font-size: 0.95rem;
  }
  span {
    font-weight: bold;
    color: #0f172a;
  }
`,O=()=>{const a=d.useRef(null),[f,E]=d.useState(2),[g,F]=d.useState(5),[k,R]=d.useState(3),[C,z]=d.useState(-2),[b,T]=d.useState(!1),s=d.useRef({p1:{x:200,v:3,m:2,r:20},p2:{x:600,v:-2,m:5,r:35},lastUpdateTime:0}),S=d.useCallback(()=>{const t=a.current;t&&(s.current={p1:{x:t.width*.25,v:Number(k),m:Number(f),r:15+Math.sqrt(f)*8},p2:{x:t.width*.75,v:Number(C),m:Number(g),r:15+Math.sqrt(g)*8},lastUpdateTime:performance.now()},T(!1),M())},[f,g,k,C]),M=d.useCallback(()=>{const t=a.current;if(!t)return;const e=t.getContext("2d"),{p1:c,p2:l}=s.current;e.clearRect(0,0,t.width,t.height),e.strokeStyle="#334155",e.lineWidth=2,e.beginPath(),e.moveTo(0,t.height-50),e.lineTo(t.width,t.height-50),e.stroke(),e.fillStyle="#3b82f6",e.beginPath(),e.arc(c.x,t.height-50-c.r,c.r,0,Math.PI*2),e.fill(),e.fillStyle="white",e.textAlign="center",e.fillText(`${c.m}kg`,c.x,t.height-50-c.r+5),e.fillStyle="#ef4444",e.beginPath(),e.arc(l.x,t.height-50-l.r,l.r,0,Math.PI*2),e.fill(),e.fillStyle="white",e.textAlign="center",e.fillText(`${l.m}kg`,l.x,t.height-50-l.r+5);const i=(n,p,h,v)=>{if(Math.abs(h)<.1)return;const m=h*20;e.strokeStyle=v,e.lineWidth=3,e.beginPath(),e.moveTo(n,p),e.lineTo(n+m,p),e.stroke(),e.beginPath();const x=8,u=h>0?1:-1;e.moveTo(n+m,p),e.lineTo(n+m-x*u,p-x/2),e.lineTo(n+m-x*u,p+x/2),e.closePath(),e.fill()};i(c.x,t.height-50-c.r-20,c.v,"#3b82f6"),i(l.x,t.height-50-l.r-20,l.v,"#ef4444")},[]);return d.useEffect(()=>{const t=a.current;t.width=t.offsetWidth,t.height=t.offsetHeight,S()},[S]),d.useEffect(()=>{if(!b)return;let t;const e=c=>{const l=(c-s.current.lastUpdateTime)/16;s.current.lastUpdateTime=c;const{p1:i,p2:n}=s.current;i.x+=i.v*l,n.x+=n.v*l,i.x-i.r<0&&(i.x=i.r,i.v*=-1),n.x+n.r>a.current.width&&(n.x=a.current.width-n.r,n.v*=-1);const p=Math.abs(i.x-n.x);if(p<i.r+n.r){const h=i.r+n.r-p;i.x<n.x?(i.x-=h/2,n.x+=h/2):(i.x+=h/2,n.x-=h/2);const v=i.v,m=n.v,x=i.m,u=n.m;i.v=(v*(x-u)+2*u*m)/(x+u),n.v=(m*(u-x)+2*x*v)/(x+u)}M(),t=requestAnimationFrame(e)};return s.current.lastUpdateTime=performance.now(),t=requestAnimationFrame(e),()=>cancelAnimationFrame(t)},[b,M]),r.jsxs(A,{children:[r.jsxs(U,{children:[r.jsxs(j,{children:[r.jsx(w,{children:"Mass 1 (kg)"}),r.jsx(y,{type:"number",value:f,onChange:t=>E(t.target.value)})]}),r.jsxs(j,{children:[r.jsx(w,{children:"Velocity 1 (m/s)"}),r.jsx(y,{type:"number",value:k,onChange:t=>R(t.target.value)})]}),r.jsxs(j,{children:[r.jsx(w,{children:"Mass 2 (kg)"}),r.jsx(y,{type:"number",value:g,onChange:t=>F(t.target.value)})]}),r.jsxs(j,{children:[r.jsx(w,{children:"Velocity 2 (m/s)"}),r.jsx(y,{type:"number",value:C,onChange:t=>z(t.target.value)})]})]}),r.jsxs(q,{children:[r.jsx(P,{primary:!0,onClick:()=>T(!b),children:b?"Pause":"Start Simulation"}),r.jsx(P,{onClick:S,children:"Reset"})]}),r.jsx(V,{children:r.jsx($,{ref:a})}),r.jsxs(N,{children:[r.jsxs(I,{children:[r.jsxs("p",{children:["Object 1 Momentum:"," ",r.jsx("span",{children:(s.current.p1.m*s.current.p1.v).toFixed(2)})]}),r.jsxs("p",{children:["Object 1 Energy:"," ",r.jsx("span",{children:(.5*s.current.p1.m*s.current.p1.v**2).toFixed(2)})]})]}),r.jsxs(I,{children:[r.jsxs("p",{children:["Object 2 Momentum:"," ",r.jsx("span",{children:(s.current.p2.m*s.current.p2.v).toFixed(2)})]}),r.jsxs("p",{children:["Object 2 Energy:"," ",r.jsx("span",{children:(.5*s.current.p2.m*s.current.p2.v**2).toFixed(2)})]})]})]})]})},W=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`,B=o.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;function L(){return r.jsxs(W,{children:[r.jsx(B,{children:"Elastic Collisions Visualizer"}),r.jsx(O,{})]})}export{L as default};
