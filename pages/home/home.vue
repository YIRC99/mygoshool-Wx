<template>
  <view class="page">

    <view class="" style="background-color: #fff; padding-bottom: 5rpx;">
      <view class="" class="u-line-2 mynative">
        <text>社区公告</text>
        {{noticeText}}
      </view>
    </view>


    <u-tabs :list="list" style="background-color: #F6F5F6;" :height="160" :font-size="40" :is-scroll="false"
      bar-height="60" bar-width="400" :current="currentIndex" @change="change"></u-tabs>


    <scroll-view scroll-y="true" style="height: 75vh; " :refresher-triggered="isRefresh" @scrolltolower="scrollDown"
      @refresherrefresh="scrollPullDown" refresher-enabled>

      <view class="" v-show="currentIndex == 0">
        <u-empty text="暂时没有拼车订单 快快发布一个吧 (๑>؂<๑）" v-if="orderList.length == 0" mode="order"></u-empty>
        <uni-card v-for="(item,index) in orderList" :key="index" :title="item.startTime + ' 出发'"
          thumbnail='/static/logo.png' @click="clickCard(item)">
          <view class="my-car-box">
            <view class="">
              <view class="car-left">
                <img class="my-icon" src="/static/upCar.png" />
                <text class="u-line-1">{{item.startAddress}}</text>
              </view>
              <view class="car-left">
                <img class="my-icon" src="/static/downCar.png" />
                <text class="u-line-1">{{item.endAddress}}</text>
              </view>
            </view>
            <view class="">
              <view class="car-right">
                <text>提前</text>
                <image v-if="item.isBefor" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
              <view class="car-right">
                <text>延后</text>
                <image v-if="item.isAfter" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
            </view>
          </view>

          <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
        </uni-card>

      </view>

      <view class="" v-show="currentIndex == 1">11</view>

    </scroll-view>




    <uv-popup ref="popup" mode="bottom" round="50rpx" @maskClick="closePopup">
      <view class="popup-box">
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff; padding-bottom: 50rpx;"
          show-scrollbar="true">
          <view class="top-box">
            <view class="left">
              <image src="../../static/logo.png" mode=""></image>
            </view>
            <view class="middle">
              <view class="" style="line-height: 50rpx;">用户名称: {{currentOrder.userName}}</view>
              <view class="" style="line-height: 50rpx;">拼车次数</view>
            </view>
            <view class="right">
              <!--    <view class="">
                <text>提前</text>
                <image src="../../static/true.png" mode=""></image>
              </view>
              <view class="">
                <text>延后</text>
                <image src="../../static/false.png" mode=""></image>
              </view> -->
            </view>
          </view>
          <view class="my-middle-box">
            <uni-section title="出发地点" type="line" titleFontSize="36rpx">
              <template v-slot:right>
                出发时间 {{currentOrder.startDate}} {{currentOrder.startTime}}
              </template>
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.startAddressAll}}
            </view>
            <uni-section title="目标地点" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.endAddress}}
            </view>
            <view class="my-text-box2">
              <view class="left">
                <view class="">当前人数:<text class="my-text-box2-t"> {{currentOrder.currentPersonNum}} </text>人</view>
                <view class="">缺少人数:<text class="my-text-box2-t"> {{currentOrder.lackPersonNum}} </text>人</view>
              </view>
              <view class="right">
                <view class="">最大提前时间:<text class="my-text-box2-t">{{currentOrder.beforTime}}</text>分钟</view>
                <view class="">最大延后时间:<text class="my-text-box2-t">{{currentOrder.afterTime}}</text>分钟</view>
              </view>
            </view>
            <uni-section title="备注" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.remark}}
            </view>
          </view>
          <view class="down-box">
            <button class="btn-grad" @click="receiveOrder">接受拼车</button>
          </view>
        </scroll-view>
      </view>
    </uv-popup>

    <uv-popup ref="receivePopup" mode="center" @maskClick="closeReceivePopup" custom-style="height: 200rpx;border-radius: 30rpx; width: 80vw; height: 40vh;">
      <view class="receivePopup-box">
        <view class="" style="display: flex;justify-content: center;align-items: center;">
          <image class="titleImg" src="../../static/succes1.png" mode="widthFix"></image>
        </view>
        <view>友好交流互帮互助</view>
        <view>对方微信: {{orderWx}}</view>
        <view>关闭后可在历史拼车中继续查看</view>
        <view class="down-box">
          <button class="btn-grad" @click="copyWx">确定(自动复制联系方式)</button>
        </view>
      </view>
    </uv-popup>

    <view class="addicon" v-show="!popupShow" @click="toAddOrder">
      <image src="/static/add.png" mode=""></image>
    </view>




  </view>
</template>

<script>
  export default {
    data() {
      return {
        orderWx: 'YIRC99',
        oneRefresh: false, // 页面是否有过第一次刷新
        isRefresh: false,
        popupShow: false,
        noticeText: '编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
        list: [{
          name: '十里校区'
        }, {
          name: '濂溪校区'
        }],
        currentIndex: 0,
        orderList: [],
        currentOrder:{}
      };
    },
    methods: {
      copyWx(){
        uni.setClipboardData({
          data: this.orderWx,
          complete: (res) => {
            console.log('点击复制的结果',res);
            this.$refs.receivePopup.close()
          }
        })
      },
      closeReceivePopup(){
         this.popupShow = false
      },
      receiveOrder() {
        this.$refs.popup.close()
        this.$refs.receivePopup.open()
      },
      scrollPullDown() {
        console.log('下拉刷新了');
        if (this.isRefresh == true) return

        this.isRefresh = true
        setTimeout(() => {
          this.orderList.push({
            orderId: 10086,
            userName: '一见如初',
            userWx: 'YIRC99',
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            startAddressAll: '江西省九江市九江职业大学濂溪校区88号北门',
            endAddress: '九江站',
            endAddress: '江西省九江市九江火车站',
            currentPersonNum: 1,
            lackPersonNum: 1,
            isBefor: false,
            beforTime: 30,
            isAfter: true,
            afterTime: 0,
            remark: '守时,以免耽误大家的时间 后备箱空间少 有行李箱请提前沟通 最高80个字'
          })

          this.isRefresh = false
          console.log('下拉刷新结束了');
        }, 1000)
      },
      scrollDown() {
        console.log('滚动条到了 底部');
      },
      toAddOrder() {
        uni.navigateTo({
          url: '/subpkg/addCarorder'
        });
      },
      clickCard(order) {
        console.log('点击了卡片');
        this.currentOrder = order
        console.log(this.currentOrder);
        this.$refs.popup.open()
        this.popupShow = true
      },
      closePopup() {
        this.popupShow = false
      },
      change(e) {
        this.currentIndex = e.index
      },
      myonshow() {
        console.log('myonshow');
        this.simulateSwipeDown()
      },
      simulateSwipeDown() {
        console.log('首次进入页面 自动下拉刷新');
        if (!this.oneRefresh) {
          console.log('this.oneRefresh', this.oneRefresh);
          this.oneRefresh = true
          this.scrollPullDown()
        }
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 130rpx;
  }
  .receivePopup-box{
    background-color: red;
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
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
    
    .titleImg{
      
      width: 300rpx;
    }
  }

  .addicon {
    position: fixed;
    top: 1000rpx;
    right: 50rpx;
    z-index: 999;
    background-color: #CCCCCC;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 60rpx;
      height: 60rpx;
    }
  }

  .popup-box {
    height: 62vh;
    width: 100%;
    padding: 50rpx 0;
    display: flex;
    flex-direction: column;

    .my-middle-box {
      width: 100%;
      border-radius: 0;

      .my-text-box {
        background-color: #ffffff;
        font-size: 30rpx;
        padding: 20rpx 30rpx;
        line-height: 42rpx;
        color: #3d3d3d;
      }

      .my-text-box2 {
        display: flex;
        align-items: center;
        margin-left: 30rpx;
        justify-content: space-between;
        margin-top: 20rpx;
        line-height: 50rpx;

        .my-text-box2-t {
          font-weight: bold;
          margin: 0 10rpx;
        }

        .right {
          margin-right: 30rpx;
        }
      }


    }

    .down-box {
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
        width: 350rpx;
        height: 80rpx;
        line-height: 80rpx;
        position: absolute;
        right: 30rpx;
        margin-bottom: 50rpx;
      }

      .btn-grad:hover {
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }
    }

    .top-box {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      padding: 30rpx;
      padding-bottom: 40rpx;
      // border-bottom: 1px solid #c5c5c5;
      color: black;

      .left {
        image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .middle {
        font-size: 36rpx;
        margin-left: 40rpx;
      }

      .right {
        position: absolute;
        right: 40rpx;

        image {
          width: 30rpx;
          height: 30rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10rpx;
          margin-top: 10rpx;
        }
      }


    }


  }



  /deep/ .u-tabs__wrapper__nav {
    background-color: #ffffff !important;
  }

  .my-car-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .car-left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      font-size: 32rpx;

      .my-icon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 15rpx;
      }
    }

    .car-right {
      margin-right: 50rpx;
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      image {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 10rpx;
        
      }
    }
  }


  /deep/ .u-tabs__wrapper__nav__item__text {
    font-size: 40rpx !important;
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
</style>