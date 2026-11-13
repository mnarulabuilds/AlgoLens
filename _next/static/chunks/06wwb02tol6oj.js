(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31067,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["f",()=>t])},34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,n],34537)},98976,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let i=r.U.button`
  background: ${e=>e.$bgColor};
  border: none;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 2px;
  transition: background-color 0.4s ease;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(75%);
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`,n=({label:e,onClick:r,bgColor:n})=>(0,t.jsx)(i,{onClick:r,$bgColor:n,children:e}),a=r.U.div`
  background: #333;
  color: white;
  text-align: right;
  padding: 20px;
  font-size: 2em;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow-x: auto;
`,o=({value:e})=>(0,t.jsx)(a,{children:e});var l=e.i(71645),s=e.i(46595),c=e.i(12921);let d=r.U.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`,p=r.U.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`,u=r.U.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;e.s(["default",0,()=>{let{display:e,handleButtonClick:r}=(()=>{let[e,t]=(0,l.useState)("");return{display:e,handleButtonClick:r=>{if("C"===r)t("");else if("="===r)try{let r=(0,s.f)(e);t((0,c.Qr)(r,{precision:14}))}catch{t("Error")}else t(e+r)}}})(),i={7:"midnightblue",8:"midnightblue",9:"midnightblue"," / ":"orange","sqrt(":"forestgreen",4:"midnightblue",5:"midnightblue",6:"midnightblue"," * ":"orange","pow(":"forestgreen",1:"midnightblue",2:"midnightblue",3:"midnightblue"," - ":"orange","sin(":"forestgreen",0:"midnightblue",".":"firebrick","=":"firebrick"," + ":"orange","cos(":"forestgreen",",":"firebrick","(":"firebrick",")":"firebrick",e:"purple",pi:"purple",C:"springgreen"};return(0,t.jsxs)(p,{children:[(0,t.jsx)(d,{children:"Advanced Calculator"}),(0,t.jsx)(o,{value:e}),(0,t.jsx)(u,{children:["7","8","9"," / ","sqrt(","4","5","6"," * ","pow(","1","2","3"," - ","sin(","0",".","="," + ","cos(",",","(",")","e","pi","C"].map(e=>(0,t.jsx)(n,{label:e,bgColor:i[e],onClick:()=>r(e)},e))})]})}],98976)}]);