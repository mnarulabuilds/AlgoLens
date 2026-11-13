(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,a=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,a],34537)},84185,e=>{"use strict";var t=e.i(43476),r=e.i(97053),i=e.i(71645);let a=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`,n=r.U.div`
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(20, 83, 45, 0.1);
  overflow: hidden;
  border: 1px solid #dcfce7;
  display: flex;
  justify-content: center;
  align-items: center;
`,o=r.U.canvas`
  width: 100%;
  height: 100%;
`,s=r.U.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`,l=r.U.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,c=r.U.label`
  font-weight: 600;
  color: #166534;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`,d=r.U.input`
  width: 100%;
  accent-color: #22c55e;
`,p=()=>{let e=(0,i.useRef)(null),r=(0,i.useRef)({w:0,h:0,dpr:1}),[p,h]=(0,i.useState)(10),[u,g]=(0,i.useState)(25),[m,f]=(0,i.useState)(.75),[x,y]=(0,i.useState)(120),v=(0,i.useCallback)((e,t,r,i)=>{if(e.lineWidth=r,e.beginPath(),e.moveTo(0,0),e.lineTo(0,-t),e.stroke(),t<4){e.fillStyle="#22c55e",e.beginPath(),e.arc(0,-t,4,0,2*Math.PI),e.fill();return}e.save(),e.translate(0,-t),e.rotate(i*Math.PI/180),v(e,t*m,.7*r,i),e.restore(),e.save(),e.translate(0,-t),e.rotate(-i*Math.PI/180),v(e,t*m,.7*r,i),e.restore()},[m]),k=(0,i.useCallback)(()=>{let t=e.current;if(!t)return;let i=t.getContext("2d"),{w:a,h:n}=r.current;a&&n&&(i.clearRect(0,0,a,n),i.strokeStyle="#4b2c20",i.lineCap="round",i.save(),i.translate(a/2,n-20),v(i,Math.min(x,.42*n),.8*p,u),i.restore())},[p,u,m,x,v]);return(0,i.useEffect)(()=>{let t=e.current;if(!t)return;let i=new ResizeObserver(()=>{let e=t.getBoundingClientRect(),i=Math.max(1,Math.min(window.devicePixelRatio||1,2));r.current={w:e.width,h:e.height,dpr:i},t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),t.getContext("2d").setTransform(i,0,0,i,0,0),k()});return i.observe(t),()=>i.disconnect()},[k]),(0,t.jsxs)(a,{children:[(0,t.jsx)(n,{children:(0,t.jsx)(o,{ref:e})}),(0,t.jsxs)(s,{children:[(0,t.jsxs)(l,{children:[(0,t.jsxs)(c,{children:["Recursion Depth: ",(0,t.jsx)("span",{children:p})]}),(0,t.jsx)(d,{type:"range",min:"1",max:"12",step:"1",value:p,onChange:e=>h(parseInt(e.target.value))})]}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(c,{children:["Branch Angle: ",(0,t.jsxs)("span",{children:[u,"°"]})]}),(0,t.jsx)(d,{type:"range",min:"0",max:"90",step:"1",value:u,onChange:e=>g(parseInt(e.target.value))})]}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(c,{children:["Length Ratio: ",(0,t.jsx)("span",{children:m.toFixed(2)})]}),(0,t.jsx)(d,{type:"range",min:"0.5",max:"0.85",step:"0.01",value:m,onChange:e=>f(parseFloat(e.target.value))})]}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(c,{children:["Base Length: ",(0,t.jsxs)("span",{children:[x,"px"]})]}),(0,t.jsx)(d,{type:"range",min:"50",max:"200",step:"1",value:x,onChange:e=>y(parseInt(e.target.value))})]})]})]})},h=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0fdf4;
  min-height: 100vh;
`,u=r.U.h1`
  font-size: 2.5rem;
  color: #14532d;
  margin-bottom: 20px;
`;e.s(["default",0,function(){return(0,t.jsxs)(h,{children:[(0,t.jsx)(u,{children:"Fractal Tree Generator"}),(0,t.jsx)(p,{})]})}],84185)}]);