import App from './App'


import uView from "uview-ui";
Vue.use(uView);
// const http = 'http://192.168.1.13:33088/'
// const http = 'http://127.0.0.1:33088/'
const http = 'http://192.168.151.210:33088/'
Vue.prototype.avahttp = http + 'avatar/download/'
Vue.prototype.http = http
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
import { number } from './uni_modules/uv-ui-tools/libs/function/test';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif