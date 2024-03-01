import App from './App'


import uView from "uview-ui";
Vue.use(uView);
// const http = 'http://192.168.1.13:33088/'
const http = 'http://127.0.0.1:33088/'
// const http = 'http://192.168.151.210:33088/'
Vue.prototype.avahttp = http + 'avatar/download/'
Vue.prototype.http = http
Vue.prototype.subYear =(str) =>{
	if(str ==undefined)
		return ""
	return str.slice(5)
}
Vue.prototype.get =(opt) =>{
	 return new Promise((a,b)=>{
		uni.request({
			url: http + opt.url,
			method: 'GET',
			header:{
				authorization :uni.getStorageSync("token")
			},
			data: opt.data,
			success: res => {
				a(res.data)
			},
			fail: () => {},
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
				authorization :uni.getStorageSync("token")
			},
			data: opt.data,
			success: res => {
				a(res.data)
			},
			fail: () => {},
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
				authorization :uni.getStorageSync("token")
			},
			data: opt.data,
			success: res => {
				a(res.data)
			},
			fail: () => {},
			complete: () => {}
		});
	})
}


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
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif