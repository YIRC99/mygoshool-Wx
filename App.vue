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
      let AESKey = uni.getStorageSync('AESKey') || ''
      if(AESKey != ''){
        this.MyAES.aesKey = AESKey
        return
      }
      
      let res = await uni.request({
        url: this.http + 'common/AESKey',
        method: 'POST'
      })
      // console.log('项目启动时 获取密钥 要求必须先于所有请求',res);
      // this.MyAES.aesKey = res.data.data
      // uni.setStorageSync('AESKey', res.data.data)
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import '@/uni_modules/uv-ui-tools/index.scss';
</style>
