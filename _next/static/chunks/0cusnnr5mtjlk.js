(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,i=(t=function(e){return a.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,i],34537)},75473,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(97053);let i=a.U.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`,n=a.U.div`
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.2em;
  color: #333;
  animation: fadeIn 0.5s ease-in-out;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    font-size: 1em;
    padding: 8px;
  }
`,o=a.U.div`
  margin-top: 20px;
  font-size: 1.5em;
  color: #61dafb;
`,s=({number:e,base:r})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(i,{children:e?e.split("").map((r,a)=>(0,t.jsx)(n,{title:`Position: ${e.length-a-1}, Value: ${r}`,children:r},a)):[]}),e&&(0,t.jsx)(o,{children:`Base: ${r} (${{2:"Binary",8:"Octal",10:"Decimal",16:"Hexadecimal"}[r]||"Custom Base"})`})]}),l=a.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,c=a.U.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
`,d=a.U.label`
  color: #555;
  font-size: 1.2em;
  margin-bottom: 10px;
`,p=a.U.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`,u=a.U.select`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`;e.s(["default",0,()=>{let[e,a]=(0,r.useState)(""),[i,n]=(0,r.useState)(10),[o,m]=(0,r.useState)(10),[g,h]=(0,r.useState)("");return(0,r.useEffect)(()=>{(()=>{if(""!==e)try{let t=parseInt(e,i);h(t.toString(o))}catch(e){h("Invalid Number")}})()},[e,i,o]),(0,t.jsxs)(l,{children:[(0,t.jsx)(c,{children:"Number System Visualizer"}),(0,t.jsxs)(d,{children:["Input Number:",(0,t.jsx)(p,{type:"text",value:e,onChange:e=>a(e.target.value),placeholder:"Enter number"})]}),(0,t.jsxs)(d,{children:["Source Base:",(0,t.jsx)(u,{value:i,onChange:e=>n(parseInt(e.target.value)),children:[...Array(15).keys()].map(e=>(0,t.jsx)("option",{value:e+2,children:e+2},e+2))})]}),(0,t.jsxs)(d,{children:["Target Base:",(0,t.jsx)(u,{value:o,onChange:e=>m(parseInt(e.target.value)),children:[...Array(15).keys()].map(e=>(0,t.jsx)("option",{value:e+2,children:e+2},e+2))})]}),(0,t.jsx)(d,{children:"Converted Number:"}),(0,t.jsx)(s,{number:g,base:o})]})}],75473)}]);