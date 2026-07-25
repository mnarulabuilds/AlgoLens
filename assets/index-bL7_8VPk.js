import{r as o,j as e,T as x}from"./index-CYsF4TiW.js";import{p as r,f}from"./styled-components.browser.esm-UVZUwTai.js";const h=.5,b=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,j=t=>f`
  0% { transform: translateX(${t}px); }
  50% { transform: translateX(-${t}px); }
  100% { transform: translateX(${t}px); }
`,S=r.div`
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 5px;
  position: relative;
  animation: ${({amplitude:t})=>j(t)}
    ${({period:t})=>t}s linear infinite;
`,v=r.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
`,g=({mass:t,springLength:a})=>{const[i,p]=o.useState(0),c=a,d=2*Math.PI/Math.sqrt(h/t),s=o.useRef();return o.useEffect(()=>{const n=Date.now(),l=()=>{p((Date.now()-n)/1e3),s.current=requestAnimationFrame(l)};return s.current=requestAnimationFrame(l),()=>cancelAnimationFrame(s.current)},[]),e.jsxs(b,{children:[e.jsx(S,{amplitude:c,period:d}),e.jsxs(v,{children:["Time Elapsed: ",i.toFixed(2),"s"]})]})};g.propTypes={mass:x.number.isRequired,springLength:x.number.isRequired};const w=r.header`
  width: 100%;
  padding: 20px;
  background-color: #4caf50;
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 4px solid #388e3c;
  margin-bottom: 16px;
`,y=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e8f5e9;
  padding: 20px;
`,L=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,u=r.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`,m=r.label`
  font-size: 18px;
  margin-top: 10px;
  color: #555;
`,C=()=>{const[t,a]=o.useState(1),[i,p]=o.useState(100),c=s=>{const n=Number(s.target.value);n>=0&&n<=10&&a(n)},d=s=>{const n=Number(s.target.value);n>=0&&n<=150&&p(n)};return e.jsxs(y,{children:[e.jsx(w,{children:"Simple Harmonic Motion"}),e.jsxs(L,{children:[e.jsx(m,{htmlFor:"mass",children:"Mass (0 to 10 kg):"}),e.jsx(u,{id:"mass",type:"number",value:t,onChange:c}),e.jsx(m,{htmlFor:"springLength",children:"Spring Length (0 to 150 px):"}),e.jsx(u,{id:"springLength",type:"number",value:i,onChange:d})]}),e.jsx(g,{mass:t,springLength:i})]})};export{C as default};
