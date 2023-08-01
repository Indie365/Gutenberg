"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[7140],{"./packages/components/src/utils/hooks/stories/use-cx.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__,_slotFill:()=>_slotFill,_slotFillSimple:()=>_slotFillSimple,_useMemoBadPractices:()=>_useMemoBadPractices,_default:()=>_default});var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/block-editor/build-module/index.js"),_wordpress_element__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/utils/hooks/use-cx.ts"),_style_provider__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/src/style-provider/index.tsx"),_slot_fill__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/slot-fill/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={parameters:{sourceLink:"packages/components/src/utils/hooks",storySource:{source:"/**\n * External dependencies\n */\nimport { css } from '@emotion/react';\n\n/**\n * WordPress dependencies\n */\nimport { __unstableIframe as Iframe } from '@wordpress/block-editor';\nimport { useMemo } from '@wordpress/element';\n\n/**\n * Internal dependencies\n */\nimport { useCx } from '..';\nimport StyleProvider from '../../../style-provider';\nimport {\n\tcreateSlotFill,\n\tProvider as SlotFillProvider,\n} from '../../../slot-fill';\n\nexport default {\n\ttitle: 'Components (Experimental)/useCx',\n};\n\nconst Example = ( { serializedStyles, children } ) => {\n\tconst cx = useCx();\n\tconst classes = cx( serializedStyles );\n\treturn <span className={ classes }>{ children }</span>;\n};\n\nconst ExampleWithUseMemoWrong = ( { serializedStyles, children } ) => {\n\tconst cx = useCx();\n\t// Wrong: using 'useMemo' without adding 'cx' to the dependency list.\n\tconst classes = useMemo(\n\t\t() => cx( serializedStyles ),\n\t\t\n\t\t[ serializedStyles ]\n\t);\n\treturn <span className={ classes }>{ children }</span>;\n};\n\nconst ExampleWithUseMemoRight = ( { serializedStyles, children } ) => {\n\tconst cx = useCx();\n\t// Right: using 'useMemo' with 'cx' listed as a dependency.\n\tconst classes = useMemo(\n\t\t() => cx( serializedStyles ),\n\t\t[ cx, serializedStyles ]\n\t);\n\treturn <span className={ classes }>{ children }</span>;\n};\n\nexport const _slotFill = () => {\n\tconst { Fill, Slot } = createSlotFill( 'UseCxExampleSlot' );\n\n\tconst redText = css`\n\t\tcolor: red;\n\t`;\n\tconst blueText = css`\n\t\tcolor: blue;\n\t`;\n\tconst greenText = css`\n\t\tcolor: green;\n\t`;\n\n\treturn (\n\t\t<SlotFillProvider>\n\t\t\t<StyleProvider document={ document }>\n\t\t\t\t<Iframe>\n\t\t\t\t\t<Iframe>\n\t\t\t\t\t\t<Example serializedStyles={ redText }>\n\t\t\t\t\t\t\tThis text is inside an iframe and should be red\n\t\t\t\t\t\t</Example>\n\t\t\t\t\t\t<Fill name=\"test-slot\">\n\t\t\t\t\t\t\t<Example serializedStyles={ blueText }>\n\t\t\t\t\t\t\t\tThis text is also inside the iframe, but is\n\t\t\t\t\t\t\t\trelocated by a slot/fill and should be blue\n\t\t\t\t\t\t\t</Example>\n\t\t\t\t\t\t</Fill>\n\t\t\t\t\t\t<Fill name=\"outside-frame\">\n\t\t\t\t\t\t\t<Example serializedStyles={ greenText }>\n\t\t\t\t\t\t\t\tThis text is also inside the iframe, but is\n\t\t\t\t\t\t\t\trelocated by a slot/fill and should be green\n\t\t\t\t\t\t\t</Example>\n\t\t\t\t\t\t</Fill>\n\t\t\t\t\t</Iframe>\n\t\t\t\t\t<StyleProvider document={ document }>\n\t\t\t\t\t\t<Slot bubblesVirtually name=\"test-slot\" />\n\t\t\t\t\t</StyleProvider>\n\t\t\t\t</Iframe>\n\t\t\t\t<Slot bubblesVirtually name=\"outside-frame\" />\n\t\t\t</StyleProvider>\n\t\t</SlotFillProvider>\n\t);\n};\n\nexport const _slotFillSimple = () => {\n\tconst { Fill, Slot } = createSlotFill( 'UseCxExampleSlotTwo' );\n\n\tconst redText = css`\n\t\tcolor: red;\n\t`;\n\n\treturn (\n\t\t<SlotFillProvider>\n\t\t\t<Iframe>\n\t\t\t\t<Fill name=\"test-slot\">\n\t\t\t\t\t<Example serializedStyles={ redText }>\n\t\t\t\t\t\tThis text should be red\n\t\t\t\t\t</Example>\n\t\t\t\t</Fill>\n\t\t\t</Iframe>\n\t\t\t<Slot bubblesVirtually name=\"test-slot\" />\n\t\t</SlotFillProvider>\n\t);\n};\n\nexport const _useMemoBadPractices = () => {\n\tconst redText = css`\n\t\tcolor: red;\n\t`;\n\tconst blueText = css`\n\t\tcolor: blue;\n\t`;\n\n\treturn (\n\t\t<>\n\t\t\t<Example serializedStyles={ redText }>\n\t\t\t\tThis text should be red\n\t\t\t</Example>\n\t\t\t<ExampleWithUseMemoRight serializedStyles={ blueText }>\n\t\t\t\tThis text should be blue\n\t\t\t</ExampleWithUseMemoRight>\n\t\t\t<Iframe>\n\t\t\t\t<Example serializedStyles={ redText }>\n\t\t\t\t\tThis text should be red\n\t\t\t\t</Example>\n\t\t\t\t<ExampleWithUseMemoWrong serializedStyles={ blueText }>\n\t\t\t\t\tThis text should be blue but it&apos;s not!\n\t\t\t\t</ExampleWithUseMemoWrong>\n\t\t\t</Iframe>\n\t\t</>\n\t);\n};\n\nexport const _default = () => {\n\tconst redText = css`\n\t\tcolor: red;\n\t`;\n\treturn (\n\t\t<Iframe>\n\t\t\t<Example serializedStyles={ redText }>\n\t\t\t\tThis text is inside an iframe and is red!\n\t\t\t</Example>\n\t\t</Iframe>\n\t);\n};\n",locationsMap:{"slot-fill":{startLoc:{col:25,line:53},endLoc:{col:1,line:95},startBody:{col:25,line:53},endBody:{col:1,line:95}},"slot-fill-simple":{startLoc:{col:31,line:97},endLoc:{col:1,line:116},startBody:{col:31,line:97},endBody:{col:1,line:116}},"use-memo-bad-practices":{startLoc:{col:36,line:118},endLoc:{col:1,line:144},startBody:{col:36,line:118},endBody:{col:1,line:144}},default:{startLoc:{col:24,line:146},endLoc:{col:1,line:157},startBody:{col:24,line:146},endBody:{col:1,line:157}}}}},title:"Components (Experimental)/useCx"},Example=({serializedStyles,children})=>{const classes=(0,___WEBPACK_IMPORTED_MODULE_2__.I)()(serializedStyles);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:classes,children})};Example.displayName="Example";const ExampleWithUseMemoWrong=({serializedStyles,children})=>{const cx=(0,___WEBPACK_IMPORTED_MODULE_2__.I)(),classes=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)((()=>cx(serializedStyles)),[serializedStyles]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:classes,children})};ExampleWithUseMemoWrong.displayName="ExampleWithUseMemoWrong";const ExampleWithUseMemoRight=({serializedStyles,children})=>{const cx=(0,___WEBPACK_IMPORTED_MODULE_2__.I)(),classes=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)((()=>cx(serializedStyles)),[cx,serializedStyles]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:classes,children})};ExampleWithUseMemoRight.displayName="ExampleWithUseMemoRight";var _ref5={name:"v98kxt",styles:"color:green"},_ref6={name:"117wnve",styles:"color:blue"},_ref7={name:"hwfcu5",styles:"color:red"};const _slotFill=()=>{const{Fill,Slot}=(0,_slot_fill__WEBPACK_IMPORTED_MODULE_4__.up)("UseCxExampleSlot"),redText=_ref7,blueText=_ref6,greenText=_ref5;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_slot_fill__WEBPACK_IMPORTED_MODULE_4__.zt,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_style_provider__WEBPACK_IMPORTED_MODULE_5__.Z,{document,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.lP,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.lP,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:redText,children:"This text is inside an iframe and should be red"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Fill,{name:"test-slot",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:blueText,children:"This text is also inside the iframe, but is relocated by a slot/fill and should be blue"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Fill,{name:"outside-frame",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:greenText,children:"This text is also inside the iframe, but is relocated by a slot/fill and should be green"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_style_provider__WEBPACK_IMPORTED_MODULE_5__.Z,{document,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slot,{bubblesVirtually:!0,name:"test-slot"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slot,{bubblesVirtually:!0,name:"outside-frame"})]})})};_slotFill.displayName="_slotFill";var _ref4={name:"hwfcu5",styles:"color:red"};const _slotFillSimple=()=>{const{Fill,Slot}=(0,_slot_fill__WEBPACK_IMPORTED_MODULE_4__.up)("UseCxExampleSlotTwo"),redText=_ref4;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_slot_fill__WEBPACK_IMPORTED_MODULE_4__.zt,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.lP,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Fill,{name:"test-slot",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:redText,children:"This text should be red"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slot,{bubblesVirtually:!0,name:"test-slot"})]})};_slotFillSimple.displayName="_slotFillSimple";var _ref2={name:"117wnve",styles:"color:blue"},_ref3={name:"hwfcu5",styles:"color:red"};const _useMemoBadPractices=()=>{const redText=_ref3,blueText=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:redText,children:"This text should be red"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ExampleWithUseMemoRight,{serializedStyles:blueText,children:"This text should be blue"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.lP,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:redText,children:"This text should be red"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ExampleWithUseMemoWrong,{serializedStyles:blueText,children:"This text should be blue but it's not!"})]})]})};var _ref={name:"hwfcu5",styles:"color:red"};const _default=()=>{const redText=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.lP,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Example,{serializedStyles:redText,children:"This text is inside an iframe and is red!"})})};_default.displayName="_default",_slotFill.__docgenInfo={description:"",methods:[],displayName:"_slotFill"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/utils/hooks/stories/use-cx.js"]={name:"_slotFill",docgenInfo:_slotFill.__docgenInfo,path:"packages/components/src/utils/hooks/stories/use-cx.js"}),_slotFillSimple.__docgenInfo={description:"",methods:[],displayName:"_slotFillSimple"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/utils/hooks/stories/use-cx.js"]={name:"_slotFillSimple",docgenInfo:_slotFillSimple.__docgenInfo,path:"packages/components/src/utils/hooks/stories/use-cx.js"}),_useMemoBadPractices.__docgenInfo={description:"",methods:[],displayName:"_useMemoBadPractices"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/utils/hooks/stories/use-cx.js"]={name:"_useMemoBadPractices",docgenInfo:_useMemoBadPractices.__docgenInfo,path:"packages/components/src/utils/hooks/stories/use-cx.js"}),_default.__docgenInfo={description:"",methods:[],displayName:"_default"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/utils/hooks/stories/use-cx.js"]={name:"_default",docgenInfo:_default.__docgenInfo,path:"packages/components/src/utils/hooks/stories/use-cx.js"})}}]);