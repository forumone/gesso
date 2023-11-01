/*! For license information please see 03-components-form-item-form-item--select-form-item--select-stories.ee8c261f.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[8804,4042],{"./source/03-components/form-item/form-item--select/form-item--select.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},WithGroups:function(){return WithGroups},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/decorators.jsx"),_form_item_twig__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/03-components/form-item/form-item.twig"),_form_item_twig__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_form_item_twig__WEBPACK_IMPORTED_MODULE_2__),_select_twig__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./source/03-components/form-item/form-item--select/_select.twig"),_select_twig__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_select_twig__WEBPACK_IMPORTED_MODULE_3__),_form_item_label_twig__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./source/03-components/form-item/_form-item-label.twig"),_form_item_label_twig__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_form_item_label_twig__WEBPACK_IMPORTED_MODULE_4__),_form_item_select_yml__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./source/03-components/form-item/form-item--select/form-item--select.yml"),_form_item_select_yml__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_form_item_select_yml__WEBPACK_IMPORTED_MODULE_5__),_form_item_select_with_groups_yml__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./source/03-components/form-item/form-item--select/form-item--select-with-groups.yml"),_form_item_select_with_groups_yml__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_form_item_select_with_groups_yml__WEBPACK_IMPORTED_MODULE_6__);const settings={title:"Components/Form Item/Select",decorators:[_storybook_decorators__WEBPACK_IMPORTED_MODULE_1__.C],argTypes:{label_display:{options:["before","after","invisible","hidden"],control:{type:"select"}},description_display:{options:["before","after","invisible","hidden"],control:{type:"select"}}}},select=args=>_select_twig__WEBPACK_IMPORTED_MODULE_3___default()({...args,described_by:args.id?`${args.id}-description`:null}),label=args=>_form_item_label_twig__WEBPACK_IMPORTED_MODULE_4___default()(args),Default=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_form_item_twig__WEBPACK_IMPORTED_MODULE_2___default()({...args,label:label(args),children:select(args)}));Default.args={..._form_item_select_yml__WEBPACK_IMPORTED_MODULE_5___default()};const WithGroups=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_form_item_twig__WEBPACK_IMPORTED_MODULE_2___default()({...args,label:label(args),children:select(args)}));WithGroups.args={..._form_item_select_with_groups_yml__WEBPACK_IMPORTED_MODULE_6___default()},__webpack_exports__.default=settings;const __namedExportsOrder=["Default","WithGroups"]},"./source/03-components/form-item/form-item--select/form-item--select-with-groups.yml":function(module){const doc=[{title:"Select with groups",label_display:"before",description_display:"after",id:"select-options",is_disabled:!1,is_full_width:!1,is_required:!1,description:{content:"The description for this form field."},options:[{type:"optgroup",label:"Group One",options:[{label:"Option A"},{label:"Option B"},{label:"Option C"}]},{type:"optgroup",label:"Group Two",options:[{label:"Option D"},{label:"Option E"},{label:"Disabled Option",disabled:!0}]}],errors:"",type:"select"}];module.exports=doc.length<=1?doc[0]:doc},"./source/03-components/form-item/form-item--select/form-item--select.yml":function(module){const doc=[{title:"Select",label_display:"before",description_display:"after",id:"select",is_disabled:!1,is_full_width:!1,is_required:!1,description:{content:"The description for this form field."},options:[{type:"option",label:"Option One"},{type:"option",label:"Option Two"},{type:"option",label:"Option Three"},{type:"option",label:"Option Four"},{type:"option",label:"Option Five"},{type:"option",label:"Disabled Option",disabled:!0}],errors:"",type:"select"}];module.exports=doc.length<=1?doc[0]:doc},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./source/03-components/form-item/form-item--select/_select.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"6788aa956f33e077039c46b9d286d75d57fe873daae384046651634e5f7b761e3c1cdcbe8f2062ea80d89c04cc28836e4ba58e9abc33ac5d181f47d78dfd7645",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-form-item__select"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-form-item--select"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"is_required",match:["is_required"]},{type:"Twig.expression.type.variable",value:"required",match:["required"]},{type:"Twig.expression.type.operator.binary",value:"or",precidence:14,associativity:"leftToRight",operator:"or"},{type:"Twig.expression.type.string",value:"is-required"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"id",match:["id"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"id"},{type:"Twig.expression.type.variable",value:"id",match:["id"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"name",match:["name"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"name"},{type:"Twig.expression.type.variable",value:"name",match:["name"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"autocomplete",match:["autocomplete"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"autocomplete"},{type:"Twig.expression.type.variable",value:"autocomplete",match:["autocomplete"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_autofocus",match:["is_autofocus"]}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"autofocus"},{type:"Twig.expression.type.string",value:"autofocus"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_disabled",match:["is_disabled"]},{type:"Twig.expression.type.variable",value:"disabled",match:["disabled"]},{type:"Twig.expression.type.operator.binary",value:"or",precidence:14,associativity:"leftToRight",operator:"or"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"disabled"},{type:"Twig.expression.type.string",value:"disabled"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"form_id",match:["form_id"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"form"},{type:"Twig.expression.type.variable",value:"form_id",match:["form_id"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_multiple",match:["is_multiple"]}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"multiple"},{type:"Twig.expression.type.string",value:"multiple"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_required",match:["is_required"]},{type:"Twig.expression.type.variable",value:"required",match:["required"]},{type:"Twig.expression.type.operator.binary",value:"or",precidence:14,associativity:"leftToRight",operator:"or"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"required"},{type:"Twig.expression.type.string",value:"required"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"aria-required"},{type:"Twig.expression.type.string",value:"true"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"size",match:["size"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"size"},{type:"Twig.expression.type.variable",value:"size",match:["size"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"described_by",match:["described_by"]},{type:"Twig.expression.type.test",filter:"empty",modifier:"not"}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"attributes_to_add",expression:[{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"aria-describedby"},{type:"Twig.expression.type.variable",value:"described_by",match:["described_by"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]}}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.apply",stack:[{type:"Twig.expression.type.filter",value:"spaceless",match:["|spaceless","spaceless"]}],output:[{type:"raw",value:"  <select "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"attributes_to_add",match:["attributes_to_add"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:">\n    "},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"option",expression:[{type:"Twig.expression.type.variable",value:"options",match:["options"]}],output:[{type:"raw",value:"      "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"type"},{type:"Twig.expression.type.string",value:"optgroup"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:'        <optgroup label="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"label"}]},{type:"raw",value:'">\n          '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"sub_option",expression:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"options"}],output:[{type:"raw",value:'            <option value="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"sub_option",match:["sub_option"]},{type:"Twig.expression.type.key.period",key:"value"}]},{type:"raw",value:'"'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"sub_option",match:["sub_option"]},{type:"Twig.expression.type.key.period",key:"selected"},{type:"Twig.expression.type.string",value:' selected="selected"'},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}]},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"sub_option",match:["sub_option"]},{type:"Twig.expression.type.key.period",key:"disabled"},{type:"Twig.expression.type.string",value:' disabled="disabled"'},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}]},{type:"raw",value:">"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"sub_option",match:["sub_option"]},{type:"Twig.expression.type.key.period",key:"label"}]},{type:"raw",value:"</option>\n          "}]}},{type:"raw",value:"        </optgroup>\n      "}]}},{type:"logic",token:{type:"Twig.logic.type.elseif",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"type"},{type:"Twig.expression.type.string",value:"option"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:'        <option value="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"value"}]},{type:"raw",value:'"'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"selected"},{type:"Twig.expression.type.string",value:' selected="selected"'},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}]},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"disabled"},{type:"Twig.expression.type.string",value:' disabled="disabled"'},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"}]},{type:"raw",value:">"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"option",match:["option"]},{type:"Twig.expression.type.key.period",key:"label"}]},{type:"raw",value:"</option>\n      "}]}},{type:"raw",value:"    "}]}},{type:"raw",value:"  </select>\n"}]}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);