(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon"],{"0af7":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.show?e.__get_style([e.$uv.addStyle(e.customStyle)]):null),i=e.show&&!e.webviewHide?e.$uv.addUnit(e.size):null,o=e.show&&!e.webviewHide?e.$uv.addUnit(e.size):null,u=e.show&&e.text?e.__get_style([{fontSize:e.$uv.addUnit(e.textSize),color:e.textColor},e.$uv.addStyle(e.textStyle)]):null;e.$mp.data=Object.assign({},{$root:{s0:n,g0:i,g1:o,s1:u}})},o=[]},"2e94":function(e,t,n){"use strict";n.r(t);var i=n("0af7"),o=n("5122");for(var u in o)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("740a");var a=n("f0c5"),d=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"022511f0",null,!1,i["a"],void 0);t["default"]=d.exports},5122:function(e,t,n){"use strict";n.r(t);var i=n("ef78"),o=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},"740a":function(e,t,n){"use strict";var i=n("de8d"),o=n.n(i);o.a},de8d:function(e,t,n){},ef78:function(e,t,n){"use strict";var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("f95f"),u=i(n("32ef")),a=i(n("e629")),d=i(n("df65")),r={name:"uv-loading-icon",mixins:[u.default,a.default,d.default],data:function(){return{array12:Array.from({length:12}),aniAngel:360,webviewHide:!1,loading:!1}},computed:{otherBorderColor:function(){var e=(0,o.colorGradient)(this.color,"#ffffff",100)[80];return"circle"===this.mode?this.inactiveColor?this.inactiveColor:e:"transparent"}},watch:{show:function(e){}},mounted:function(){this.init()},methods:{init:function(){setTimeout((function(){}),20)},addEventListenerToWebview:function(){var e=this,t=getCurrentPages(),n=t[t.length-1],i=n.$getAppWebview();i.addEventListener("hide",(function(){e.webviewHide=!0})),i.addEventListener("show",(function(){e.webviewHide=!1}))}}};t.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component',
    {
        'uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2e94"))
        })
    },
    [['uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon-create-component']]
]);
