<template>
  <view class="page">
    <view class="" style="background-color: #F7F7F7; width: 100vw; height: 1rpx;"></view>

    <view class="mycard">
      <view class="myheaderbox">
        <view class="left">
          <image class="myavatar" src="../static/logo.png" mode=""></image>
        </view>
        <view class="right">
          <view class="name">一见如初</view>
          <view class="sub">濂溪校区</view>
        </view>
      </view>
    </view>

    <view class="mycard">
      
      
      
      
    </view>




  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .page {
    background-color: #F7F7F7;
    width: 100vw;
    height: 100vh;
  }

  .mycard {
    border-radius: 20rpx;
    background: linear-gradient(315deg, #e6e6e6, #ffffff);
    box-shadow: -21rpx -21rpx 42rpx #e6e6e6,
      21rpx 21rpx 42rpx #ffffff;
    padding: 20rpx;
    margin: 30rpx 20rpx;
  }

  .myheaderbox {
    display: flex;
    align-items: center;

    .left {
      margin-right: 30rpx;

      .myavatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

    .right {
      .name {
        font-size: 36rpx;
        font-weight: bold;
      }

      .sub {
        font-size: 28rpx;
        color: #5f6466;
      }
    }
  }
</style>