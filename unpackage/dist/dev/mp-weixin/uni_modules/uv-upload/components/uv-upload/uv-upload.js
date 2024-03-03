(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uv-upload/components/uv-upload/uv-upload"],{359:function(e,t,n){"use strict";n.r(t);var i=n(360),o=n(362);for(var u in o)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n(367);var r,a=n(32),s=Object(a["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,"2e4c50f9",null,!1,i["components"],r);s.options.__file="uni_modules/uv-upload/components/uv-upload/uv-upload.vue",t["default"]=s.exports},360:function(e,t,n){"use strict";n.r(t);var i=n(361);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},361:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return r})),n.d(t,"recyclableRender",(function(){return u})),n.d(t,"components",(function(){return i}));try{i={uvIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uv-icon/components/uv-icon/uv-icon")]).then(n.bind(null,398))},uvLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon")]).then(n.bind(null,390))},uvPreviewVideo:function(){return n.e("uni_modules/uv-upload/components/uv-preview-video/uv-preview-video").then(n.bind(null,468))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__get_style([e.$uv.addStyle(e.customStyle)])),i=e.previewImage?e.__map(e.lists,(function(t,n){var i=e.__get_orig(t),o=t.isImage||t.type&&"image"===t.type?e.$uv.addUnit(e.width):null,u=t.isImage||t.type&&"image"===t.type?e.$uv.addUnit(e.height):null,r=t.isImage||t.type&&"image"===t.type?null:e.$uv.addUnit(e.width),a=t.isImage||t.type&&"image"===t.type?null:e.$uv.addUnit(e.height);return{$orig:i,g0:o,g1:u,g2:r,g3:a}})):null,o=e.isInCount?e.$uv.addUnit(e.width):null,u=e.isInCount?e.$uv.addUnit(e.height):null;e.$mp.data=Object.assign({},{$root:{s0:n,l0:i,g4:o,g5:u}})},u=!1,r=[];o._withStripped=!0},362:function(e,t,n){"use strict";n.r(t);var i=n(363),o=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},363:function(e,t,n){"use strict";(function(e){var i=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(256),u=i(n(253)),r=i(n(254)),a=n(364),s=i(n(365)),l=i(n(366)),c={name:"uv-upload",mixins:[u.default,r.default,s.default,l.default],data:function(){return{lists:[],isInCount:!0}},watch:{fileList:{deep:!0,immediate:!0,handler:function(){this.formatFileList()}},deletable:function(e){var t=this;e||this.lists.map((function(e){e.deletable=t.deletable}))}},methods:{formatFileList:function(){var e=this,t=this.fileList,n=void 0===t?[]:t,i=this.maxCount,u=n.map((function(t){return Object.assign(Object.assign({},t),{isImage:"image"===e.accept||(0,o.image)(t.url||t.thumb),isVideo:"video"===e.accept||(0,o.video)(t.url||t.thumb),deletable:"boolean"===typeof t.deletable?t.deletable:e.deletable})}));this.lists=u,this.isInCount=u.length<i},chooseFile:function(){var e=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){var t=e.maxCount,n=e.multiple,i=e.lists,u=e.disabled;if(!u){var r;try{r=(0,o.array)(e.capture)?e.capture:e.capture.split(",")}catch(s){r=[]}(0,a.chooseFile)(Object.assign({accept:e.accept,multiple:e.multiple,capture:r,compressed:e.compressed,maxDuration:e.maxDuration,sizeType:e.sizeType,camera:e.camera},{maxCount:t-i.length})).then((function(t){e.onBeforeRead(n?t:t[0])})).catch((function(t){e.$emit("error",t)}))}}),100)},onBeforeRead:function(e){var t=this,n=this.beforeRead,i=this.useBeforeRead,u=!0;(0,o.func)(n)&&(u=n(e,this.getDetail())),i&&(u=new Promise((function(n,i){t.$emit("beforeRead",Object.assign(Object.assign({file:e},t.getDetail()),{callback:function(e){e?n():i()}}))}))),u&&((0,o.promise)(u)?u.then((function(n){return t.onAfterRead(n||e)})):this.onAfterRead(e))},getDetail:function(e){return{name:this.name,index:null==e?this.fileList.length:e}},onAfterRead:function(e){var t=this.maxSize,n=this.afterRead,i=Array.isArray(e)?e.some((function(e){return e.size>t})):e.size>t;i?this.$emit("oversize",Object.assign({file:e},this.getDetail())):("function"===typeof n&&n(e,this.getDetail()),this.$emit("afterRead",Object.assign({file:e},this.getDetail())))},deleteItem:function(e){this.$emit("delete",Object.assign(Object.assign({},this.getDetail(e)),{file:this.fileList[e]}))},onPreviewImage:function(t,n){var i=this,u=this.$uv.deepClone(this.lists);u.map((function(e,t){t==n&&(e.current=!0)}));var r=u.filter((function(e){return e.isImage})),a=r.findIndex((function(e){return e.current}));this.onClickPreview(t,n),t.isImage&&this.previewFullImage&&e.previewImage({urls:this.lists.filter((function(e){return"image"===i.accept||(0,o.image)(e.url||e.thumb)})).map((function(e){return e.url||e.thumb})),current:a,fail:function(){this.$uv.toast("预览图片失败")}})},onPreviewVideo:function(e,t){this.onClickPreview(e,t),this.previewFullVideo&&e.isVideo&&this.$refs.previewVideo.open(e.url)},onClickPreview:function(e,t){this.$emit("clickPreview",Object.assign(Object.assign({},e),this.getDetail(t)))}}};t.default=c}).call(this,n(2)["default"])},367:function(e,t,n){"use strict";n.r(t);var i=n(368),o=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},368:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uv-upload/components/uv-upload/uv-upload.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uv-upload/components/uv-upload/uv-upload-create-component',
    {
        'uni_modules/uv-upload/components/uv-upload/uv-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(359))
        })
    },
    [['uni_modules/uv-upload/components/uv-upload/uv-upload-create-component']]
]);
