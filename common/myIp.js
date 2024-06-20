
class myIp{
  
  getIp(){
    let account = uni.getAccountInfoSync()
    console.log('获取小程序版本', account.miniProgram.envVersion);
    let devHttp = 'http://192.168.1.123:33088/' // 开发环境
    // let devHttp = 'https://yirc99.cn/api/' // 开发环境
    let trialHttp = 'https://yirc99.cn/api/' // 体验环境
    let releaseHttp = 'https://yirc99.cn/api/' // 正式环境
    let http;
    // 生产环境与测试环境接口地址不同，请根据实际情况修改。
    if (account.miniProgram.envVersion == 'develop') {
      http = devHttp
    } else if (account.miniProgram.envVersion == 'release') {
      http = releaseHttp
    } else {
      http = trialHttp
    }
    return http
  }
  
}

export default new myIp()