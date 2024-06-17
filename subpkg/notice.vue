<template>
  <view class="page">
    
    <view class="mybackicon" @click="myback">
      <image src="../static/rihgt_black.png" mode=""></image>
    </view>

    <view class="my-top-box">
      <image :src="defaulthhttp + 'logo.jpg'"></image>
      <view class="mytext">栀子花墙</view>
      <view class="myversion">Version: {{version}}</view>
    </view>

    <uv-collapse accordion :border="false">
      <uv-collapse-item class="mycollapse" :title="item.title" v-for="(item,index) in notiveList" :key="index">
        <uv-parse :content="item.text" :selectable="true"  :lazyLoad="true"></uv-parse>
      </uv-collapse-item>
    </uv-collapse>
    
    <view class="my-bottom-box">
      <view>特别鸣谢GitHub开发者 imjustanoo 帮助我开发了后台管理端</view>
      <view style="margin: 10rpx 0;">特别鸣谢P站作者 QuAn_ 免费分享图片</view>
      <view class="">
        <text>阅读并同意</text><text @tap="openPrivacyContract" style="color: #1064fe;">《用户协议》</text><text>及</text><text
          @tap="openPrivacyContract" style="color: #1064fe;">《隐私保护规范》</text>
      </view>
    </view>

    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        notiveList: [],
        version: '1.0.0'
      };
    },
    methods: {
      onShareTimeline(){
        let result = {
          
        }
        return result
      },
      onShareAppMessage(e){
        let result = {
          title: '栀子花墙小程序', // 分享标题，默认当前页面标题
          path: '/pages/index/index', // 分享路径，默认当前页面路径，需要带上参数，如：/pages/index/index?id=123&name=abc，其中id和name                                        是当前页面参数，123和abc是参数值，需要根据实际情况进行替换。
          imageUrl: this.defaulthhttp + 'logo.jpg'
        }
        return result
      },
      openPrivacyContract(){
        wx.openPrivacyContract({
          success: (res) => {
            console.log('成功打开隐私协议',res);
          }, // 打开成功
          fail: (err) => {
            console.log('打开用户隐私协议失败',err);
          }, // 打开失败
          complete: () => {}
        })
      },
      myback(){
        uni.navigateBack({
          fail: () => {
            uni.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      },
      getNotice() {
        this.post({
          url: 'notice/list'
        }).then(res => {
          console.log('请求软件介绍', res);
          if (!this.returnCodeHandle(res.code, this.feedFail)) return
          this.notiveList = res.data
        })
      }
    },
    onLoad() {
      this.getNotice()
      let account = uni.getAccountInfoSync()
      this.version = account.miniProgram.version == '' ? '1.0.0' : account.miniProgram.version
    }
  }
</script>

<style lang="scss">
  .page {
    padding: 20rpx;
    padding-top: 150rpx;
  }
  .my-bottom-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50rpx;
    width: 100%;
    text-align: center;
    color: #666;
    font-size: 24rpx;
    
  }
  
  .mybackicon{
    position: fixed;
    top: 110rpx;
    left: 40rpx;
    image{
      height: 40rpx;
      width: 40rpx;
      transform: scale(-1);
    }
  }
  
  .mycollapse{
    font-size: 22px !important;
    text{
      font-size: 22px !important;
    }
  }

  .my-top-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
    image{
      border-radius: 50%;
      height: 200rpx;
      width: 200rpx;
    }
    .myversion {
      font-size: 36rpx;
      margin-top: 10rpx;
    }

    /deep/.uv-cell__title-text {
      font-size: 40rpx !important;
    }

    .mytext {
      font-weight: bold;
      font-size: 40rpx;
      margin-top: 20rpx;
    }
  }
</style>