<template>
  <view class="page">
    <view>
      <view class="">
        <image :src="avahttp + 'back.png'"
          style="width: 100%; height: 450rpx; background-size: 100%;position: absolute; z-index: -1;" mode="">
        </image>
      </view>

      <view class="top-box" >
        
        <view class="left" @click="toUserinfo">
          <image class="left-img" v-if="isLogin" :src="avahttp + info.avatar" style="width: 100%; height: 100%;">
          </image>
          <image class="left-img" v-if="!isLogin" src="https://zhoukaiwen.com/img/loginImg/wx.png"></image>
        </view>
        
        <view class="middle" v-if="!isLogin">
          <view class="" style="font-size: 38rpx;" @click="wxLogin">点击一键登录</view>
        </view>
        <view class="middle" v-if="isLogin">
          <view class="" style="font-size: 38rpx;" @click="toUserinfo">{{info.username}}</view>
        </view>
        
        <view class="right" v-if="isLogin" @click="toInfo">
          <image class="right-img" src="@/static/shezhi.png" mode=""></image>
        </view>
      </view>

      <view class="middle-box">
        <view class="" @click="toReceiveOrder">
          <mylist text="我接受的" iconImg="/static/jieshou.png"></mylist>
        </view>

        <view class="" @click="toSendOrder">
          <mylist text="我发布的" iconImg="/static/fabu.png"></mylist>
        </view>


        <view class="" @click="toFeedback">
          <mylist iconImg="/static/yijian6.png" text="意见反馈"></mylist>
        </view>
        
        <view class="" @click="toNotice">
          <mylist iconImg="/static/guanyu3.png" text="关于栀子花墙"></mylist>
        </view>

      </view>
    </view>
    
   
    

    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

    <quick-message ref="message"></quick-message>

  </view>
</template>

<script>
  import mylist from '@/components/mylist/mylist.vue'
  import mixin from '@/mixins/mixin.js'
  export default {
    components: {
      mylist
    },
    mixins:[mixin],
    data() {
      return {
        isLogin: false,
        info: {},
        isLoading: false,

      };
    },
    methods: {
      toNotice(){
        if(!this.isLogin){
          this.$refs.message.show({
              type: 'error', 
              msg: '请登录后重试吧',
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/notice'
        })
      },
      toUserinfo(){
         if(!this.isLogin) return 
         // console.log(this.info);
         uni.navigateTo({
           url: '/subpkg/userinfo?userid=' + this.info.userid + '&openid=' + this.info.openid
         })
      },
      toReceiveOrder() {
        if(!this.isLogin){
          this.$refs.message.show({
              type: 'error', 
              msg: '请登录后重试吧',
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/receiveorder'
        })
      },
      toInfo() {
        if(!this.isLogin){
          this.$refs.message.show({
              type: 'error', 
              msg: '请登录后重试吧',
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/setting'
        })
      },
      mychooseavatar(e) {
        // console.log(e);
      },
      getuserphone(e) {
        // console.log(e);
      },
      toFeedback() {
        if(!this.isLogin){
          this.$refs.message.show({
              type: 'error', 
              msg: '请登录后重试吧',
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/feedback'
        });
      },
      toSendOrder() {
        if(!this.isLogin){
          this.$refs.message.show({
              type: 'error', 
              msg: '请登录后重试吧',
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/sendorder',
          success: res => {},
          fail: () => {},
          complete: () => {}
        });
      },
      myonshow() {
        // console.log('my login 页面的show 触发了');
        let key = uni.getStorageSync('token')
        if (key == undefined || key == null || key == '')
          this.isLogin = false
        else
          this.isLogin = true
        this.info = uni.getStorageSync('user')

      },
      WxLoginSuccess() {
        this.isLoading = false
        this.isLogin = true
        uni.setStorageSync('token', this.info.token)
        uni.setStorageSync('user', this.info)
        this.$refs.message.show({
            type: 'success', 
            msg: '登录成功', 
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

      //等三方微信登录
      wxLogin() {
        // #ifdef H5
        this.info = JSON.parse(uni.getStorageSync('user'))
         this.WxLoginSuccess()
        return
        // #endif
        
        this.isLoading = true
        // console.log('调用了微信登录');
        wx.login({
          timeout: 5000,
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
            // console.log('调用微信登录失败', err);
          }
        })
      },
    
    },
    created() {
      uni.checkSession({
        success: (res) => {
          // console.log('验证session success', res);
        },
        fail: (err) => {
          // console.log('验证session fail 自动登录微信', err);
          this.wxLogin()
        }
      })
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 80rpx;
  }

  .middle-box {
    width: 100%;
    background-color: white;
    z-index: 99;
    border-radius: 70rpx 70rpx 0 0;
    padding: 50rpx 0;
    margin-top: 70rpx;
  }

  .top-box {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 200rpx;
    padding-top: 80rpx;
    color: white;

    .left {
      margin-left: 30rpx;
      background-color: #ffffff;
      border-radius: 50%;
      overflow: hidden;
      width: 150rpx;
      height: 150rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #a9a9a9;

      .left-img {
        width: 100rpx;
        height: 100rpx;
      }
    }

    .middle {
      flex: 1;
      margin-left: 30rpx;
      z-index: 99;
    }

    .right {
      padding: 0 30rpx;
      .right-img {
        margin-right: 20rpx;
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .login-img-a {
    position: absolute;
    width: 100%;
    height: 450rpx;
    background-size: 100%;
    z-index: -1;
  }
</style>

<style lang="scss">
  /deep/ .uni-easyinput__content-input {
    padding-left: 0 !important;
  }

  .txt {
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
  }



  .reg {
    font-size: 28rpx;
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    font-weight: bold;
    background: #f5f6fa;
    color: #000000;
    text-align: center;
    margin-top: 30rpx;
  }

  .login-view {
    width: 100%;
    position: relative;
    margin-top: -120rpx;
    background-color: #ffffff;
    border-radius: 8% 8% 0% 0;
  }

  .t-login {
    width: 600rpx;
    margin: 0 auto;
    font-size: 28rpx;
    padding-top: 80rpx;
  }

  .t-login button {
    font-size: 28rpx;
    background: #2796f2;
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    font-weight: bold;
  }

  .t-login input {
    height: 90rpx;
    line-height: 90rpx;
    margin-bottom: 50rpx;
    border-bottom: 1px solid #e9e9e9;
    font-size: 28rpx;
  }

  /deep/.uni-input-input {
    font-size: 35rpx !important;
  }

  .my-uni-easyinput {
    height: 90rpx;
    line-height: 90rpx;
    margin-top: 10rpx;
    margin-bottom: 40rpx;
    border-bottom: 1px solid #e9e9e9;
    font-size: 32rpx !important;
    padding: 0;
    padding-left: 0 !important;
  }

  .t-login .t-a {
    position: relative;
  }

  .t-b {
    text-align: left;
    font-size: 42rpx;
    color: #ffffff;
    padding: 130rpx 0 0 70rpx;
    font-weight: bold;
    line-height: 70rpx;
  }

  .t-login .t-c {
    position: absolute;
    right: 22rpx;
    top: 22rpx;
    background: #5677fc;
    color: #fff;
    font-size: 24rpx;
    border-radius: 50rpx;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 25rpx;
  }

  .t-login .t-d {
    text-align: center;
    color: #999;
    margin: 80rpx 0;
  }

  .t-login .t-e {
    text-align: center;
    width: 250rpx;
    margin: 40rpx auto 0;
  }

  .t-login .t-g {
    width: 100%;
  }

  .t-login .t-e image {
    width: 50rpx;
    height: 50rpx;
  }

  .t-login .t-f {
    text-align: center;
    margin: 70rpx 0 0 0;
    color: #666;
  }

  .t-login .t-f text {
    margin-left: 20rpx;
    color: #aaaaaa;
    font-size: 27rpx;
  }

  .t-login .uni-input-placeholder {
    color: #aeaeae;
  }

  .cl {
    zoom: 1;
  }

  .cl:after {
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
    content: '\20';
  }
</style>