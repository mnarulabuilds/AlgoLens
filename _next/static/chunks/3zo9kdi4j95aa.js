(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},91318,e=>{"use strict";var t=e.i(43476),r=e.i(97053),i=e.i(71645);let n=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`,a=r.U.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
`,o=r.U.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,l=r.U.label`
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
`,s=r.U.input`
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`,c=r.U.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`,d=r.U.canvas`
  width: 100%;
  height: 100%;
`,p=r.U.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`,u=r.U.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.$primary?"#3b82f6":"#e2e8f0"};
  color: ${e=>e.$primary?"white":"#475569"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    background: ${e=>e.$primary?"#2563eb":"#cbd5e1"};
  }
`,h=r.U.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  background: #f1f5f9;
  padding: 15px;
  border-radius: 10px;
`,m=r.U.div`
  text-align: center;
  p {
    margin: 5px 0;
    color: #334155;
    font-size: 0.95rem;
  }
  span {
    font-weight: bold;
    color: #0f172a;
  }
`,g=()=>{let e=(0,i.useRef)(null),[r,g]=(0,i.useState)(2),[x,f]=(0,i.useState)(5),[b,y]=(0,i.useState)(3),[v,k]=(0,i.useState)(-2),[w,j]=(0,i.useState)(!1),T=(0,i.useRef)({p1:{x:200,v:3,m:2,r:20},p2:{x:600,v:-2,m:5,r:35},lastUpdateTime:0}),S=(0,i.useCallback)(()=>{let t=e.current;t&&(T.current={p1:{x:.25*t.width,v:Number(b),m:Number(r),r:15+8*Math.sqrt(r)},p2:{x:.75*t.width,v:Number(v),m:Number(x),r:15+8*Math.sqrt(x)},lastUpdateTime:performance.now()},j(!1),C())},[r,x,b,v]),C=(0,i.useCallback)(()=>{let t=e.current;if(!t)return;let r=t.getContext("2d"),{p1:i,p2:n}=T.current;r.clearRect(0,0,t.width,t.height),r.strokeStyle="#334155",r.lineWidth=2,r.beginPath(),r.moveTo(0,t.height-50),r.lineTo(t.width,t.height-50),r.stroke(),r.fillStyle="#3b82f6",r.beginPath(),r.arc(i.x,t.height-50-i.r,i.r,0,2*Math.PI),r.fill(),r.fillStyle="white",r.textAlign="center",r.fillText(`${i.m}kg`,i.x,t.height-50-i.r+5),r.fillStyle="#ef4444",r.beginPath(),r.arc(n.x,t.height-50-n.r,n.r,0,2*Math.PI),r.fill(),r.fillStyle="white",r.textAlign="center",r.fillText(`${n.m}kg`,n.x,t.height-50-n.r+5);let a=(e,t,i,n)=>{if(.1>Math.abs(i))return;let a=20*i;r.strokeStyle=n,r.lineWidth=3,r.beginPath(),r.moveTo(e,t),r.lineTo(e+a,t),r.stroke(),r.beginPath();let o=i>0?1:-1;r.moveTo(e+a,t),r.lineTo(e+a-8*o,t-4),r.lineTo(e+a-8*o,t+4),r.closePath(),r.fill()};a(i.x,t.height-50-i.r-20,i.v,"#3b82f6"),a(n.x,t.height-50-n.r-20,n.v,"#ef4444")},[]);return(0,i.useEffect)(()=>{let t=e.current;t.width=t.offsetWidth,t.height=t.offsetHeight,S()},[S]),(0,i.useEffect)(()=>{let t;if(!w)return;let r=i=>{let n=(i-T.current.lastUpdateTime)/16;T.current.lastUpdateTime=i;let{p1:a,p2:o}=T.current;a.x+=a.v*n,o.x+=o.v*n,a.x-a.r<0&&(a.x=a.r,a.v*=-1),o.x+o.r>e.current.width&&(o.x=e.current.width-o.r,o.v*=-1);let l=Math.abs(a.x-o.x);if(l<a.r+o.r){let e=a.r+o.r-l;a.x<o.x?(a.x-=e/2,o.x+=e/2):(a.x+=e/2,o.x-=e/2);let t=a.v,r=o.v,i=a.m,n=o.m;a.v=(t*(i-n)+2*n*r)/(i+n),o.v=(r*(n-i)+2*i*t)/(i+n)}C(),t=requestAnimationFrame(r)};return T.current.lastUpdateTime=performance.now(),t=requestAnimationFrame(r),()=>cancelAnimationFrame(t)},[w,C]),(0,t.jsxs)(n,{children:[(0,t.jsxs)(a,{children:[(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:"Mass 1 (kg)"}),(0,t.jsx)(s,{type:"number",value:r,onChange:e=>g(parseFloat(e.target.value))})]}),(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:"Velocity 1 (m/s)"}),(0,t.jsx)(s,{type:"number",value:b,onChange:e=>y(parseFloat(e.target.value))})]}),(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:"Mass 2 (kg)"}),(0,t.jsx)(s,{type:"number",value:x,onChange:e=>f(parseFloat(e.target.value))})]}),(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:"Velocity 2 (m/s)"}),(0,t.jsx)(s,{type:"number",value:v,onChange:e=>k(parseFloat(e.target.value))})]})]}),(0,t.jsxs)(p,{children:[(0,t.jsx)(u,{$primary:!0,onClick:()=>j(!w),children:w?"Pause":"Start Simulation"}),(0,t.jsx)(u,{onClick:S,children:"Reset"})]}),(0,t.jsx)(c,{children:(0,t.jsx)(d,{ref:e})}),(0,t.jsxs)(h,{children:[(0,t.jsxs)(m,{children:[(0,t.jsxs)("p",{children:["Object 1 Momentum:"," ",(0,t.jsx)("span",{children:(T.current.p1.m*T.current.p1.v).toFixed(2)})]}),(0,t.jsxs)("p",{children:["Object 1 Energy:"," ",(0,t.jsx)("span",{children:(.5*T.current.p1.m*T.current.p1.v**2).toFixed(2)})]})]}),(0,t.jsxs)(m,{children:[(0,t.jsxs)("p",{children:["Object 2 Momentum:"," ",(0,t.jsx)("span",{children:(T.current.p2.m*T.current.p2.v).toFixed(2)})]}),(0,t.jsxs)("p",{children:["Object 2 Energy:"," ",(0,t.jsx)("span",{children:(.5*T.current.p2.m*T.current.p2.v**2).toFixed(2)})]})]})]})]})},x=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`,f=r.U.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;e.s(["default",0,function(){return(0,t.jsxs)(x,{children:[(0,t.jsx)(f,{children:"Elastic Collisions Visualizer"}),(0,t.jsx)(g,{})]})}],91318)}]);