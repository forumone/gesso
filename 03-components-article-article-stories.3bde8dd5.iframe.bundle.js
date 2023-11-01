/*! For license information please see 03-components-article-article-stories.3bde8dd5.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[3565,9488,4042,1787,5521],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/03-components/article/article.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Article:function(){return Article},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/decorators.jsx"),_article_twig__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/03-components/article/article.twig"),_article_twig__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_article_twig__WEBPACK_IMPORTED_MODULE_2__),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./source/00-config/storybook.global-data.yml"),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_3__),_article_yml__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./source/03-components/article/article.yml"),_article_yml__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_article_yml__WEBPACK_IMPORTED_MODULE_4__);__webpack_require__("./source/03-components/message/message.stories.jsx"),__webpack_require__("./source/03-components/wysiwyg/wysiwyg.stories.jsx");const settings={title:"Components/Article",decorators:[_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__.C],parameters:{controls:{include:["title","show_admin_info","show_footer","author_name","date_format","year","month","day","hour","minute","content"]}}},Article=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_article_twig__WEBPACK_IMPORTED_MODULE_2___default()(args));Article.args={..._00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_3___default(),..._article_yml__WEBPACK_IMPORTED_MODULE_4___default()},__webpack_exports__.default=settings;const __namedExportsOrder=["Article"]},"./source/03-components/message/message.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},ErrorMessage:function(){return ErrorMessage},WarningMessage:function(){return WarningMessage},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return message_stories}});var html_react_parser=__webpack_require__("./node_modules/html-react-parser/index.mjs"),decorators=__webpack_require__("./.storybook/decorators.jsx"),message=__webpack_require__("./source/03-components/message/message.twig"),message_default=__webpack_require__.n(message),message_message=__webpack_require__("./source/03-components/message/message.yml"),message_message_default=__webpack_require__.n(message_message),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),_03_components_message_message=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/03-components/message/message.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(_03_components_message_message.Z,options),_03_components_message_message.Z&&_03_components_message_message.Z.locals&&_03_components_message_message.Z.locals;const settings={title:"Components/Message",decorators:[decorators.C]},Default=args=>(0,html_react_parser.ZP)(message_default()({...args}));Default.args={...message_message_default()};const ErrorMessage=args=>(0,html_react_parser.ZP)(message_default()({...args,type:"error"}));ErrorMessage.args={...message_message_default()};const WarningMessage=args=>(0,html_react_parser.ZP)(message_default()({...args,type:"warning"}));WarningMessage.args={...message_message_default()};var message_stories=settings;const __namedExportsOrder=["Default","ErrorMessage","WarningMessage"]},"./source/03-components/wysiwyg/wysiwyg.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WYSIWYG:function(){return WYSIWYG},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return wysiwyg_stories}});var html_react_parser=__webpack_require__("./node_modules/html-react-parser/index.mjs"),decorators=__webpack_require__("./.storybook/decorators.jsx"),wysiwyg=__webpack_require__("./source/03-components/wysiwyg/wysiwyg.twig"),wysiwyg_default=__webpack_require__.n(wysiwyg),storybook_global_data=__webpack_require__("./source/00-config/storybook.global-data.yml"),storybook_global_data_default=__webpack_require__.n(storybook_global_data),external_Drupal_=__webpack_require__("drupal"),external_Drupal_default=__webpack_require__.n(external_Drupal_),external_once_=__webpack_require__("once"),external_once_default=__webpack_require__.n(external_once_);external_Drupal_default().behaviors.wysiwyg={attach(context){external_once_default()("wysiwyg","[data-wysiwyg]",context).forEach((wysiwyg=>{wysiwyg.querySelectorAll("[data-wysiwyg] table").forEach(((table,i)=>{const tableParent=table.parentNode;if(!tableParent.classList.contains("l-responsive-table")){const responsiveTable=document.createElement("div"),caption=table.querySelector("caption");if(responsiveTable.classList.add("l-responsive-table"),responsiveTable.setAttribute("tabindex","0"),responsiveTable.setAttribute("role","region"),caption){const captionId=`table-caption-${i}`;caption.setAttribute("id",captionId),responsiveTable.setAttribute("aria-labelledby",captionId)}else responsiveTable.setAttribute("aria-label","Table");responsiveTable.appendChild(table.cloneNode(!0)),tableParent.replaceChild(responsiveTable,table)}}))}))}};const settings={title:"Components/WYSIWYG",decorators:[decorators.C],parameters:{controls:{include:["content"]}}},WYSIWYG=args=>(0,html_react_parser.ZP)(wysiwyg_default()(args));WYSIWYG.args={...storybook_global_data_default()};var wysiwyg_stories=settings;const __namedExportsOrder=["WYSIWYG"]},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./source/03-components/message/message.scss":function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__),_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/css-loader/dist/runtime/getUrl.js"),_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__),___CSS_LOADER_URL_IMPORT_0___=new URL(__webpack_require__("./source/images/backgrounds/messages-status.svg"),__webpack_require__.b),___CSS_LOADER_URL_IMPORT_1___=new URL(__webpack_require__("./source/images/backgrounds/messages-error.svg"),__webpack_require__.b),___CSS_LOADER_URL_IMPORT_2___=new URL(__webpack_require__("./source/images/backgrounds/messages-warning.svg"),__webpack_require__.b),___CSS_LOADER_EXPORT___=_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()),___CSS_LOADER_URL_REPLACEMENT_0___=_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___),___CSS_LOADER_URL_REPLACEMENT_1___=_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___),___CSS_LOADER_URL_REPLACEMENT_2___=_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);___CSS_LOADER_EXPORT___.push([module.id,'.c-message{background-color:#f1f1f1;border:1px solid #adadad;color:#1b1b1b;margin-bottom:1rem;overflow:hidden;padding:1rem;position:relative;word-wrap:break-word}.c-message::before{background-repeat:no-repeat;background-size:3.25em;bottom:-0.5em;content:"";display:block;height:3.25em;position:absolute;right:-0.5em;transform:rotate(-20deg);width:3.25em}@media print{.c-message::before{display:none !important}}.c-message a{color:#5c5c5c;font-weight:600;text-decoration:underline}.c-message__content>:last-child{margin-bottom:0}.c-message--status{background-color:#e7f4e4;border-color:#94bfa2}.c-message--status::before{background-image:url('+___CSS_LOADER_URL_REPLACEMENT_0___+")}.c-message--error{background-color:#f9dede;border-color:#e59393}.c-message--error::before{background-image:url("+___CSS_LOADER_URL_REPLACEMENT_1___+")}.c-message--error .c-message__item em:first-child{font-style:normal;font-weight:700}.c-message--warning{background-color:#fff1d2;border-color:#fad980}.c-message--warning::before{background-image:url("+___CSS_LOADER_URL_REPLACEMENT_2___+")}","",{version:3,sources:["webpack://./source/03-components/message/message.scss","webpack://./source/00-config/mixins/_svg-background.scss"],names:[],mappings:"AAkBA,WACE,wBAdyB,CAezB,wBAAA,CACA,aAAA,CACA,kBAAA,CACA,eAAA,CACA,YAAA,CACA,iBAAA,CACA,oBAAA,CAEA,mBACE,2BAAA,CACA,sBAAA,CACA,aAAA,CACA,UAAA,CACA,aAAA,CACA,aAAA,CACA,iBAAA,CACA,YAAA,CACA,wBAAA,CACA,YAAA,CACA,aAXF,mBAYI,uBAAA,CAAA,CAIJ,aACE,aAAA,CACA,eAAA,CACA,yBAAA,CAKF,gCACE,eAAA,CAIJ,mBACE,wBAjDgC,CAkDhC,oBAjD4B,CAmD5B,2BCzDA,wDAAA,CD8DF,kBACE,wBA5D+B,CA6D/B,oBA5D2B,CA8D3B,0BClEA,wDAAA,CDuEE,kDACE,iBAAA,CACA,eAAA,CAKN,oBACE,wBAxEiC,CAyEjC,oBApE6B,CAsE7B,4BClFA,wDAAA",sourcesContent:["// Component: Message\n// Used for Drupal status messages.\n\n@use '00-config' as *;\n\n$message-background-color: gesso-color(ui, generic, background-light) !default;\n$message-border-color: gesso-color(ui, generic, border) !default;\n$message-error-background-color: gesso-color(ui, error, background) !default;\n$message-error-border-color: gesso-color(ui, error, border) !default;\n$message-status-background-color: gesso-color(ui, success, background) !default;\n$message-status-border-color: gesso-color(ui, success, border) !default;\n$message-warning-background-color: gesso-color(\n  ui,\n  warning,\n  background\n) !default;\n$message-warning-border-color: gesso-color(ui, warning, border) !default;\n\n.c-message {\n  background-color: $message-background-color;\n  border: 1px solid $message-border-color;\n  color: gesso-color(text, primary);\n  margin-bottom: rem(gesso-spacing(2));\n  overflow: hidden;\n  padding: rem(gesso-spacing(2));\n  position: relative;\n  word-wrap: break-word;\n\n  &::before {\n    background-repeat: no-repeat;\n    background-size: em(52px);\n    bottom: -0.5em;\n    content: '';\n    display: block;\n    height: em(52px);\n    position: absolute;\n    right: -0.5em;\n    transform: rotate(-20deg);\n    width: em(52px);\n    @media print {\n      display: none !important;\n    }\n  }\n\n  a {\n    color: gesso-color(text, secondary);\n    font-weight: gesso-font-weight(semibold);\n    text-decoration: underline;\n  }\n}\n\n.c-message__content {\n  > :last-child {\n    margin-bottom: 0;\n  }\n}\n\n.c-message--status {\n  background-color: $message-status-background-color;\n  border-color: $message-status-border-color;\n\n  &::before {\n    @include svg-background(messages-status);\n  }\n}\n\n.c-message--error {\n  background-color: $message-error-background-color;\n  border-color: $message-error-border-color;\n\n  &::before {\n    @include svg-background(messages-error);\n  }\n\n  .c-message__item {\n    em:first-child {\n      font-style: normal;\n      font-weight: gesso-font-weight(bold);\n    }\n  }\n}\n\n.c-message--warning {\n  background-color: $message-warning-background-color;\n  border-color: $message-warning-border-color;\n\n  &::before {\n    @include svg-background(messages-warning);\n  }\n}\n","// Mixins: SVG Background\n\n@mixin svg-background($image-name, $image-location: 'images/backgrounds/') {\n  $url: $image-location + $image-name + '.svg';\n  background-image: url($url);\n}\n\n@mixin svgz-background($image-name, $image-location: 'images/backgrounds/') {\n  $url: $image-location + $image-name + '.svgz';\n  background-image: url($url);\n}\n"],sourceRoot:""}]),__webpack_exports__.Z=___CSS_LOADER_EXPORT___},"./source/03-components/article/article.yml":function(module){const doc=[{title:"Article Title",show_footer:!0}];module.exports=doc.length<=1?doc[0]:doc},"./source/03-components/message/message.yml":function(module){const doc=[{type:"status",heading:"Status message",messages:['This is a status message about <em class="placeholder">something</em> that has been updated. <a href="#">This is a link</a>.'],modifier_classes:""}];module.exports=doc.length<=1?doc[0]:doc},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/03-components/button-group/button-group.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"e0f5eaeab558ab0bd4f313016a85bd2a1ad5d6982ae4766980ef27f635facc095c7ab14effa06d5ad862fca101dff8a14525a38c87ff74bfd6db2f8d1ae33ce3",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-button-group"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:""},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"buttons",match:["buttons"]}],output:[{type:"raw",value:"  <"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:'\n    class="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"classes",match:["classes"]}]},{type:"raw",value:'"'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"nav"},{type:"Twig.expression.type.operator.binary",value:"!=",precidence:9,associativity:"leftToRight",operator:"!="}],output:[{type:"raw",value:' role="group"'}]}},{type:"raw",value:'    aria-label="'},{type:"output_whitespace_post",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}]},{type:"raw",value:'">\n    <ul class="c-button-group__list">\n      '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"button",expression:[{type:"Twig.expression.type.variable",value:"buttons",match:["buttons"]}],output:[{type:"raw",value:"        "},{type:"logic",token:{type:"Twig.logic.type.set",key:"button_classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-button-group__link"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-button"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"button_modifier_classes",match:["button_modifier_classes"]},{type:"Twig.expression.type.variable",value:"button_modifier_classes",match:["button_modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"},{type:"Twig.expression.type.string",value:"is-active"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:'\n        <li class="c-button-group__item'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"}],output:[{type:"raw",value:" is-active"}]}},{type:"raw",value:'">\n          '},{type:"logic",token:{type:"Twig.logic.type.block",blockName:"link",output:[{type:"raw",value:'            <a href="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"url"},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"#0"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:'" class="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button_classes",match:["button_classes"]}]},{type:"raw",value:'">\n              '},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"text"}]},{type:"raw",value:"\n              "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"}],output:[{type:"raw",value:'                <span class="u-visually-hidden">'},{type:"output",stack:[{type:"Twig.expression.type.subexpression.end",value:")",match:[")"],expression:!0,params:[{type:"Twig.expression.type.variable",value:"active_label",match:["active_label"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"(active)"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"Twig.expression.type.filter",value:"t",match:["|t","t"]}]},{type:"raw",value:"</span>\n              "}]}},{type:"raw",value:"            </a>\n          "}]}},{type:"raw",value:"        </li>\n      "}]}},{type:"raw",value:"    </ul>\n  </"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:">\n"}]}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./source/03-components/message/message.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"efbf9e7e33f3c264952de793537ee611caaf2761f8eb47e501bee58800ac3991581bdc59b06357708dae89ea04abcdf9a26446c5662809650baf6d8eafc4303d",data:[{type:"output",stack:[{type:"Twig.expression.type._function",fn:"attach_library",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"gesso/message"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:"\n\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"error"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--error"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"logic",token:{type:"Twig.logic.type.elseif",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"warning"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--warning"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--status"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"raw",value:"\n<div "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"error"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:' role="alert"'}]}},{type:"raw",value:'>\n  <div class="c-message__content">\n    '},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}],output:[{type:"raw",value:'      <h2 class="u-visually-hidden">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}]},{type:"raw",value:"</h2>\n    "}]}},{type:"raw",value:""},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]},{type:"Twig.expression.type.filter",value:"length",match:["|length","length"]},{type:"Twig.expression.type.number",value:1,match:["1",null]},{type:"Twig.expression.type.operator.binary",value:">",precidence:8,associativity:"leftToRight",operator:">"}],output:[{type:"raw",value:'      <ul class="c-message__list">\n        '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"message",expression:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]}],output:[{type:"raw",value:'          <li class="c-message__item">'},{type:"output_whitespace_both",stack:[{type:"Twig.expression.type.variable",value:"message",match:["message"]}]},{type:"raw",value:"</li>\n        "}]}},{type:"raw",value:"      </ul>\n    "}]}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],output:[{type:"raw",value:""},{type:"output_whitespace_both",stack:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]},{type:"Twig.expression.type.filter",value:"first",match:["|first","first"]}]},{type:"raw",value:""}]}},{type:"raw",value:"  </div>\n</div>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./source/images/backgrounds/messages-error.svg":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__.p+"static/media/messages-error.709f4597.svg"},"./source/images/backgrounds/messages-status.svg":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__.p+"static/media/messages-status.589dccef.svg"},"./source/images/backgrounds/messages-warning.svg":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__.p+"static/media/messages-warning.561a482d.svg"}}]);