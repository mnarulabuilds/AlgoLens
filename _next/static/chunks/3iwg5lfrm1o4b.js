(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,i,r=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return r.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},i=Object.create(null),function(e){return void 0===i[e]&&(i[e]=t(e)),i[e]});e.s(["default",0,n],34537)},26819,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(97053);let n=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`,a=r.U.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,o=r.U.label`
  margin: 10px;
  font-size: 1.1em;

  input {
    margin-left: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`,l=r.U.div`
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`,s=r.U.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  transition: transform 0.016s linear;
`,c=r.U.div`
  margin-top: 20px;
  text-align: center;

  h4 {
    padding: 8px;
    font-size: 1.5em;
  }

  p {
    margin: 5px 0;
    font-size: 1.1em;
  }
`;e.s(["default",0,()=>{let[e,r]=(0,i.useState)(1),[d,p]=(0,i.useState)(100),[u,h]=(0,i.useState)(0);(0,i.useEffect)(()=>{let t=setInterval(()=>{h(t=>t+16*e/1e3)},16);return()=>clearInterval(t)},[e]);let m=d*e;return(0,t.jsxs)(n,{children:[(0,t.jsx)(c,{children:(0,t.jsx)("h4",{children:"Circular Motion"})}),(0,t.jsxs)(a,{children:[(0,t.jsxs)(o,{children:["Speed (0 to 16 rad/s):",(0,t.jsx)("input",{type:"number",value:e,onChange:e=>{let t=Number(e.target.value);t>=0&&t<=16&&r(t)}})]}),(0,t.jsxs)(o,{children:["Radius (0 to 120 pixels):",(0,t.jsx)("input",{type:"number",value:d,onChange:e=>{let t=Number(e.target.value);t>=0&&t<=120&&p(t)}})]})]}),(0,t.jsx)(l,{children:(0,t.jsx)(s,{style:{transform:`translate(${d*Math.cos(u)}px, ${d*Math.sin(u)}px)`}})}),(0,t.jsxs)(c,{children:[(0,t.jsxs)("p",{children:["Angular Momentum: ",m.toFixed(2)]}),(0,t.jsxs)("p",{children:["Number of Revolutions: ",(u/(2*Math.PI)).toFixed(2)]})]})]})}])}]);