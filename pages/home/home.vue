<template>
  <view class="page">
    <view class="" class="u-line-2 mynative">
      <text>社区公告</text>
      {{noticeText}}
    </view>
    <u-sticky style="background-color: #fff;">
      <u-tabs :list="list" :height="160" :font-size="40" :is-scroll="false" bar-height="60" bar-width="400"
        :current="current" @change="change"></u-tabs>
    </u-sticky>

    <view class="" v-show="current == 0">
      <uni-card v-for="item in orderList" :key="item.orderId" :title="item.startTime + ' 出发'" thumbnail='/static/logo.png'
        @click="clickCard(item.orderId)">
        <view class="car-line">
          <img class="my-icon" src="/static/upCar.png" />
          <text class="u-line-1">{{item.startAddress}}</text>
        </view>
        <view class="car-line">
          <img class="my-icon" src="/static/downCar.png" />
          <text class="u-line-1">{{item.endAddress}}</text>
        </view>
        <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
      </uni-card>
      
    </view>
    <view class="" v-show="current == 1" >11</view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        noticeText: '编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
        list: [{
          name: '十里校区'
        }, {
          name: '濂溪校区'
        }],
        current: 0,
        orderList: [{
            orderId: 10086,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10087,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10088,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10089,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10080,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10081,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10082,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          },
          {
            orderId: 10083,
            avatar: '/static/logo.png',
            startDate: '2024-02-25',
            startTime: '19:45',
            startAddress: '九江职业大学北门',
            endAddress: '九江站',
            remark: '我是备注,我是备注,我是备注,我是备注,我是备注'
          }
        ]
      };
    },
    methods: {
      clickCard(orderId) {
        console.log('点击了卡片');
      },
      change(e) {
        this.current = e.index
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 190rpx;
  }
  /deep/ .u-tabs__wrapper__nav{
    background-color: #fff !important ;
  }

  .car-line {
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