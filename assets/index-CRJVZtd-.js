import{r as u,j as r}from"./index-CYsF4TiW.js";import{p}from"./styled-components.browser.esm-UVZUwTai.js";const B=p.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`,O=p.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,D=p.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
`,U=p.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,Y=p.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,_=p.select`
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  cursor: pointer;
`,F=p.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 12px 0 6px;
`,P=p.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,L=p.input`
  width: 100%;
`,G=p.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
`,z=p.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${t=>t.color};
  box-shadow: 0 0 12px ${t=>t.color};
  margin-right: 6px;
`;function H(t,o,s){return Math.max(o,Math.min(s,t))}function N(t){let o=1;for(let s=2;s<=t;s++)o*=s;return o}function V(t,o){const s=Math.pow(t,o);return Number.isFinite(s)?s:s>0?Number.MAX_VALUE:-Number.MAX_VALUE}function J(t,o,s){const l=new Array(s+1);if(t==="sin"){for(let n=0;n<=s;n++){const i=n%4;i===0?l[n]=Math.sin(o):i===1?l[n]=Math.cos(o):i===2?l[n]=-Math.sin(o):l[n]=-Math.cos(o)}return l}if(t==="cos"){for(let n=0;n<=s;n++){const i=n%4;i===0?l[n]=Math.cos(o):i===1?l[n]=-Math.sin(o):i===2?l[n]=-Math.cos(o):l[n]=Math.sin(o)}return l}if(t==="exp"){const n=Math.exp(o);for(let i=0;i<=s;i++)l[i]=n;return l}if(t==="ln1p"){l[0]=Math.log(1+o);const n=1+o;for(let i=1;i<=s;i++)l[i]=Math.pow(-1,i-1)*N(i-1)/V(n,i);return l}for(let n=0;n<=s;n++)l[n]=0;return l}function q(t,o){return t==="sin"?Math.sin(o):t==="cos"?Math.cos(o):t==="exp"?Math.exp(o):t==="ln1p"?Math.log(1+o):o}function Q(t,o,s,l,n){let i=0;const x=o-s;for(let g=0;g<=l;g++)i+=n[g]*V(x,g)/N(g);return i}function Z(){const t=u.useRef(null),o=u.useRef(null),[s,l]=u.useState("sin"),[n,i]=u.useState(5),[x,g]=u.useState(0),[j,X]=u.useState(8),[E,$]=u.useState(!0);u.useEffect(()=>{const d=o.current,e=t.current;if(!d||!e)return;const v=new ResizeObserver(()=>{const C=d.getBoundingClientRect(),h=H(window.devicePixelRatio||1,1,2);e.width=Math.max(1,Math.floor(C.width*h)),e.height=Math.max(1,Math.floor(C.height*h)),e.getContext("2d").setTransform(h,0,0,h,0,0)});return v.observe(d),()=>v.disconnect()},[]);const W=u.useMemo(()=>J(s,x,n),[s,x,n]),b=u.useMemo(()=>{const e=j/2,v=-e,C=e,h=s==="ln1p"?Math.max(v,-.99):v,T=C,c=new Array(700),k=new Array(700),w=new Array(700);let m=1/0,y=-1/0;for(let f=0;f<700;f++){const A=f/699,R=h+(T-h)*A,a=q(s,R),M=Q(s,R,x,n,W);c[f]=R,k[f]=a,w[f]=M,m=Math.min(m,a,M),y=Math.max(y,a,M)}const S=(y-m)*.12||1;return{xs:c,ys:k,ts:w,xMin:h,xMax:T,yMin:m-S,yMax:y+S}},[W,s,n,x,j]);return u.useEffect(()=>{const d=t.current;if(!d)return;const e=d.getContext("2d"),v=d.getBoundingClientRect(),C=v.width,h=v.height,T=e.createLinearGradient(0,0,0,h);T.addColorStop(0,"rgba(2,6,23,1)"),T.addColorStop(1,"rgba(0,0,0,1)"),e.fillStyle=T,e.fillRect(0,0,C,h);const c={l:44,r:16,t:18,b:36},k=C-c.l-c.r,w=h-c.t-c.b,m=b.xMin,y=b.xMax;let S=-4,f=4;E&&(S=b.yMin,f=b.yMax);const A=a=>c.l+(a-m)/(y-m)*k,R=a=>c.t+(1-(a-S)/(f-S))*w;e.save(),e.strokeStyle="rgba(255,255,255,0.08)",e.lineWidth=1;for(let a=0;a<=8;a++){const M=c.l+k*a/8;e.beginPath(),e.moveTo(M,c.t),e.lineTo(M,c.t+w),e.stroke()}for(let a=0;a<=6;a++){const M=c.t+w*a/6;e.beginPath(),e.moveTo(c.l,M),e.lineTo(c.l+k,M),e.stroke()}if(e.restore(),e.save(),e.strokeStyle="rgba(255,255,255,0.22)",e.lineWidth=1.5,0>=m&&0<=y){const a=A(0);e.beginPath(),e.moveTo(a,c.t),e.lineTo(a,c.t+w),e.stroke()}if(0>=S&&0<=f){const a=R(0);e.beginPath(),e.moveTo(c.l,a),e.lineTo(c.l+k,a),e.stroke()}if(e.restore(),e.save(),e.strokeStyle="rgba(251,172,97,0.35)",e.setLineDash([6,6]),e.lineWidth=1.5,x>=m&&x<=y){const a=A(x);e.beginPath(),e.moveTo(a,c.t),e.lineTo(a,c.t+w),e.stroke()}e.restore(),I(e,b.xs,b.ys,A,R,{color:"rgba(127,231,255,0.95)",width:3,glow:"rgba(127,231,255,0.35)"}),I(e,b.xs,b.ts,A,R,{color:"rgba(251,172,97,0.95)",width:3,glow:"rgba(251,172,97,0.35)"}),e.save(),e.fillStyle="rgba(255,255,255,0.75)",e.font="12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",e.fillText("f(x) vs Taylorₙ(x)",c.l,14),e.fillText(`n=${n}   a=${x.toFixed(2)}`,c.l,h-10),e.restore()},[b,n,x,E]),r.jsxs(B,{children:[r.jsx(O,{children:r.jsx(D,{ref:o,children:r.jsx(U,{ref:t})})}),r.jsxs(Y,{children:[r.jsxs(F,{children:["Function ",r.jsx(P,{children:K(s)})]}),r.jsxs(_,{value:s,onChange:d=>l(d.target.value),children:[r.jsx("option",{value:"sin",children:"sin(x)"}),r.jsx("option",{value:"cos",children:"cos(x)"}),r.jsx("option",{value:"exp",children:"e^x"}),r.jsx("option",{value:"ln1p",children:"ln(1 + x)"})]}),r.jsxs(F,{children:["Order n ",r.jsx(P,{children:n})]}),r.jsx(L,{type:"range",min:"0",max:"18",step:"1",value:n,onChange:d=>i(parseInt(d.target.value,10))}),r.jsxs(F,{children:["Center a ",r.jsx(P,{children:x.toFixed(2)})]}),r.jsx(L,{type:"range",min:s==="ln1p"?"-0.9":"-4",max:"4",step:"0.05",value:x,onChange:d=>g(parseFloat(d.target.value))}),r.jsxs(F,{children:["X range ",r.jsx(P,{children:j.toFixed(1)})]}),r.jsx(L,{type:"range",min:"2",max:"16",step:"0.5",value:j,onChange:d=>X(parseFloat(d.target.value))}),r.jsxs(F,{children:["Y scale ",r.jsx(P,{children:E?"Auto":"Fixed"})]}),r.jsx(L,{type:"range",min:"0",max:"1",step:"1",value:E?1:0,onChange:d=>$(d.target.value==="1")}),r.jsxs(G,{children:[r.jsxs("span",{children:[r.jsx(z,{color:"rgba(127,231,255,0.95)"}),"f(x)"]}),r.jsxs("span",{children:[r.jsx(z,{color:"rgba(251,172,97,0.95)"}),"Taylorₙ(x)"]}),r.jsxs("span",{children:[r.jsx(z,{color:"rgba(251,172,97,0.45)"})," x = a"]})]})]})]})}function K(t){return t==="sin"?"sin(x)":t==="cos"?"cos(x)":t==="exp"?"e^x":t==="ln1p"?"ln(1+x)":t}function I(t,o,s,l,n,i){t.save(),t.lineWidth=i.width,t.strokeStyle=i.color,t.shadowBlur=10,t.shadowColor=i.glow,t.lineJoin="round",t.lineCap="round",t.beginPath();for(let x=0;x<o.length;x++){const g=l(o[x]),j=n(s[x]);x===0?t.moveTo(g,j):t.lineTo(g,j)}t.stroke(),t.restore()}const ee=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(
    circle at 30% 10%,
    #0f172a 0%,
    #0b1020 45%,
    #000 100%
  );
  min-height: 100vh;
  color: #eef2ff;
`,te=p.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #fbac61;
  margin: 0 0 10px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(251, 172, 97, 0.35);
`,ne=p.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;function se(){return r.jsxs(ee,{children:[r.jsx(te,{children:"Taylor Series Explorer"}),r.jsx(ne,{children:"Compare a function to its Taylor polynomial around a center point \\(a\\). Increase the order to see the approximation improve near \\(a\\)."}),r.jsx(Z,{})]})}export{se as default};
