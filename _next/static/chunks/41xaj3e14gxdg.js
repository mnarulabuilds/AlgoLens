(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,i,r=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return r.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},i=Object.create(null),function(e){return void 0===i[e]&&(i[e]=t(e)),i[e]});e.s(["default",0,n],34537)},79056,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(97053);let n=r.q`
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(-45deg); }
`,a=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
`,o=r.U.div`
  position: relative;
  height: 300px;
`,l=r.U.div`
  width: 2px;
  height: ${e=>e.$length}px;
  background: #333;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: top;
  animation: ${n} ${e=>e.$speed}s infinite ease-in-out;
`,s=r.U.div`
  width: 30px;
  height: 30px;
  background: #3498db;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`,d=r.U.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
`,c=({speed:e,length:r})=>{let[n,c]=(0,i.useState)(0),p=(0,i.useRef)(null);return(0,i.useEffect)(()=>(p.current=setInterval(()=>{c(e=>e+1)},1e3),()=>{null!==p.current&&clearInterval(p.current)}),[]),(0,t.jsxs)(a,{children:[(0,t.jsx)(o,{children:(0,t.jsx)(l,{$length:r,$speed:e,children:(0,t.jsx)(s,{})})}),(0,t.jsxs)(d,{children:["Time Elapsed: ",n," s"]})]})},p=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #e0e0e0;
  min-height: 100vh;
  box-sizing: border-box;
`,u=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`,g=r.U.label`
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
`,h=r.U.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`,m=r.U.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;e.s(["default",0,()=>{let[e,r]=(0,i.useState)(2),[n,a]=(0,i.useState)(200);return(0,t.jsxs)(p,{children:[(0,t.jsx)(m,{children:"Simple Pendulum Simulation"}),(0,t.jsxs)(u,{children:[(0,t.jsxs)(g,{children:["Speed (0 to 10 seconds per cycle):",(0,t.jsx)(h,{type:"number",value:e,onChange:e=>{let t=parseFloat(e.target.value||0);t>=0&&t<=10&&r(t)},min:"0.1",step:"0.1",max:"10"})]}),(0,t.jsxs)(g,{children:["Rod Length (0 to 250 pixels):",(0,t.jsx)(h,{type:"number",value:n,onChange:e=>{let t=parseInt(e.target.value||0,10);t>=0&&t<=250&&a(t)},min:"50",max:"250"})]})]}),(0,t.jsx)(c,{speed:e,length:n})]})}],79056)}]);