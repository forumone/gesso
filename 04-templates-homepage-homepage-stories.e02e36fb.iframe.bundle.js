(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[269,4891],{"./.storybook/decorators.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{C:function(){return withGlobalWrapper}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const withGlobalWrapper=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"l-constrain u-spaced-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});withGlobalWrapper.displayName="withGlobalWrapper",withGlobalWrapper.__docgenInfo={description:"",methods:[],displayName:"withGlobalWrapper"}},"./source/01-global/images/hero-image.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HeroImage:function(){return HeroImage},__namedExportsOrder:function(){return __namedExportsOrder}});var html_react_parser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_hero_image_twig__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./source/01-global/images/hero-image.twig"),_hero_image_twig__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_hero_image_twig__WEBPACK_IMPORTED_MODULE_1__),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./source/00-config/storybook.global-data.yml"),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_2__);const HeroImage=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_0__.ZP)(_hero_image_twig__WEBPACK_IMPORTED_MODULE_1___default()({...args}));HeroImage.args={..._00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_2___default()},__webpack_exports__.default={title:"Global/Images/Hero Image",parameters:{controls:{include:["img_hero","modifier_classes"]}}};const __namedExportsOrder=["HeroImage"]},"./source/04-templates/homepage/homepage.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Homepage:function(){return Homepage},__namedExportsOrder:function(){return __namedExportsOrder}});__webpack_require__("./node_modules/react/index.js");var react_dom_server__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/server.browser.js"),react_dom_server__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__),html_react_parser__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-react-parser/index.mjs"),_storybook_decorators__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/decorators.jsx"),_homepage_twig__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./source/04-templates/homepage/homepage.twig"),_homepage_twig__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_homepage_twig__WEBPACK_IMPORTED_MODULE_4__),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./source/00-config/storybook.global-data.yml"),_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_5__),_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./source/01-global/content-placeholder/content-placeholder.jsx"),_01_global_images_hero_image_stories_jsx__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./source/01-global/images/hero-image.stories.jsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./source/03-components/hero-bg-image/hero-bg-image.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const settings={title:"Templates/Homepage",decorators:[_storybook_decorators__WEBPACK_IMPORTED_MODULE_3__.C],parameters:{controls:{include:["show_admin_info","hero_image","hero_title","hero_summary","hero_button_text","homepage_grid_title","homepage_grid_content"]}}},Homepage=args=>(0,html_react_parser__WEBPACK_IMPORTED_MODULE_2__.ZP)(_homepage_twig__WEBPACK_IMPORTED_MODULE_4___default()(args));Homepage.args={..._00_config_storybook_global_data_yml__WEBPACK_IMPORTED_MODULE_5___default(),hero_image:react_dom_server__WEBPACK_IMPORTED_MODULE_1___default().renderToStaticMarkup((0,_01_global_images_hero_image_stories_jsx__WEBPACK_IMPORTED_MODULE_7__.HeroImage)(_01_global_images_hero_image_stories_jsx__WEBPACK_IMPORTED_MODULE_7__.HeroImage.args)),hero_title:"Homepage Hero Title",hero_summary:"<p>Homepage Hero Summary Text.</p>",hero_button_text:"Homepage Hero Button Text",hero_button_url:"#0",homepage_grid_title:"Homepage Grid Area Title",homepage_grid_content:react_dom_server__WEBPACK_IMPORTED_MODULE_1___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_6__.Z,{children:"Homepage Grid Content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_01_global_content_placeholder_content_placeholder__WEBPACK_IMPORTED_MODULE_6__.Z,{children:"Homepage Grid Content"})]}))},__webpack_exports__.default=settings;const __namedExportsOrder=["Homepage"]},"./source/01-global/content-placeholder/content-placeholder.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return ContentPlaceholder}});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ContentPlaceholder(_ref){let{children:children}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{background:"#333",border:"1px solid #fff",color:"#fff",padding:"1em"},children:children})}ContentPlaceholder.displayName="ContentPlaceholder",ContentPlaceholder.__docgenInfo={description:"",methods:[],displayName:"ContentPlaceholder"}},"./source/00-config/storybook.global-data.yml":function(module){const doc=[{storybook:!0,body_class:"",html_class:"",site_name:"Site Name",site_logo:"http://fpoimg.com/250x100?text=Logo",site_slogan:"This is the site slogan.",section:"Section",page_title:"Page Title",title:"Title",show_admin_info:!1,summary:'<p>This is the summary, which can contain <abbr title="Hyper Text Markup Language">HTML</abbr> markup. It should be 600 characters or less.</p>',author_name:"Author Name",url:"#0",file_name:"File name",file_mime:"application/pdf",file_size:"115.83 KB",img_thumbnail:{src:"http://fpoimg.com/140x105?text=Thumbnail 4:3",alt:"Thumbnail 4:3",height:"105",width:"140"},img_hero:{src:"http://fpoimg.com/1600x800?text=Hero 2:1",alt:"Hero 2:1",height:"800",width:"1600"},date_format:"medium-date",year:{long:"2016",short:"16"},month:{long:"September",short:"Sep",digit:"09"},weekday:{long:"Wednesday",short:"Wed"},day:{long:"28",short:"28",ordinal:"th"},hour:{long:"01",short:"1",military:"13",ampm:"pm"},minute:{long:"20",short:"20"},seconds:"31",image_path:"images",modifier_classes:"",icons:["angle","angles","arrow","arrow-long","bars","calendar","caret","check","chevron","download","ellipsis","envelope","file","magnifying-glass","minus","plus","rss","square","square-check","square-empty","xmark","facebook","instagram","linkedin","twitter","youtube"],content:'<p>This is WYSIWYG content, which can contain <abbr title="Hyper Text Markup Language">HTML</abbr> markup. There is no limit to how long this content can be. it could have both <a href="#0">internal</a> and <a href="https://example.com">external</a> links.</p>\n<h2>Heading Level 2</h2>\n<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>\n<p>This is what a successive paragraph looks like. Some people prefer a space between paragraphs, while others prefer successive paragraphs indented with no margins between them.</p>\n<h3>Heading Level 3</h3>\n<ul>\n  <li>This is a list item in an unordered list</li>\n  <li>An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line. </li>\n  <li>\n    Lists can be nested inside of each other\n    <ul>\n      <li>This is a nested list item</li>\n      <li>This is another nested list item in an unordered list</li>\n    </ul>\n  </li>\n  <li>This is the last list item</li>\n</ul>\n<h4>Heading Level 4</h4>\n<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>\n<blockquote>\n  <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.</p>\n  <cite>Jane Doe, President and CEO</cite>\n</blockquote>\n<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>\n<h5>Heading Level 5</h5>\n<ol>\n  <li>This is a list item in an ordered list</li>\n  <li>An ordered list is a list in which the sequence of items is important. An ordered list does not necessarily contain sequence characters.</li>\n  <li>\n    Lists can be nested inside of each other\n    <ol>\n      <li>This is a nested list item</li>\n      <li>This is another nested list item in an ordered list</li>\n    </ol>\n  </li>\n  <li>This is the last list item</li>\n</ol>\n<h6>Heading Level 6</h6>\n<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>\n<table>\n  <caption>Table caption</caption>\n  <thead>\n    <tr>\n      <th>Table Heading A</th>\n      <th>Table Heading B</th>\n      <th>Table Heading C</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Table Cell A1</td>\n      <td>Table Cell B1</td>\n      <td>Table Cell C1</td>\n    </tr>\n    <tr>\n      <td>Table Cell A2</td>\n      <td>Table Cell B2</td>\n      <td>Table Cell C2</td>\n    </tr>\n    <tr>\n      <td>Table Cell A3</td>\n      <td>Table Cell B3</td>\n      <td>Table Cell C3</td>\n    </tr>\n    <tr>\n      <td>Table Cell A4</td>\n      <td>Table Cell B4</td>\n      <td>Table Cell C4</td>\n    </tr>\n  </tbody>\n</table>\n<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>'}];module.exports=doc.length<=1?doc[0]:doc},"./source/01-global/images/hero-image.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"952b62337c065ce0ca29695d4e66a8b228ab94d381afbc67c53cd64ca3faef84760e5a60432604cc613e8fb412e29cea1b45ec8cec22212b2703bc6377a93048",data:[{type:"raw",value:"<img "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]}],output:[{type:"raw",value:'class="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]}]},{type:"raw",value:'" '}]}},{type:"raw",value:'src="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"src"}]},{type:"raw",value:'" alt="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"alt"}]},{type:"raw",value:'"'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"height"}],output:[{type:"raw",value:' height="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"height"}]},{type:"raw",value:'"'}]}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"width"}],output:[{type:"raw",value:' width="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"img_hero",match:["img_hero"]},{type:"Twig.expression.type.key.period",key:"width"}]},{type:"raw",value:'"'}]}},{type:"raw",value:">\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./source/03-components/button-group/button-group.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"e0f5eaeab558ab0bd4f313016a85bd2a1ad5d6982ae4766980ef27f635facc095c7ab14effa06d5ad862fca101dff8a14525a38c87ff74bfd6db2f8d1ae33ce3",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-button-group"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:""},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"buttons",match:["buttons"]}],output:[{type:"raw",value:"  <"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:'\n    class="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"classes",match:["classes"]}]},{type:"raw",value:'"'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"nav"},{type:"Twig.expression.type.operator.binary",value:"!=",precidence:9,associativity:"leftToRight",operator:"!="}],output:[{type:"raw",value:' role="group"'}]}},{type:"raw",value:'    aria-label="'},{type:"output_whitespace_post",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}]},{type:"raw",value:'">\n    <ul class="c-button-group__list">\n      '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"button",expression:[{type:"Twig.expression.type.variable",value:"buttons",match:["buttons"]}],output:[{type:"raw",value:"        "},{type:"logic",token:{type:"Twig.logic.type.set",key:"button_classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-button-group__link"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-button"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"button_modifier_classes",match:["button_modifier_classes"]},{type:"Twig.expression.type.variable",value:"button_modifier_classes",match:["button_modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"},{type:"Twig.expression.type.string",value:"is-active"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:'\n        <li class="c-button-group__item'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"}],output:[{type:"raw",value:" is-active"}]}},{type:"raw",value:'">\n          '},{type:"logic",token:{type:"Twig.logic.type.block",blockName:"link",output:[{type:"raw",value:'            <a href="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"url"},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"#0"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:'" class="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button_classes",match:["button_classes"]}]},{type:"raw",value:'">\n              '},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"text"}]},{type:"raw",value:"\n              "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"button",match:["button"]},{type:"Twig.expression.type.key.period",key:"active"}],output:[{type:"raw",value:'                <span class="u-visually-hidden">'},{type:"output",stack:[{type:"Twig.expression.type.subexpression.end",value:")",match:[")"],expression:!0,params:[{type:"Twig.expression.type.variable",value:"active_label",match:["active_label"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"(active)"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"Twig.expression.type.filter",value:"t",match:["|t","t"]}]},{type:"raw",value:"</span>\n              "}]}},{type:"raw",value:"            </a>\n          "}]}},{type:"raw",value:"        </li>\n      "}]}},{type:"raw",value:"    </ul>\n  </"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"element",match:["element"]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.operator.binary",value:"?:",precidence:16,associativity:"rightToLeft",operator:"?:"}]},{type:"raw",value:">\n"}]}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./source/03-components/icon/icon.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"c0a1bf3376568e8c5b67d1f5063619178a405dbd6e2c1cd3276750969637e2f9c704d06a92432737f4822413142741a45a40017ed2891d81a015612330413135",data:[{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-icon"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"direction",match:["direction"]},{type:"Twig.expression.type.string",value:"is-"},{type:"Twig.expression.type.variable",value:"direction",match:["direction"]},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}},{type:"raw",value:"\n"},{type:"logic",token:{type:"Twig.logic.type.apply",stack:[{type:"Twig.expression.type.filter",value:"spaceless",match:["|spaceless","spaceless"]}],output:[{type:"raw",value:"  <svg "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:' role="img"'},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_hidden",match:["is_hidden"]}],output:[{type:"raw",value:' aria-hidden="true"'}]}},{type:"raw",value:">\n    "},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"label",match:["label"]}],output:[{type:"raw",value:"<title>"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"label",match:["label"]}]},{type:"raw",value:"</title>"}]}},{type:"raw",value:'    <use href="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"image_path",match:["image_path"]}]},{type:"raw",value:"/sprite.artifact.svg#"},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"icon_name",match:["icon_name"]}]},{type:"raw",value:'"></use>\n  </svg>\n'}]}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./source/03-components/message/message.twig":function(module,__unused_webpack_exports,__webpack_require__){var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{global:"/home/runner/work/gesso/gesso/source/01-global",layouts:"/home/runner/work/gesso/gesso/source/02-layouts",components:"/home/runner/work/gesso/gesso/source/03-components",templates:"/home/runner/work/gesso/gesso/source/04-templates",pages:"/home/runner/work/gesso/gesso/source/05-pages"},id:"efbf9e7e33f3c264952de793537ee611caaf2761f8eb47e501bee58800ac3991581bdc59b06357708dae89ea04abcdf9a26446c5662809650baf6d8eafc4303d",data:[{type:"output",stack:[{type:"Twig.expression.type._function",fn:"attach_library",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"gesso/message"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"raw",value:"\n\n"},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"error"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--error"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"logic",token:{type:"Twig.logic.type.elseif",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"warning"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--warning"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],output:[{type:"raw",value:"  "},{type:"logic",token:{type:"Twig.logic.type.set",key:"classes",expression:[{type:"Twig.expression.type.array.start",value:"[",match:["["]},{type:"Twig.expression.type.string",value:"c-message"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.string",value:"c-message--status"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.variable",value:"modifier_classes",match:["modifier_classes"]},{type:"Twig.expression.type.string",value:""},{type:"Twig.expression.type.operator.binary",value:"?",precidence:16,associativity:"rightToLeft",operator:"?"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.array.end",value:"]",match:["]"]},{type:"Twig.expression.type.filter",value:"join",match:["|join","join"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:" "},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.filter",value:"trim",match:["|trim","trim"]}]}}]}},{type:"raw",value:"\n<div "},{type:"output",stack:[{type:"Twig.expression.type._function",fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type.variable",value:"classes",match:["classes"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}]},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"type",match:["type"]},{type:"Twig.expression.type.string",value:"error"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],output:[{type:"raw",value:' role="alert"'}]}},{type:"raw",value:'>\n  <div class="c-message__content">\n    '},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}],output:[{type:"raw",value:'      <h2 class="u-visually-hidden">'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"heading",match:["heading"]}]},{type:"raw",value:"</h2>\n    "}]}},{type:"raw",value:""},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]},{type:"Twig.expression.type.filter",value:"length",match:["|length","length"]},{type:"Twig.expression.type.number",value:1,match:["1",null]},{type:"Twig.expression.type.operator.binary",value:">",precidence:8,associativity:"leftToRight",operator:">"}],output:[{type:"raw",value:'      <ul class="c-message__list">\n        '},{type:"logic",token:{type:"Twig.logic.type.for",keyVar:null,valueVar:"message",expression:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]}],output:[{type:"raw",value:'          <li class="c-message__item">'},{type:"output_whitespace_both",stack:[{type:"Twig.expression.type.variable",value:"message",match:["message"]}]},{type:"raw",value:"</li>\n        "}]}},{type:"raw",value:"      </ul>\n    "}]}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],output:[{type:"raw",value:""},{type:"output_whitespace_both",stack:[{type:"Twig.expression.type.variable",value:"messages",match:["messages"]},{type:"Twig.expression.type.filter",value:"first",match:["|first","first"]}]},{type:"raw",value:""}]}},{type:"raw",value:"  </div>\n</div>\n"}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);