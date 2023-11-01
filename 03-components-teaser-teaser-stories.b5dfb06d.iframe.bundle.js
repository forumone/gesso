/*! For license information please see 03-components-teaser-teaser-stories.b5dfb06d.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[473,9488,4042,1787],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/03-components/teaser/teaser.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Teaser:function(){return Teaser},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return teaser_stories}});var html_react_parser=__webpack_require__("./node_modules/html-react-parser/index.mjs"),decorators=__webpack_require__("./.storybook/decorators.jsx"),teaser=__webpack_require__("./source/03-components/teaser/teaser.twig"),teaser_default=__webpack_require__.n(teaser),teaser_teaser=__webpack_require__("./source/03-components/teaser/teaser.yml"),teaser_teaser_default=__webpack_require__.n(teaser_teaser),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),_03_components_teaser_teaser=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/03-components/teaser/teaser.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(_03_components_teaser_teaser.Z,options),_03_components_teaser_teaser.Z&&_03_components_teaser_teaser.Z.locals&&_03_components_teaser_teaser.Z.locals;const settings={title:"Components/Teaser",decorators:[decorators.C]},Teaser=args=>(0,html_react_parser.ZP)(teaser_default()({...args}));Teaser.args={...teaser_teaser_default()};var teaser_stories=settings;const __namedExportsOrder=["Teaser"]},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/03-components/teaser/teaser.scss":function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".c-teaser__date{margin-bottom:.5rem}","",{version:3,sources:["webpack://./source/03-components/teaser/teaser.scss"],names:[],mappings:"AAIA,gBACE,mBAAA",sourcesContent:["// Component: Teaser\n\n@use '00-config' as *;\n\n.c-teaser__date {\n  margin-bottom: rem(gesso-spacing(1));\n}\n"],sourceRoot:""}]),__webpack_exports__.Z=___CSS_LOADER_EXPORT___},"./source/03-components/teaser/teaser.yml":function(module){const doc=[{title:"Title",url:"#0",date:"Teaser Date",summary:'<p>This is the summary, which can contain <abbr title="Hyper Text Markup Language">HTML</abbr> markup. It should be 600 characters or less.</p>'}];module.exports=doc.length<=1?doc[0]:doc},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/03-components/teaser/teaser.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"727b138fb6f0e02ee7ed2950eef574e8fb1e8377604785d2540ee5e20304f44633b88391d36b675b21e3ed4852348b0a6f91ffe86b5f010596bcea095d0cb7e7",data:[{type:"output",stack:[{type:"Twig.expression.type._function",fn:"attach_library",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"gesso/teaser"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:"\n\n"},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-teaser"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.set",key:"title_classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-teaser__title"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"title_modifier_classes",match:["title_modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n<article "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:' role="article">\n  '},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"title_prefix",match:["title_prefix"]}]},{type:"raw",value:"\n  <"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"title_element",match:["title_element"]},{type:"Twig.expression.type.string",value:"h2"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:" "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"title_classes",match:["title_classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"title_attributes"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:'>  <a href="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"url",match:["url"]}]},{type:"raw",value:'">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"title",match:["title"]}]},{type:"raw",value:"</a></"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"title_element",match:["title_element"]},{type:"Twig.expression.type.string",value:"h2"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:">\n  "},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"title_suffix",match:["title_suffix"]}]},{type:"raw",value:"\n\n  "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"date",match:["date"]}],output:[{type:"raw",value:'    <div class="c-teaser__date">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"date",match:["date"]}]},{type:"raw",value:"</div>\n    "},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"rdf_metadata",match:["rdf_metadata"]}]},{type:"raw",value:"\n  "}]}},{type:"raw",value:"\n  "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"summary",match:["summary"]}],output:[{type:"raw",value:'    <div class="c-teaser__summary">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"summary",match:["summary"]}]},{type:"raw",value:"</div>\n  "}]}},{type:"raw",value:"</article>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);