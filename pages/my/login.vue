<template>
  <view class="page">
    <view>
      
      <view class="">
        <image src="/static/back.png" style="width: 100%; height: 450rpx; background-size: 100%;position: absolute; z-index: -1;" mode=""></image>
      </view>
      
      <view class="top-box">
        <view class="left" >
          <image class="left-img" src="https://zhoukaiwen.com/img/loginImg/wx.png"></image>
        </view>
        <view class="middle" v-show="!isLogin" >
          <view class="" style="font-size: 38rpx;" @click="wxLogin">点击微信一键登录</view>
        </view>
        <view class="middle" v-show="isLogin">
          <view class="" style="font-size: 38rpx;">一见如初</view>
          <view class="" style="margin: 15rpx 0; font-size: 28rpx;">手机号 1777777777</view>
        </view>
        <view class="right">
          <image class="right-img" src="../../static/right.png" mode=""></image>
        </view>
      </view>
      
      <view class="middle-box">
        <view class="" @click="toOrder">
          <mylist text="历史订单"></mylist>
        </view>
        <view class="" @click="toFeedback">
          <mylist iconImg="/static/yijian2.png" text="意见反馈"></mylist>
        </view>

      </view>
    </view>
    
    
  </view>
</template>

<script>
  import mylist from '@/components/mylist/mylist.vue'
  export default {
    components: {
      mylist
    },
    data() {
      return {
        phone: '', //手机号码
        pwd: '', //密码
        isLogin: false,
        info: {}
      };
    },
    methods: {
      toFeedback(){
        uni.navigateTo({
          url: '/subpkg/feedback'
        });
      },
      toOrder(){
        console.log('1111');
        uni.navigateTo({
          url: '/pages/my/order',
          success: res => {},
          fail: () => {},
          complete: () => {}
        });
      },
      myonshow() {
        let key = uni.getStorageSync('token')
        if (key == undefined || key == null || key == '') {
          this.isLogin = false
        } else
          this.isLogin = true
      },

      //等三方微信登录
      wxLogin() {
        uni.showToast({
          title: '微信登录',
          icon: 'none'
        });
        wx.login({
          success: (res)=>{
            console.log(res);
          }
        })
        uni.showToast({
          title: '登录成功！',
          icon: 'none'
        });
        this.isLogin = !this.isLogin
        uni.setStorageSync('token', 'login')
      },
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
      margin-left: 30rpx;
      z-index: 99;
    }

    .right {
      flex: 1;
      text-align: right;

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









<style>
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