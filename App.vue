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
      console.log('我是最早的我是最早的我是最早的我是最早的我是最早的');
      let res = await uni.request({
        url: this.http + 'common/AESKey',
        method: 'POST'
      })
      console.log('项目启动时 获取密钥 要求必须先于所有请求',res);
      this.MyAES.aesKey = res.data.data
      console.log(this.MyAES.aesKey);
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import '@/uni_modules/uv-ui-tools/index.scss';
</style>
