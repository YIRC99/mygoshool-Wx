(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon"],{390:function(n,e,t){"use strict";t.r(e);var i=t(391),o=t(393);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);t(396);var u,d=t(32),c=Object(d["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,"41b06902",null,!1,i["components"],u);c.options.__file="uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue",e["default"]=c.exports},391:function(n,e,t){"use strict";t.r(e);var i=t(392);t.d(e,"render",(function(){return i["render"]})),t.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),t.d(e,"components",(function(){return i["components"]}))},392:function(n,e,t){"use strict";var i;t.r(e),t.d(e,"render",(function(){return o})),t.d(e,"staticRenderFns",(function(){return u})),t.d(e,"recyclableRender",(function(){return r})),t.d(e,"components",(function(){return i}));var o=function(){var n=this,e=n.$createElement,t=(n._self._c,n.show?n.__get_style([n.$uv.addStyle(n.customStyle)]):null),i=n.show&&!n.webviewHide?n.$uv.addUnit(n.size):null,o=n.show&&!n.webviewHide?n.$uv.addUnit(n.size):null,r=n.show&&n.text?n.__get_style([{fontSize:n.$uv.addUnit(n.textSize),color:n.textColor},n.$uv.addStyle(n.textStyle)]):null;n.$mp.data=Object.assign({},{$root:{s0:t,g0:i,g1:o,s1:r}})},r=!1,u=[];o._withStripped=!0},393:function(n,e,t){"use strict";t.r(e);var i=t(394),o=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);e["default"]=o.a},394:function(n,e,t){"use strict";var i=t(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(252),r=i(t(253)),u=i(t(254)),d=i(t(395)),c={name:"uv-loading-icon",mixins:[r.default,u.default,d.default],data:function(){return{array12:Array.from({length:12}),aniAngel:360,webviewHide:!1,loading:!1}},computed:{otherBorderColor:function(){var n=(0,o.colorGradient)(this.color,"#ffffff",100)[80];return"circle"===this.mode?this.inactiveColor?this.inactiveColor:n:"transparent"}},watch:{show:function(n){}},mounted:function(){this.init()},methods:{init:function(){setTimeout((function(){}),20)},addEventListenerToWebview:function(){var n=this,e=getCurrentPages(),t=e[e.length-1],i=t.$getAppWebview();i.addEventListener("hide",(function(){n.webviewHide=!0})),i.addEventListener("show",(function(){n.webviewHide=!1}))}}};e.default=c},396:function(n,e,t){"use strict";t.r(e);var i=t(397),o=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);e["default"]=o.a},397:function(n,e,t){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component',
    {
        'uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(390))
        })
    },
    [['uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component']]
]);
