(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[7009],{"./source/02-layouts/section/section.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Section:function(){return Section},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_section_twig__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./source/02-layouts/section/section.twig"),_section_twig__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_section_twig__WEBPACK_IMPORTED_MODULE_1__),_section_yml__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/02-layouts/section/section.yml"),_section_yml__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_section_yml__WEBPACK_IMPORTED_MODULE_2__);const Section=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_section_twig__WEBPACK_IMPORTED_MODULE_1___default()({...args}));Section.args={..._section_yml__WEBPACK_IMPORTED_MODULE_2___default()},__webpack_exports__.default={title:"Layouts/Section"};const __namedExportsOrder=["Section"]},"./source/02-layouts/section/section.yml":function(module){const doc=[{section_title_element:"h2",section_title:"Section title",section_content:"<p>Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.</p>",modifier_classes:"",has_constrain:!1,constrain_modifier_classes:""}];module.exports=doc.length<=1?doc[0]:doc},"./source/02-layouts/section/section.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"52d70622d9b2df0b54387e65d69f6c1adaaaae4dee55811fcd45ff8516d33fd920d3e3aaa9abb5c4c5249f30ebbb14cd0a4d632dd8e55e8f4493f97fd13ef01a",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"l-section"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.set",key:"constrain_classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"l-constrain"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"constrain_modifier_classes",match:["constrain_modifier_classes"]},{type:"Twig.expression.type.variable",value:"constrain_modifier_classes",match:["constrain_modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n<section "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:">\n  "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"has_constrain",match:["has_constrain"]}],output:[{type:"raw",value:"    <div "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"constrain_classes",match:["constrain_classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:">\n  "}]}},{type:"raw",value:"\n  "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"section_title",match:["section_title"]}],output:[{type:"raw",value:"    <"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"section_title_element",match:["section_title_element"]},{type:"Twig.expression.type.string",value:"h2"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:' class="l-section__title">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"section_title",match:["section_title"]}]},{type:"raw",value:"</"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"section_title_element",match:["section_title_element"]},{type:"Twig.expression.type.string",value:"h2"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:">\n  "}]}},{type:"raw",value:'\n  <div class="l-section__content">\n    '},{type:"logic",token:{type:"Twig.logic.type.block",blockName:"content",output:[{type:"raw",value:"      "},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"section_content",match:["section_content"]}]},{type:"raw",value:"\n    "}]}},{type:"raw",value:"  </div>\n\n  "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"has_constrain",match:["has_constrain"]}],output:[{type:"raw",value:"    </div>\n  "}]}},{type:"raw",value:"</section>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);