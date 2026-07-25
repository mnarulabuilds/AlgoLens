import{r as s,j as n}from"./index-CYsF4TiW.js";import{p as i}from"./styled-components.browser.esm-UVZUwTai.js";const $=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`,k=i.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: crosshair;
`,C=i.svg`
  width: 100%;
  height: 100%;
  touch-action: none;
`,P=i.div`
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`,h=i.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.active?"#3b82f6":"#f1f5f9"};
  color: ${e=>e.active?"white":"#475569"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#2563eb":"#e2e8f0"};
  }
`,B=()=>{const[e,l]=s.useState([{x:100,y:400},{x:300,y:100},{x:600,y:100},{x:800,y:400}]),[d,u]=s.useState(null),p=s.useRef(null),g=t=>{const o=p.current,r=o.getBoundingClientRect(),c=o.viewBox.baseVal.width/r.width,w=o.viewBox.baseVal.height/r.height,m=t.clientX||t.touches&&t.touches[0].clientX,j=t.clientY||t.touches&&t.touches[0].clientY;return{x:(m-r.left)*c,y:(j-r.top)*w}},f=t=>o=>{o.stopPropagation(),u(t)},a=s.useCallback(t=>{if(d===null)return;const o=g(t);l(r=>{const c=[...r];return c[d]=o,c})},[d]),x=s.useCallback(()=>{u(null)},[]);s.useEffect(()=>(window.addEventListener("pointermove",a),window.addEventListener("pointerup",x),()=>{window.removeEventListener("pointermove",a),window.removeEventListener("pointerup",x)}),[a,x]);const b=()=>{if(e.length<2)return"";let t=`M ${e[0].x} ${e[0].y}`;return e.length===2?t+=` L ${e[1].x} ${e[1].y}`:e.length===3?t+=` Q ${e[1].x} ${e[1].y}, ${e[2].x} ${e[2].y}`:e.length===4&&(t+=` C ${e[1].x} ${e[1].y}, ${e[2].x} ${e[2].y}, ${e[3].x} ${e[3].y}`),t},v=()=>{if(e.length>=4)return;const t=e[e.length-1];l([...e,{x:t.x+50,y:t.y}])},y=()=>{e.length<=2||l(e.slice(0,-1))};return n.jsxs($,{children:[n.jsx(k,{children:n.jsxs(C,{ref:p,viewBox:"0 0 900 500",children:[n.jsx("polyline",{points:e.map(t=>`${t.x},${t.y}`).join(" "),fill:"none",stroke:"#cbd5e1",strokeWidth:"1",strokeDasharray:"5,5"}),n.jsx("path",{d:b(),fill:"none",stroke:"#3b82f6",strokeWidth:"4",strokeLinecap:"round"}),e.map((t,o)=>n.jsxs("g",{onPointerDown:f(o),children:[n.jsx("circle",{cx:t.x,cy:t.y,r:"12",fill:o===0||o===e.length-1?"#3b82f6":"#f59e0b",style:{cursor:"move"}}),n.jsxs("text",{x:t.x,y:t.y-20,textAnchor:"middle",fontSize:"12",fill:"#64748b",fontWeight:"bold",children:["P",o]})]},o))]})}),n.jsxs(P,{children:[n.jsx(h,{onClick:v,disabled:e.length>=4,children:"Add Point"}),n.jsx(h,{onClick:y,disabled:e.length<=2,children:"Remove Point"}),n.jsx(h,{onClick:()=>l([{x:100,y:400},{x:300,y:100},{x:600,y:100},{x:800,y:400}]),children:"Reset"})]})]})},E=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
`,z=i.h1`
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 20px;
`;function S(){return n.jsxs(E,{children:[n.jsx(z,{children:"Bezier Curves Visualizer"}),n.jsx(B,{})]})}export{S as default};
