(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[8847],{"./source/02-layouts/inline-form/inline-form.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InlineForm:function(){return InlineForm},__namedExportsOrder:function(){return __namedExportsOrder}});__webpack_require__("./node_modules/react/index.js");var react_dom_server__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/server.browser.js"),react_dom_server__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__),html_react_parser__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_inline_form_twig__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./source/02-layouts/inline-form/inline-form.twig"),_inline_form_twig__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_inline_form_twig__WEBPACK_IMPORTED_MODULE_3__),_inline_form_yml__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./source/02-layouts/inline-form/inline-form.yml"),_inline_form_yml__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_inline_form_yml__WEBPACK_IMPORTED_MODULE_4__),_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./source/01-global/content-placeholder/content-placeholder.jsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const InlineForm=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_2__.ZP)(_inline_form_twig__WEBPACK_IMPORTED_MODULE_3___default()({...args}));InlineForm.args={form_content:react_dom_server__WEBPACK_IMPORTED_MODULE_1___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_5__.Z,{children:"Form Item 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_5__.Z,{children:"Form Item 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_5__.Z,{children:"Form Item 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_5__.Z,{children:"Form Item 4"})]})),..._inline_form_yml__WEBPACK_IMPORTED_MODULE_4___default()},__webpack_exports__.default={title:"Layouts/Inline Form"};const __namedExportsOrder=["InlineForm"]},"./source/01-global/content-placeholder/content-placeholder.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return ContentPlaceholder}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ContentPlaceholder(_ref){let{children:children}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{background:"#333",border:"1px solid #fff",color:"#fff",padding:"1em"},children:children})}ContentPlaceholder.displayName="ContentPlaceholder",ContentPlaceholder.__docgenInfo={description:"",methods:[],displayName:"ContentPlaceholder"}},"./source/02-layouts/inline-form/inline-form.yml":function(module){const doc=[{modifier_classes:""}];module.exports=doc.length<=1?doc[0]:doc},"./source/02-layouts/inline-form/inline-form.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"93b68ebf8c9c81b4366a06fdabd1e3dd9c84b797f13bd44e1ad6445a379083d25eb5ba7688976b69868f57570da0ca5bd9a4c3f6b1550945e4ddd0022fa66dfd",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"l-inline-form"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n<div "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:">\n  "},{type:"logic",token:{type:"Twig.logic.type.block",blockName:"content",output:[{type:"raw",value:"    "},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"form_content",match:["form_content"]}]},{type:"raw",value:"\n  "}]}},{type:"raw",value:"</div>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);