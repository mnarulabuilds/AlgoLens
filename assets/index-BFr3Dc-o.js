import{r as c,j as n}from"./index-CYsF4TiW.js";import{p as a}from"./styled-components.browser.esm-UVZUwTai.js";const A=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e293b;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  width: 100%;
`,D=a.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  cursor: crosshair;
  border: 1px solid #334155;
`,E=a.canvas`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`,S=a.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`,C=a.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #94a3b8;
  font-size: 0.9rem;
`,y=a.input`
  width: 150px;
`,z=a.p`
  color: #64748b;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
`,q=()=>{const p=c.useRef(null),[x,I]=c.useState(.98),[u,R]=c.useState(200),e=c.useRef({cols:0,rows:0,current:[],previous:[],animationId:null}),v=c.useCallback(()=>{const t=u,s=u;e.current.cols=t,e.current.rows=s,e.current.current=new Float32Array(t*s).fill(0),e.current.previous=new Float32Array(t*s).fill(0);const r=p.current;r&&(r.width=t,r.height=s)},[u]);c.useEffect(()=>{v()},[v]);const w=c.useCallback(()=>{const{cols:t,rows:s,current:r,previous:i}=e.current,l=p.current;if(!l)return;const j=l.getContext("2d"),d=j.createImageData(t,s);for(let h=1;h<t-1;h++)for(let g=1;g<s-1;g++){const o=h+g*t,M=i[o-1]+i[o+1]+i[o-t]+i[o+t];r[o]=M/2-r[o],r[o]*=x;const m=o*4,k=r[o],f=Math.max(0,Math.min(255,128+k*2));d.data[m]=f*.1,d.data[m+1]=f*.6,d.data[m+2]=f,d.data[m+3]=255}j.putImageData(d,0,0);const F=e.current.previous;e.current.previous=e.current.current,e.current.current=F},[x]);c.useEffect(()=>{const t=()=>{w(),e.current.animationId=requestAnimationFrame(t)};return e.current.animationId=requestAnimationFrame(t),()=>cancelAnimationFrame(e.current.animationId)},[w]);const b=t=>{const r=p.current.getBoundingClientRect(),i=Math.floor((t.clientX-r.left)/r.width*e.current.cols),l=Math.floor((t.clientY-r.top)/r.height*e.current.rows);i>0&&i<e.current.cols-1&&l>0&&l<e.current.rows-1&&(e.current.previous[i+l*e.current.cols]=512)};return n.jsxs(A,{children:[n.jsx(D,{onMouseMove:t=>t.buttons===1&&b(t),onMouseDown:b,children:n.jsx(E,{ref:p})}),n.jsxs(S,{children:[n.jsxs(C,{children:[n.jsxs("label",{children:["Damping: ",x.toFixed(3)]}),n.jsx(y,{type:"range",min:"0.9",max:"0.999",step:"0.001",value:x,onChange:t=>I(parseFloat(t.target.value))})]}),n.jsxs(C,{children:[n.jsxs("label",{children:["Resolution: ",u]}),n.jsx(y,{type:"range",min:"100",max:"400",step:"50",value:u,onChange:t=>R(parseInt(t.target.value))})]})]}),n.jsx(z,{children:"Click or drag on the water to create ripples. Adjust damping to change how long ripples last."})]})},B=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
`,G=a.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;function Y(){return n.jsxs(B,{children:[n.jsx(G,{children:"Fluid Ripple Simulation"}),n.jsx(q,{})]})}export{Y as default};
