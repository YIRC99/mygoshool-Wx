<template>
  <view class="middle-box-list">
    <view class="left">
      <image class="left-img" :src="iconImg"></image>
    </view>
    <view class="middle">
      <view class="" style="font-size: 32rpx;">{{text}}</view>
    </view>
    <view class="right">
      <image class="right-img" src="/static/rihgt_black.png" mode=""></image>
    </view>
  </view>
</template>

<script>
  export default {
    name:"mylist",
    props:{
      iconImg:{
        type: String,
        default: '../../static/lishi1.png'
      },
      text:{
        type: String,
        default: '列表项'
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
    $rightImgSize: 43rpx;
    $leftImgSize: 43rpx;
    .middle-box-list {
      display: flex;
      align-items: center;
      width: 100vw;
      height: 90rpx;
      padding-top: 40rpx;

      .left {
        margin-left: 30rpx;
          width: $leftImgSize;
          height: $leftImgSize;
        .left-img {
          width: 100%;
          height: 100%;
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
          width: $rightImgSize;
          height: $rightImgSize;
        }
      }
    }
 
</style>