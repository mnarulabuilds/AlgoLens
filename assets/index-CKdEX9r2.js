import{j as o,r as a}from"./index-CYsF4TiW.js";import{p as n}from"./styled-components.browser.esm-UVZUwTai.js";import{e as c,f as d}from"./impureFunctionsAny.generated-g5Ds6d9V.js";const l=n.button`
  background: ${r=>r.bgColor};
  border: none;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 2px;
  transition: background-color 0.4s ease;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(75%);
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`,p=({label:r,onClick:t,bgColor:s})=>o.jsx(l,{onClick:t,bgColor:s,children:r}),u=n.div`
  background: #333;
  color: white;
  text-align: right;
  padding: 20px;
  font-size: 2em;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow-x: auto;
`,g=({value:r})=>o.jsx(u,{children:r}),x=()=>{const[r,t]=a.useState("");return{display:r,handleButtonClick:i=>{if(i==="C")t("");else if(i==="=")try{const e=c(r);t(d(e,{precision:14}))}catch{t("Error")}else t(r+i)}}},m=n.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`,b=n.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`,h=n.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`,j=()=>{const{display:r,handleButtonClick:t}=x(),s={7:"midnightblue",8:"midnightblue",9:"midnightblue"," / ":"orange","sqrt(":"forestgreen",4:"midnightblue",5:"midnightblue",6:"midnightblue"," * ":"orange","pow(":"forestgreen",1:"midnightblue",2:"midnightblue",3:"midnightblue"," - ":"orange","sin(":"forestgreen",0:"midnightblue",".":"firebrick","=":"firebrick"," + ":"orange","cos(":"forestgreen",",":"firebrick","(":"firebrick",")":"firebrick",e:"purple",pi:"purple",C:"springgreen"},i=["7","8","9"," / ","sqrt(","4","5","6"," * ","pow(","1","2","3"," - ","sin(","0",".","="," + ","cos(",",","(",")","e","pi","C"];return o.jsxs(b,{children:[o.jsx(m,{children:"Advanced Calculator"}),o.jsx(g,{value:r}),o.jsx(h,{children:i.map(e=>o.jsx(p,{label:e,bgColor:s[e],onClick:()=>t(e)},e))})]})};export{j as default};
