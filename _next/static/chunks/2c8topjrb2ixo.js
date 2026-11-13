(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34537,e=>{"use strict";var t,r,i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,a=(t=function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]});e.s(["default",0,a],34537)},54956,e=>{"use strict";var t=e.i(43476),r=e.i(97053),i=e.i(71645);let a=r.U.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`,n=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`,o=r.U.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
`,l=r.U.canvas`
  width: 100%;
  height: 100%;
  display: block;
`,s=r.U.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`,c=r.U.select`
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  cursor: pointer;
`,d=r.U.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 12px 0 6px;
`,p=r.U.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`,h=r.U.input`
  width: 100%;
`,g=r.U.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
`,u=r.U.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${e=>e.color};
  box-shadow: 0 0 12px ${e=>e.color};
  margin-right: 6px;
`;function x(e){let t=1;for(let r=2;r<=e;r++)t*=r;return t}function m(e,t){let r=Math.pow(e,t);return Number.isFinite(r)?r:r>0?Number.MAX_VALUE:-Number.MAX_VALUE}function f(){var e;let r=(0,i.useRef)(null),f=(0,i.useRef)(null),[y,v]=(0,i.useState)("sin"),[k,M]=(0,i.useState)(5),[w,T]=(0,i.useState)(0),[j,S]=(0,i.useState)(8),[C,A]=(0,i.useState)(!0);(0,i.useEffect)(()=>{let e=f.current,t=r.current;if(!e||!t)return;let i=new ResizeObserver(()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.min(2,window.devicePixelRatio||1));t.width=Math.max(1,Math.floor(r.width*i)),t.height=Math.max(1,Math.floor(r.height*i)),t.getContext("2d").setTransform(i,0,0,i,0,0)});return i.observe(e),()=>i.disconnect()},[]);let R=(0,i.useMemo)(()=>(function(e,t,r){let i=Array(r+1);if("sin"===e){for(let e=0;e<=r;e++){let r=e%4;0===r?i[e]=Math.sin(t):1===r?i[e]=Math.cos(t):2===r?i[e]=-Math.sin(t):i[e]=-Math.cos(t)}return i}if("cos"===e){for(let e=0;e<=r;e++){let r=e%4;0===r?i[e]=Math.cos(t):1===r?i[e]=-Math.sin(t):2===r?i[e]=-Math.cos(t):i[e]=Math.sin(t)}return i}if("exp"===e){let e=Math.exp(t);for(let t=0;t<=r;t++)i[t]=e;return i}if("ln1p"===e){i[0]=Math.log(1+t);let e=1+t;for(let t=1;t<=r;t++)i[t]=Math.pow(-1,t-1)*x(t-1)/m(e,t);return i}for(let e=0;e<=r;e++)i[e]=0;return i})(y,w,k),[y,w,k]),U=(0,i.useMemo)(()=>{let e=j/2,t=-e,r="ln1p"===y?Math.max(t,-.99):t,i=Array(700),a=Array(700),n=Array(700),o=1/0,l=-1/0;for(let t=0;t<700;t++){let s=r+t/699*(e-r),c="sin"===y?Math.sin(s):"cos"===y?Math.cos(s):"exp"===y?Math.exp(s):"ln1p"===y?Math.log(1+s):s,d=function(e,t,r,i){let a=0,n=e-t;for(let e=0;e<=r;e++)a+=i[e]*m(n,e)/x(e);return a}(s,w,k,R);i[t]=s,a[t]=c,n[t]=d,o=Math.min(o,c,d),l=Math.max(l,c,d)}let s=(l-o)*.12||1;return{xs:i,ys:a,ts:n,xMin:r,xMax:e,yMin:o-s,yMax:l+s}},[R,y,k,w,j]);return(0,i.useEffect)(()=>{let e=r.current;if(!e)return;let t=e.getContext("2d"),i=e.getBoundingClientRect(),a=i.width,n=i.height,o=t.createLinearGradient(0,0,0,n);o.addColorStop(0,"rgba(2,6,23,1)"),o.addColorStop(1,"rgba(0,0,0,1)"),t.fillStyle=o,t.fillRect(0,0,a,n);let l=a-44-16,s=n-18-36,c=U.xMin,d=U.xMax,p=-4,h=4;C&&(p=U.yMin,h=U.yMax);let g=e=>44+(e-c)/(d-c)*l,u=e=>18+(1-(e-p)/(h-p))*s;t.save(),t.strokeStyle="rgba(255,255,255,0.08)",t.lineWidth=1;for(let e=0;e<=8;e++){let r=44+l*e/8;t.beginPath(),t.moveTo(r,18),t.lineTo(r,18+s),t.stroke()}for(let e=0;e<=6;e++){let r=18+s*e/6;t.beginPath(),t.moveTo(44,r),t.lineTo(44+l,r),t.stroke()}if(t.restore(),t.save(),t.strokeStyle="rgba(255,255,255,0.22)",t.lineWidth=1.5,0>=c&&0<=d){let e=g(0);t.beginPath(),t.moveTo(e,18),t.lineTo(e,18+s),t.stroke()}if(0>=p&&0<=h){let e=u(0);t.beginPath(),t.moveTo(44,e),t.lineTo(44+l,e),t.stroke()}if(t.restore(),t.save(),t.strokeStyle="rgba(251,172,97,0.35)",t.setLineDash([6,6]),t.lineWidth=1.5,w>=c&&w<=d){let e=g(w);t.beginPath(),t.moveTo(e,18),t.lineTo(e,18+s),t.stroke()}t.restore(),b(t,U.xs,U.ys,g,u,{color:"rgba(127,231,255,0.95)",width:3,glow:"rgba(127,231,255,0.35)"}),b(t,U.xs,U.ts,g,u,{color:"rgba(251,172,97,0.95)",width:3,glow:"rgba(251,172,97,0.35)"}),t.save(),t.fillStyle="rgba(255,255,255,0.75)",t.font="12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",t.fillText("f(x) vs Taylorₙ(x)",44,14),t.fillText(`n=${k}   a=${w.toFixed(2)}`,44,n-10),t.restore()},[U,k,w,C]),(0,t.jsxs)(a,{children:[(0,t.jsx)(n,{children:(0,t.jsx)(o,{ref:f,children:(0,t.jsx)(l,{ref:r})})}),(0,t.jsxs)(s,{children:[(0,t.jsxs)(d,{children:["Function ",(0,t.jsx)(p,{children:"sin"===(e=y)?"sin(x)":"cos"===e?"cos(x)":"exp"===e?"e^x":"ln1p"===e?"ln(1+x)":e})]}),(0,t.jsxs)(c,{value:y,onChange:e=>v(e.target.value),children:[(0,t.jsx)("option",{value:"sin",children:"sin(x)"}),(0,t.jsx)("option",{value:"cos",children:"cos(x)"}),(0,t.jsx)("option",{value:"exp",children:"e^x"}),(0,t.jsx)("option",{value:"ln1p",children:"ln(1 + x)"})]}),(0,t.jsxs)(d,{children:["Order n ",(0,t.jsx)(p,{children:k})]}),(0,t.jsx)(h,{type:"range",min:"0",max:"18",step:"1",value:k,onChange:e=>M(parseInt(e.target.value,10))}),(0,t.jsxs)(d,{children:["Center a ",(0,t.jsx)(p,{children:w.toFixed(2)})]}),(0,t.jsx)(h,{type:"range",min:"ln1p"===y?"-0.9":"-4",max:"4",step:"0.05",value:w,onChange:e=>T(parseFloat(e.target.value))}),(0,t.jsxs)(d,{children:["X range ",(0,t.jsx)(p,{children:j.toFixed(1)})]}),(0,t.jsx)(h,{type:"range",min:"2",max:"16",step:"0.5",value:j,onChange:e=>S(parseFloat(e.target.value))}),(0,t.jsxs)(d,{children:["Y scale ",(0,t.jsx)(p,{children:C?"Auto":"Fixed"})]}),(0,t.jsx)(h,{type:"range",min:"0",max:"1",step:"1",value:+!!C,onChange:e=>A("1"===e.target.value)}),(0,t.jsxs)(g,{children:[(0,t.jsxs)("span",{children:[(0,t.jsx)(u,{color:"rgba(127,231,255,0.95)"}),"f(x)"]}),(0,t.jsxs)("span",{children:[(0,t.jsx)(u,{color:"rgba(251,172,97,0.95)"}),"Taylorₙ(x)"]}),(0,t.jsxs)("span",{children:[(0,t.jsx)(u,{color:"rgba(251,172,97,0.45)"})," x = a"]})]})]})]})}function b(e,t,r,i,a,n){e.save(),e.lineWidth=n.width,e.strokeStyle=n.color,e.shadowBlur=10,e.shadowColor=n.glow,e.lineJoin="round",e.lineCap="round",e.beginPath();for(let n=0;n<t.length;n++){let o=i(t[n]),l=a(r[n]);0===n?e.moveTo(o,l):e.lineTo(o,l)}e.stroke(),e.restore()}let y=r.U.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(
    circle at 30% 10%,
    #0f172a 0%,
    #0b1020 45%,
    #000 100%
  );
  min-height: 100vh;
  color: #eef2ff;
`,v=r.U.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #fbac61;
  margin: 0 0 10px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(251, 172, 97, 0.35);
`,k=r.U.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`;e.s(["default",0,function(){return(0,t.jsxs)(y,{children:[(0,t.jsx)(v,{children:"Taylor Series Explorer"}),(0,t.jsx)(k,{children:"Compare a function to its Taylor polynomial around a center point \\(a\\). Increase the order to see the approximation improve near \\(a\\)."}),(0,t.jsx)(f,{})]})}],54956)}]);