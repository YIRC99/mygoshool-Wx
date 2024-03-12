(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uv-upload/components/uv-preview-video/uv-preview-video"],{4309:function(e,n,t){"use strict";var u=t("cf8e"),o=t.n(u);o.a},c5b0:function(e,n,t){"use strict";t.r(n);var u=t("de3b"),o=t("cbba");for(var c in o)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(c);t("4309");var i=t("f0c5"),r=Object(i["a"])(o["default"],u["b"],u["c"],!1,null,"5c90ac64",null,!1,u["a"],void 0);n["default"]=r.exports},cbba:function(e,n,t){"use strict";t.r(n);var u=t("de30"),o=t.n(u);for(var c in u)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(c);n["default"]=o.a},cf8e:function(e,n,t){},de30:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={props:{src:{type:String,default:""},autoplay:{type:Boolean,default:!0}},data:function(){return{videoSrc:"",show:!1}},computed:{getSec:function(){return this.src||this.videoSrc}},methods:{open:function(e){this.videoSrc=e,this.$refs.popup.open()},close:function(){this.$refs.popup.close()},change:function(e){this.show=e.show}}};n.default=u},de3b:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return u}));var u={uvPopup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uv-popup/components/uv-popup/uv-popup")]).then(t.bind(null,"326c"))}},o=function(){var e=this.$createElement;this._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uv-upload/components/uv-preview-video/uv-preview-video-create-component',
    {
        'uni_modules/uv-upload/components/uv-preview-video/uv-preview-video-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c5b0"))
        })
    },
    [['uni_modules/uv-upload/components/uv-preview-video/uv-preview-video-create-component']]
]);
