import App from './App'
import MyAES from '@/aes/aes'
import CryptoJS from 'crypto-js';


// const http = 'http://192.168.73.210:33088/' //手机热点
// const http = 'https://yirc99.cn/api/' //服务器
// const http = 'http://192.168.2.177:33088/' //酒店
const http = 'http://10.16.60.53:33088/' //305wifi
// const http = 'http://192.168.2.196:33088/' //宿舍wifi

const myOutTime = 5000
Vue.prototype.avahttp = http + 'common/download?path=avatar&name='
Vue.prototype.QRttp = http + 'common/download?path=QRcode&name='
Vue.prototype.http = http
Vue.prototype.MyAES = MyAES
Vue.prototype.hoursTominute = (str) =>{
  const hour = str.split(':')[0]
  const minute = str.split(':')[1]
  return Number(hour) * 60 + Number(minute)
}
Vue.prototype.subYear = (str) => {
    if (!str || typeof str !== 'string') {
        return "";
    }
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
    const match = str.match(regex);
    if (!match) {
        return "";
    }
    const year = match[1];
    const month = match[2].padStart(2, '0');
    const day = match[3].padStart(2, '0');
    const hour = match[4].padStart(2, '0');
    const minute = match[5].padStart(2, '0');
    return `${month}-${day} ${hour}:${minute}`;
};




Vue.prototype.get =(opt) =>{
	 return new Promise((a,b)=>{
		uni.request({
			url: http + opt.url,
			method: 'GET',
			header:{
				// authorization : uni.getStorageSync("token")
				authorization : 'mytoken'
			},
      timeout:myOutTime,
			data: opt.data,
			success: res => {
        res.data.data =  MyAES.decrypt(res.data.data)
				a(res.data)
			},
			fail: (err) => {
			  b(err.errMsg)
			  console.log('get 请求失败了',err);
			},
			complete: () => {}
		});
	})
}
Vue.prototype.put =(opt) =>{
	 return new Promise((a,b)=>{
		uni.request({
			url: http + opt.url,
			method: 'PUT',
			header:{
				// authorization: uni.getStorageSync("token")
				authorization : 'mytoken'
			},
      timeout:myOutTime,
			data: opt.data,
			success: res => {
        res.data.data =  MyAES.decrypt(res.data.data)
				a(res.data)
			},
			fail: (err) => {
			  b(err.errMsg)
			  console.log('put 请求失败了',err);
			},
			complete: () => {}
		});
	})
}

Vue.prototype.post =(opt) =>{
	 return new Promise((a,b)=>{
		uni.request({
			url: http + opt.url,
			method: 'POST',
			header:{
				// authorization :uni.getStorageSync("token")
				authorization : 'mytoken'
			},
      timeout: myOutTime,
			data: opt.data,
			success: res => {
        res.data.data =  MyAES.decrypt(res.data.data)
				a(res.data)
			},
			fail: (err) => {
        b(err.errMsg)
        console.log('post 请求失败了',err);
      },
			complete: () => {}
		});
	})
}

Vue.filter('fromStartDateTime', (value) => {
  if(value == undefined) return ''
  const startDateTime = value;
  const indexT = startDateTime.indexOf('T');
  const indexColon = startDateTime.lastIndexOf(':');
  const newDateTime = startDateTime.slice(0, indexT) + ' ' + startDateTime.slice(indexT + 1, indexColon);
  return newDateTime
})

Vue.filter('formHtmlStr', (value) => {
  if(value == undefined) return ''
  // 使用正则表达式去除 HTML 标签
  return value.replace(/<[^>]*>/g, '');
})




// main.js
import uvUI from '@/uni_modules/uv-ui-tools'
// #ifndef VUE3
Vue.use(uvUI);
// #endif
// #ifdef VUE3
app.use(uvUI);
// #endif


// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uvUI)之后执行
uni.$uv.setConfig({
	// 修改$uv.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$uv.config.unit = 'rpx'
		unit: 'rpx'
	}
		// 其他组件属性配置，具体的参数名称可以去每个组件的props.js中进行查看
		// ......
})



import message from '@/components/quick-message/quick-message.vue'
Vue.component('quick-message',message);
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { number } from './uni_modules/uv-ui-tools/libs/function/test';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif