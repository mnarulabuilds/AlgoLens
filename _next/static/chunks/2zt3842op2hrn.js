(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return a.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},63557,e=>{"use strict";var t=e.i(43476),r=e.i(97053),a=e.i(71645);let n=r.U.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
`,i=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,o=r.U.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
`,l=r.U.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,s=r.U.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`,c=r.U.div`
  pointer-events: none;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  backdrop-filter: blur(8px);
`,d=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
`,p=r.U.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,h=r.U.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${e=>e.$primary?"linear-gradient(180deg, #fbac61, #e98c2f)":"rgba(255, 255, 255, 0.06)"};
  color: ${e=>e.$primary?"#111827":"rgba(255, 255, 255, 0.9)"};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`,u=r.U.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,g=r.U.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.9rem;
  margin-bottom: 6px;
`,x=r.U.span`
  color: rgba(255, 255, 255, 0.68);
  font-variant-numeric: tabular-nums;
`,m=r.U.input`
  width: 100%;
`;function f(e,t,r){return Math.max(t,Math.min(r,e))}function b(){let e=(0,a.useRef)(null),r=(0,a.useRef)(null),b=(0,a.useRef)(0),y=(0,a.useRef)(0),v=(0,a.useRef)([]),[k,j]=(0,a.useState)(!0),[M,S]=(0,a.useState)(!0),[w,C]=(0,a.useState)(1),[P,R]=(0,a.useState)(1),[T,U]=(0,a.useState)(1.2),[A,F]=(0,a.useState)(1),[I,O]=(0,a.useState)(9.81),[L,z]=(0,a.useState)(.01),[D,E]=(0,a.useState)(1),[H,B]=(0,a.useState)(600),q=(0,a.useRef)({state:[Math.PI/2,0,Math.PI/2+.2,0]}),W=(0,a.useMemo)(()=>e=>{let t=e[0],r=e[1],a=e[2],n=e[3],i=t-a,o=2*w+P-P*Math.cos(2*i),l=(-I*(2*w+P)*Math.sin(t)-P*I*Math.sin(t-2*a)-2*Math.sin(i)*P*(n*n*A+r*r*T*Math.cos(i)))/(T*o),s=2*Math.sin(i)*(r*r*T*(w+P)+I*(w+P)*Math.cos(t)+n*n*A*P*Math.cos(i))/(A*o);return[r,l-L*r,n,s-L*n]},[w,P,T,A,I,L]);(0,a.useEffect)(()=>{let t=r.current,a=e.current;if(!t||!a)return;let n=new ResizeObserver(()=>{let e=t.getBoundingClientRect(),r=f(window.devicePixelRatio||1,1,2);a.width=Math.max(1,Math.floor(e.width*r)),a.height=Math.max(1,Math.floor(e.height*r)),a.getContext("2d").setTransform(r,0,0,r,0,0)});return n.observe(t),()=>n.disconnect()},[]);let N=(e=!1)=>{q.current.state=e?[(1.4*Math.random()+.2)*Math.PI,0,(1.4*Math.random()+.2)*Math.PI,0]:[Math.PI/2,0,Math.PI/2+.2,0],v.current=[]};return(0,a.useEffect)(()=>{let t=e.current;if(!t)return;let r=t.getContext("2d"),a=e=>{b.current=requestAnimationFrame(a);let n=y.current||e;y.current=e;let i=f((e-n)/1e3,0,.033)*D,o=t.getBoundingClientRect(),l=o.width,s=o.height;r.clearRect(0,0,l,s);let c=r.createLinearGradient(0,0,0,s);if(c.addColorStop(0,"#020617"),c.addColorStop(1,"#000000"),r.fillStyle=c,r.fillRect(0,0,l,s),k){let e=i>0?Math.ceil(i/.008):1,t=i/e;for(let r=0;r<e;r++)q.current.state=function(e,t,r){let a=r(e),n=r(e.map((e,r)=>e+t/2*a[r])),i=r(e.map((e,r)=>e+t/2*n[r])),o=r(e.map((e,r)=>e+t*i[r]));return e.map((e,r)=>e+t/6*(a[r]+2*n[r]+2*i[r]+o[r]))}(q.current.state,t,W)}let[d,,p]=q.current.state,h={x:l/2,y:.18*s},u=.38*Math.min(l,s)/(T+A),g=h.x+T*u*Math.sin(d),x=h.y+T*u*Math.cos(d),m=g+A*u*Math.sin(p),j=x+A*u*Math.cos(p);if(M){let e=v.current;e.push({x:m,y:j}),e.length>H&&e.splice(0,e.length-H),r.save(),r.globalCompositeOperation="lighter",r.lineWidth=2,r.beginPath();for(let t=0;t<e.length;t++){let a=e[t];0===t?r.moveTo(a.x,a.y):r.lineTo(a.x,a.y)}let t=r.createLinearGradient(0,0,l,s);t.addColorStop(0,"rgba(59,130,246,0.0)"),t.addColorStop(.5,"rgba(59,130,246,0.35)"),t.addColorStop(1,"rgba(251,172,97,0.55)"),r.strokeStyle=t,r.stroke(),r.restore()}r.lineWidth=3,r.strokeStyle="rgba(255,255,255,0.75)",r.beginPath(),r.moveTo(h.x,h.y),r.lineTo(g,x),r.lineTo(m,j),r.stroke();let S=8+4*w,C=8+4*P;r.fillStyle="#60a5fa",r.beginPath(),r.arc(g,x,S,0,2*Math.PI),r.fill(),r.fillStyle="#fbac61",r.beginPath(),r.arc(m,j,C,0,2*Math.PI),r.fill(),r.fillStyle="rgba(255,255,255,0.85)",r.beginPath(),r.arc(h.x,h.y,4,0,2*Math.PI),r.fill()};return b.current=requestAnimationFrame(a),()=>cancelAnimationFrame(b.current)},[W,T,A,w,P,k,M,D,H]),(0,t.jsxs)(n,{children:[(0,t.jsx)(i,{children:(0,t.jsxs)(o,{ref:r,children:[(0,t.jsx)(l,{ref:e}),(0,t.jsxs)(s,{children:[(0,t.jsx)(c,{children:k?"RUNNING":"PAUSED"}),(0,t.jsx)(c,{children:"Drag not enabled • Use controls"})]})]})}),(0,t.jsxs)(d,{children:[(0,t.jsxs)(p,{children:[(0,t.jsx)(h,{$primary:!0,onClick:()=>j(e=>!e),children:k?"Pause":"Play"}),(0,t.jsx)(h,{onClick:()=>N(!1),children:"Reset"}),(0,t.jsx)(h,{onClick:()=>N(!0),children:"Randomize"})]}),(0,t.jsxs)(u,{children:[(0,t.jsxs)(g,{children:["Mass 1 ",(0,t.jsx)(x,{children:w.toFixed(2)})]}),(0,t.jsx)(m,{type:"range",min:"0.4",max:"3.0",step:"0.05",value:w,onChange:e=>C(parseFloat(e.target.value))}),(0,t.jsxs)(g,{children:["Mass 2 ",(0,t.jsx)(x,{children:P.toFixed(2)})]}),(0,t.jsx)(m,{type:"range",min:"0.4",max:"3.0",step:"0.05",value:P,onChange:e=>R(parseFloat(e.target.value))})]}),(0,t.jsxs)(u,{children:[(0,t.jsxs)(g,{children:["Length 1 ",(0,t.jsxs)(x,{children:[T.toFixed(2)," m"]})]}),(0,t.jsx)(m,{type:"range",min:"0.5",max:"2.2",step:"0.05",value:T,onChange:e=>U(parseFloat(e.target.value))}),(0,t.jsxs)(g,{children:["Length 2 ",(0,t.jsxs)(x,{children:[A.toFixed(2)," m"]})]}),(0,t.jsx)(m,{type:"range",min:"0.5",max:"2.2",step:"0.05",value:A,onChange:e=>F(parseFloat(e.target.value))})]}),(0,t.jsxs)(u,{children:[(0,t.jsxs)(g,{children:["Gravity ",(0,t.jsxs)(x,{children:[I.toFixed(2)," m/s²"]})]}),(0,t.jsx)(m,{type:"range",min:"0.0",max:"20.0",step:"0.1",value:I,onChange:e=>O(parseFloat(e.target.value))}),(0,t.jsxs)(g,{children:["Damping ",(0,t.jsx)(x,{children:L.toFixed(3)})]}),(0,t.jsx)(m,{type:"range",min:"0.0",max:"0.08",step:"0.001",value:L,onChange:e=>z(parseFloat(e.target.value))}),(0,t.jsxs)(g,{children:["Speed ",(0,t.jsxs)(x,{children:[D.toFixed(2),"×"]})]}),(0,t.jsx)(m,{type:"range",min:"0.2",max:"3.0",step:"0.05",value:D,onChange:e=>E(parseFloat(e.target.value))})]}),(0,t.jsxs)(u,{children:[(0,t.jsx)(p,{children:(0,t.jsxs)(h,{onClick:()=>S(e=>!e),style:{minWidth:140},children:["Trail: ",M?"On":"Off"]})}),(0,t.jsxs)(g,{children:["Trail length ",(0,t.jsx)(x,{children:H})]}),(0,t.jsx)(m,{type:"range",min:"50",max:"1400",step:"10",value:H,onChange:e=>B(parseInt(e.target.value,10))})]})]})]})}let y=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(
    circle at 20% 10%,
    #0b1020 0%,
    #05060b 55%,
    #000 100%
  );
  min-height: 100vh;
  color: #eef2ff;
`,v=r.U.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #fbac61;
  margin: 0 0 14px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(251, 172, 97, 0.35);
`,k=r.U.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;e.s(["default",0,function(){return(0,t.jsxs)(y,{children:[(0,t.jsx)(v,{children:"Double Pendulum"}),(0,t.jsx)(k,{children:"A chaotic system: tiny changes in initial conditions can lead to wildly different motion. Use the controls to tweak parameters and reset."}),(0,t.jsx)(b,{})]})}],63557)}]);