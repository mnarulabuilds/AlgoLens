import{r as s,j as e}from"./index-CYsF4TiW.js";import{p as n}from"./styled-components.browser.esm-UVZUwTai.js";import{A as h}from"./Alert-Doi7gcTu.js";import"./defineProperty-DIxjOVuh.js";import"./utils-CZ9HWWRh.js";const k=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`,A=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  gap: 15px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-around;
  }
`,u=n.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #555;
`,g=n.input`
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  text-align: center;
  font-size: 1rem;
`,S=n.div`
  margin-bottom: 20px;
  width: 100%;
`,z=n.div`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
`,C=n.svg`
  width: 100%;
  max-width: 500px;
  height: auto;
`,T=n.path`
  stroke: blue;
  fill: none;
`,c=n.line`
  stroke: black;
  stroke-width: 2;
`,f=n.text`
  font-family: Arial;
  font-size: 12px;
  text-anchor: middle;
`,P=()=>{const[l,j]=s.useState(45),[r,y]=s.useState(50),[o,b]=s.useState([]),x=9.81,d=s.useCallback(()=>{const t=l*Math.PI/180,i=2*r*Math.sin(t)/x,p=[];for(let a=0;a<=i;a+=.1){const v=r*a*Math.cos(t),m=r*a*Math.sin(t)-.5*x*a*a;if(m>=0)p.push({x:v,y:m});else break}b(p)},[l,r]);s.useEffect(()=>{d()},[l,r,d]);const w=s.useMemo(()=>o.length>0?o[o.length-1].x:0,[o]),M=s.useMemo(()=>Math.max(...o.map(t=>t.y),0),[o]);return e.jsxs(k,{children:[e.jsxs(A,{children:[e.jsxs(u,{children:["Angle (degrees):",e.jsx(g,{type:"number",value:l,onChange:t=>{const i=Number(t.target.value);i>=0&&i<=90&&j(i)}})]}),e.jsxs(u,{children:["Speed (m/s):",e.jsx(g,{type:"number",value:r,onChange:t=>{const i=Number(t.target.value);i>=0&&i<=1e3&&y(i)}})]})]}),e.jsx(h,{color:"info",style:{width:"100%"},children:"Angle should be from 0 to 90"}),e.jsx(h,{color:"info",style:{width:"100%"},children:"Speed should be from 0 to 1000"}),e.jsx(S,{children:e.jsxs(C,{viewBox:"0 0 500 500",children:[e.jsx(T,{d:`M 0 500 ${o.map(t=>`${t.x*10} ${500-t.y*10}`).join(" L ")}`}),e.jsx(c,{x1:"0",y1:"500",x2:"500",y2:"500"}),e.jsxs("g",{children:[e.jsx(c,{x1:"0",y1:"490",x2:"0",y2:"500"}),e.jsx(f,{x:"5",y:"490",children:"0"}),e.jsx(c,{x1:"500",y1:"490",x2:"500",y2:"500"}),e.jsx(f,{x:"490",y:"490",children:"50"})]})]})}),e.jsxs(z,{children:[e.jsxs("p",{children:["Total Distance: ",w.toFixed(2)," meters"]}),e.jsxs("p",{children:["Maximum Height: ",M.toFixed(2)," meters"]})]})]})},E=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`,H=n.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;function I(){return e.jsxs(E,{children:[e.jsx(H,{children:"Projectile Motion Visualizer"}),e.jsx(P,{})]})}export{I as default};
