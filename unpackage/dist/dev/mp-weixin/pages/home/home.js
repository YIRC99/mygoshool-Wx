(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{174:function(e,t,n){"use strict";n.r(t);var o=n(175),r=n(177);for(var s in r)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(s);n(179);var i,u=n(32),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);c.options.__file="pages/home/home.vue",t["default"]=c.exports},175:function(e,t,n){"use strict";n.r(t);var o=n(176);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},176:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return s})),n.d(t,"components",(function(){return o}));try{o={uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,263))},uvCalendars:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uv-calendars/components/uv-calendars/uv-calendars")]).then(n.bind(null,271))},uEmpty:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(n.bind(null,284))},uniCard:function(){return n.e("uni_modules/uni-card/components/uni-card/uni-card").then(n.bind(null,292))},uvPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uv-popup/components/uv-popup/uv-popup")]).then(n.bind(null,299))},uniSection:function(){return n.e("uni_modules/uni-section/components/uni-section/uni-section").then(n.bind(null,306))},quickMessage:function(){return Promise.all([n.e("common/vendor"),n.e("components/quick-message/quick-message")]).then(n.bind(null,219))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.newSchoolList.length),o=e.__map(e.newSchoolList,(function(t,n){var o=e.__get_orig(t),r=e.subYear(t.startdatetime);return{$orig:o,m0:r}})),r=e.oldSchoolList.length,s=e.__map(e.oldSchoolList,(function(t,n){var o=e.__get_orig(t),r=e.subYear(t.startdatetime);return{$orig:o,m1:r}})),i=e.otherAddressList.length,u=e.__map(e.otherAddressList,(function(t,n){var o=e.__get_orig(t),r=e.subYear(t.startdatetime);return{$orig:o,m2:r}})),c=1==e.currentOrder.isbefore?e.hoursTominute(e.currentOrder.beforetime):null,l=1==e.currentOrder.isafter?e.hoursTominute(e.currentOrder.aftertime):null;e.$mp.data=Object.assign({},{$root:{g0:n,l0:o,g1:r,l1:s,g2:i,l2:u,m3:c,m4:l}})},s=!1,i=[];r._withStripped=!0},177:function(e,t,n){"use strict";n.r(t);var o=n(178),r=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=r.a},178:function(e,t,n){"use strict";(function(e){var o=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(18)),s={data:function(){return{avahttp:this.avahttp,oneRefresh:!1,isRefresh:!1,popupShow:!1,noticeText:"编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。",list:[{name:"濂溪校区",time:"",pageNum:1,pagetotal:0},{name:"鹤问湖校区",time:"",pageNum:1,pagetotal:0},{name:"其他",time:"",pageNum:1,pagetotal:0}],currentIndex:0,orderList:[],newSchoolList:[],oldSchoolList:[],otherAddressList:[],currentOrder:{createUserInfo:{username:""}},pageNum:1,pageSize:5,pagetotal:0}},methods:{chooseDateConfirm:function(e){console.log(e.fulldate),this.list[this.currentIndex].time=e.fulldate,this.scrollPullDown()},cancelCalendars:function(){this.list[this.currentIndex].time="",this.scrollPullDown()},openCalendars:function(){this.$refs.calendars.open()},copyWx:function(){var t=this;e.setClipboardData({data:this.currentOrder.userWx,complete:function(e){t.$refs.receivePopup.close(),t.closeReceivePopup()}})},closeReceivePopup:function(){this.popupShow=!1,console.log(this.popupShow)},receiveOrder:function(){this.$refs.popup.close(),this.$refs.receivePopup.open()},getOrderList:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&(this.list[this.currentIndex].pageNum=1),this.post({url:"carshareorder/page",data:{pageNum:this.list[this.currentIndex].pageNum,pageSize:this.pageSize,pageDate:this.list[this.currentIndex].time,startAddName:this.list[this.currentIndex].name}}).then((function(n){if(console.log(n.data),200!=n.code)return e.isRefresh=!1,void e.$refs.message.show({type:"error",msg:"网络开了点小差,请稍候重试吧",iconSize:16});e.list[e.currentIndex].pagetotal=n.data.total,n.data.records.forEach((function(e){(-1!=e.startaddressall.indexOf("濂溪校区")||-1!=e.startaddressall.indexOf("鹤问湖校区"))&&(e.startaddress="九职大"+e.startaddress.slice(6,9999))})),t?0==e.currentIndex?(e.newSchoolList=[],e.newSchoolList=n.data.records):1==e.currentIndex?(e.oldSchoolList=[],e.oldSchoolList=n.data.records):2==e.currentIndex&&(e.otherAddressList=[],e.otherAddressList=n.data.records):(console.log("获取信息是的方式是触底分页加载"),0==e.currentIndex?e.newSchoolList=[].concat((0,r.default)(e.newSchoolList),(0,r.default)(n.data.records)):1==e.currentIndex?e.oldSchoolList=[].concat((0,r.default)(e.oldSchoolList),(0,r.default)(n.data.records)):2==e.currentIndex&&(e.otherAddressList=[].concat((0,r.default)(e.otherAddressList),(0,r.default)(n.data.records)))),e.isRefresh=!1,console.log("下拉刷新结束了")})).catch((function(t){console.log("home page is",t),e.isRefresh=!1,e.$refs.message.show({type:"error",msg:"网络开了点小差,请稍候重试吧",iconSize:16})}))},scrollPullDown:function(){console.log("下拉刷新了"),1!=this.isRefresh&&(this.isRefresh=!0,this.getOrderList())},scrollDown:function(){console.log("滚动条到了底部 当前的indedx为",this.currentIndex),0==this.currentIndex&&this.newSchoolList.length>=this.list[this.currentIndex].pagetotal?this.$refs.message.show({type:"default",msg:"已经到底了, 没有更多数据啦",iconSize:16}):1==this.currentIndex&&this.oldSchoolList.length>=this.list[this.currentIndex].pagetotal||2==this.currentIndex&&this.otherAddressList.length>=this.list[this.currentIndex].pagetotal?this.$refs.message.show({type:"success",msg:"已经到底了, 没有更多数据啦",iconSize:16}):(this.list[this.currentIndex].pageNum++,this.getOrderList(!1))},toAddOrder:function(){e.navigateTo({url:"/subpkg/addCarorder"})},clickCard:function(e){this.currentOrder=e,console.log(this.currentOrder),this.$refs.popup.open(),this.popupShow=!0},closePopup:function(){this.popupShow=!1},change:function(e){if(this.currentIndex=e.index,0==this.currentIndex){if(0!==this.newSchoolList.length)return;this.scrollPullDown()}else if(1==this.currentIndex){if(0!==this.oldSchoolList.length)return;this.scrollPullDown()}else if(2==this.currentIndex){if(0!==this.otherAddressList.length)return;this.scrollPullDown()}},myonshow:function(){console.log("拼车页面的myonshow方法触发了"),this.simulateSwipeDown()},simulateSwipeDown:function(){this.oneRefresh||(this.oneRefresh=!0,console.log("首次进入页面 index 0 页面 自动下拉刷新"),this.change({index:0,name:"濂溪校区"}))}}};t.default=s}).call(this,n(2)["default"])},179:function(e,t,n){"use strict";n.r(t);var o=n(180),r=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=r.a},180:function(e,t,n){},186:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var r=o(n(174));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])}},[[186,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map