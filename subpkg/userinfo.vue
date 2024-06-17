<template>
  <view class="page">
    <view>
      <view class="">
        <image :src="avahttp + 'back.png'"
          style="width: 100%; height: 450rpx; background-size: 100%;position: absolute; z-index: -1;" mode="">
        </image>
      </view>

      <view class="top-box">
        <view class="left">
          <image class="left-img" :src="avahttp + info.avatar" style="width: 100%; height: 100%;">
          </image>
        </view>
        <view class="middle">
          <view class="" style="font-size: 38rpx;">{{info.username}}</view>
        </view>
      </view>

      <view class="middle-box">
        <uv-tabs :list="list" :lineWidth="40" :lineHeight="6" :scrollable="false" @click="change"></uv-tabs>
        <view class="middle-list" v-show="currentIndex == 0">
          <myEmppty :isShow="appriseList.length == 0" Text="暂时没有评价"></myEmppty>
          
          <uv-list>
            <uv-list-item direction="column" v-for="(item,index) in appriseList" :key="index">
              <view class="uv-line-3 item-title" slot="header">
                {{item.apprisedata}}
              </view>
              <view class="" slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
                <view class="item-subhead">{{item.createat}}</view>
                <uv-tags :text="'来自的' + item.typeText + '评价'" plain size="mini" shape="circle"></uv-tags>
              </view>
            </uv-list-item>
          </uv-list>
        </view>
        
        <view class="middle-list" v-show="currentIndex == 1">
          
          <myEmppty :isShow="orderList.length == 0" Text="拼车为空"></myEmppty>
          <myCarOrder :orderList="orderList" @clickOrderItem="clickCard" :avaImgPath="info.avatar"></myCarOrder>
        </view>
        
        <view class="middle-list" v-show="currentIndex == 2">
          <myShopWaterfall :list="shopList" :isToUserInfo="false"></myShopWaterfall>
        </view>
        
        <view class="middle-list" v-show="currentIndex == 3">
          <myEmppty :isShow="true" Text="待开发"></myEmppty>
        </view>
        
      </view>
    </view>

    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

    <quick-message ref="message"></quick-message>

    <myOrderDetailPopup ref="myorderdetailpopup" :currentOrder="currentOrder" :isToUserInfo="false"
      @myShowUploadWxImg="showUploadWxImg"></myOrderDetailPopup>

    <uv-popup ref="receivePopup" mode="center"
      custom-style="height: 200rpx;border-radius: 30rpx; width: 80vw; height: 40vh;" :close-on-click-overlay="false">
      <view class="receivePopup-box">
        <view class="" style="display: flex;justify-content: center;align-items: center;">
          <image class="titleImg" src="@/static/succes1.png" mode="widthFix"></image>
        </view>
        <view>长按识别二维码快速加好友</view>
        <view class="receivePopup-box-img" @click="viewWxImg">
          <image v-if="currentOrder.wechatImg != ''" :src="QRttp+ currentOrder.wechatImg" :show-menu-by-longpress="true"
            style="width: 200rpx; height: 200rpx;" mode=""></image>
        </view>
        <view v-if="currentOrder.wechataccount != ''">对方微信: {{currentOrder.wechataccount}}</view>
        <view v-if="currentOrder.phonenumber != ''">对方手机号: {{currentOrder.phonenumber}}</view>
        <view>关闭后可在历史拼车中继续查看</view>
        <view class="down-box">
          <button class="btn-grad" @click="copyWx">确定</button>
        </view>
      </view>
    </uv-popup>


    <uv-modal ref="modal" title="添加联系方式让对方也可以联系你吧" showCancelButton :closeOnClickOverlay="false" @confirm="confirmWxImg"
      @cancel="clearWxImg">

      <myupload ref="myWxUpload" @onChange="myonChange"></myupload>

    </uv-modal>


  </view>
</template>

<script>
  import mylist from '@/components/mylist/mylist.vue'
  import mixin from '@/mixins/mixin.js'
  export default {
    components: {
      mylist
    },
    mixins: [mixin],
    data() {
      return {
        fileList1: [],
        parameter: {},
        isLogin: false,
        info: {},
        isLoading: false,
        list: [{
          name: '评价',
          badge: {
            value: 0
          }
        }, {
          name: '拼车',
          badge: {
            value: 0
          }
        }, {
          name: '闲置',
          badge: {
            value: 0
          }
        }, {
          name: '帖子',
          badge: {
            value: 0
          }
        }],
        currentIndex: 0,
        appriseList: [],
        orderList: [],
        currentOrder: {},
        shopList: []
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
      showUploadWxImg() {
        let key = this.info
        if (key == null || key == '') {
          this.$refs.message.show({
            type: 'error',
            msg: '请登录后再接受吧',
          })
          return
        }
        this.$refs.modal.open();
      },
      myonChange(e) {
        console.log('子组件上传的回调', e);
        this.fileList1 = e
      },
      clearWxImg() {
        this.fileList1 = []
        this.$refs.myWxUpload.fileList1Empty()
      },
      receiveOrder() {
        let user = this.info
        this.isLoading = true
        console.log(this.fileList1);
        this.post({
          url: 'carshareorder/receive',
          data: {
            orderid: this.currentOrder.orderid,
            receiveuserid: user.openid,
            createuserid: this.currentOrder.createuserid,
            receiveUserWechatImg: this.fileList1[0].resWximg
          }
        }).then(res => {
          console.log(res);
          this.clearWxImg()
          if (res.code != 200) {
            this.$refs.message.show({
              type: 'error',
              msg: '订单已被接受或失效',
              iconSize: 16,
            })
            this.isLoading = false
            this.$refs.myorderdetailpopup.closePopup()
            return
          }

          this.isLoading = false
          this.$refs.myorderdetailpopup.closePopup()

          this.$refs.receivePopup.open()
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
            iconSize: 16,
          })
          return
        })

      },
      confirmWxImg() {
        if (this.fileList1.length == 0) {
          this.$refs.message.show({
            type: 'error',
            msg: '请上传图片后确定',
          })
          return
        }
        if ("success" != this.fileList1[0].status) {
          this.$refs.message.show({
            type: 'error',
            msg: '请图片上传成功后确定',
          })
          return
        }

        this.receiveOrder()
      },
      copyWx() {
        console.log('不复制了 直接关闭');
        this.$refs.receivePopup.close()
      },
      viewWxImg() {
        let img = this.QRttp + this.currentOrder.wechatImg
        uni.previewImage({
          urls: [img]
        })
      },
      clickCard(e) {
        console.log(e);
        this.currentOrder = e
        this.currentOrder.createUserInfo = this.info
        this.$refs.myorderdetailpopup.clickCard(this.currentOrder)
      },
      getShowOrder() {
        this.post({
          url: 'carshareorder/getbyuserid/up',
          data: {
            openid: this.info.openid
          }
        }).then(res => {
          console.log('拼车数据', res);
          if(!this.returnCodeHandle(res.code,'请求错误 请稍候重试吧'))return
          this.orderList = res.data
          this.list[1].badge.value = res.data.length
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
          return
        })

      },
      getShowShopList() {
        this.post({
          url: 'shop/getbyuserid/up',
          data: {
            openid: this.info.openid
          }
        }).then(res => {
          console.log('闲置物品的响应', res);
          if(!this.returnCodeHandle(res.code,'请求错误 请稍候重试吧'))return
          
          if (res.code == 200) {
            res.data.forEach(i => {
              i.image = i.imgs.split(",")[0]
            })
            this.shopList = res.data
            this.list[2].badge.value = this.shopList.length
          }
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
          return
        })

      },
      change(e) {
        console.log(e);
        this.currentIndex = e.index
      },
      getAppriseByUserid() {
        this.post({
          url: 'apprise/byuserid',
          data: {
            openid: this.info.openid
          }
        }).then(res => {
          console.log('评价返回的数据', res);
          if(!this.returnCodeHandle(res.code,'请求错误 请稍候重试吧'))return
          
          this.appriseList = res.data
          this.list[0].badge.value = res.data.length
          this.appriseList.forEach(item => {
            item.createat = this.formatDateTime(item.createat)
            if (item.type = 1)
              item.typeText = '拼车'
            else if (item.type == 2)
              item.typeText = '二手'


          })
        })

      },
      getUserInfoByUserId(userid) {
        this.post({
          url: 'user/byuserid',
          data: {
            userid: userid
          }
        }).then(res => {
          console.log(res);
          if(!this.returnCodeHandle(res.code,'获取用户信息失败'))return
          this.info = res.data
          console.log('查询我当前点击进入的用户信息为: ',res);
          // 查询接下来用户的信息
          this.getAppriseByUserid()
          this.getShowOrder()
          this.getShowShopList()
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
          return
        })
      },
    },
    onLoad(e) {
      console.log('userinfo, onload', e);
      this.parameter = e
      if(e == null || e.openid == null){
        this.$refs.message.show({
          type: 'error', 
          msg: '当前页参数有误 请重试', 
        })
        setTimeout(() => {
          uni.navigateBack()
        },1000)
      }else{
        this.getUserInfoByUserId(e.userid)
      }

      
      
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 80rpx;
  }

  .receivePopup-box {
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;

    .down-box {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 20rpx;
      left: 0;
      right: 0;
      margin: 0 auto;

      .btn-grad {
        background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
        margin: 10px;
        // padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
        display: block;
        width: 450rpx;
        height: 80rpx;
        line-height: 80rpx;
      }

      .btn-grad:hover {
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }
    }

    .titleImg {

      width: 300rpx;
    }
  }


  .receivePopup-box-img {
    image {
      border: 1px solid #ebebeb;
      border-radius: 30rpx;
      overflow: hidden;
    }
  }

  .middle-list {
    .item-title {
      font-size: 32rpx;
    }

    .item-subhead {
      color: #a9a9a9;
      font-size: 26rpx;
    }
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