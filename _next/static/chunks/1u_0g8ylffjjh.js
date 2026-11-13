(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},93801,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(97053);let n={nodes:[],edges:[]},a=(e,t)=>{switch(t.type){case"ADD_NODE":return{...e,nodes:[...e.nodes,t.payload]};case"ADD_EDGE":return{...e,edges:[...e.edges,t.payload]};case"CLEAR_GRAPH":return n;default:return e}},o=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,l=i.U.h4`
  color: #1b368d;
`,s=i.U.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`,d=i.U.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`,c=i.U.div`
  position: relative;
  width: 90%;
  height: 70vh;
  max-width: 800px;
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #ccc;
  margin: 20px auto;
`,p=i.U.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  left: ${e=>e.$x}px;
  top: ${e=>e.$y}px;
`,h=i.q`
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
`,u=i.U.svg.attrs(e=>({children:(0,t.jsx)("line",{x1:e.$x1,y1:e.$y1,x2:e.$x2,y2:e.$y2,stroke:"black"})}))`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${h} 1s linear;
`;e.s(["default",0,()=>{let[e,i]=(0,r.useReducer)(a,n),{nodes:h,edges:g}=e;return(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:"Randomized Graph Visualizer"}),(0,t.jsxs)(d,{children:[(0,t.jsx)(s,{onClick:()=>{i({type:"ADD_NODE",payload:{id:h.length+1,x:50+200*Math.random(),y:50+200*Math.random()}})},children:"Add Node"}),(0,t.jsx)(s,{onClick:()=>{let e;if(h.length<2)return;let t=h[Math.floor(Math.random()*h.length)].id;do e=h[Math.floor(Math.random()*h.length)].id;while(t===e)i({type:"ADD_EDGE",payload:{source:t,target:e}})},children:"Add Edge"}),(0,t.jsx)(s,{onClick:()=>{i({type:"CLEAR_GRAPH"})},children:"Clear Graph"})]})," ",(0,t.jsxs)(c,{children:[g.map((e,r)=>(0,t.jsx)(u,{$x1:h.find(t=>t.id===e.source).x,$y1:h.find(t=>t.id===e.source).y,$x2:h.find(t=>t.id===e.target).x,$y2:h.find(t=>t.id===e.target).y},r)),h.map(e=>(0,t.jsx)(p,{$x:e.x,$y:e.y,children:e.id},e.id))]})]})}])}]);