/*! For license information please see 01-global-html-elements-24-table-table-with-column-and-row-headers-stories.77961780.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[5366,9488,4042,1787],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/01-global/html-elements/24-table/table-with-column-and-row-headers.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TableWithColumnAndRowHeaders:function(){return TableWithColumnAndRowHeaders},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/decorators.jsx"),_table_with_column_and_row_headers_twig__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/01-global/html-elements/24-table/table-with-column-and-row-headers.twig"),_table_with_column_and_row_headers_twig__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_table_with_column_and_row_headers_twig__WEBPACK_IMPORTED_MODULE_2__);const settings={title:"Global/HTML Elements/Table/Table with Column and Row Headers",decorators:[_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__.C],parameters:{controls:{hideNoControlsWarning:!0}}},TableWithColumnAndRowHeaders=()=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_table_with_column_and_row_headers_twig__WEBPACK_IMPORTED_MODULE_2___default()());TableWithColumnAndRowHeaders.storyName="Table with Column and Row Headers",__webpack_exports__.default=settings;const __namedExportsOrder=["TableWithColumnAndRowHeaders"]},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/01-global/html-elements/24-table/table-with-column-and-row-headers.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"1af7f87d12f8de6837c20757cefb4372325f6fcdb78235a2e2ef3815f048474e19e5aa1678bfefb74aa1dc9c93562f5cfe1536ff02c9ae059b4278985099bd90",data:[{type:"raw",value:'<table>\n  <caption>Table caption</caption>\n  <thead>\n    <tr>\n      <th></th>\n      <th scope="col">Table Heading A</th>\n      <th scope="col">Table Heading B</th>\n      <th scope="col">Table Heading C</th>\n      <th scope="col">Table Heading D</th>\n    </tr>\n  </thead>\n  <tfoot>\n    <tr>\n      <th></th>\n      <th scope="col">Table Footer A</th>\n      <th scope="col">Table Footer B</th>\n      <th scope="col">Table Footer C</th>\n      <th scope="col">Table Footer D</th>\n    </tr>\n  </tfoot>\n  <tbody>\n    <tr>\n      <th scope="row">Table Heading 1</th>\n      <td>Table Cell A1</td>\n      <td>Table Cell B1</td>\n      <td>Table Cell C1</td>\n      <td>Table Cell D1</td>\n    </tr>\n    <tr>\n      <th scope="row">Table Heading 2</th>\n      <td>Table Cell A2</td>\n      <td>Table Cell B2</td>\n      <td>Table Cell C2</td>\n      <td>Table Cell D2</td>\n    </tr>\n    <tr>\n      <th scope="row">Table Heading 3</th>\n      <td>Table Cell A3</td>\n      <td>Table Cell B3</td>\n      <td>Table Cell C3</td>\n      <td>Table Cell D3</td>\n    </tr>\n    <tr>\n      <th scope="row">Table Heading 4</th>\n      <td>Table Cell A4</td>\n      <td>Table Cell B4</td>\n      <td>Table Cell C4</td>\n      <td>Table Cell D4</td>\n    </tr>\n  </tbody>\n</table>\n'}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);