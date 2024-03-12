<template>
  <view class="page">
    <view class="" style="background-color: #fff; padding-bottom: 5rpx;" v-if="tabIndex != 1">
      <view class="" class="u-line-2 mynative">
        <text>社区公告</text>
        {{afficheTitle}}
      </view>
    </view>

    <view class="pagebox">
      <my ref="mypage" v-show="tabIndex == 1"></my>
      <home ref="homepage" v-show="tabIndex == 0"></home>
    </view>


    <ws-wx-privacy ref="yinshi" id="privacy-popup" @agree="handleAgree" @disagree="handleDisagree" :enableAutoProtocol="true"></ws-wx-privacy>
    
    <quick-message ref="message"></quick-message>
    
    <MagicNavigationBar :items="items" :height="60" :indicatorSize="50" @onTabSelect="onTab"
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
  export default {
    components: {
      MagicNavigationBar,
      my,
      home
    },
    data() {
      return {
        afficheTitle: 'mygo公告',
        afficheText: '',
        tabIndex: 0,
        items: [{
            icon: {
              src: require("@/static/carIcon2.png"),
              width: 30,
              height: 30
            },
            text: '拼车广场',
          },
          // {
          // 	icon:{src:require("@/static/cart (3).png"),width:30,height:30},
          // 	text:'我的订单',
          // },
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
      WxLoginSuccess() {
        this.isLoading = false
        this.isLogin = true
        uni.setStorageSync('token', this.info.openid)
        uni.setStorageSync('user', this.info)
        this.$refs.message.show({
            type: 'success', //String 默认default
            msg: '登录成功', //String 显示内容 *
            iconSize: 16, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
        })
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
        console.log('调用了微信登录');
        wx.login({
          success: (res) => {
            this.post({
              url: `user/login?code=${res.code}`
            }).then(res2 => {
              console.log(res2);
              if (res2.code == 200) {
                this.info = res2.data
                this.WxLoginSuccess()
              } else {
                this.WxLoginFail()
              }
            })
          },
          fail(err) {
            console.log('调用微信登录失败', err);
          }
        })
      },
      handleDisagree() {
        // 处理用户不同意隐私协议的逻辑
        console.log('处理用户不同意隐私协议的逻辑');
      },
      handleAgree() {
        // 处理用户同意隐私协议的逻辑
        console.log('处理用户同意隐私协议的逻辑');
      },
      onTab(index, item) {
        this.tabIndex = index
        if (index == 1) {
          uni.setNavigationBarTitle({
            title: '我的'
          })
          this.$refs.mypage.myonshow()
        } else if (index == 0) {
          uni.setNavigationBarTitle({
            title: '拼车广场'
          })
          this.$refs.homepage.myonshow()
        }
        // console.log('tabIndex', index)
      }
    },
    mounted() {

    },
    onLoad() {
      uni.getPrivacySetting({
        success: res => {
          // console.log('查询隐私授权情况',res);
          if(res.needAuthorization){
             this.$refs.yinshi.openyinshi()
          }
        }
      })
      
      this.get({
        url: 'affiche'
      }).then(res => {
        console.log('公告获取',res);
        if(res.code == 200){
          this.afficheTitle = res.data.title
          this.afficheText = res.data.text
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

  .mynative {
    background-color: #FFF6D7;
    border-radius: 10rpx;
    margin: 20rpx;
    padding: 5rpx 10rpx;
    font-size: 30rpx;

    text {
      font-weight: bold;
      color: #B07F29;
      font-size: 33rpx;
      padding: 0 10rpx;
      font-style: italic;
    }
  }

  /* 	.page{
		height: 100vh;
		width: 100vw;
	} */
</style>