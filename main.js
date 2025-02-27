import App from './App'
import MyAES from '@/aes/aes'
import MyIp from '@/common/myIp.js'
import CryptoJS from 'crypto-js';

// let account = uni.getAccountInfoSync()
// console.log('获取小程序版本', account.miniProgram.envVersion);
// let devHttp = 'http://192.168.243.211:33088/' // 开发环境
// // let devHttp = 'https://yirc99.cn/api/' // 开发环境
// let trialHttp = 'https://yirc99.cn/api/' // 体验环境
// let releaseHttp = 'https://yirc99.cn/api/' // 正式环境
// let http;
// // 生产环境与测试环境接口地址不同，请根据实际情况修改。
// if (account.miniProgram.envVersion == 'develop') {
//   http = devHttp
// } else if (account.miniProgram.envVersion == 'release') {
//   http = releaseHttp
// } else {
//   http = trialHttp
// }

let http = MyIp.getIp()



// let http = 'http://192.168.243.211:33088/' //手机热点
// let http = 'https://yirc99.cn/api/' //服务器
// let http = 'http://192.168.2.177:33088/' //酒店
// let http = 'http://10.16.60.53:33088/' //305wifi
// let http = 'http://192.168.1.14:33088/' //wifi

const myOutTime = 5000
Vue.prototype.http = http
Vue.prototype.avahttp = http + 'common/download?path=avatar&name='
Vue.prototype.QRttp = http + 'common/download?path=QRcode&name='
Vue.prototype.MyAES = MyAES
Vue.prototype.hoursTominute = (str) => {
  const hour = str.split(':')[0]
  const minute = str.split(':')[1]
  return Number(hour) * 60 + Number(minute)
}
Vue.prototype.subYear = (str) => {
  if (!str || typeof str !== 'string') {
    return "";
  }
  const regex = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/;
  const match = str.match(regex);
  if (!match) {
    return "";
  }
  const month = match[2];
  const day = match[3];
  const hour = match[4];
  const minute = match[5];
  return `${month}-${day} ${hour}:${minute}`;
};



Vue.prototype.get = (opt) => {
  return new Promise((a, b) => {
    uni.request({
      url: http + opt.url,
      method: 'GET',
      header: {
        authorization: uni.getStorageSync("token")
      },
      timeout: myOutTime,
      data: opt.data,
     success: async res => {
       if (res.data.code == 200)
         res.data.data = await MyAES.decrypt(res.data.data)
         
       if (res.data.data == null) {
         res.data.code = 504
         // console.log('---------------------------- AES',{code: res.data.code,msg: 'AES解密错误'}  );
         b({code: 504,msg: 'AES解密错误'})
         return
       }
       a(res.data)
     },
      fail: (err) => {
        b(err.errMsg)
        console.log('get 请求失败了', err);
      },
      complete: () => {}
    });
  })
}
Vue.prototype.put = (opt) => {
  return new Promise((a, b) => {
    uni.request({
      url: http + opt.url,
      method: 'PUT',
      header: {
        authorization: uni.getStorageSync("token")
      },
      timeout: myOutTime,
      data: opt.data,
      success: async res => {
        if (res.data.code == 200)
          res.data.data = await MyAES.decrypt(res.data.data)
          
        if (res.data.data == null) {
          res.data.code = 504
          // console.log('---------------------------- AES',{code: res.data.code,msg: 'AES解密错误'}  );
          b({code: 504,msg: 'AES解密错误'})
          return
        }
        a(res.data)
      },
      fail: (err) => {
        b(err.errMsg)
        console.log('put 请求失败了', err);
      },
      complete: () => {}
    });
  })
}
Vue.prototype.post = (opt) => {
  return new Promise((a, b) => {
    uni.request({
      url: http + opt.url,
      method: 'POST',
      header: {
        authorization: uni.getStorageSync("token")
      },
      timeout: myOutTime,
      data: opt.data,
      success: async res => {
        if (res.data.code == 200)
          res.data.data = await MyAES.decrypt(res.data.data)
          
        if (res.data.data == null) {
          // console.log('---------------------------- AES',{code: res.data.code,msg: 'AES解密错误'}  );
          b({code: 504,msg: 'AES解密错误'})
          return
        }
        a(res.data)
      },
      fail: (err) => {
        b(err.errMsg)
        console.log('post 请求失败了', err);
      },
      complete: () => {}
    });
  })
}





Vue.filter('fromLocalDateTime', (arr) => {
  if (arr == undefined) return ''

  // 解构数组元素，分别对应年、月、日、时、分、秒
  const [year, month, day, hour, minute, second = '0'] = arr;
  // 使用三元运算符处理月、日、时、分的个位数，保证输出格式为两位数
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedHour = hour < 10 ? '0' + hour : hour;
  const formattedMinute = minute < 10 ? '0' + minute : minute;
  const formattedSecond = second < 10 ? '0' + second : second;
  // 构建时间字符串
  const formattedDateTime =
    `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
  return formattedDateTime;

  // if(arr.length <= 5)return arr[0]+'-'+arr[1]+'-'+arr[2]+' '+arr[3]+':'+arr[4]
  // else return arr[0]+'-'+arr[1]+'-'+arr[2]+' '+arr[3]+':'+arr[4]+':'+arr[5]

})
// 格式化组件中选着的时间格式
Vue.filter('fromStartDateTime', (value) => {
  if (value == undefined) return ''
  //2024-04-30 22:40:01
  if (value.indexOf('T') == -1) return value
  const startDateTime = value;
  const indexT = startDateTime.indexOf('T');
  const indexColon = startDateTime.lastIndexOf(':');
  const newDateTime = startDateTime.slice(0, indexT) + ' ' + startDateTime.slice(indexT + 1, indexColon);
  return newDateTime
})

Vue.filter('formHtmlStr', (value) => {
  if (value == undefined) return ''
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
Vue.component('quick-message', message);
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
import {
  createSSRApp
} from 'vue'
import {
  number
} from './uni_modules/uv-ui-tools/libs/function/test';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif