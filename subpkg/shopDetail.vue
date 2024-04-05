<template>
  <view class="page" style="padding-bottom: 30rpx;">
    
    <view class="" style="background-color: #ffffff; width: 100vw; height: 1rpx;"></view>

    <uni-card isShadow >
      <view class="myheaderbox">
        <view class="left">
          <image class="myavatar" :src="avahttp + userinfo.avatar" mode=""></image>
        </view>
        <view class="right">
          <view class="name">{{userinfo.username}}</view>
          <view class="sub">{{shop.address}}</view>
        </view>
      </view>
    </uni-card>

    <uni-card>
      <view class="priceAndbrowse">
        <view class="price">￥15</view>
        <view class="">{{shop.browse}}浏览</view>
      </view>
      <rich-text :nodes="shopDetail"></rich-text>
      <view class="" v-for="(item,index) in shopImgList" :key="index">
        <image :src="shophttp + item"></image>
      </view>
    </uni-card>

    <uni-card>
      <view class="WxBox">
        <image src="@/static/weixin.png" class="myicon" mode=""></image>
        <view class="">感兴趣 点击添加微信聊一聊</view>
      </view>
    </uni-card>

  </view>
</template>

<script>
   import mixin from '@/mixins/mixin.js'
  export default {
     mixins: [mixin],
    data() {
      return {
        userinfo:{},
        shop:{
          address: '',
          browse: '',
          id: 0
        },
        shopDetail: '',
        shopImgList:[]
      }
    },
    methods: {
      browseAdd(){
        this.post({
          url: 'shop/addbrowse',
          data:{
            id: this.shop.id
          }
        }).then(res => {
          console.log(res);
          this.shop.browse = res.data
        })
      },
      initData(){
        this.shopImgList = this.shop.imgs.split(",")
        this.shopDetail = this.shop.detail
        let aa = {
          0: '濂溪校区',
          1: '鹤问湖校区',
          2: '其他'
        }
        this.shop.address = aa[this.shop.address]
      },
      getUserInfo(openid){
        this.post({
          url: 'user/byopenid',
          data: {
            openid: openid
          }
        }).then(res => {
          console.log(res);
          this.userinfo =  res.data
        })
      }
    },
    onLoad() {
      this.shop = uni.getStorageSync('shopdetail')
      console.log(this.shop);
      this.getUserInfo(this.shop.createuserid)
      this.initData()
      this.browseAdd()
    }
  }
</script>

<style lang="scss">
  
  .WxBox{
    display: flex;
    align-items: center;
    font-size: 36rpx;
    .myicon {
      width: 60rpx;
      height: 60rpx;
      margin-right: 30rpx;
    }
  }
  
  
  
  .priceAndbrowse{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;
    .price{
      font-size: 40rpx;
      font-weight: bold;
      color: #F26666;
    }
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