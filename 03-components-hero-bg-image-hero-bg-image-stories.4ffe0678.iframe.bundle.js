/*! For license information please see 03-components-hero-bg-image-hero-bg-image-stories.4ffe0678.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[8337,9488,4042,1787],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/03-components/hero-bg-image/hero-bg-image.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Left:function(){return Left},Right:function(){return Right},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/decorators.jsx"),_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/03-components/hero-bg-image/hero-bg-image.twig"),_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2__),_hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./source/03-components/hero-bg-image/hero-bg-image.yml"),_hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3__);__webpack_require__("./source/03-components/hero-bg-image/hero-bg-image.scss");const settings={title:"Components/Hero/Hero with Background Image",decorators:[_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__.C]},Default=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2___default()({...args}));Default.args={..._hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3___default()};const Left=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2___default()({...args,modifier_classes:"c-hero-bg-image--left"}));Left.args={..._hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3___default()};const Right=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_hero_bg_image_twig__WEBPACK_IMPORTED_MODULE_2___default()({...args,modifier_classes:"c-hero-bg-image--right"}));Right.args={..._hero_bg_image_yml__WEBPACK_IMPORTED_MODULE_3___default()},__webpack_exports__.default=settings;const __namedExportsOrder=["Default","Left","Right"]},"./source/03-components/hero-bg-image/hero-bg-image.yml":function(module){const doc=[{has_overlay:!0,hero_title:"Hero Title",hero_summary:"<p>Hero summary text.</p>",hero_button_text:"Hero Button",hero_image:'<img src="https://picsum.photos/1600/800?image=11" alt="alt text" />',hero_button_url:"#0"}];module.exports=doc.length<=1?doc[0]:doc},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/03-components/icon/icon.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"c0a1bf3376568e8c5b67d1f5063619178a405dbd6e2c1cd3276750969637e2f9c704d06a92432737f4822413142741a45a40017ed2891d81a015612330413135",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-icon"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"direction",match:["direction"]},{type:"Twig.expression.type.string",value:"is-"},{type:"Twig.expression.type.variable",value:"direction",match:["direction"]},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.apply",stack:[{type:"Twig.expression.type.filter",value:"spaceless",match:["|spaceless","spaceless"]}],output:[{type:"raw",value:"  <svg "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:' role="img"'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_hidden",match:["is_hidden"]}],output:[{type:"raw",value:' aria-hidden="true"'}]}},{type:"raw",value:">\n    "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"label",match:["label"]}],output:[{type:"raw",value:"<title>"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"label",match:["label"]}]},{type:"raw",value:"</title>"}]}},{type:"raw",value:'    <use href="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"image_path",match:["image_path"]}]},{type:"raw",value:"/sprite.artifact.svg#"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"icon_name",match:["icon_name"]}]},{type:"raw",value:'"></use>\n  </svg>\n'}]}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);