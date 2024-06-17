<script>
	export default {
		 onLaunch() {
		
		},
		onShow() {
			// console.log('App Show')
		},
		onHide() {
			// console.log('App Hide')
		},
     created() {

    },
    async beforeCreate() {
      // let account = uni.getAccountInfoSync()
      // console.log('获取小程序版本',account.miniProgram.envVersion);
      // //设置开发环境地址
      // let devHttp = 'http://192.168.243.211:33088/'
      // // 生产环境与测试环境接口地址不同，请根据实际情况修改。
      // this.http = account.miniProgram.envVersion == 'release' ? 'https://yirc99.cn/api/' : devHttp
      
      let res = await uni.request({
        url: this.http + 'common/AESKey',
        method: 'POST'
      })
      // console.log('项目启动时 获取密钥 要求必须先于所有请求',res);
      this.MyAES.aesKey = res.data.data
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import '@/uni_modules/uv-ui-tools/index.scss';
</style>
