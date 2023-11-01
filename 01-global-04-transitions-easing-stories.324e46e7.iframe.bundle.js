/*! For license information please see 01-global-04-transitions-easing-stories.324e46e7.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[1293,9488,4042,1787],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/01-global/04-transitions/easing.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Easing:function(){return Easing},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return easing_stories}});var html_react_parser=__webpack_require__("./node_modules/html-react-parser/index.mjs"),decorators=__webpack_require__("./.storybook/decorators.jsx"),easing=__webpack_require__("./source/01-global/04-transitions/easing.twig"),easing_default=__webpack_require__.n(easing),config_design_tokens=__webpack_require__("./source/00-config/config.design-tokens.yml"),config_design_tokens_default=__webpack_require__.n(config_design_tokens),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),_04_transitions_easing=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/01-global/04-transitions/easing.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(_04_transitions_easing.Z,options),_04_transitions_easing.Z&&_04_transitions_easing.Z.locals&&_04_transitions_easing.Z.locals;const settings={title:"Global/Easing",decorators:[decorators.C],argTypes:{gesso:{table:{disable:!0}}}},Easing=args=>(0,html_react_parser.ZP)(easing_default()({...args}));Easing.args={...config_design_tokens_default()};var easing_stories=settings;const __namedExportsOrder=["Easing"]},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/01-global/04-transitions/easing.scss":function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".gesso-storybook-easing{background-color:#eee;padding:1rem}.gesso-storybook-easing__help-text{margin-bottom:1rem}.gesso-storybook-easing__indicator{background-color:#666;border-radius:10%;height:4.6875rem;left:0;margin-bottom:.5rem;position:relative;transition-duration:1s;transition-property:left;width:4.6875rem}.gesso-storybook-easing__item{margin-bottom:1rem}.gesso-storybook-easing__group{padding:0 9.375rem 0 1rem}.gesso-storybook-easing__group:hover .gesso-storybook-easing__indicator{left:100%}","",{version:3,sources:["webpack://./source/01-global/04-transitions/easing.scss"],names:[],mappings:"AAMA,wBACE,qBAAA,CACA,YAAA,CAGF,mCACE,kBAAA,CAGF,mCACE,qBAAA,CACA,iBAAA,CACA,gBAdc,CAed,MAAA,CACA,mBAAA,CACA,iBAAA,CACA,sBAAA,CACA,wBAAA,CACA,eApBc,CAuBhB,8BACE,kBAAA,CAGF,+BACE,yBAAA,CAGE,wEACE,SAAA",sourcesContent:["// Storybook: Easing\n\n@use '00-config' as *;\n\n$easing-swatch: rem(75px);\n\n.gesso-storybook-easing {\n  background-color: #eee;\n  padding: 1rem;\n}\n\n.gesso-storybook-easing__help-text {\n  margin-bottom: 1rem;\n}\n\n.gesso-storybook-easing__indicator {\n  background-color: #666;\n  border-radius: 10%;\n  height: $easing-swatch;\n  left: 0;\n  margin-bottom: 0.5rem;\n  position: relative;\n  transition-duration: 1s;\n  transition-property: left;\n  width: $easing-swatch;\n}\n\n.gesso-storybook-easing__item {\n  margin-bottom: 1rem;\n}\n\n.gesso-storybook-easing__group {\n  padding: 0 rem(150px) 0 1rem;\n\n  &:hover {\n    .gesso-storybook-easing__indicator {\n      left: 100%;\n    }\n  }\n}\n"],sourceRoot:""}]),__webpack_exports__.Z=___CSS_LOADER_EXPORT___},"./source/00-config/config.design-tokens.yml":function(module){const doc=[{gesso:{palette:{brand:{blue:{base:"#0071BC",light:"#4773aa","light-1":"#8ba6ca","light-2":"#dce4ef",dark:"#205493","dark-1":"#112E51"},"ocean-blue":{base:"#1dc2ae",light:"#29e1cb","light-1":"#7efbe1",dark:"#008480","dark-1":"#0b4b3f"}},grayscale:{white:"#ffffff","gray-1":"#f1f1f1","gray-2":"#e6e6e6","gray-3":"#adadad","gray-4":"#757575","gray-5":"#5c5c5c","gray-6":"#454545","gray-7":"#1b1b1b",black:"#000000"},other:{yellow:{base:"#fad980",light:"#fff1d2"},"yellow-neon":{base:"#ff0"},green:{base:"#94bfa2",light:"#e7f4e4"},red:{base:"#e31c3d",light:"#e59393","light-1":"#f9dede",dark:"#cd2026","dark-1":"#981b1e"}}},"box-shadow":{0:"none",1:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",2:"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",3:"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",4:"0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",5:"0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)"},constrains:{sm:"800px",md:"1440px",lg:"2200px"},breakpoints:{mobile:"320px","mobile-lg":"480px",tablet:"640px","mobile-menu":"699px","tablet-lg":"880px",desktop:"1024px","desktop-lg":"1200px",widescreen:"1400px"},colors:{text:{primary:"#1b1b1b",secondary:"#5c5c5c","on-light":"#1b1b1b","on-dark":"#ffffff",link:"#0071BC","link-hover":"#205493","link-active":"#205493","link-visited":"#205493"},background:{site:"#ffffff"},button:{primary:{background:"#0071BC","background-hover":"#205493","background-active":"#112E51",border:"#0071BC","border-hover":"#205493",text:"#ffffff","text-hover":"#ffffff","text-active":"#ffffff"},secondary:{background:"#7efbe1","background-hover":"#29e1cb","background-active":"#1dc2ae",border:"#7efbe1","border-hover":"#29e1cb",text:"#0b4b3f","text-hover":"#0b4b3f","text-active":"#1b1b1b"},base:{background:"#757575","background-hover":"#5c5c5c","background-active":"#454545",border:"#757575","border-hover":"#5c5c5c",text:"#ffffff","text-hover":"#ffffff","text-active":"#ffffff"},disabled:{background:"#f1f1f1",border:"#f1f1f1",text:"#adadad"},danger:{background:"#e31c3d","background-hover":"#cd2026","background-active":"#981b1e",border:"#e31c3d","border-hover":"#cd2026",text:"#ffffff","text-hover":"#ffffff","text-active":"#ffffff"},"back-to-top":{background:"#adadad","background-hover":"#5c5c5c",color:"#ffffff","color-hover":"#ffffff"}},form:{background:"#f1f1f1","background-active":"#ffffff","background-checked":"#0071BC","background-unchecked":"#ffffff",border:"#e6e6e6","border-dark":"#5c5c5c","border-light":"#f1f1f1",thumb:"#5c5c5c",track:"#adadad"},mark:{background:"#ff0",text:"#1b1b1b"},selection:{background:"#0071BC",text:"#ffffff"},table:{border:"#5c5c5c",background:"#ffffff","background-head":"#f1f1f1","background-foot":"#f1f1f1"},ui:{generic:{background:"#adadad","background-darker":"#1b1b1b","background-dark":"#454545","background-light":"#f1f1f1","background-lighter":"#f1f1f1",border:"#adadad","border-dark":"#454545","border-light":"#f1f1f1","text-lighter":"#ffffff","text-light":"#adadad","text-dark":"#5c5c5c","text-darker":"#1b1b1b",accent:"#0071BC","accent-dark":"#112E51","accent-light":"#4773aa",focus:"#4773aa"},error:{background:"#f9dede",border:"#e59393"},success:{background:"#e7f4e4",border:"#94bfa2"},warning:{background:"#fff1d2",border:"#fad980"}}},typography:{"font-family":{primary:{name:"Primary",stack:'"Source Sans Pro", Arial, sans-serif'},system:{name:"System",stack:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Fira Sans", Droid Sans, sans-serif'},monospace:{name:"Monospace",stack:'Menlo, Consolas, "Lucida Console", "Liberation Mono", "Courier New", monospace, sans-serif'}},"base-font-size":"16px","font-size":{1:"12px",2:"14px",3:"16px",4:"20px",5:"25px",6:"31.25px",7:"39.06625px",8:"48.8281px",9:"61.0352px",10:"76.2939px"},"responsive-font-size-min-width":"360px","responsive-font-size-max-width":"1600px","responsive-font-size":{1:{min:"12px",val:"auto",max:"12px"},2:{min:"14px",val:"auto",max:"14px"},3:{min:"16px",val:"auto",max:"16px"},4:{min:"18px",val:"auto",max:"20px"},5:{min:"20.25px",val:"auto",max:"25px"},6:{min:"22.7813px",val:"auto",max:"31.25px"},7:{min:"25.6289px",val:"auto",max:"39.0625px"},8:{min:"28.8325px",val:"auto",max:"48.8281px"},9:{min:"32.4366px",val:"auto",max:"61.0352px"},10:{min:"36.4912px",val:"auto",max:"76.2939px"}},"font-weight":{light:300,regular:400,semibold:600,bold:700},"line-height":{tight:1.1,base:1.45,loose:1.7},display:{display:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.1,"responsive-font-size":10},h1:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.1,"responsive-font-size":8},h2:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.1,"responsive-font-size":7},h3:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.1,"responsive-font-size":6},h4:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.45,"responsive-font-size":5},h5:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":700,"line-height":1.45,"responsive-font-size":3},h6:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-weight":600,"letter-spacing":"-0.04em","line-height":1.7,"text-transform":"uppercase","responsive-font-size":2},blockquote:{color:"#0071BC","font-family":'"Source Sans Pro", Arial, sans-serif',"font-size":"25px","font-weight":400,"line-height":1.45},body:{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-size":"16px","font-weight":400,"line-height":1.45},"body-large":{color:"#1b1b1b","font-family":'"Source Sans Pro", Arial, sans-serif',"font-size":"20px","font-weight":400,"line-height":1.45},cite:{color:"#5c5c5c","font-family":'"Source Sans Pro", Arial, sans-serif',"font-size":"14px","font-style":"normal","font-weight":600,"letter-spacing":".02em","line-height":1.1}}},transitions:{ease:{"ease-in-out":"cubic-bezier(0.4, 0, 0.2, 1)","ease-out":"cubic-bezier(0.0, 0, 0.2, 1)","ease-in":"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},duration:{shortest:"150ms",short:"200ms",standard:"375ms",long:"400ms",intro:"270ms",outro:"195ms"}},"z-index":{nav:1e3,drawer:1200,modal:1300},spacing:{0:0,1:"8px",2:"16px",3:"24px",4:"32px",5:"40px",6:"48px",7:"56px",8:"64px",9:"72px",10:"80px",12:"96px",15:"120px",.5:"4px",1.5:"12px",2.5:"20px"},"gutter-width":"40px","site-margins":{mobile:"16px",desktop:"32px"}}}];module.exports=doc.length<=1?doc[0]:doc},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/01-global/04-transitions/easing.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"0d8eb4d7f151168c9172127ce2303095a514f948c13c17547881dc214769bd3dc28ad45e9fc1ac7fb67af4fc13aa23b926cbbdbf94071f372113d1a6aa337b00",data:[{type:"raw",value:'<div class="gesso-storybook-easing">\n  <div class="gesso-storybook-easing__help-text">\n    (Hover to demo easing)\n  </div>\n  <div class="gesso-storybook-easing__group">\n    '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:"label",valueVar:"ease",expression:[{type:"Twig.expression.type.variable",value:"gesso",match:["gesso"]},{type:"Twig.expression.type.key.period",key:"transitions"},{type:"Twig.expression.type.key.period",key:"ease"}],output:[{type:"raw",value:'      <div class="gesso-storybook-easing__item">\n        '},{type:"logic",token:{type:"Twig.logic.type.set",key:"ease_style",expression:[{type:"Twig.expression.type.string",value:"transition-timing-function: "},{type:"Twig.expression.type.variable",value:"ease",match:["ease"]},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.string",value:";"},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"}]}},{type:"raw",value:'        <div class="gesso-storybook-easing__indicator" style="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"ease_style",match:["ease_style"]}]},{type:"raw",value:'"></div>\n        <div class="gesso-storybook-easing__label">\n          '},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"label",match:["label"]}]},{type:"raw",value:"\n        </div>\n      </div>\n    "}]}},{type:"raw",value:"  </div>\n</div>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);