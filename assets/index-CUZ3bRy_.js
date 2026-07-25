import{r,j as t}from"./index-CYsF4TiW.js";import{p as i}from"./styled-components.browser.esm-UVZUwTai.js";const y=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`,R=i.div`
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(20, 83, 45, 0.1);
  overflow: hidden;
  border: 1px solid #dcfce7;
  display: flex;
  justify-content: center;
  align-items: center;
`,M=i.canvas`
  width: 100%;
  height: 100%;
`,S=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`,p=i.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,x=i.label`
  font-weight: 600;
  color: #166534;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`,u=i.input`
  width: 100%;
  accent-color: #22c55e;
`,B=()=>{const g=r.useRef(null),f=r.useRef({w:0,h:0,dpr:1}),[l,j]=r.useState(10),[c,w]=r.useState(25),[o,b]=r.useState(.75),[d,C]=r.useState(120),h=r.useCallback((e,n,a,s)=>{if(e.lineWidth=a,e.beginPath(),e.moveTo(0,0),e.lineTo(0,-n),e.stroke(),n<4){e.fillStyle="#22c55e",e.beginPath(),e.arc(0,-n,4,0,Math.PI*2),e.fill();return}e.save(),e.translate(0,-n),e.rotate(s*Math.PI/180),h(e,n*o,a*.7,s),e.restore(),e.save(),e.translate(0,-n),e.rotate(-s*Math.PI/180),h(e,n*o,a*.7,s),e.restore()},[o]),m=r.useCallback(()=>{const e=g.current;if(!e)return;const n=e.getContext("2d"),{w:a,h:s}=f.current;if(!a||!s)return;n.clearRect(0,0,a,s),n.strokeStyle="#4b2c20",n.lineCap="round",n.save(),n.translate(a/2,s-20);const v=Math.min(d,s*.42);h(n,v,l*.8,c),n.restore()},[l,c,o,d,h]);return r.useEffect(()=>{const e=g.current;if(!e)return;const n=new ResizeObserver(()=>{const a=e.getBoundingClientRect(),s=Math.max(1,Math.min(window.devicePixelRatio||1,2));f.current={w:a.width,h:a.height,dpr:s},e.width=Math.max(1,Math.floor(a.width*s)),e.height=Math.max(1,Math.floor(a.height*s)),e.getContext("2d").setTransform(s,0,0,s,0,0),m()});return n.observe(e),()=>n.disconnect()},[m]),t.jsxs(y,{children:[t.jsx(R,{children:t.jsx(M,{ref:g})}),t.jsxs(S,{children:[t.jsxs(p,{children:[t.jsxs(x,{children:["Recursion Depth: ",t.jsx("span",{children:l})]}),t.jsx(u,{type:"range",min:"1",max:"12",step:"1",value:l,onChange:e=>j(parseInt(e.target.value))})]}),t.jsxs(p,{children:[t.jsxs(x,{children:["Branch Angle: ",t.jsxs("span",{children:[c,"°"]})]}),t.jsx(u,{type:"range",min:"0",max:"90",step:"1",value:c,onChange:e=>w(parseInt(e.target.value))})]}),t.jsxs(p,{children:[t.jsxs(x,{children:["Length Ratio: ",t.jsx("span",{children:o.toFixed(2)})]}),t.jsx(u,{type:"range",min:"0.5",max:"0.85",step:"0.01",value:o,onChange:e=>b(parseFloat(e.target.value))})]}),t.jsxs(p,{children:[t.jsxs(x,{children:["Base Length: ",t.jsxs("span",{children:[d,"px"]})]}),t.jsx(u,{type:"range",min:"50",max:"200",step:"1",value:d,onChange:e=>C(parseInt(e.target.value))})]})]})]})},I=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0fdf4;
  min-height: 100vh;
`,L=i.h1`
  font-size: 2.5rem;
  color: #14532d;
  margin-bottom: 20px;
`;function T(){return t.jsxs(I,{children:[t.jsx(L,{children:"Fractal Tree Generator"}),t.jsx(B,{})]})}export{T as default};
