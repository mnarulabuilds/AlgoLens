import{r as u,j as r}from"./index-CYsF4TiW.js";import{p as a,f}from"./styled-components.browser.esm-UVZUwTai.js";const c={nodes:[],edges:[]},y=(t,i)=>{switch(i.type){case"ADD_NODE":return{...t,nodes:[...t.nodes,i.payload]};case"ADD_EDGE":return{...t,edges:[...t.edges,i.payload]};case"CLEAR_GRAPH":return c;default:return t}},G=()=>{const[t,i]=u.useReducer(y,c),{nodes:o,edges:l}=t,h=()=>{const e=o.length+1,s=50+Math.random()*200,n=50+Math.random()*200;i({type:"ADD_NODE",payload:{id:e,x:s,y:n}})},x=()=>{if(o.length<2)return;const e=o[Math.floor(Math.random()*o.length)].id;let s;do s=o[Math.floor(Math.random()*o.length)].id;while(e===s);i({type:"ADD_EDGE",payload:{source:e,target:s}})},p=()=>{i({type:"CLEAR_GRAPH"})};return r.jsxs(g,{children:[r.jsx(m,{children:"Randomized Graph Visualizer"}),r.jsxs(b,{children:[r.jsx(d,{onClick:h,children:"Add Node"}),r.jsx(d,{onClick:x,children:"Add Edge"}),r.jsx(d,{onClick:p,children:"Clear Graph"})]})," ",r.jsxs(j,{children:[l.map((e,s)=>r.jsx(k,{x1:o.find(n=>n.id===e.source).x,y1:o.find(n=>n.id===e.source).y,x2:o.find(n=>n.id===e.target).x,y2:o.find(n=>n.id===e.target).y},s)),o.map(e=>r.jsx(w,{x:e.x,y:e.y,children:e.id},e.id))]})]})},g=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,m=a.h4`
  color: #1b368d;
`,d=a.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`,b=a.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`,j=a.div`
  position: relative;
  width: 90%;
  height: 70vh;
  max-width: 800px;
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #ccc;
  margin: 20px auto;
`,w=a.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  left: ${t=>t.x}px;
  top: ${t=>t.y}px;
`,E=f`
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
`,k=a.svg.attrs(t=>({children:r.jsx("line",{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,stroke:"black"})}))`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${E} 1s linear;
`;export{G as default};
