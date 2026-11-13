(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},32487,e=>{"use strict";var t=e.i(43476),r=e.i(97053),i=e.i(71645);let n=r.U.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`,a=r.U.div`
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
  aspect-ratio: 1;
  position: relative;
`,l=r.U.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,s=r.U.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`,d=r.U.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  backdrop-filter: blur(8px);
`,c=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,p=r.U.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`,h=r.U.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${e=>e.$primary?"linear-gradient(180deg, #7fe7ff, #2dd4ff)":"rgba(255, 255, 255, 0.06)"};
  color: ${e=>e.$primary?"#041014":"rgba(255, 255, 255, 0.9)"};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`,g=r.U.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 10px 0 6px;
`,u=r.U.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,m=r.U.input`
  width: 100%;
`,x=r.U.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`,f=r.U.div`
  padding: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`,b=r.U.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
`,y=r.U.div`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  font-variant-numeric: tabular-nums;
`;function v(e){return e.toLocaleString(void 0,{maximumFractionDigits:0})}function k(){let e=(0,i.useRef)(null),r=(0,i.useRef)(null),k=(0,i.useRef)(0),[j,S]=(0,i.useState)(!0),[C,R]=(0,i.useState)(800),[M,T]=(0,i.useState)(1),[U,A]=(0,i.useState)(2),[P,z]=(0,i.useState)(!0),O=(0,i.useRef)({total:0,inside:0}),[F,L]=(0,i.useState)({total:0,inside:0}),I=(0,i.useMemo)(()=>{let{total:e,inside:t}=F;return e>0?4*t/e:0},[F]);return(0,i.useEffect)(()=>{let t=r.current,i=e.current;if(!t||!i)return;let n=new ResizeObserver(()=>{let e=t.getBoundingClientRect(),r=Math.max(1,Math.min(2,window.devicePixelRatio||1));i.width=Math.max(1,Math.floor(e.width*r)),i.height=Math.max(1,Math.floor(e.height*r));let n=i.getContext("2d");n.setTransform(r,0,0,r,0,0),n.clearRect(0,0,e.width,e.height),w(n,e.width,e.height,P)});return n.observe(t),()=>n.disconnect()},[P]),(0,i.useEffect)(()=>{let t=e.current;if(!t)return;let r=t.getContext("2d"),i=0,n=()=>{if(k.current=requestAnimationFrame(n),!j)return;let e=t.getBoundingClientRect(),a=e.width,o=e.height;i++,P&&i%90==0&&(r.save(),r.globalAlpha=.12,w(r,a,o,!0),r.restore());let l=Math.floor(C*M),s=.48*Math.min(a,o),d=a/2,c=o/2,p=0;for(let e=0;e<l;e++){let e=2*Math.random()-1,t=2*Math.random()-1,i=e*e+t*t<=1;i&&p++;let n=d+e*s,a=c+t*s;r.fillStyle=i?"rgba(127,231,255,0.9)":"rgba(251,172,97,0.75)",r.fillRect(n,a,U,U)}O.current.total+=l,O.current.inside+=p,i%6==0&&L({...O.current})};return k.current=requestAnimationFrame(n),()=>cancelAnimationFrame(k.current)},[C,U,j,P,M]),(0,t.jsxs)(n,{children:[(0,t.jsx)(a,{children:(0,t.jsxs)(o,{ref:r,children:[(0,t.jsx)(l,{ref:e}),(0,t.jsxs)(s,{children:[(0,t.jsx)(d,{children:j?"RUNNING":"PAUSED"}),(0,t.jsxs)(d,{children:["π ≈ ",I?I.toFixed(6):"—"]})]})]})}),(0,t.jsxs)(c,{children:[(0,t.jsxs)(p,{children:[(0,t.jsx)(h,{$primary:!0,onClick:()=>S(e=>!e),children:j?"Pause":"Play"}),(0,t.jsx)(h,{onClick:()=>{O.current={total:0,inside:0},L({total:0,inside:0});let t=e.current;if(!t)return;let r=t.getContext("2d"),i=t.getBoundingClientRect();r.clearRect(0,0,i.width,i.height),w(r,i.width,i.height,P)},children:"Reset"}),(0,t.jsxs)(h,{onClick:()=>z(e=>!e),children:["Guides: ",P?"On":"Off"]})]}),(0,t.jsxs)(g,{children:["Points per frame ",(0,t.jsx)(u,{children:v(C)})]}),(0,t.jsx)(m,{type:"range",min:"100",max:"5000",step:"50",value:C,onChange:e=>R(parseInt(e.target.value,10))}),(0,t.jsxs)(g,{children:["Speed ",(0,t.jsxs)(u,{children:[M.toFixed(2),"×"]})]}),(0,t.jsx)(m,{type:"range",min:"0.25",max:"3.0",step:"0.05",value:M,onChange:e=>T(parseFloat(e.target.value))}),(0,t.jsxs)(g,{children:["Dot size ",(0,t.jsxs)(u,{children:[U,"px"]})]}),(0,t.jsx)(m,{type:"range",min:"1",max:"6",step:"1",value:U,onChange:e=>A(parseInt(e.target.value,10))}),(0,t.jsxs)(x,{children:[(0,t.jsxs)(f,{children:[(0,t.jsx)(b,{children:"Total points"}),(0,t.jsx)(y,{children:v(F.total)})]}),(0,t.jsxs)(f,{children:[(0,t.jsx)(b,{children:"Inside circle"}),(0,t.jsx)(y,{children:v(F.inside)})]}),(0,t.jsxs)(f,{children:[(0,t.jsx)(b,{children:"Estimate"}),(0,t.jsx)(y,{children:I?I.toFixed(6):"—"})]}),(0,t.jsxs)(f,{children:[(0,t.jsx)(b,{children:"Error vs π"}),(0,t.jsx)(y,{children:F.total>0?Math.abs(Math.PI-I).toFixed(6):"—"})]})]})]})]})}function w(e,t,r,i){if(!i)return;let n=.48*Math.min(t,r),a=t/2,o=r/2,l=e.createLinearGradient(0,0,0,r);l.addColorStop(0,"rgba(2,6,23,1)"),l.addColorStop(1,"rgba(0,0,0,1)"),e.fillStyle=l,e.fillRect(0,0,t,r),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(a-n,o-n,2*n,2*n),e.beginPath(),e.arc(a,o,n,0,2*Math.PI),e.strokeStyle="rgba(127,231,255,0.35)",e.lineWidth=2,e.stroke(),e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,e.beginPath(),e.moveTo(a-n,o),e.lineTo(a+n,o),e.moveTo(a,o-n),e.lineTo(a,o+n),e.stroke()}let j=r.U.div`
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
`,S=r.U.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #7fe7ff;
  margin: 0 0 10px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(127, 231, 255, 0.35);
`,C=r.U.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;e.s(["default",0,function(){return(0,t.jsxs)(j,{children:[(0,t.jsx)(S,{children:"Monte Carlo Estimation of π"}),(0,t.jsx)(C,{children:"Random points are thrown into a square. The ratio that land inside the inscribed circle approaches \\( \\pi/4 \\). Try adjusting batch size and speed for smoother/faster convergence."}),(0,t.jsx)(k,{})]})}],32487)}]);