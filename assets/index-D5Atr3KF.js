import{j as a,r as u}from"./index-CYsF4TiW.js";import{p as l}from"./styled-components.browser.esm-UVZUwTai.js";const A=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`,v=l.label`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #333;
`,F=l.input`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 60%;
  font-size: 1rem;
`,C=l.select`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 65%;
  font-size: 1rem;
`,T=l.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`,S=({angle:o,setAngle:i,initialPosition:c,setInitialPosition:r})=>{const t=h=>{const d=Number(h.target.value);d>=0&&d<=90&&i(d)};return a.jsxs(A,{children:[a.jsxs(v,{children:["Angle (0 to 90 degrees):",a.jsx(F,{type:"number",value:o,onChange:t})]}),a.jsxs(v,{children:["Initial Position:",a.jsxs(C,{value:c,onChange:h=>r(h.target.value),children:[a.jsx("option",{value:"onGround",children:"Left"}),a.jsx("option",{value:"onPlane",children:"Right"})]})]}),a.jsxs("div",{children:[a.jsx(T,{onClick:()=>i(30),children:"Reset Angle"}),a.jsx(T,{onClick:()=>r("onPlane"),children:"Reset Position"})]})]})},R=l.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
`,P=100,G=({angle:o,initialPosition:i})=>{const c=u.useRef(null);return u.useEffect(()=>{const r=c.current,t=r.getContext("2d"),h=r.width,d=r.height,m=()=>{t.clearRect(0,0,h,d),t.save(),t.translate(h/2,d/2),t.rotate(-o*Math.PI/180),t.beginPath(),t.moveTo(-P,0),t.lineTo(P,0),t.lineWidth=4,t.strokeStyle="#000",t.stroke(),t.restore()},j=e=>{const n=t.createLinearGradient(-e,0,e,0);return n.addColorStop(0,"royalblue"),n.addColorStop(1,"#FFFFFF"),n},k=(e,n,s)=>{t.save(),t.translate(e,n),t.rotate(s),t.beginPath(),t.arc(0,0,15,0,2*Math.PI),t.fillStyle=j(15),t.fill(),t.lineWidth=2,t.strokeStyle="#000",t.stroke(),t.restore()},w=(e,n)=>{t.save(),t.strokeStyle="red",t.lineWidth=2,t.beginPath(),t.moveTo(e,n),t.lineTo(e,n+40),t.stroke(),t.beginPath(),t.moveTo(e-5,n+35),t.lineTo(e,n+40),t.lineTo(e+5,n+35),t.stroke(),t.fillText("Gravity",e+10,n+45),t.strokeStyle="green",t.beginPath(),t.moveTo(e,n),t.lineTo(e-40*Math.sin(o*Math.PI/180),n-40*Math.cos(o*Math.PI/180)),t.stroke(),t.beginPath(),t.moveTo(e-35*Math.sin(o*Math.PI/180)-5*Math.cos(o*Math.PI/180),n-35*Math.cos(o*Math.PI/180)+5*Math.sin(o*Math.PI/180)),t.lineTo(e-40*Math.sin(o*Math.PI/180),n-40*Math.cos(o*Math.PI/180)),t.lineTo(e-35*Math.sin(o*Math.PI/180)+5*Math.cos(o*Math.PI/180),n-35*Math.cos(o*Math.PI/180)-5*Math.sin(o*Math.PI/180)),t.stroke(),t.fillText("Normal",e-50*Math.sin(o*Math.PI/180),n-50*Math.cos(o*Math.PI/180));const s=i==="onGround"?1:-1;t.strokeStyle="orange",t.beginPath(),t.moveTo(e,n),t.lineTo(e-s*40*Math.cos(o*Math.PI/180),n+s*40*Math.sin(o*Math.PI/180)),t.stroke(),t.beginPath(),t.moveTo(e-s*35*Math.cos(o*Math.PI/180)-s*5*Math.sin(o*Math.PI/180),n+s*35*Math.sin(o*Math.PI/180)+s*5*Math.cos(o*Math.PI/180)),t.lineTo(e-s*40*Math.cos(o*Math.PI/180),n+s*40*Math.sin(o*Math.PI/180)),t.lineTo(e-s*35*Math.cos(o*Math.PI/180)+s*5*Math.sin(o*Math.PI/180),n+s*35*Math.sin(o*Math.PI/180)-s*5*Math.cos(o*Math.PI/180)),t.stroke(),t.fillText("Friction",e-s*50*Math.cos(o*Math.PI/180),n+s*50*Math.sin(o*Math.PI/180)),t.restore()},g=()=>{let e=i==="onGround"?1:-1;const n=h/2-e*P*Math.cos(o*Math.PI/180),s=d/2+e*P*Math.sin(o*Math.PI/180),x=h/2+e*P*Math.cos(o*Math.PI/180);let b=0,M=n,I=s-20,p;const f=()=>{m(),k(M,I,b),w(M,I),M+=e*Math.cos(o*Math.PI/180),I-=e*Math.sin(o*Math.PI/180),b+=.1*e,e===1&&M>=x||e===-1&&M<=x?cancelAnimationFrame(p):p=requestAnimationFrame(f)};return p=requestAnimationFrame(f),()=>cancelAnimationFrame(p)};m(),g()},[o,i]),a.jsx(R,{children:a.jsx("canvas",{ref:c,width:400,height:400})})},L=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`,q=()=>{const[o,i]=u.useState(30),[c,r]=u.useState("onPlane");return a.jsxs(L,{children:[a.jsx("h1",{children:"Rolling Motion ⚙️ on Inclined Plane 🛤️"}),a.jsx(S,{angle:o,setAngle:i,initialPosition:c,setInitialPosition:r}),a.jsx(G,{angle:o,initialPosition:c})]})};export{q as default};
