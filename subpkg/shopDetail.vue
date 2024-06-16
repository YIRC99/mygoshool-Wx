<template>
  <view class="page" style="padding-bottom: 30rpx;">

    <view class="" style="background-color: #ffffff; width: 100vw; height: 1rpx;"></view>

    <uni-card isShadow @click="toUserInfo">
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
        <view class="price">￥{{shop.price}}</view>
        <view class="">{{shop.browse}}浏览</view>
      </view>
      <rich-text :nodes="shopDetail" user-select></rich-text>
      <view class="" @click="viewImg(index)" v-for="(item,index) in shopImgList" :key="index">
        <image :src="shophttp + item" style="width: 100%;" mode="widthFix"></image>
      </view>
    </uni-card>

    <uni-card isShadow @click="clickWxImg" v-show="!showWxImg">
      <view class="WxBox">
        <image src="@/static/weixin.png" class="myicon" mode=""></image>
        <view class="">感兴趣 点击添加微信聊一聊</view>
      </view>
    </uni-card>

    <uni-card isShadow v-show="showWxImg">
      <view class="" style="display: flex; justify-content: space-between; align-items: center;">
        <view class="" style="display: flex; align-items: center;">
          <image src="@/static/weixin.png" class="myicon"></image>
          <view class="" style="margin-right: 20rpx;">长按微信二维码添加好友</view>
        </view>
        <view class="" @click="viewWximg">
          <image show-menu-by-longpress :src="QRttp + shop.wechatimg" style="width: 100rpx; height: 100rpx;"></image>
        </view>
      </view>
    </uni-card>

    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  import {
    date
  } from '../uni_modules/uv-ui-tools/libs/function/test'
  export default {
    mixins: [mixin],
    data() {
      return {
        isLoading: false,
        showWxImg: false,
        userinfo: {},
        shop: {
          address: '',
          browse: '',
          id: 0,
          price: 99999,
          wechatimg: ''
        },
        shopDetail: '',
        shopImgList: [],
        isToUserInfo: true
      }
    },
    methods: {
      onShareTimeline(){
        let result = {
          
        }
        return result
      },
      onShareAppMessage(e) {
        let result = {
          title: '栀子花墙小程序', // 分享标题，默认当前页面标题
          path: '/pages/index/index', // 分享路径，默认当前页面路径，需要带上参数，如：/pages/index/index?id=123&name=abc，其中id和name                                        是当前页面参数，123和abc是参数值，需要根据实际情况进行替换。
          imageUrl: this.defaulthhttp + 'logo.jpg'
        }
        return result
      },
      toUserInfo() {
        console.log('userid', this.userinfo.userid);
        console.log('openid', this.userinfo.openid);
        if (this.isToUserInfo)
          uni.redirectTo({
            url: '/subpkg/userinfo?userid=' + this.userinfo.userid + '&openid=' + this.userinfo.openid
          })
      },
      viewWximg() {
        uni.previewImage({
          urls: [this.QRttp + this.shop.wechatimg]
        })
      },
      clickWxImg() {
        this.isLoading = true
        let timer = new Date().getTime()
        this.post({
          url: 'shop/receive',
          data: {
            id: this.shop.id
          }
        }).then(res => {
          if (timer - new Date().getTime() < 500) {
            setTimeout(() => {
              this.isLoading = false
              console.log(res);
              if (!this.returnCodeHandle(res.code)) {
                this.isRefresh = false
                this.isShowListloading = false
                return
              } else {
                this.showWxImg = true
              }

            }, 500)
          } else {
            this.isLoading = false
            if (res.code == 200) {
              this.showWxImg = true
            }
          }


        }).catch(err => {
          uni.hideLoading()
          this.isLoading = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
        })
      },
      viewImg(index) {
        uni.previewImage({
          urls: this.shopImgList.map(i => this.shophttp + i),
          current: index
        })
      },
      browseAdd() {
        this.post({
          url: 'shop/addbrowse',
          data: {
            id: this.shop.id
          }
        }).then(res => {
          console.log(res);
          if (!this.returnCodeHandle(res.code, '请稍候重试吧~')) {
            this.shop.browse = 999999999999
            return
          }
          this.shop.browse = res.data
        })
      },
      initData() {
        this.shopImgList = this.shop.imgs.split(",")
        this.shopDetail = this.shop.detail
        let aa = {
          0: '濂溪校区',
          1: '鹤问湖校区',
          2: '其他'
        }
        this.shop.address = aa[this.shop.address]
      },
      getUserInfo(openid) {
        this.post({
          url: 'user/byopenid',
          data: {
            openid: openid
          }
        }).then(res => {
          console.log(res);
          if (!this.returnCodeHandle(res.code, '请稍候重试吧~')) return
          this.userinfo = res.data
        })
      }
    },
    onLoad() {
      this.shop = uni.getStorageSync('shopdetail')
      this.isToUserInfo = uni.getStorageSync('isToUserInfo') == '' ? false : true
      console.log(this.shop);
      this.getUserInfo(this.shop.createuserid)
      this.initData()
      this.browseAdd()
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 40rpx;
  }

  .myicon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 30rpx;
  }

  .WxBox {
    display: flex;
    align-items: center;
    font-size: 36rpx;

    .myicon {
      width: 60rpx;
      height: 60rpx;
      margin-right: 30rpx;
    }
  }



  .priceAndbrowse {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;

    .price {
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
        color: black;
      }

      .sub {
        font-size: 28rpx;
        color: #5f6466;
      }
    }
  }
</style>