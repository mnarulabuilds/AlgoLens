import{r as o,j as e}from"./index-CYsF4TiW.js";import{p as t,f as u}from"./styled-components.browser.esm-UVZUwTai.js";const m=u`
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(-45deg); }
`,h=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
`,g=t.div`
  position: relative;
  height: 300px;
`,f=t.div`
  width: 2px;
  height: ${n=>n.length}px;
  background: #333;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: top;
  animation: ${m} ${n=>n.speed}s infinite ease-in-out;
`,b=t.div`
  width: 30px;
  height: 30px;
  background: #3498db;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`,v=t.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
`,j=({speed:n,length:a})=>{const[s,d]=o.useState(0),r=o.useRef(null);return o.useEffect(()=>(r.current=setInterval(()=>{d(l=>l+1)},1e3),()=>clearInterval(r.current)),[]),e.jsxs(h,{children:[e.jsx(g,{children:e.jsx(f,{length:a,speed:n,children:e.jsx(b,{})})}),e.jsxs(v,{children:["Time Elapsed: ",s," s"]})]})},w=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #e0e0e0;
  min-height: 100vh;
  box-sizing: border-box;
`,S=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`,c=t.label`
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
`,x=t.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`,y=t.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`,E=()=>{const[n,a]=o.useState(2),[s,d]=o.useState(200),r=p=>{const i=parseFloat(p.target.value||0);i>=0&&i<=10&&a(i)},l=p=>{const i=parseInt(p.target.value||0,10);i>=0&&i<=250&&d(i)};return e.jsxs(w,{children:[e.jsx(y,{children:"Simple Pendulum Simulation"}),e.jsxs(S,{children:[e.jsxs(c,{children:["Speed (0 to 10 seconds per cycle):",e.jsx(x,{type:"number",value:n,onChange:r,min:"0.1",step:"0.1",max:"10"})]}),e.jsxs(c,{children:["Rod Length (0 to 250 pixels):",e.jsx(x,{type:"number",value:s,onChange:l,min:"50",max:"250"})]})]}),e.jsx(j,{speed:n,length:s})]})};export{E as default};
