(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},35445,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(97053),n=e.i(45009);let a=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,o=i.U.div`
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 5px;
  position: relative;
  animation: ${({$amplitude:e})=>i.q`
  0% { transform: translateX(${e}px); }
  50% { transform: translateX(-${e}px); }
  100% { transform: translateX(${e}px); }
`}
    ${({$period:e})=>e}s linear infinite;
`,l=i.U.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
`,s=({mass:e,springLength:i})=>{let[n,s]=(0,r.useState)(0),c=2*Math.PI/Math.sqrt(.5/e),d=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=Date.now(),t=()=>{s((Date.now()-e)/1e3),d.current=requestAnimationFrame(t)};return d.current=requestAnimationFrame(t),()=>{null!==d.current&&cancelAnimationFrame(d.current)}},[]),(0,t.jsxs)(a,{children:[(0,t.jsx)(o,{$amplitude:i,$period:c}),(0,t.jsxs)(l,{children:["Time Elapsed: ",n.toFixed(2),"s"]})]})};s.propTypes={mass:n.default.number.isRequired,springLength:n.default.number.isRequired};let c=i.U.header`
  width: 100%;
  padding: 20px;
  background-color: #4caf50;
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 4px solid #388e3c;
  margin-bottom: 16px;
`,d=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e8f5e9;
  padding: 20px;
`,p=i.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,u=i.U.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`,g=i.U.label`
  font-size: 18px;
  margin-top: 10px;
  color: #555;
`;e.s(["default",0,()=>{let[e,i]=(0,r.useState)(1),[n,a]=(0,r.useState)(100);return(0,t.jsxs)(d,{children:[(0,t.jsx)(c,{children:"Simple Harmonic Motion"}),(0,t.jsxs)(p,{children:[(0,t.jsx)(g,{htmlFor:"mass",children:"Mass (0 to 10 kg):"}),(0,t.jsx)(u,{id:"mass",type:"number",value:e,onChange:e=>{let t=Number(e.target.value);t>=0&&t<=10&&i(t)}}),(0,t.jsx)(g,{htmlFor:"springLength",children:"Spring Length (0 to 150 px):"}),(0,t.jsx)(u,{id:"springLength",type:"number",value:n,onChange:e=>{let t=Number(e.target.value);t>=0&&t<=150&&a(t)}})]}),(0,t.jsx)(s,{mass:e,springLength:n})]})}],35445)}]);