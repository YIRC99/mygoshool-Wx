<template>
  <view class="page">
    
    <view class="mybackicon" @click="myback">
      <image src="../static/rihgt_black.png" mode=""></image>
    </view>

    <view class="my-top-box">
      <image :src="defaulthhttp + 'logo.jpg'"></image>
      <view class="mytext">栀子花墙</view>
      <view class="myversion">Version: 1.0.0</view>
    </view>

    <uv-collapse accordion :border="false">
      <uv-collapse-item class="mycollapse" :title="item.title" v-for="(item,index) in notiveList" :key="index">
        <uv-parse :content="item.text" :selectable="true"  :lazyLoad="true"></uv-parse>
      </uv-collapse-item>
    </uv-collapse>
    
    <view class="my-bottom-box">
      <view>特别鸣谢xxxxx帮助我开发了后台管理端 并且开源出来</view>
      <view>特别鸣谢P站作者 QuAn_ 免费分享图片</view>
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
        notiveList: []
      };
    },
    methods: {
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