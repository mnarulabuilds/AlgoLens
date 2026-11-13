(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,i,r=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return r.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},i=Object.create(null),function(e){return void 0===i[e]&&(i[e]=t(e)),i[e]});e.s(["default",0,n],34537)},93421,e=>{"use strict";var t=e.i(43476),i=e.i(97053),r=e.i(71645);let n=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`,o=i.U.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: crosshair;
`,a=i.U.svg`
  width: 100%;
  height: 100%;
  touch-action: none;
`,l=i.U.div`
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`,s=i.U.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.$active?"#3b82f6":"#f1f5f9"};
  color: ${e=>e.$active?"white":"#475569"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.$active?"#2563eb":"#e2e8f0"};
  }
`,c=()=>{let[e,i]=(0,r.useState)([{x:100,y:400},{x:300,y:100},{x:600,y:100},{x:800,y:400}]),[c,d]=(0,r.useState)(null),p=(0,r.useRef)(null),u=(0,r.useCallback)(e=>{let t,r,n,o,a,l;if(null===c)return;let s=(r=(t=p.current).getBoundingClientRect(),n=t.viewBox.baseVal.width/r.width,o=t.viewBox.baseVal.height/r.height,a=e.clientX||e.touches&&e.touches[0].clientX,l=e.clientY||e.touches&&e.touches[0].clientY,{x:(a-r.left)*n,y:(l-r.top)*o});i(e=>{let t=[...e];return t[c]=s,t})},[c]),h=(0,r.useCallback)(()=>{d(null)},[]);return(0,r.useEffect)(()=>(window.addEventListener("pointermove",u),window.addEventListener("pointerup",h),()=>{window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",h)}),[u,h]),(0,t.jsxs)(n,{children:[(0,t.jsx)(o,{children:(0,t.jsxs)(a,{ref:p,viewBox:"0 0 900 500",children:[(0,t.jsx)("polyline",{points:e.map(e=>`${e.x},${e.y}`).join(" "),fill:"none",stroke:"#cbd5e1",strokeWidth:"1",strokeDasharray:"5,5"}),(0,t.jsx)("path",{d:(()=>{if(e.length<2)return"";let t=`M ${e[0].x} ${e[0].y}`;return 2===e.length?t+=` L ${e[1].x} ${e[1].y}`:3===e.length?t+=` Q ${e[1].x} ${e[1].y}, ${e[2].x} ${e[2].y}`:4===e.length&&(t+=` C ${e[1].x} ${e[1].y}, ${e[2].x} ${e[2].y}, ${e[3].x} ${e[3].y}`),t})(),fill:"none",stroke:"#3b82f6",strokeWidth:"4",strokeLinecap:"round"}),e.map((i,r)=>(0,t.jsxs)("g",{onPointerDown:e=>{e.stopPropagation(),d(r)},children:[(0,t.jsx)("circle",{cx:i.x,cy:i.y,r:"12",fill:0===r||r===e.length-1?"#3b82f6":"#f59e0b",style:{cursor:"move"}}),(0,t.jsxs)("text",{x:i.x,y:i.y-20,textAnchor:"middle",fontSize:"12",fill:"#64748b",fontWeight:"bold",children:["P",r]})]},r))]})}),(0,t.jsxs)(l,{children:[(0,t.jsx)(s,{onClick:()=>{if(e.length>=4)return;let t=e[e.length-1];i([...e,{x:t.x+50,y:t.y}])},disabled:e.length>=4,children:"Add Point"}),(0,t.jsx)(s,{onClick:()=>{e.length<=2||i(e.slice(0,-1))},disabled:e.length<=2,children:"Remove Point"}),(0,t.jsx)(s,{onClick:()=>i([{x:100,y:400},{x:300,y:100},{x:600,y:100},{x:800,y:400}]),children:"Reset"})]})]})},d=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
`,p=i.U.h1`
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 20px;
`;e.s(["default",0,function(){return(0,t.jsxs)(d,{children:[(0,t.jsx)(p,{children:"Bezier Curves Visualizer"}),(0,t.jsx)(c,{})]})}],93421)}]);