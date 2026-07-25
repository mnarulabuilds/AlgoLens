import{j as e,r as n}from"./index-CYsF4TiW.js";import{p as t}from"./styled-components.browser.esm-UVZUwTai.js";const b=t.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`,f=t.div`
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.2em;
  color: #333;
  animation: fadeIn 0.5s ease-in-out;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    font-size: 1em;
    padding: 8px;
  }
`,g=t.div`
  margin-top: 20px;
  font-size: 1.5em;
  color: #61dafb;
`,h=({number:s,base:i})=>{const a={2:"Binary",8:"Octal",10:"Decimal",16:"Hexadecimal"},u=o=>o?o.split("").map((c,l)=>e.jsx(f,{title:`Position: ${o.length-l-1}, Value: ${c}`,children:c},l)):[];return e.jsxs("div",{children:[e.jsx(b,{children:u(s)}),s&&e.jsx(g,{children:`Base: ${i} (${a[i]||"Custom Base"})`})]})},v=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,j=t.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
`,d=t.label`
  color: #555;
  font-size: 1.2em;
  margin-bottom: 10px;
`,y=t.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`,x=t.select`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`,B=()=>{const[s,i]=n.useState(""),[a,u]=n.useState(10),[o,c]=n.useState(10),[l,p]=n.useState("");return n.useEffect(()=>{(()=>{if(s==="")return"";try{const m=parseInt(s,a);p(m.toString(o))}catch{p("Invalid Number")}})()},[s,a,o]),e.jsxs(v,{children:[e.jsx(j,{children:"Number System Visualizer"}),e.jsxs(d,{children:["Input Number:",e.jsx(y,{type:"text",value:s,onChange:r=>i(r.target.value),placeholder:"Enter number"})]}),e.jsxs(d,{children:["Source Base:",e.jsx(x,{value:a,onChange:r=>u(parseInt(r.target.value)),children:[...Array(15).keys()].map(r=>e.jsx("option",{value:r+2,children:r+2},r+2))})]}),e.jsxs(d,{children:["Target Base:",e.jsx(x,{value:o,onChange:r=>c(parseInt(r.target.value)),children:[...Array(15).keys()].map(r=>e.jsx("option",{value:r+2,children:r+2},r+2))})]}),e.jsx(d,{children:"Converted Number:"}),e.jsx(h,{number:l,base:o})]})};export{B as default};
