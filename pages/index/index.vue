<template>
  <view class="page">
 

    <view class="pagebox">
      <transaction ref="transactionpage" v-show="tabIndex == 1"></transaction>
      <home ref="homepage" v-show="tabIndex == 0"></home>
      <my ref="mypage" v-show="tabIndex == 2"></my>
    </view>


    <ws-wx-privacy ref="yinshi" id="privacy-popup" @agree="handleAgree" @disagree="handleDisagree"
      :enableAutoProtocol="true"></ws-wx-privacy>
      
    

    <quick-message ref="message"></quick-message>

    <MagicNavigationBar :items="items" :height="70" :indicatorSize="50" @onTabSelect="onTab"
      indicatorBackgroundColor="#99f2ff">
      <template v-slot:text="{text}">
        {{text}}
      </template>
    </MagicNavigationBar>

  </view>
</template>

<script>
  import MagicNavigationBar from "@/uni_modules/jorbin-MagicNavigationBar/components/jorbin-MagicNavigationBar/jorbin-MagicNavigationBar.vue"
  import my from '@/pages/my/login.vue'
  import home from '@/pages/home/home.vue'
  import transaction from '@/pages/transaction/transaction.vue'
  import mixin from '@/mixins/mixin.js'
  export default {
    components: {
      MagicNavigationBar,
      my,
      home,
      transaction
    },
    mixins: [mixin],
    data() {
      return {
        tabIndex: 1,
        items: [
          {
            icon: {
              src: require("@/static/carIcon2.png"),
              width: 30,
              height: 30
            },
            text: '拼车广场',
          },
          {
            icon: {
              src: require("@/static/chushou.png"),
              width: 30,
              height: 30
            },
            text: '闲置交易',
          },
          {
            icon: {
              src: require("@/static/notice (3).png"),
              width: 30,
              height: 30
            },
            text: '个人中心',
          },
        ]
      }
    },

    methods: {
    // 为了处理之前埋下的坑 token保存错误 进入的时候检查一下token长度是不是错误 如果是重新登录 清空缓存
    isClearStory() {
      let token = uni.getStorageSync('token')
      let arr = []
      arr.length
      if(token != null  && token.length < 30){
        // 说明将id保存为token了 
        uni.clearStorageSync()
        this.wxLogin() // 尝试重新调用登录功能
      }
    },
      onShareTimeline(){
        let result = {
          
        }
        return result
      },
      onShareAppMessage(e){
        console.log('调用了分享',e);
        let result = {
          title: '栀子花墙小程序', // 分享标题，默认当前页面标题
          path: '/pages/index/index', // 分享路径，默认当前页面路径，需要带上参数，如：/pages/index/index?id=123&name=abc，其中id和name                                        是当前页面参数，123和abc是参数值，需要根据实际情况进行替换。
          imageUrl: this.defaulthhttp + 'logo.jpg'
        }
        return result
      },
     WxLoginSuccess() {
       this.isLoading = false
       this.isLogin = true
       uni.setStorageSync('token', this.info.token)
       uni.setStorageSync('user', this.info)
       // this.$refs.message.show({
       //     type: 'success', 
       //     msg: '登录成功', 
       // })
     },
     WxLoginFail() {
       this.isLoading = false
       this.$refs.toast.show({
         type: 'error',
         message: "登录失败,请稍重试",
         duration: 1500
       })
     },
      wxLogin() {
        this.isLoading = true
        // console.log('调用了微信登录');
        wx.login({
          timeout: 5000,
          success: (res) => {
            this.post({
              url: `user/login?code=${res.code}`
            }).then(res2 => {
              // console.log(res2);
              if (res2.code == 200) {
                this.info = res2.data
                this.WxLoginSuccess()
              } else {
                this.WxLoginFail()
              }
            })
          },
          fail(err) {
            // console.log('调用微信登录失败', err);
          }
        })
      },
      handleDisagree() {
        // 处理用户不同意隐私协议的逻辑
        console.log('处理用户不同意隐私协议的逻辑');
      },
      handleAgree() {
        // 处理用户同意隐私协议的逻辑
        this.wxLogin()
        console.log('处理用户同意隐私协议的逻辑');
      },
      onTab(index, item) {
        this.myHide(this.tabIndex,index)
        this.tabIndex = index
        if (index == 2) {
          uni.setNavigationBarTitle({
            title: '我的'
          })
          this.$refs.mypage.myonshow()
        } else if (index == 0) {
          uni.setNavigationBarTitle({
            title: '拼车广场'
          })
          this.$refs.homepage.myonshow()
        }else if (index == 1) {
          uni.setNavigationBarTitle({
            title: '闲置交易'
          })
          this.$refs.transactionpage.myonshow()
        }

      },
      myHide(tabIndex,index){
        // 页面上的hide方法就在这里定义
        if(tabIndex == 0 && index != 0){
          this.$refs.homepage.myonhide()
        }else if(tabIndex == 1 && index != 1){
          this.$refs.transactionpage.myonhide()
        }else if(tabIndex == 2 && index != 2){
          
        }
      }
    },
    mounted() {
      if (this.tabIndex == 1) {
        this.$refs.transactionpage.myonload()
      }
    },
    onLoad() {
      this.isClearStory() 
      uni.getPrivacySetting({
        success: res => {
          // console.log('查询隐私授权情况',res);
          if (res.needAuthorization) {
            this.$refs.yinshi.openyinshi()
          }
        }
      })
    },
    onShow() {
      this.onTab(this.tabIndex, {})
    }
  }
</script>

<style lang="scss">
  .pagebox {
    width: 100%;
    height: 500rpx;
  }



  /* 	.page{
		height: 100vh;
		width: 100vw;
	} */
</style>