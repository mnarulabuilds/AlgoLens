(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,i,r=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,a=(t=function(e){return r.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},i=Object.create(null),function(e){return void 0===i[e]&&(i[e]=t(e)),i[e]});e.s(["default",0,a],34537)},39948,e=>{"use strict";var t=e.i(43476),i=e.i(97053),r=e.i(71645);let a=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
`,n=i.U.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: #1e293b;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid #334155;
`,o=i.U.canvas`
  width: 100%;
  height: 100%;
`,l=i.U.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  background: #1e293b;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #334155;
`,s=i.U.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,c=i.U.label`
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`,d=i.U.input`
  width: 100%;
  cursor: pointer;
`,p=i.U.select`
  padding: 10px;
  background: #0f172a;
  color: white;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
`,h=()=>{let e=(0,r.useRef)(null),[i,h]=(0,r.useState)(5),[u,g]=(0,r.useState)(.02),[m,f]=(0,r.useState)("square"),x=(0,r.useRef)({time:0,wave:[]}),y=(0,r.useCallback)(()=>{let t=e.current;if(!t)return;let r=t.getContext("2d"),{time:a,wave:n}=x.current;r.clearRect(0,0,t.width,t.height);let o=200,l=t.height/2;r.strokeStyle="rgba(148, 163, 184, 0.4)",r.lineWidth=1;for(let e=0;e<i;e++){let t,i,n=o,s=l;"square"===m?i=4/((t=2*e+1)*Math.PI)*100:"sawtooth"===m&&(i=2/((t=e+1)*Math.PI)*100*(e%2==0?1:-1)),o+=i*Math.cos(t*a),l+=i*Math.sin(t*a),r.beginPath(),r.arc(n,s,Math.abs(i),0,2*Math.PI),r.stroke(),r.strokeStyle="rgba(59, 130, 246, 0.8)",r.lineWidth=2,r.beginPath(),r.moveTo(n,s),r.lineTo(o,l),r.stroke(),r.strokeStyle="rgba(148, 163, 184, 0.4)",r.lineWidth=1}n.unshift(l),n.length>500&&n.pop(),r.strokeStyle="#facc15",r.beginPath(),r.moveTo(o,l),r.lineTo(400,n[0]),r.stroke(),r.strokeStyle="#3b82f6",r.lineWidth=3,r.beginPath(),r.moveTo(400,n[0]);for(let e=1;e<n.length;e++)r.lineTo(400+e,n[e]);r.stroke(),x.current.time+=u},[i,m,u]);return(0,r.useEffect)(()=>{let t,i=e.current,r=()=>{i.width=i.offsetWidth*window.devicePixelRatio,i.height=i.offsetHeight*window.devicePixelRatio,i.getContext("2d").scale(window.devicePixelRatio,window.devicePixelRatio)};r(),window.addEventListener("resize",r);let a=()=>{y(),t=requestAnimationFrame(a)};return t=requestAnimationFrame(a),()=>{cancelAnimationFrame(t),window.removeEventListener("resize",r)}},[y]),(0,t.jsxs)(a,{children:[(0,t.jsx)(n,{children:(0,t.jsx)(o,{ref:e})}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(s,{children:[(0,t.jsxs)(c,{children:["Number of Terms: ",(0,t.jsx)("span",{children:i})]}),(0,t.jsx)(d,{type:"range",min:"1",max:"50",value:i,onChange:e=>h(parseInt(e.target.value))})]}),(0,t.jsxs)(s,{children:[(0,t.jsxs)(c,{children:["Speed: ",(0,t.jsxs)("span",{children:[(100*u).toFixed(1),"%"]})]}),(0,t.jsx)(d,{type:"range",min:"0.005",max:"0.1",step:"0.005",value:u,onChange:e=>g(parseFloat(e.target.value))})]}),(0,t.jsxs)(s,{children:[(0,t.jsx)(c,{children:"Wave Target"}),(0,t.jsxs)(p,{value:m,onChange:e=>{f(e.target.value),x.current.wave=[]},children:[(0,t.jsx)("option",{value:"square",children:"Square Wave"}),(0,t.jsx)("option",{value:"sawtooth",children:"Sawtooth Wave"})]})]})]})]})},u=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
`,g=i.U.h1`
  font-size: 2.5rem;
  color: #f8fafc;
  margin-bottom: 20px;
`;e.s(["default",0,function(){return(0,t.jsxs)(u,{children:[(0,t.jsx)(g,{children:"Fourier Series Visualizer"}),(0,t.jsx)(h,{})]})}],39948)}]);