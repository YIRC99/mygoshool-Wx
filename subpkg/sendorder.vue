<template>
  <view class="">

    <u-tabs :list="list" style="background-color: #F6F5F6;" :height="160" :font-size="40" :is-scroll="false"
      bar-height="60" bar-width="400" :current="current" @change="change"></u-tabs>

    <view class="" v-show="current == 0">
      <view class="" v-if="orderList.length == 0" style="padding-top: 200rpx;">
        <u-empty text="暂时没有拼车订单 快快接受一个吧 (๑>؂<๑）" mode="order"></u-empty>
      </view>
      <uni-card v-for="(item,index) in orderList" :key="index" :title="item.startTime + ' 出发'"
        thumbnail='/static/logo.png' @click="clickCard(item.orderId)">
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
              <image src="../../static/true.png" mode=""></image>
            </view>
            <view class="car-right">
              <text>延后</text>
              <image src="../../static/false.png" mode=""></image>
            </view>
          </view>
        </view>
        <view class="myrelation">
          微信号: YIRC99
        </view>
        <view class="myrelation">
          手机号: 177777777
        </view>

        <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
      </uni-card>

    </view>

    <view class="" v-show="current == 1">11</view>

    <uv-popup ref="popup" mode="bottom" round="50rpx" @maskClick="closePopup">
      <view class="popup-box">
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff; padding-bottom: 50rpx;"
          show-scrollbar="true">
          <view class="top-box">
            <view class="left">
              <image src="../../static/logo.png" mode=""></image>
            </view>
            <view class="middle">
              <view class="" style="line-height: 50rpx;">用户名称</view>
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
                出发时间 2024-02-25 11:05
              </template>
            </uni-section>
            <view class="my-text-box">
              江西省九江江职业大学 濂溪区88号江西省九江市九江职业大学 濂溪区88号江西省 地址最高80个字
            </view>
            <uni-section title="目标地点" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              江西省九江市九江职业大学 濂8号江西省九江市九江职业大学 濂溪区88号江西省 地址最高80个字
            </view>
            <view class="my-text-box2">
              <view class="left">
                <view class="">目前人数:<text class="my-text-box2-t"> 1 </text>人</view>
                <view class="">最多接受人数:<text class="my-text-box2-t"> 1 </text>人</view>
              </view>
              <view class="right">
    
                <view class="">最大提前时间:<text class="my-text-box2-t">30</text>分钟</view>
                <view class="">最大延后时间:<text class="my-text-box2-t">30</text>分钟</view>
              </view>
            </view>
            <uni-section title="联系方式" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="myrelation" style="padding-left: 30rpx;">
              微信号: YIRC99
            </view>
            <view class="myrelation" style="padding-left: 30rpx;">
              手机号: 177777777
            </view>
            <uni-section title="备注" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              守时,以免耽误大家的时间 后备箱空间少 有行李箱请提前沟通 守时,以免耽误大家的时间 后备箱空间少 有行李箱请提前沟通守时,以免耽误大家的时间 后备箱空间少 有行李箱请提前沟通守时,以免耽误大家的时间
              后备箱空间少 有行李箱请提前沟通最高80个字
            </view>
          </view>
          
          
    
        </scroll-view>
      </view>
    </uv-popup>
    


  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          name: '拼车历史'
        }, {
          name: '待开发'
        }],
        current: 0,
        orderList: [],
         popupShow: false,
      }
    },
    methods: {
      clickCard(orderId) {
        console.log('点击了卡片');
        this.$refs.popup.open()
        this.popupShow = true
      },
      change(e) {
        this.current = e.index
      },
      closePopup() {
        this.popupShow = false
      }
    },
    onShow() {
      this.orderList.push({
        orderId: 10086,
        avatar: '/static/logo.png',
        startDate: '2024-02-25',
        startTime: '19:45',
        startAddress: '九江职业大学北门',
        endAddress: '九江站',
        remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
      })
    }
  }
</script>

<style lang="scss">
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
  
  
  .myrelation {
    font-size: 32rpx;
    margin: 10rpx 0;
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


  /deep/ .u-tabs__wrapper__nav {
    background-color: #ffffff !important;
  }

  /deep/ .u-tabs__wrapper__nav__item__text {
    font-size: 40rpx !important;
  }
</style>