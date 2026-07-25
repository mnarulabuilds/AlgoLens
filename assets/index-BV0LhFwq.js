import{j as e,R as f}from"./index-CYsF4TiW.js";import{p as n}from"./styled-components.browser.esm-UVZUwTai.js";const p=n.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  position: relative;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 2px solid #00796b;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`,u=n.svg`
  width: 100%;
  height: 100%;
`,c=n.line`
  stroke: #ff6347;
  stroke-width: 2;
`,x=n.text`
  fill: #00796b;
  font-size: 14px;
`,m=({sideA:t,sideB:s,hypotenuse:r})=>{const l=t*25+50,o=s*25+50;return e.jsx(p,{children:e.jsxs(u,{viewBox:`0 0 ${l} ${o}`,children:[e.jsx(c,{x1:25,y1:o-25,x2:25+t*25,y2:o-25})," ",e.jsx(c,{x1:25,y1:o-25,x2:25,y2:o-25-s*25})," ",e.jsx(c,{x1:25,y1:o-25-s*25,x2:25+t*25,y2:o-25})," ",e.jsxs(x,{x:25+t*25/2,y:o-25+15,children:["a: ",t]}),e.jsxs(x,{x:10,y:o-25-s*25/2,transform:`rotate(-90, 10, ${o-25-s*25/2})`,children:["b: ",s]}),e.jsxs(x,{x:25+t*25/2,y:o-25-s*25/2-5,transform:`rotate(${Math.atan(s/t)*(-180/Math.PI)}, ${25+t*25/2}, ${o-25-s*25/2-5})`,children:["c: ",r.toFixed(2)]})]})})},b=n.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #00796b;
  }
`,d=n.input`
  margin: 10px 0;
  padding: 10px;
  border: 2px solid #00796b;
  border-radius: 4px;
  width: 200px;
  font-size: 1em;
  transition: border-color 0.3s;

  &:focus {
    border-color: #004d40;
    outline: none;
  }
`,h=n.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #00796b;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004d40;
  }
`,g=({setSideA:t,setSideB:s})=>{const r=i=>{i.preventDefault();const a=i.target;t(Number(a.elements.sideA.value)),s(Number(a.elements.sideB.value))};return e.jsxs(b,{onSubmit:r,children:[e.jsxs("label",{children:["Side A (0 to 25):"," ",e.jsx(d,{name:"sideA",type:"number",defaultValue:3,min:"0",max:"25"})]}),e.jsxs("label",{children:["Side B (0 to 25):"," ",e.jsx(d,{name:"sideB",type:"number",defaultValue:4,min:"0",max:"25"})]}),e.jsx(h,{type:"submit",children:"Calculate"})]})},j=n.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 2px solid #00796b;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: #00796b;
    margin: 0;
  }
`,y=({hypotenuse:t})=>e.jsx(j,{children:e.jsxs("h2",{children:["Hypotenuse: ",t.toFixed(2)]})}),v=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e0f7fa;
  min-height: 100vh;
  font-family: "Arial, sans-serif";

  h1 {
    color: #00796b;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;function k(){const[t,s]=f.useState(3),[r,i]=f.useState(4),[a,l]=f.useState(Math.sqrt(t**2+r**2)),o=f.useMemo(()=>Math.sqrt(t**2+r**2),[t,r]);return f.useEffect(()=>{l(o)},[o]),e.jsxs(v,{children:[e.jsx("h1",{children:"Pythagoras Theorem Visualizer"}),e.jsx(g,{setSideA:s,setSideB:i}),e.jsx(m,{sideA:t,sideB:r,hypotenuse:a}),e.jsx(y,{hypotenuse:a})]})}export{k as default};
