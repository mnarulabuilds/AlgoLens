(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return a.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},13789,e=>{"use strict";var t=e.i(43476),r=e.i(97053),a=e.i(71645);let n=r.U.div`
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
  aspect-ratio: 1;
  position: relative;
`,l=r.U.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,s=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,c=r.U.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 6px;
`,d=r.U.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,p=r.U.input`
  width: 100%;
`,u=r.U.div`
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
`,g=r.U.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.35;
`;function m(e,t,r){return Math.max(t,Math.min(r,e))}function f(){let e=(0,a.useRef)(null),r=(0,a.useRef)(null),f=(0,a.useRef)(0),x=(0,a.useRef)(0),[b,y]=(0,a.useState)(!0),[v,k]=(0,a.useState)(.45),[w,M]=(0,a.useState)(.12),[j,C]=(0,a.useState)(1),[S,R]=(0,a.useState)(!0),[T,A]=(0,a.useState)(220),[P,U]=(0,a.useState)(1.25),O=(0,a.useRef)({w:0,h:0,imageData:null,data:null});(0,a.useEffect)(()=>{let t=r.current,a=e.current;if(!t||!a)return;let n=new ResizeObserver(()=>{let e=t.getBoundingClientRect(),r=m(window.devicePixelRatio||1,1,2);a.width=Math.max(1,Math.floor(e.width*r)),a.height=Math.max(1,Math.floor(e.height*r));let n=a.getContext("2d");n.setTransform(r,0,0,r,0,0);let i=Math.max(60,Math.floor(T)),o=Math.max(60,Math.floor(T));O.current.w=i,O.current.h=o,O.current.imageData=n.createImageData(i,o),O.current.data=O.current.imageData.data});return n.observe(t),()=>n.disconnect()},[T]);let F=(0,a.useMemo)(()=>[{x:.5-v/2,y:.5},{x:.5+v/2,y:.5}],[v]);return(0,a.useEffect)(()=>{let t=e.current;if(!t)return;let r=t.getContext("2d"),a=()=>{if(f.current=requestAnimationFrame(a),!O.current.imageData)return;let e=t.getBoundingClientRect(),n=e.width,i=e.height;b&&(x.current+=.016*j);let o=x.current,l=O.current.w,s=O.current.h,c=O.current.data,d=2*Math.PI/Math.max(1e-4,w),p=.35*d,u=0;for(let e=0;e<s;e++){let t=e/(s-1);for(let e=0;e<l;e++){let r=e/(l-1),a=0;for(let e=0;e<F.length;e++){let n=r-F[e].x,i=t-F[e].y,l=Math.sqrt(n*n+i*i);a+=Math.sin(d*l-p*o)*(S?1/(1+12*l):1)}let n=m(a/1.6,-1,1),[i,s,h]=function(e){let t=(e+1)/2;if(t<.5){let e=t/.5;return[Math.floor(20+40*e),Math.floor(80+120*e),Math.floor(120+135*e)]}let r=(t-.5)/.5;return[Math.floor(35+220*r),Math.floor(35+140*r),Math.floor(40+60*r)]}(n=Math.sign(n)*Math.pow(Math.abs(n),1/P));c[u++]=i,c[u++]=s,c[u++]=h,c[u++]=255}}r.save(),r.imageSmoothingEnabled=!0,r.clearRect(0,0,n,i),r.putImageData(O.current.imageData,0,0),r.globalCompositeOperation="source-over",r.drawImage(t,0,0,l,s,0,0,n,i),r.globalCompositeOperation="lighter",F.forEach((e,t)=>{let a=e.x*n,o=e.y*i;r.beginPath(),r.arc(a,o,6,0,2*Math.PI),r.fillStyle=0===t?"rgba(127,231,255,0.85)":"rgba(251,172,97,0.85)",r.fill(),r.beginPath(),r.arc(a,o,12,0,2*Math.PI),r.strokeStyle="rgba(255,255,255,0.35)",r.lineWidth=1,r.stroke()}),r.restore()};return f.current=requestAnimationFrame(a),()=>cancelAnimationFrame(f.current)},[S,P,b,F,j,w]),(0,t.jsxs)(n,{children:[(0,t.jsx)(i,{children:(0,t.jsx)(o,{ref:r,children:(0,t.jsx)(l,{ref:e})})}),(0,t.jsxs)(s,{children:[(0,t.jsxs)(u,{children:[(0,t.jsx)(h,{$primary:!0,onClick:()=>y(e=>!e),children:b?"Pause":"Play"}),(0,t.jsx)(h,{onClick:()=>{x.current=0},children:"Reset Time"})]}),(0,t.jsxs)(c,{children:["Source separation ",(0,t.jsx)(d,{children:v.toFixed(2)})]}),(0,t.jsx)(p,{type:"range",min:"0.10",max:"0.80",step:"0.01",value:v,onChange:e=>k(parseFloat(e.target.value))}),(0,t.jsxs)(c,{children:["Wavelength ",(0,t.jsx)(d,{children:w.toFixed(2)})]}),(0,t.jsx)(p,{type:"range",min:"0.05",max:"0.25",step:"0.005",value:w,onChange:e=>M(parseFloat(e.target.value))}),(0,t.jsxs)(c,{children:["Speed ",(0,t.jsxs)(d,{children:[j.toFixed(2),"×"]})]}),(0,t.jsx)(p,{type:"range",min:"0.2",max:"3.0",step:"0.05",value:j,onChange:e=>C(parseFloat(e.target.value))}),(0,t.jsxs)(c,{children:["Contrast ",(0,t.jsx)(d,{children:P.toFixed(2)})]}),(0,t.jsx)(p,{type:"range",min:"0.8",max:"2.0",step:"0.05",value:P,onChange:e=>U(parseFloat(e.target.value))}),(0,t.jsxs)(c,{children:["Render resolution ",(0,t.jsxs)(d,{children:[T,"px"]})]}),(0,t.jsx)(p,{type:"range",min:"120",max:"340",step:"10",value:T,onChange:e=>A(parseInt(e.target.value,10))}),(0,t.jsx)(u,{style:{marginTop:12},children:(0,t.jsxs)(h,{onClick:()=>R(e=>!e),children:["Attenuation: ",S?"On":"Off"]})}),(0,t.jsxs)(g,{children:["- Blue/orange regions indicate opposite phase.",(0,t.jsx)("br",{}),"- High contrast makes nodes (quiet bands) easier to see.",(0,t.jsx)("br",{}),"- Lower resolution improves performance on mobile."]})]})]})}let x=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #05060b;
  min-height: 100vh;
  color: white;
`,b=r.U.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #7fe7ff;
  margin-bottom: 14px;
  text-align: center;
  text-shadow: 0 0 14px rgba(127, 231, 255, 0.35);
`,y=r.U.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;e.s(["default",0,function(){return(0,t.jsxs)(x,{children:[(0,t.jsx)(b,{children:"Wave Interference"}),(0,t.jsx)(y,{children:"Two sources emit waves and create an interference pattern. Adjust source separation, wavelength, and speed to see constructive/destructive regions."}),(0,t.jsx)(f,{})]})}],13789)}]);