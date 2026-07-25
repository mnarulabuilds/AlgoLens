import{r as o,j as e}from"./index-CYsF4TiW.js";import{p as n}from"./styled-components.browser.esm-UVZUwTai.js";const d=16,f=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`,h=n.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,l=n.label`
  margin: 10px;
  font-size: 1.1em;

  input {
    margin-left: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`,g=n.div`
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`,b=n.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  transition: transform 0.016s linear;
`,c=n.div`
  margin-top: 20px;
  text-align: center;

  h4 {
    padding: 8px;
    font-size: 1.5em;
  }

  p {
    margin: 5px 0;
    font-size: 1.1em;
  }
`,y=()=>{const[s,p]=o.useState(1),[r,x]=o.useState(100),[a,u]=o.useState(0);o.useEffect(()=>{const i=setInterval(()=>{u(t=>t+s*d/1e3)},d);return()=>clearInterval(i)},[s]);const m=r*s;return e.jsxs(f,{children:[e.jsx(c,{children:e.jsx("h4",{children:"Circular Motion"})}),e.jsxs(h,{children:[e.jsxs(l,{children:["Speed (0 to 16 rad/s):",e.jsx("input",{type:"number",value:s,onChange:i=>{const t=Number(i.target.value);t>=0&&t<=16&&p(t)}})]}),e.jsxs(l,{children:["Radius (0 to 120 pixels):",e.jsx("input",{type:"number",value:r,onChange:i=>{const t=Number(i.target.value);t>=0&&t<=120&&x(t)}})]})]}),e.jsx(g,{children:e.jsx(b,{style:{transform:`translate(${r*Math.cos(a)}px, ${r*Math.sin(a)}px)`}})}),e.jsxs(c,{children:[e.jsxs("p",{children:["Angular Momentum: ",m.toFixed(2)]}),e.jsxs("p",{children:["Number of Revolutions: ",(a/(2*Math.PI)).toFixed(2)]})]})]})};export{y as default};
