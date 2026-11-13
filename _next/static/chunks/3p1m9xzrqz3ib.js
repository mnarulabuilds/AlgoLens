(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,i,a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,n=(t=function(e){return a.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},i=Object.create(null),function(e){return void 0===i[e]&&(i[e]=t(e)),i[e]});e.s(["default",0,n],34537)},49934,e=>{"use strict";var t=e.i(43476),i=e.i(71645),a=e.i(97053);let n=a.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`,o=a.U.label`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #333;
`,r=a.U.input`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 60%;
  font-size: 1rem;
`,s=a.U.select`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 65%;
  font-size: 1rem;
`,l=a.U.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`,c=({angle:e,setAngle:i,initialPosition:a,setInitialPosition:c})=>(0,t.jsxs)(n,{children:[(0,t.jsxs)(o,{children:["Angle (0 to 90 degrees):",(0,t.jsx)(r,{type:"number",value:e,onChange:e=>{let t=Number(e.target.value);t>=0&&t<=90&&i(t)}})]}),(0,t.jsxs)(o,{children:["Initial Position:",(0,t.jsxs)(s,{value:a,onChange:e=>c(e.target.value),children:[(0,t.jsx)("option",{value:"onGround",children:"Left"}),(0,t.jsx)("option",{value:"onPlane",children:"Right"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(l,{onClick:()=>i(30),children:"Reset Angle"}),(0,t.jsx)(l,{onClick:()=>c("onPlane"),children:"Reset Position"})]})]}),d=a.U.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
`,h=({angle:e,initialPosition:a})=>{let n=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i,o,r,s,l,c,d,h,p=n.current,u=p.getContext("2d"),g=p.width,m=p.height,f=()=>{u.clearRect(0,0,g,m),u.save(),u.translate(g/2,m/2),u.rotate(-e*Math.PI/180),u.beginPath(),u.moveTo(-100,0),u.lineTo(100,0),u.lineWidth=4,u.strokeStyle="#000",u.stroke(),u.restore()};f(),o=g/2-100*(i="onGround"===a?1:-1)*Math.cos(e*Math.PI/180),r=m/2+100*i*Math.sin(e*Math.PI/180),s=g/2+100*i*Math.cos(e*Math.PI/180),l=0,c=o,d=r-20,h=()=>{var n,o,r,p,g;let m,x;f(),n=c,o=d,r=l,u.save(),u.translate(n,o),u.rotate(r),u.beginPath(),u.arc(0,0,15,0,2*Math.PI),(m=u.createLinearGradient(-15,0,15,0)).addColorStop(0,"royalblue"),m.addColorStop(1,"#FFFFFF"),u.fillStyle=m,u.fill(),u.lineWidth=2,u.strokeStyle="#000",u.stroke(),u.restore(),p=c,g=d,u.save(),u.strokeStyle="red",u.lineWidth=2,u.beginPath(),u.moveTo(p,g),u.lineTo(p,g+40),u.stroke(),u.beginPath(),u.moveTo(p-5,g+35),u.lineTo(p,g+40),u.lineTo(p+5,g+35),u.stroke(),u.fillText("Gravity",p+10,g+45),u.strokeStyle="green",u.beginPath(),u.moveTo(p,g),u.lineTo(p-40*Math.sin(e*Math.PI/180),g-40*Math.cos(e*Math.PI/180)),u.stroke(),u.beginPath(),u.moveTo(p-35*Math.sin(e*Math.PI/180)-5*Math.cos(e*Math.PI/180),g-35*Math.cos(e*Math.PI/180)+5*Math.sin(e*Math.PI/180)),u.lineTo(p-40*Math.sin(e*Math.PI/180),g-40*Math.cos(e*Math.PI/180)),u.lineTo(p-35*Math.sin(e*Math.PI/180)+5*Math.cos(e*Math.PI/180),g-35*Math.cos(e*Math.PI/180)-5*Math.sin(e*Math.PI/180)),u.stroke(),u.fillText("Normal",p-50*Math.sin(e*Math.PI/180),g-50*Math.cos(e*Math.PI/180)),x="onGround"===a?1:-1,u.strokeStyle="orange",u.beginPath(),u.moveTo(p,g),u.lineTo(p-40*x*Math.cos(e*Math.PI/180),g+40*x*Math.sin(e*Math.PI/180)),u.stroke(),u.beginPath(),u.moveTo(p-35*x*Math.cos(e*Math.PI/180)-5*x*Math.sin(e*Math.PI/180),g+35*x*Math.sin(e*Math.PI/180)+5*x*Math.cos(e*Math.PI/180)),u.lineTo(p-40*x*Math.cos(e*Math.PI/180),g+40*x*Math.sin(e*Math.PI/180)),u.lineTo(p-35*x*Math.cos(e*Math.PI/180)+5*x*Math.sin(e*Math.PI/180),g+35*x*Math.sin(e*Math.PI/180)-5*x*Math.cos(e*Math.PI/180)),u.stroke(),u.fillText("Friction",p-50*x*Math.cos(e*Math.PI/180),g+50*x*Math.sin(e*Math.PI/180)),u.restore(),c+=i*Math.cos(e*Math.PI/180),d-=i*Math.sin(e*Math.PI/180),l+=.1*i,1===i&&c>=s||-1===i&&c<=s?cancelAnimationFrame(t):t=requestAnimationFrame(h)},t=requestAnimationFrame(h)},[e,a]),(0,t.jsx)(d,{children:(0,t.jsx)("canvas",{ref:n,width:400,height:400})})},p=a.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;e.s(["default",0,()=>{let[e,a]=(0,i.useState)(30),[n,o]=(0,i.useState)("onPlane");return(0,t.jsxs)(p,{children:[(0,t.jsx)("h1",{children:"Rolling Motion ⚙️ on Inclined Plane 🛤️"}),(0,t.jsx)(c,{angle:e,setAngle:a,initialPosition:n,setInitialPosition:o}),(0,t.jsx)(h,{angle:e,initialPosition:n})]})}],49934)}]);