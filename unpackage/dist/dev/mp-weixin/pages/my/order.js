(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/order"],{187:function(n,e,t){"use strict";(function(n,e){var o=t(4);t(26);o(t(25));var r=o(t(188));n.__webpack_require_UNI_MP_PLUGIN__=t,e(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},188:function(n,e,t){"use strict";t.r(e);var o=t(189),r=t(191);for(var u in r)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(u);t(193);var i,c=t(32),s=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);s.options.__file="pages/my/order.vue",e["default"]=s.exports},189:function(n,e,t){"use strict";t.r(e);var o=t(190);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},190:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return i})),t.d(e,"recyclableRender",(function(){return u})),t.d(e,"components",(function(){return o}));try{o={uTabs:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(t.bind(null,263))},uEmpty:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(t.bind(null,284))},uniCard:function(){return t.e("uni_modules/uni-card/components/uni-card/uni-card").then(t.bind(null,292))},uvPopup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uv-popup/components/uv-popup/uv-popup")]).then(t.bind(null,299))},uniSection:function(){return t.e("uni_modules/uni-section/components/uni-section/uni-section").then(t.bind(null,306))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement,t=(n._self._c,n.orderList.length);n.$mp.data=Object.assign({},{$root:{g0:t}})},u=!1,i=[];r._withStripped=!0},191:function(n,e,t){"use strict";t.r(e);var o=t(192),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},192:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{list:[{name:"拼车历史"},{name:"待开发"}],current:0,orderList:[],popupShow:!1}},methods:{clickCard:function(n){console.log("点击了卡片"),this.$refs.popup.open(),this.popupShow=!0},change:function(n){this.current=n.index},closePopup:function(){this.popupShow=!1}},onShow:function(){this.orderList.push({orderId:10086,avatar:"/static/logo.png",startDate:"2024-02-25",startTime:"19:45",startAddress:"九江职业大学北门",endAddress:"九江站",remark:"我是备注,我是备注,我是备注,我是备注,我是备注"})}};e.default=o},193:function(n,e,t){"use strict";t.r(e);var o=t(194),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},194:function(n,e,t){}},[[187,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/order.js.map