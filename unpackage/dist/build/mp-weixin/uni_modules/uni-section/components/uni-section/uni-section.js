(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-section/components/uni-section/uni-section"],{"0237":function(t,n,e){},"0cbd":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},u=[]},"2ab5":function(t,n,e){"use strict";var i=e("0237"),u=e.n(i);u.a},"2fa5":function(t,n,e){"use strict";e.r(n);var i=e("6fdf"),u=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=u.a},"43d2":function(t,n,e){"use strict";e.r(n);var i=e("0cbd"),u=e("2fa5");for(var o in u)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("2ab5");var r=e("f0c5"),a=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=a.exports},"6fdf":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"UniSection",emits:["click"],props:{type:{type:String,default:""},title:{type:String,required:!0,default:""},titleFontSize:{type:String,default:"14px"},titleColor:{type:String,default:"#333"},subTitle:{type:String,default:""},subTitleFontSize:{type:String,default:"12px"},subTitleColor:{type:String,default:"#999"},padding:{type:[Boolean,String],default:!1}},computed:{_padding:function(){return"string"===typeof this.padding?this.padding:this.padding?"10px":""}},watch:{title:function(n){t.report&&""!==n&&t.report("title",n)}},methods:{onClick:function(){this.$emit("click")}}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-section/components/uni-section/uni-section-create-component',
    {
        'uni_modules/uni-section/components/uni-section/uni-section-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("43d2"))
        })
    },
    [['uni_modules/uni-section/components/uni-section/uni-section-create-component']]
]);
