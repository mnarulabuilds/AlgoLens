(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,n=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,i=(t=function(e){return n.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,i],34537)},58299,e=>{"use strict";var t=e.i(43476),r=e.i(97053),n=e.i(71645);let i=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e293b;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  width: 100%;
`,a=r.U.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  cursor: crosshair;
  border: 1px solid #334155;
`,o=r.U.canvas`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`,l=r.U.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`,s=r.U.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #94a3b8;
  font-size: 0.9rem;
`,c=r.U.input`
  width: 150px;
`,d=r.U.p`
  color: #64748b;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
`,u=()=>{let e=(0,n.useRef)(null),[r,u]=(0,n.useState)(.98),[p,h]=(0,n.useState)(200),g=(0,n.useRef)({cols:0,rows:0,current:new Float32Array(0),previous:new Float32Array(0),animationId:null}),m=(0,n.useCallback)(()=>{g.current.cols=p,g.current.rows=p,g.current.current=new Float32Array(p*p).fill(0),g.current.previous=new Float32Array(p*p).fill(0);let t=e.current;t&&(t.width=p,t.height=p)},[p]);(0,n.useEffect)(()=>{m()},[m]);let f=(0,n.useCallback)(()=>{let{cols:t,rows:n,current:i,previous:a}=g.current,o=e.current;if(!o)return;let l=o.getContext("2d"),s=l.createImageData(t,n);for(let e=1;e<t-1;e++)for(let o=1;o<n-1;o++){let n=e+o*t,l=a[n-1]+a[n+1]+a[n-t]+a[n+t];i[n]=l/2-i[n],i[n]*=r;let c=4*n,d=Math.max(0,Math.min(255,128+2*i[n]));s.data[c]=.1*d,s.data[c+1]=.6*d,s.data[c+2]=d,s.data[c+3]=255}l.putImageData(s,0,0);let c=g.current.previous;g.current.previous=g.current.current,g.current.current=c},[r]);(0,n.useEffect)(()=>{let e=()=>{f(),g.current.animationId=requestAnimationFrame(e)};return g.current.animationId=requestAnimationFrame(e),()=>{null!==g.current.animationId&&cancelAnimationFrame(g.current.animationId)}},[f]);let x=t=>{let r=e.current.getBoundingClientRect(),n=Math.floor((t.clientX-r.left)/r.width*g.current.cols),i=Math.floor((t.clientY-r.top)/r.height*g.current.rows);n>0&&n<g.current.cols-1&&i>0&&i<g.current.rows-1&&(g.current.previous[n+i*g.current.cols]=512)};return(0,t.jsxs)(i,{children:[(0,t.jsx)(a,{onMouseMove:e=>1===e.buttons&&x(e),onMouseDown:x,children:(0,t.jsx)(o,{ref:e})}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(s,{children:[(0,t.jsxs)("label",{children:["Damping: ",r.toFixed(3)]}),(0,t.jsx)(c,{type:"range",min:"0.9",max:"0.999",step:"0.001",value:r,onChange:e=>u(parseFloat(e.target.value))})]}),(0,t.jsxs)(s,{children:[(0,t.jsxs)("label",{children:["Resolution: ",p]}),(0,t.jsx)(c,{type:"range",min:"100",max:"400",step:"50",value:p,onChange:e=>h(parseInt(e.target.value))})]})]}),(0,t.jsx)(d,{children:"Click or drag on the water to create ripples. Adjust damping to change how long ripples last."})]})},p=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
`,h=r.U.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;e.s(["default",0,function(){return(0,t.jsxs)(p,{children:[(0,t.jsx)(h,{children:"Fluid Ripple Simulation"}),(0,t.jsx)(u,{})]})}],58299)}]);